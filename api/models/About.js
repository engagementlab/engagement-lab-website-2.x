/**
 * Engagement Lab Website v2.x
 *
 * About page Model
 * @module about
 * @class about
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * about model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const About = new keystone.List('About',
    {
        label: 'About Page',
        singular: 'About Page',
        nodelete: true,
        nocreate: true,
    });

/**
 * Model Fields
 * @main About
 */
About.add({
    name: {
        type: String, default: 'About Page', hidden: true, required: true, initial: true,
    },
    tagline: {
        type: Types.Markdown, required: true, initial: true, note: 'Bolded phrases will show as blue, red, yellow.',
    },

    summary1: {
        type: Types.Textarea, label: 'Summary Paragraph 1', required: true, note: 'First (required) paragraph',
    },
    summary2: {
        type: Types.Textarea, label: 'Summary Paragraph 2', required: true, note: 'Second (required) paragraph',
    },

    image: {
        type: Types.CloudinaryImage,
        label: 'Summary Image',
        folder: 'homepage-2.0/about',
        autoCleanup: true,
    },

});

/**
 * Model Registration
 */
About.defaultSort = '-createdAt';
About.defaultColumns = 'name';
About.register();
