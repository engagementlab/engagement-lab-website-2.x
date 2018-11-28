/**
 * Engagement Lab Website
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

const keystone = global.keystone;
const Types = keystone.Field.Types;

/**
 * Job model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Job = new keystone.List('Job', 
	{
		label: 'Jobs',
		singular: 'Job',
		autokey: { from: 'title', path: 'key', unique: true }
	});

/**
 * Model Fields
 * @main Job
 */
Job.add({
	title: { type: String, label: "Title", required: true, initial: true, note: 'Will appear before the job description'},
	description: { type: Types.Markdown, label: "Description", required: true, initial: true, note: 'This is the full description, including any and all relevant information about the job or its requirements'}
});

/**
 * Model Registration
 */
Job.defaultSort = '-createdAt';
Job.defaultColumns = 'title, updatedAt';
Job.register();
