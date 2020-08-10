/**
 * Engagement Lab Website v2.x
 *
 * Studios index Model
 * @module studiosintro
 * @class studiosintro
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * studiosintro model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const StudiosIntro = new keystone.List('StudiosIntro',
    {
        label: 'Studios Intro Page',
        singular: 'Studios Intro Page',
        nodelete: true,
        nocreate: true,
    });

/**
 * Model Fields
 * @main StudiosIntro
 */
StudiosIntro.add({
    name: {
        type: String, default: 'Studios Intro Page', hidden: true, required: true, initial: true,
    },
    summary: {
        type: Types.Textarea, label: 'Summary Paragraph', required: true, initial: true,
    },
    gradSummary: {
        type: Types.Textarea, label: 'Graduate Summary Paragraph', required: true, initial: true,
    },
    gradSummaryImage: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
    },

});

/**
 * Model Registration
 */
StudiosIntro.defaultSort = '-createdAt';
StudiosIntro.defaultColumns = 'name';
StudiosIntro.register();
