/**
 * Engagement Lab Website v2.x
 *
 * MDProject Model
 * @module project
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone } = global;
const { Types } = keystone.Field;
const azureAdapter = require('keystone-storage-adapter-azure');
const Project = require('./Project');

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
 * @module project
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const MDProject = new keystone.List('MDProject', {
  inherits: Project,
  hidden: false,
});

/**
 * Model Fields
 * @main MDProject
 */
MDProject.add({

  thesis: {
    type: Types.File,
    label: 'Thesis Document',
    storage: azureFile,
  },
  partners: {
    type: Types.Relationship,
    ref: 'Partner',
    many: true,
  },

});

/**
 * Hooks
 * =============
 */
MDProject.schema.pre('save', (next) => {
  // Save state for post hook
  this.wasNew = this.isNew;
  // // this.wasModified = this.isModified();

  // Override key w/ custom URL if defined
  if (this.customUrl && this.customUrl.length > 0) { this.key = this.customUrl; }

  next();
});
/**
 * Model Registration
 */
MDProject.defaultSort = 'sortOrder';
MDProject.defaultColumns = 'name, enabled, featured';
MDProject.register();
