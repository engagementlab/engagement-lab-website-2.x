/**
 * Engagement Lab Website v2.x
 *
 * Initiative Model
 * @module models
 * @class initiative
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * @module initiative
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Initiative = new keystone.List('Initiative',
    {
        hidden: false,
        autokey: { path: 'key', from: 'name', unique: true, },
        sortable: true,
        nodelete: true,
    });

/**
 * Model Fields
 * @main Listing
 */
Initiative.add({
    name: {
        type: String, label: 'Initiative Name', required: true, initial: true, index: true,
    },
    description: {
        type: String, required: true, initial: true, note: 'This displays next to/near the initiative name',
    },
    longDescription: {
        type: Types.Textarea, required: true, initial: true, note: 'This displays on the initiative landing',
    },
    featuredProject: {
        type: Types.Relationship,
        ref: 'Project',
    },
    featuredProjectBlurb: {
        type: Types.Textarea,
    },
    projects: {
        type: Types.Relationship,
        ref: 'Project',
        label: 'Project(s)',
        note: 'Projects that are part of this initiative',
        required: true,
        many: true,
        initial: true,
    },
});

/**
 * Model Registration
 * =============
 */
Initiative.register();

exports = module.exports = Initiative;
