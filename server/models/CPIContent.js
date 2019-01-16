'use strict';
/**
 * Engagement Lab Website v2.x
 * 
 * CommunityPlanIt Registrations
 * @module models
 * @class models
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;

/**
 * @module listing
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var CPIContent = new keystone.List('CPIContent', 
	{	
		label: 'Community PlanIt Content',
		autokey: { path: 'key', from: 'email', unique: true },
		hidden: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main Listing
 */
CPIContent.add({
	intro: { type: Types.Markdown, label: 'Intro Text', required: true, initial: true },
	blurb: { type: Types.Markdown, label: 'Blurb Text', required: true, initial: true },
	videoURL: { type: String, label: 'Video URL', required: true, initial: true }
});

/**
 * Model Registration
 * =============
 */
CPIContent.defaultSort = 'sortOrder';
CPIContent.register();
