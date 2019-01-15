'use strict';
/**
 * Engagement Lab Website v2.x
 * 
 * Parner Model
 * @module team
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;
var Listing = require('./Listing');
const urlValidator = require('../utils').url;

/**
 * @module team
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Partner = new keystone.List('Partner', 
	{
		sortable: true,
		hidden: false,
		inherits: Listing
	});

/**
 * Model Fields
 * @main Project
 */
Partner.add({
	url: {
	    type: Types.Url,
	    label: 'Project Website URL',
	    validate: urlValidator,
	    note: 'Must be in format "http://www.something.org"'
	}
});

/**
 * Model Registration
 */
Partner.defaultSort = 'sortOrder';
Partner.defaultColumns = 'name';
Partner.register();
