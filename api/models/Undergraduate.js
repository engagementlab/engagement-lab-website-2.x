/**
 * Engagement Lab Website v2.x
 *
 * CMAP page Model
 * @module undergraduate
 * @class undergraduate
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * @module undergraduate
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Undergraduate = new keystone.List('Undergraduate', {
    label: 'Undergraduate',
    singular: 'Undergraduate',
    nodelete: true,
    nocreate: true,
});

/**
 * Model Fields
 * @main undergraduate
 */
Undergraduate.add({
    name: {
        type: String,
        default: 'Undergraduate Page',
        hidden: true,
        required: true,
    },
    description: {
        type: Types.Markdown,
        required: true,
        initial: true,
    },
    studiosDescription: {
        type: Types.Markdown,
        required: true,
        initial: true,
    },
    curriculumDescription: {
        type: Types.Markdown,
        required: true,
        initial: true,
    },
    currentStudiosYear: {
        type: String,
        required: true,
        initial: true,
    },
    /*     currentStudios: {
        type: Types.Relationship,
        required: true,
        initial: true,
        many: true,
        ref: 'UndergraduateStudio',
    }, */
});

/**
 * Model Registration
 */
Undergraduate.register();
