
/**
 * Engagement Lab Website v2.x
 *
 * About page Model
 * @module about
 * @class about
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone } = global;
const { Types } = keystone.Field;

/**
 * Model Fields
 * @main About
 */
const aboutSchema = {
  fields: {
    name: {
      type: String,
      isRequired: true,
      defaultValue: 'About Page',
    },
    tagline: {
      type: String,
      isRequired: true,
    },
    missionStatement: {
      type: Types.Textarea,
      isRequired: true,
      label: 'Mission Statement',
    },
    summary1: {
      type: Types.Textarea,
      isRequired: true,
      label: 'Summary Paragraph 1',
      note: 'First (required) paragraph',
    },
    summary2: {
      type: Types.Textarea,
      isRequired: true,
      label: 'Summart Paragraph 2',
      note: 'Second (required) paragraph',
    },
    images: {
      type: Types.CloudinaryImages,
      label: 'Summary Images (Requires EXACTLY 2)',
      folder: 'homepage-2.0/about',
      autoCleanup: true,
    },
    research: {
      type: Types.Textarea,
      label: 'Research Text',
      isRequired: true
    },
    workshops: {
      type: Types.Textarea,
      label: 'Workshops Text',
      isRequired: true
    },
    tools: {
      type: Types.Textarea,
      label: 'Tools Text',
      isRequired: true
    },
    teaching: {
      type: Types.Textarea,
      label: 'Teaching Text',
      isRequired: true
    },
    design: {
      type: Types.Textarea,
      label: 'Design Text',
      isRequired: true
    },
  }
}

/**
 * about model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const About = keystone.createList('About', aboutSchema);

/**
 * Model Registration
 */
About.defaultSort = '-createdAt';
About.defaultColumns = 'name';
About.register();
