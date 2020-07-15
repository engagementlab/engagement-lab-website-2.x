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
const urlValidator = require('../utils').url;

const News = new keystone.List('NewsItem', {
    autokey: {
        path: 'key',
        from: 'title',
        unique: true,
    },
    map: {
        name: 'title',
    },
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
    featured: {
        type: Types.Boolean,
    },
    datePosted: {
        type: Date,
        default: Date.now,
        required: true,
        initial: true,
    },
    url: {
        type: Types.Url,
        required: true,
        initial: true,
        label: 'Link to Medium Post',
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org".',
    },
    image: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/news',
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
