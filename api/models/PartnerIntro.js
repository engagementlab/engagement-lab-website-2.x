/**
 * Engagement Lab Website v2.x
 *
 * PartnerIntro Model
 * @module partnerintro
 * @class partnerintro
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * partnerintro model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const PartnerIntro = new keystone.List('PartnerIntro',
    {
        label: 'Partner With Us Page',
        singular: 'Partner With Us Page',
        nodelete: true,
        // nocreate: true,
    });

/**
 * Model Fields
 * @main PartnerIntro
 */
PartnerIntro.add({
    name: {
        type: String, default: 'Partner With Us Page', hidden: true, required: true, initial: true,
    },
    intro: {
        type: Types.Textarea, required: true, initial: true,
    },
    summary1: {
        type: Types.Textarea, note: '`Partnerships require work` blurb', required: true, initial: true,
    },
    summary2: {
        type: Types.Textarea, note: '`Benefits of Partnerships` blurb', required: true, initial: true,
    },

    image: {
        type: Types.CloudinaryImage,
        label: 'Intro Image',
        folder: 'homepage-2.0/partner',
        autoCleanup: true,
    },

});

/**
 * Model Registration
 */
PartnerIntro.defaultSort = '-createdAt';
PartnerIntro.defaultColumns = 'name';
PartnerIntro.register();
