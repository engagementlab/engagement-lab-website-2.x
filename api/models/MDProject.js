/**
 * Engagement Lab Website v2.x
 *
 * MDProject Model
 * @module project
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;
const azureAdapter = require('keystone-storage-adapter-azure');
const urlValidator = require('../utils').url;

// Storage adapter for Azure
const azureFile = new keystone.Storage({
    adapter: azureAdapter,
    azure: {
        container: 'theses',
        generateFilename(file) {
            // Cleanup filename
            // eslint-disable-next-line no-useless-escape
            return file.originalname.replace(/[\\'\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, '').replace(/ /g, '_').toLowerCase();
        },
    },
    schema: {
        path: true,
        originalname: true,
        url: true,
    },
});

/**
 * @module project
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const MDProject = new keystone.List('MDProject', {
    label: 'Thesis Projects',
    singular: 'Thesis Project',
    sortable: true,
    autokey: {
        path: 'key',
        from: 'name',
        unique: true,
    },
});

/**
 * Model Fields
 * @main MDProject
 */
MDProject.add({
    name: {
        type: String,
        required: true,
        initial: true,
        index: true,
    },
    enabled: {
        type: Types.Boolean,
        label: 'Enabled',
        note: 'Determines if this project appears on the live site.',
    },
    cohortYear: {
        type: Types.Relationship,
        label: 'Year',
        ref: 'Filter',
        filters: {
            category: 'Cohort',
        },
        initial: true,
        required: true,
        note: 'This field is for filtering projects by year.',
    },
    /* featured: {
        type: Types.Boolean,
        label: 'Featured',
        note: 'Determines if this project appears on the home page.',
    }, */
    thumb: {
        type: Types.CloudinaryImage,
        label: 'Thumbnail Image',
        folder: 'homepage-2.0/listings',
        autoCleanup: true,
    },
    customUrl: {
        type: String,
        label: 'Custom URL',
        note: 'Must be format of "project-url". Overrides default "/masters/projects/project-name".',
    },

    teamMembers: {
        type: Types.TextArray,
        label: 'Team Member(s)',
        many: true,
    },
},

'Project Information', {

    problem: {
        type: Types.Textarea,
        label: 'Problem Space',
        initial: true,
        required: true,
    },
    intervention: {
        type: Types.Textarea,
        label: 'Proposed Intervention',
        initial: true,
        required: true,
    },
    impact: {
        type: Types.Textarea,
        label: 'Social Impact',
        initial: true,
        required: true,
    },

    externalLinkUrl: {
        type: Types.Url,
        label: 'Project Website URL',
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org" <br> Appears on the individual project page.',
    },

    partners: {
        type: Types.Relationship,
        ref: 'Partner',
        many: true,
    },

    pointOfContact: {
        type: Types.Relationship,
        ref: 'Person',
    },

},

'Project Media', {

    // Images for project page
    projectImages: {
        type: Types.CloudinaryImages,
        folder: 'homepage-2.0/masters/project',
        autoCleanup: true,
    },

    imageDescriptions: {
        type: Types.TextArray,
        note: 'Order must match that of `Projetct Images`.',
    },

    // Resource model reference for files
    resources: {
        type: Types.Relationship,
        ref: 'Resource',
        label: 'Project Resources',
        filters: {
            type: 'file',
        },
        many: true,
        note: 'Will appear in \'Resources\' area on individual project page.',
    },

    publications: {
        type: Types.Relationship,
        ref: 'Publication',
        label: 'Related Publications',
        many: true,
        note: 'Will appear in \'Related Publications\' area on individual project page.',
    },

    thesis: {
        type: Types.File,
        label: 'Thesis Document',
        storage: azureFile,
    },

});

/**
 * Hooks
 * =============
 */
MDProject.schema.pre('save', next => {
    // Save state for post hook
    this.wasNew = this.isNew;

    // Override key w/ custom URL if defined
    if (this.customUrl && this.customUrl.length > 0) { this.key = this.customUrl; }

    next();
});
/**
 * Model Registration
 */
MDProject.defaultSort = 'sortOrder';
MDProject.defaultColumns = 'name, enabled, featured';
MDProject.register();
