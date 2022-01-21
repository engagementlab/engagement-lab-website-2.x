/**
 * Engagement Lab Website v2.x
 *
 * StudioInitiative Model
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
const StudioInitiative = new keystone.List('StudioInitiative',
    {
        autokey: { path: 'key', from: 'name', unique: true, },
        sortable: true,
    });

/**
 * Model Fields
 * @main Listing
 */
StudioInitiative.add({
    name: {
        type: String, label: 'Studio Initiative Name', required: true, initial: true, index: true,
    },
    description: {
        type: String, required: true, initial: true, note: 'This displays next to/near the initiative name',
    },
    longDescription: {
        type: Types.Textarea, required: true, initial: true, note: 'This displays on the initiative landing',
    },
    thumb: {
        type: Types.CloudinaryImage,
        label: 'Thumbnail Image',
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
    },
    studios: {
        type: Types.Relationship,
        ref: 'Studio',
        label: 'Studio(s)',
        note: 'Studios that are part of this initiative',
        required: true,
        many: true,
        initial: true,
    },
});

/**
 * Model Registration
 * =============
 */
StudioInitiative.register();
