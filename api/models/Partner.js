/**
 * Engagement Lab Website v2.x
 *
 * Parner Model
 * @module team
 * @author Jay Vachon
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone } = global;
const { Types } = keystone.Field;
// const Listing = require('./Listing');
const urlValidator = require('../utils').url;

/**
 * @module team
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Partner = new keystone.List('Partner',
  {
    sortable: true,
    hidden: false,
  });

/**
 * Model Fields
 * @main Project
 */
Partner.add({
  name: {
    type: String,
    label: 'Name',
    required: true,
    initial: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    initial: true,
  },
  image: {
    type: Types.CloudinaryImage,
    label: 'Logo Image',
    folder: 'homepage-2.0/listings',
    autoCleanup: true,
  },
  url: {
    type: Types.Url,
    label: 'Website URL',
    validate: urlValidator,
    note: 'Must be in format "http://www.something.org"',
  },
});

/**
 * Model Registration
 */
Partner.defaultSort = 'sortOrder';
Partner.defaultColumns = 'name';
Partner.register();
