/**
 * Engagement Lab Website v2.x
 *
 * Blog page Model
 * @module models
 * @class Blog
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */
const { keystone, } = global;
const { Types, } = keystone.Field;

const Blog = new keystone.List('Blog', {
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
 * @main Blog
 */
Blog.add({

    title: {
        type: String,
        required: true,
        initial: true,
        index: true,
    },
    enabled: {
        type: Types.Boolean,
        label: 'Published',
        note: 'Will never appear on site if not enabled',
    },
    datePosted: {
        type: Date,
        default: Date.now,
        required: true,
        initial: true,
    },
    body: {
        type: Types.Markdown,
        required: true,
        initial: true,
    },
});

Blog.schema.pre('save', next => {
    // Save state for post hook
    this.wasNew = this.isNew;
    // this.wasModified = this.isModified();

    next();
});

/**
 * Model Registration
 */
Blog.defaultSort = '-createdAt';
Blog.defaultColumns = 'title, datePosted, enabled';
Blog.register();
