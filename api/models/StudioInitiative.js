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
const urlValidator = require('../utils').url;

/**
 * @module initiative
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const StudioInitiative = new keystone.List('StudioInitiative',
    {
        name: 'Initiative',
        autokey: { path: 'key', from: 'name', unique: true, },
        sortable: true,
    });

/**
 * Model Fields
 * @main Listing
 */
StudioInitiative.add({
    name: {
        type: String, label: 'Initiative Name', required: true, initial: true, index: true,
    },
    description: {
        type: String, required: true, initial: true, note: 'This displays next to/near the initiative name an',
    },
    longDescription: {
        type: Types.Textarea, required: true, initial: true, note: 'This displays on the initiative landing',
    },
    body: {
        type: Types.Markdown,
        required: true,
        initial: true,
    },
    url: {
        type: Types.Url,
        label: 'Website URL',
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org".',
        required: true,
        initial: true,
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
    instructions: {
        type: String,
        label: 'Please read!',
        noedit: true,
        note: '**All images below need to be very high quality.** <br />' +
        '_Thumbnail Image_: Image shown as thumb in listings. <br />' +
        '_Gallery Videos_: Videos show directly under main studio info. <br />' +
        '_Video Thumbnail Images_: Please specify in order of videos. Dimensions need to be 500x300px. <br />' +
        '_Video Captions_: Please specify in order of videos. If a video has no caption, enter **#** in text field.',
    },
    thumb: {
        type: Types.CloudinaryImage,
        label: 'Thumbnail Image',
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
    },
    galleryVideos: {
        type: Types.TextArray,
        label: 'Gallery Video IDs',
        note: 'Must be video ID from a Vimeo URL (vimeo.com/**420657931** ← this is an ID)',
    },
    galleryVideoThumbails: {
        type: Types.CloudinaryImages,
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
    },
    galleryVideoTitles: {
        type: Types.TextArray,
    },
    galleryVideoCaptions: {
        type: Types.TextArray,
    },
});

/**
 * Model Registration
 * =============
 */
StudioInitiative.register();
