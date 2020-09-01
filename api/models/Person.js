/**
 * Engagement Lab Website v2.x
 *
 * Person page parent Model
 * @module team
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * @module team
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Person = new keystone.List('Person', {
    label: 'People',
    singular: 'Team Member',
    plural: 'People',
    sortable: true,
    autokey: {
        path: 'key',
        from: 'name',
        unique: true,
    },
});

/**
 * Model Fields
 * @main Person
 */
Person.add({

    name: {
        type: Types.Name,
        label: 'Name',
        required: true,
        initial: true,
        index: true,
    },
    alumni: {
        type: Boolean,
        label:
        'Is Alumni/Former Staff',
    },
    category: {
        type: Types.Select,
        options: 'faculty leadership, staff, faculty fellows, Masters, lab assistants',
        default: 'staff',
        required: true,
        initial: true,
        note: 'This determines the section in which the person displays',
    },

    title: {
        type: String,
        label: 'Title',
        dependsOn: {
            category: ['faculty leadership', 'staff', 'faculty fellows', 'lab assistants'],
        },
        initial: true,
        note: 'This appears below the name.',
    },
    cohortYear: {
        type: Types.Relationship,
        label: 'Year',
        dependsOn: {
            category: ['CMAP', 'Masters'],
        },
        ref: 'Filter',
        filters: {
            category: 'Cohort',
        },
        initial: true,
        note: 'This field is for students, and will display below their name or title.',
    },
    bio: {
        type: Types.Markdown,
        label: 'Bio',
        required: true,
        initial: true,
    },
    image: {
        type: Types.CloudinaryImage,
        label: 'Image',
        folder: 'homepage-2.0/team',
        note: 'Must be in square format. Will display as 376px by 376px.',
    },
    relatedLinks: {
        type: Types.TextArray,
        note: 'Website(s), social media, etc. Please use format `https://personalwebsite.com`.',
    },
    projects: {
        type: Types.Relationship,
        label: 'Selected Research Projects',
        ref: 'Project',
        many: true,
    },
    mdProjects: {
        type: Types.Relationship,
        label: 'Selected Thesis Projects',
        ref: 'MDProject',
        many: true,
    },

    contact: {
        type: Types.Textarea,
        note: 'This can contain phone, email, office, etc.',
    },

});

/**
 * Hooks
 * =============
 */
Person.schema.pre('save', next => {
    // Save state for post hook
    this.wasNew = this.isNew;
    // this.wasModified = this.isModified();

    next();
});

/**
 * Model Registration
 */
// Person.defaultSort = 'sortOrder';
Person.defaultColumns = 'name, category';
Person.register();
