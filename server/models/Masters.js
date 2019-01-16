'use strict';
/**
 * Engagement Lab Website v2.x
 * 
 * CMAP page Model
 * @module masters
 * @class masters
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;
const urlValidator = require('../utils').url;

/**
 * @module masters
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Masters = new keystone.List('Masters', {
	label: 'Masters Program',
	singular: 'Masters Program',
	nodelete: true,
	nocreate: true
});

/**
 * Model Fields
 * @main masters
 */
Masters.add({
	name: {
		type: String,
		default: "Masters Program Page",
		hidden: true,
		required: true
	},
	/* videoLink: {
		type: String,
		label: 'Video Embed Link',
		note: 'Should be in format "//player.vimeo.com/video/..." skipping the "http:"'
	}, */

	programDescription: {
		type: Types.Markdown,
		label: "Blurb",
		note: 'This text follows logo.',
		required: true,
		initial: true
	},
	applicationLink: {
		type: Types.Url,
		validate: urlValidator,
		note: 'Must be in format "http://www.something.org"'
	},
	buttonTxt: {
		type: String,
		label: 'Application link/button text',
		required: true,
		initial: true
	}
});

/**
 * Hooks
 * =============
 */
Masters.schema.pre('save', function (next) {
	// TODO: Implement as global md sanitizer
	this.programDescription.html = this.programDescription.html.replace(/<p[^>]+?>|<p>|<\/p>/g, '');

	next();
});

/**
 * Model Registration
 */
Masters.register();