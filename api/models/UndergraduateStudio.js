/**
 * Engagement Lab Website v2.x
 *
 * Undergrad studio Model
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
const UndergraduateStudio = new keystone.List('UndergraduateStudio', {
    // label: 'Undergraduate Studio',
    // singular: 'Undergraduate Studio',
});

/**
 * Model Fields
 * @main undergraduate
 */
UndergraduateStudio.add({
    name: {
        type: String,
        hidden: true,
        required: true,
    },
    current: { type: Boolean, },
    description: {
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
});

/**
 * Model Registration
 */
UndergraduateStudio.register();
