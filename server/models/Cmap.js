'use strict';
/**
 * Engagement Lab Website v2.x
 * 
 * CMAP page Model
 * @module cmap
 * @class cmap
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;

/**
 * @module cmap
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
// NOTE: Model is called Cmap as vestige of masters being previously called 'Civic Media, Art & Practice'
var Cmap = new keystone.List('Cmap', 
	{
		label: 'Masters Program',
		singular: 'Masters Program',
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main cmap
 */
Cmap.add({
		name: { type: String, default: "Masters Program Page", hidden: true, required: true },
		videoLink: { type: String, label: 'Video Embed Link', note: 'Should be in format "//player.vimeo.com/video/..." skipping the "http:"'}, 
		
		programDescription: { type: Types.Markdown, label: "Blurb", note: 'This text follows logo.'}
		
		/* curriculum: { type: String, label: "Curriculum", note: 'This is the text in the \'Curriculum\' section' },
		structure: { type: Types.Markdown, label: "The Structure", note: 'This is the text in the \'The Structure\' section'  },
		courses: { type: Types.Markdown, label: "Core Courses", note: 'This is the text in the \'Core Courses\' section' },
		alumni: { type: Types.Markdown, label: "Alumni", note: "This is the text in the \'Alumni\' section" } */
	});

/**
 * Hooks
 * =============
 */
Cmap.schema.pre('save', function(next) {
	// TODO: Implement as global md sanitizer
	this.programDescription.html = this.programDescription.html.replace(/<p[^>]+?>|<p>|<\/p>/g, '');

	next();
});

/**
 * Model Registration
 */
Cmap.register();
