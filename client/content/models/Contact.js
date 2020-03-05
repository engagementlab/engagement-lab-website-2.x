
/**
 * Engagement Lab Website v2.x
 *
 * Contact page Model
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
 * about model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Contact = new keystone.List('Contact',
  {
    label: 'Get Involved Page',
    singular: 'Get Involved Page',
    nodelete: true,
    nocreate: true,
  });

/**
 * Model Fields
 * @main Contact
 */
Contact.add({
  name: {
    type: String, default: 'Contact/Get Involved Page', hidden: true, required: true, initial: true,
  },
  blurb: {
    type: String, label: 'Page Blurb', required: true, initial: true,
  },

  students: {
    type: Types.Textarea, label: 'Students and Researchers Text', required: true, initial: true,
  },
  community: {
    type: Types.Textarea, label: 'Community Partnerships Text', required: true, initial: true,
  },
});

/**
 * Model Registration
 */
Contact.defaultSort = '-createdAt';
Contact.defaultColumns = 'name';
Contact.register();
