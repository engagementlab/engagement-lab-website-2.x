
/**
 * Engagement Lab Website v2.x
 *
 * Initiative Model
 * @module models
 * @class initiative
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

/**
 * @module initiative
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
// const Initiative = new keystone.List('Initiative',
//   {
//     hidden: false,
//     autokey: { path: 'key', from: 'name', unique: true },
//     sortable: true,
//     nodelete: true,
//   });

const { Text, Relationship, CloudinaryImage } = require('@keystonejs/fields');

const Initiative = (keystone, cloudinary) => {
  /**
   * Model Fields
   * @memberof Initiative
   */
  const fields = {
  name: {
    type: String, label: 'Initiative Name', isRequired: true, initial: true, index: true, note: 'This is the name or title of the directory',
  },
  description: {
    type: String, isRequired: true, initial: true, note: 'This displays next to/near the initiative name',
  },
  longDescription: {
    type: Text, isRequired: true, initial: true, isMultiline: true, note: 'This displays on the initiative landing',
  },
  image: {
    type: CloudinaryImage,
    label: 'Initiative Image',
    folder: 'homepage-2.0/initiatives',
    adapter: cloudinary
  },
  /* projects: {
    type: Relationship,
    ref: 'Project',
    label: 'Project(s)',
    note: 'Projects that are part of this initiative',
    isRequired: true,
    many: true,
    initial: true,
  }, */
}


  /**
   * Model Options
   * @memberof Initiative
   * See: https://www.keystonejs.com/api/create-list
   */
  const options = {
    access: {
      create: false,
      delete: false,
    },
  };
  keystone.createList('Initiative', { fields, ...options });
};

module.exports = Initiative;