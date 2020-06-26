/**
 * Engagement Lab Website v2.x
 *
 * Job page Model
 * @module Job
 * @class Job
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone } = global;
const { Types } = keystone.Field;
const urlValidator = require('../utils').url;

/**
 * Job model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Job = new keystone.List('Job', {
  label: 'Jobs',
  singular: 'Job',
  map: {
    name: 'title',
  },
});

/**
 * Model Fields
 * @main Job
 */
Job.add({
  enabled: {
    type: Types.Boolean,
    label: 'Enabled',
    note: 'Will never appear on site if not enabled',
  },
  title: {
    type: String,
    label: 'Title',
    required: true,
    initial: true,
    index: true,
    note: 'Will appear before the job description',
  },
  description: {
    type: Types.Markdown,
    label: 'Description',
    required: true,
    initial: true,
    note: 'This is the full description, including any and all relevant information about the job or its requirements',
  },
  url: {
    type: Types.Url,
    label: 'Application URL',
    validate: urlValidator,
    note: 'Link to Emerson job posting. Must be in format "http://www.something.org".',
    required: true,
    initial: true,
  },
});

/**
 * Model Registration
 */
Job.defaultSort = '-createdAt';
Job.defaultColumns = 'name, enabled, updatedAt';
Job.register();
