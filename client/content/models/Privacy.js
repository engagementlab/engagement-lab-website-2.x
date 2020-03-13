
/**
 * Engagement Lab Website v2.x
 *
 * Privacy page Model
 * @module Privacy
 * @class Privacy
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone } = global;
const { Types } = keystone.Field;

/**
 * Privacy model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Privacy = new keystone.List('Privacy', {
  label: 'Privacy Policy',
  singular: 'Privacy Policy',
  nocreate: true,
  nodelete: true,
});

/**
 * Model Fields
 * @main Privacy
 */
Privacy.add({

  name: {
    type: String, default: 'Privacy Policy', hidden: true, required: true, initial: true,
  },
  content: {
    type: Types.Markdown,
    label: 'Page Content',
    required: true,
    initial: true,
  },
  lastUpdated: {
    type: Date,
    hidden: true,
  },

});

Privacy.schema.pre('save', (doc, next) => {
  doc.lastUpdated = new Date();
  next();
});

/**
 * Model Registration
 */
Privacy.defaultSort = '-createdAt';
Privacy.defaultColumns = 'name';
Privacy.register();
