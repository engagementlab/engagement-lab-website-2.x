/**
 * Engagement Lab Website v2.x
 *
 * Publication page Model
 * @module publication
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const azureAdapter = require('keystone-storage-adapter-azure');

const { keystone, } = global;
const { Types, } = keystone.Field;
const filter = keystone.list('Filter');

/**
 * @module publication
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Publication = new keystone.List('Publication', {
    sortable: true,
    map: {
        name: 'title',
    },
    autokey: {
        path: 'key',
        from: 'title',
        unique: true,
    },
});

// Storage adapter for Azure
const azureFile = new keystone.Storage({
    adapter: azureAdapter,
    azure: {
        container: 'elabpublication',
        generateFilename(file) {
            // Cleanup filename
            // eslint-disable-next-line no-useless-escape
            return file.originalname.replace(/[\\'\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, '').replace(/ /g, '_').toLowerCase();
        },
    },
    schema: {
        path: true,
        originalname: true,
        url: true,
    },
});

/**
 * Model Fields
 * @main Publication
 */
Publication.add({
    title: {
        type: String,
        label: 'Title',
        required: true,
        initial: true,
        index: true,
        note: 'This is the link text for article/chapter urls, and the link text to individual pages for books and guides.',
    },
    enabled: {
        type: Types.Boolean,
        label: 'Enabled',
        note: 'Determines if this publication appears on the live site.',
    },
    indexed: {
        type: Boolean,
    },
}, 'Filters', {
    form: {
        type: Types.Relationship,
        filters: {
            category: 'Format',
            appears: 'Publication',
        },
        ref: 'Filter',
        label: 'Format(s)',
        note: 'What kind of publication is this? A book? An article? Pick from here or add a new Format Filter and choose \'Publication\' for the destination.',
        required: true,
        many: false,
        initial: true,
    },
}, 'Publication Information', {
    author: {
        type: String,
        label: 'Author Name(s)',
        required: true,
        initial: true,
        note: 'This appears below the title.',
    },
    // This field is required in the save hook below instead of here as keystone dependsOn workaround
    blurb: {
        type: Types.Textarea,
        label: 'Blurb Text',
        note: 'This displays beneath the title and author in the publications listing.',
    },
    description: {
        type: Types.Markdown,
        label: 'Description Text',
        required: false,
        initial: true,
        note: 'This displays on the individual publication page under \'About\'',
    },
    context: {
        type: String,
        note: 'Where this publication appears, e.g. "Journal Of Civic Media Vol. 1 Issue 3".',
    },

    date: {
        type: Date,
        label: 'Publication Date',
        initial: true,
        required: true,
        note: 'For Books and Guides, this displays on the individual page below the author. For Articles and Chapters, this displays in the listing next to the author.',
    },
    articleResource: {
        type: Types.Relationship,
        ref: 'Resource',
        label: 'Article Resource',
        note: 'This is a link or file.',
    },
    purchaseUrls: {
        type: String,
        label: 'Link to view publication',
        note: 'Must be in format "http://www.something.org"',
    },
    downloadUrls: {
        type: String,
        label: 'Link to download publication',
        note: 'Must be in format "http://www.something.org"',
    },
    file: {
        type: Types.File,
        label: 'File',
        note: 'If uploaded, a downloadable link to the book or guide will be appear on the publication\'s individual page.',
        storage: azureFile,
    },

    isArticle: {
        type: Boolean,
        hidden: true,
        noedit: true,
        default: false,
    },
});

/**
 * Hooks
 * =============
 */
Publication.schema.pre('save', next => {
    // Save state for post hook
    this.wasNew = this.isNew;
    // this.wasModified = this.isModified();

    /*   const pub = this;
  filter.model.findFilter(this.form, (err, result) => {

    if (result.key === 'article-chapter') pub.isArticle = true;
    else pub.isArticle = false;

  }); */
    next();
});

Publication.schema.post('save', (doc, next) => {
    if (process.env.SEARCH_ENABLED === 'true') {
    // Get type of pub
        filter.model.findFilter(doc.form, (err, result) => {
            // Index doc on elasticsearch
            global.elasti.index({
                index: 'publication',
                type: result.key,
                id: doc._id.toString(),
                body: {
                    name: doc.title,
                    key: doc.key,
                    content: doc.blurb,
                    author: doc.author,
                    description: doc.description,
                },
            }, (err, resp, status) => {
                console.log(resp, status);
                if (err) console.error(err);

                next(err);
            });
        });
    }

    next();
});

/**
 * Model Registration
 */
Publication.defaultSort = '-createdAt';
Publication.defaultColumns = 'title, form, enabled';
Publication.register();
