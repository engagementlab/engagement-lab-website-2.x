'use strict';
/**
 * Engagement Lab Website v2.x
 * 
 * Initiative Model
 * @module models
 * @class initiative
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;

/**
 * @module initiative
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Initiative = new keystone.List('Initiative', 
	{	
		hidden: false,
		autokey: { path: 'key', from: 'name', unique: true },
		sortable: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main Listing
 */
Initiative.add({
	name: { type: String, label: 'Initiative Name', required: true, initial: true, index: true, note: 'This is the name or title of the directory'},
    description: { type: String, label: 'Description', required: true, initial: true, note: 'This displays next to/near the initiative name' },
    image: {
        type: Types.CloudinaryImage,
        label: 'Initiative Image',
        folder: 'homepage-2.0/initiatives',
    },
    projects: {
        type: Types.Relationship,
        ref: 'Project',
        label: 'Project(s)',
        note: 'Projects that are part of this initiative',
        required: true,
        many: true,
        initial: true
    },
});

/**
 * Model Registration
 * =============
 */
Initiative.register();
