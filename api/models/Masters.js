/**
 * Engagement Lab Website v2.x
 *
 * CMAP page Model
 * @module masters
 * @class masters
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;
const urlValidator = require('../utils').url;

/**
 * @module masters
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Masters = new keystone.List('Masters', {
    label: 'Graduate Program',
    singular: 'Graduate Program',
    nodelete: true,
    nocreate: true,
});

/**
 * Model Fields
 * @main masters
 */
Masters.add({
    name: {
        type: String,
        default: 'Masters Program Page',
        hidden: true,
        required: true,
    },

    programDescription: {
        type: Types.Textarea,
        label: 'Blurb',
        required: true,
        initial: true,
    },
    partnerships: {
        type: Types.Textarea,
        required: true,
        initial: true,
    },
    learningObjectives: {
        type: Types.Markdown,
        required: true,
        initial: true,
    },
    faculty: {
        type: Types.Relationship,
        required: true,
        initial: true,
        many: true,
        ref: 'Person',
        filters: {
            type: ['faculty leadership', 'faculty fellows'],
        },
    },
    projects: {
        type: Types.Relationship,
        many: true,
        ref: 'MDProject',
        label: 'Example Thesis Projects',
    },
    studiosBlurb: {
        type: Types.Textarea,
        required: true,
        initial: true,
    },
    applicationBlurb: {
        type: Types.Markdown,
        required: true,
        initial: true,
    },
    phases: {
        type: Types.TextArray,
    },
    applicationLink: {
        type: Types.Url,
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org"',
    },
    buttonTxt: {
        type: String,
        label: 'Application link/button text',
        required: true,
        initial: true,
    },
    cohortYear: {
        type: Types.Relationship,
        label: 'Cohort Year to display',
        ref: 'Filter',
        filters: {
            category: 'Cohort',
        },
        initial: true,
        note: 'This field is for students and board members, and will display below the title.',
    },
});

/**
 * Model Registration
 */
Masters.register();
