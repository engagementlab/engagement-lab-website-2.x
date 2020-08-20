/**
 * Engagement Lab Website v2.x
 *
 * Resource Model
 * @module resource
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const azureAdapter = require('keystone-storage-adapter-azure');

const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * @module resource
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Resource = new keystone.List('Resource', {
    autokey: {
        from: 'name',
        path: 'key',
        unique: true,
    },
    label: 'Resources (Legacy)',
    plural: 'Resources (Legacy)',
});

// Storage adapter for Azure
const azureFile = new keystone.Storage({
    adapter: azureAdapter,
    azure: {
        container: 'resources',
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
 * @main Resource
 */
Resource.add({
    name: {
        type: String,
        label: 'Resource Name',
        required: true,
        initial: true,
        index: true,
    },
    type: {
        type: Types.Select,
        label: 'Type',
        options: 'video, article, blog post, file',
        default: 'video',
        required: true,
        initial: true,
    },

    url: {
        type: String,
        label: 'URL',
        dependsOn: {
            type: ['video', 'article', 'blog post'],
        },
        initial: true,
    },

    summary: {
        type: String,
        label: 'Summary',
        dependsOn: {
            type: ['article', 'blog post'],
        },
    },
    date: {
        type: Date,
        label: 'Date Published',
        dependsOn: {
            type: ['article', 'blog post'],
        },
    },
    author: {
        type: String,
        label: 'Author',
        dependsOn: {
            type: ['article', 'blog post'],
        },
    },

    file: {
        type: Types.File,
        dependsOn: {
            type: 'file',
        },
        label: 'File',
        storage: azureFile,
    },
    fileSummary: {
        type: Types.Markdown,
        label: 'File Summary',
        dependsOn: {
            type: ['file'],
        },
    },

    imageOverride: {
        type: Types.CloudinaryImage,
        dependsOn: {
            type: 'article',
        },
        label: 'Image Override (350 x 233)',
        folder: 'homepage-2.0/research',
        note: 'This should be used if the image provided automatically is not acceptable.',
        autoCleanup: true,
    },
});

Resource.schema.pre('remove', next => {
    // Remove resource from all that referenced it
    keystone.list('Project').model.removeResourceRef(this._id, (err, removedCount) => {
        if (err) console.error(err);

        if (removedCount > 0) console.log(`Removed ${removedCount} references to '${this._id}'`);

        next();
    });
});

/**
 * Relationships
 * =============
 */
Resource.relationship({
    ref: 'Project',
    refPath: 'files',
    path: 'resources',
});

/**
 * Model Registration
 */
Resource.defaultSort = '-createdAt';
Resource.defaultColumns = 'name, type, createdAt';
Resource.register();
