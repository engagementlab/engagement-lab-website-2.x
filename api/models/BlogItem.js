/**
 * Engagement Lab Website v2.x
 *
 * BlogItem page Model (used to indicate that blogs are now in new CMS)
 * @module models
 * @class BlogItem
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */
const { keystone, } = global;

const BlogItem = new keystone.List('BlogItem', {
    autokey: {
        path: 'key',
        from: 'title',
        unique: true,
    },
    map: {
        name: 'title',
    },
    nocreate: true,
    nodelete: true,
});

/**
 * Model Fields
 * @main BlogItem
 */
BlogItem.add({

    title: {
        type: String,
        required: true,
        initial: true,
        index: true,
        default: 'Blogs are now created in new CMS',
        noedit: true,
        note: '[Please click here.](https://cms.elab.emerson.edu/tngvi/news-items)',
    },
});

/**
 * Model Registration
 */
BlogItem.defaultSort = '-createdAt';
BlogItem.defaultColumns = 'title';
BlogItem.register();
