/**
 * Engagement Lab Website v2.x
 *
 * Research Landing page Model
 * @module Research
 * @class Research
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;
/**
 * Research model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Research = new keystone.List('Research', {
    label: 'Research Page',
    singular: 'Research Page',
    plural: 'Research Page',
    nodelete: true,
    nocreate: true,
    hidden: true,
    autokey: {
        path: 'key',
        from: 'name',
        unique: false,
    },
});

/**
 * Model Fields
 * @main Research
 */
Research.add({
    name: {
        type: String, default: 'Research Page', hidden: true, required: true, initial: true, noedit: true,
    },
    blurb: {
        type: Types.Textarea,
        required: true,
        initial: true,
        note: 'This is the blurb that shows on `/research/projects/`',
    },
});

/**
 * Model Registration
 */
Research.defaultSort = '-createdAt';
Research.register();
