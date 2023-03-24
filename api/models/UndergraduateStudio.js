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

const urlValidator = require('../utils').url;

/**
 * @module undergraduate
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const UndergraduateStudio = new keystone.List('UndergraduateStudio', {
    sortable: true,
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
    enabled: { type: Boolean, initial: true, },
    description: {
        type: Types.Markdown,
    },
    faculty: {
        type: Types.Relationship,
        many: true,
        ref: 'Person',
    },
    year: {
        type: Types.Relationship,
        ref: 'AcademicYear',
        initial: true,
        required: true,
    },
    semester: {
        required: true,
        initial: true,
        type: Types.Select,
        options: ['Fall', 'Spring'],
    },
    url: {
        type: Types.Url,
        label: 'External URL',
        validate: urlValidator,
        note: 'External page describing this studio. Must be in format "http://www.something.org"',
    },
    video: {
        type: String,
        note: 'Must be video ID from a Vimeo URL (vimeo.com/**420657931** ← this is an ID)',
    },
    videoThumbnail: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/studios',
    },
    requiredCourse: { type: Boolean, },
});

/**
 * Model Registration
 */
UndergraduateStudio.register();
