/**
 * Engagement Lab Website v2.x
 *
 * @class Filters
 * @author Erica Salling
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone } = global;
const { Types } = keystone.Field;

/**
 * @module Filters
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Filters = new keystone.List('Filter', {
  name: 'Filters',
  singular: 'Filter',
  hidden: false,
  nodelete: false,
  sortable: true,
  autokey: {
    path: 'key',
    from: 'name',
    unique: false,
  },
});

/**
 * Model Fields
 * @main Project
 */
Filters.add({
  name: {
    type: String,
    label: 'Name',
    required: true,
    initial: true,
    index: true,
  },
  category: {
    type: Types.Select,
    label: 'Category of Filter',
    options: 'Person, Format, Keyword, Cohort',
    required: true,
    initial: true,
  },

  appears: {
    type: Types.Select,
    label: 'Destination',
    note: 'Where will this filter apply?',
    options: 'Project, Publication',
    dependsOn: {
      category: ['Format', 'Keyword'],
    },
  },

  contactEmail: {
    type: Types.Email,
    label: 'Email',
    required: false,
    dependsOn: {
      category: 'Person',
    },
  },
  current: {
    type: Boolean,
    label: 'Is this the current cohort?',
    note: 'Cohort will appear on the people page as \'Current\'',
    required: false,
    dependsOn: {
      category: 'Cohort',
    },
  },

  previous: {
    type: Boolean,
    label: 'Is this the most recent but not current cohort?',
    note: 'Cohort will appear on the people page as \'Most Recent\'',
    required: false,
    dependsOn: {
      category: 'Cohort',
    },
  },
});

Filters.schema.pre('remove', (next) => {
  // Remove resource from all that referenced it
  keystone.list('Project').model.removeFilterRef(this._id, (err, removedCount) => {
    if (err) console.error(err);

    if (removedCount > 0) console.log(`Removed ${removedCount} references to '${this._id}'`);

    // Remove resource from all that referenced it
    keystone.list('Publication').model.removeFilterRef(this._id, (err, removedCount) => {
      if (err) console.error(err);

      if (removedCount > 0) console.log(`Removed ${removedCount} references to '${this._id}'`);

      next();
    });
  });
});

Filters.schema.statics.findFilter = (resourceId, callback) => {
  Filters.model.findById(resourceId, (err, result) => {
    if (err) console.error(err);

    callback(err, result);
  });
};

/**
 * Model Registration
 * =============
 */
Filters.defaultSort = 'category';
Filters.defaultColumns = 'name, category, appears';
Filters.register();
