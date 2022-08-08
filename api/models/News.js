/**
 * Engagement Lab Website v2.x
 *
 * News page Model
 * @module models
 * @class News
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */
const { keystone, } = global;
const { Types, } = keystone.Field;

const News = new keystone.List('NewsItem', {
    autokey: {
        path: 'key',
        from: 'title',
        unique: true,
    },
    map: {
        name: 'title',
    },
    hidden: true,
});

/**
 * Model Fields
 * @main News
 */
News.add({

    title: {
        type: String,
        required: true,
        initial: true,
        index: true,
    },
    enabled: {
        type: Types.Boolean,
        note: 'Will never appear on site if not enabled',
    },
    datePosted: {
        type: Date,
        default: Date.now,
        required: true,
        initial: true,
    },
    // url: {
    //     type: Types.Url,
    //     required: true,
    //     initial: true,
    //     label: 'Link to Medium Post',
    //     validate: urlValidator,
    //     note: 'Must be in format "https://medium.com/engagement-lab-emerson-college/post-title". <br /><br /> **Please ensure image height is 300px, or it will render oddly.**',
    // },
    image: {
        label: 'Thumbnail',
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/news',
        note: '',
    },
    body: {
        type: Types.Markdown,
        required: true,
        initial: true,
    },
});

News.schema.pre('save', next => {
    // Save state for post hook
    this.wasNew = this.isNew;
    // this.wasModified = this.isModified();

    next();
});

/**
 * Model Registration
 */
News.defaultSort = '-createdAt';
News.defaultColumns = 'title, datePosted, enabled';
News.register();
