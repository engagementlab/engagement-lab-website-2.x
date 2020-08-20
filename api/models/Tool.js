/**
 * Engagement Lab Website v2.x
 *
 * Tool Model
 * @module tool
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
 * @module tool
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Tool = new keystone.List('Tool', {
    autokey: {
        from: 'name',
        path: 'key',
        unique: true,
    },
    label: 'Resources & Tools',
    singular: 'Resource / Tool',
});

// Storage adapter for Azure
const azureFile = new keystone.Storage({
    adapter: azureAdapter,
    azure: {
        container: 'tools',
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
 * @main Tool
 */
Tool.add({
    name: {
        type: String,
        required: true,
        initial: true,
        index: true,
    },
    type: {
        type: Types.Select,
        label: 'Type',
        options: 'Game, Roadmap, App, Misc',
        required: true,
        initial: true,
    },
    project: {
        type: String,
        initial: true,
        required: true,
        note: 'Name of project it came from.',
    },
    file: {
        type: Types.File,
        dependsOn: {
            type: 'file',
        },
        label: 'File',
        storage: azureFile,
    },
    url: {
        type: String,
        label: 'URL',
        initial: true,
        note: 'Use if there is no file.',
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
        label: 'Date Created',
    },
    image: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/tools',
        autoCleanup: true,
    },
});

/**
 * Model Registration
 */
Tool.defaultSort = '-createdAt';
Tool.defaultColumns = 'name, type, createdAt';
Tool.register();
