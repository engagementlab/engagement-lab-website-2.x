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
const urlValidator = require('../utils').url;

// Storage adapter for Azure
const azureFile = new keystone.Storage({
  adapter: azureAdapter,
  azure: {
    container: 'theses',
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
  label: 'Masters Projects',
  singular: 'Masters Project',
  sortable: true,
  autokey: {
    path: 'key',
    from: 'name',
    unique: true,
  },
});

/**
 * Model Fields
 * @main MDProject
 */
MDProject.add({
  name: {
    type: String,
    required: true,
    initial: true,
    index: true,
  },
  byline: {
    type: String,
    required: true,
    initial: true,
    note: 'This displays under the project on its page.',
  },
  description: {
    type: String,
    required: true,
    initial: true,
  },
  thumb: {
    type: Types.CloudinaryImage,
    label: 'Thumbnail Image',
    folder: 'homepage-2.0/listings',
    autoCleanup: true,
    note: 'This displays as the image/thumbnail when needed.',
  },

  indexed: {
    type: Boolean,
    hidden: true,
  },
  enabled: {
    type: Types.Boolean,
    label: 'Enabled',
    note: 'Determines if this project appears.',
  },
  featured: {
    type: Types.Boolean,
    label: 'Featured',
    note: 'Determines if this project appears on the home page.',
  },
  customUrl: {
    type: String,
    label: 'Custom URL',
    note: 'Must be format of "project-url". Overrides default "/masters/projects/project-name".',
  },

  teamMembers: {
    type: Types.Relationship,
    ref: 'Person',
    filters: {
      category: ['Masters', 'CMAP'],
    },
    label: 'Team Member(s)',
    many: true,
  },
},

'Project Information', {

  problem: {
    type: Types.Textarea,
    label: 'Problem Space',
  },
  intervention: {
    type: Types.Textarea,
    label: 'Proposed Intervention',
  },
  impact: {
    type: Types.Textarea,
    label: 'Social Impact',
  },

  externalLinkUrl: {
    type: Types.Url,
    label: 'Project Website URL',
    validate: urlValidator,
    note: 'Must be in format "http://www.something.org" <br> Appears on the individual project page.',
  },

},

'Project Media', {

  // Images for project page
  projectImages: {
    type: Types.CloudinaryImages,
    folder: 'homepage-2.0/masters/project',
    autoCleanup: true,
    note: 'Please use only high-quality images.',
  },

  // Resource model reference for files
  files: {
    type: Types.Relationship,
    ref: 'Resource',
    label: 'Project Files',
    filters: {
      type: 'file',
    },
    many: true,
    note: 'Will appear in \'Resources\' area on individual project page.',
  },

  publications: {
    type: Types.Relationship,
    ref: 'Publication',
    label: 'Related Publications',
    filters: {
      type: 'file',
    },
    many: true,
    note: 'Will appear in \'Related Publications\' area on individual project page.',
  },

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
