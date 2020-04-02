
/**
 * Engagement Lab Website v2.x
 *
 * About page Model
 * @module about
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { Text, CloudinaryImage } = require('@keystonejs/fields');


const About = (keystone, cloudinary) => {
  /**
 * Model Fields
 * @main About
 */
  const fields = {
    name: {
      type: String, default: 'About Page', hidden: true, isRequired: true, initial: true,
    },
    tagline: { type: String, isRequired: true, initial: true },
    missionStatement: {
      type: String, label: 'Mission Statement', isRequired: true, initial: true,
    },

    summary1: {
      type: Text, label: 'Summary Paragraph 1', isRequired: true, note: 'First (required) paragraph',
    },
    summary2: {
      type: Text, label: 'Summart Paragraph 2', isRequired: true, note: 'Second (required) paragraph',
    },

    images: {
      type: CloudinaryImage,
      label: 'Summary Images (Requires EXACTLY 2)',
      adapter: cloudinary,
    },

    research: { type: Text, label: 'Research Text', isRequired: true },
    workshops: { type: Text, label: 'Workshops Text', isRequired: true },
    tools: { type: Text, label: 'Tools Text', isRequired: true },
    teaching: { type: Text, label: 'Teaching Text', isRequired: true },
    design: { type: Text, label: 'Design Text', isRequired: true },

  };

  /**
 * Model Options
 * See: https://www.keystonejs.com/api/create-list
 */
  const options = {
    fields,
    plural: 'About Page',
    singular: 'About Page',
    path: 'about',
    // adminConfig: {
    //   defaultColumns: 'label',
    // },
    access: {
      create: false,
      delete: false,
    },
  };
  keystone.createList('About', options);
};

/**
 * Model Registration
 */
module.exports = About;
