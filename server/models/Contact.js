'use strict';
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

var keystone = global.keystone;
var Types = keystone.Field.Types;

/**
 * about model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Contact = new keystone.List('Contact', 
	{
		label: 'Contact/Get Involved Page',
		singular: 'Contact/Get Involved Page',
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main Contact
 */
Contact.add({
	name: { type: String, default: "Contact/Get Involved Page", hidden: true, required: true, initial: true },
	blurb: { type: String, label: 'Page Blurb', required: true, initial: true },
	
	students: { type: Types.Textarea, label: "Students and Researchers Text", required: true, initial: true },
	community: { type: Types.Textarea, label: "Community Partnerships Text", required: true, initial: true },
});

/**
 * Model Registration
 */
Contact.defaultSort = '-createdAt';
Contact.defaultColumns = 'name';
Contact.register();
