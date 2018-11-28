/**
 * Engagement Lab Website
 * 
 * Program Model
 * @module program
 * @class program
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;
const Listing = require('./Listing');
// See: https://github.com/leepowellcouk/mongoose-validator and https://github.com/chriso/validator.js
const validator = require('validator');

/**
 * @module program
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Program = new keystone.List('Program', 
	{	
		hidden: false,
        sortable: true,
		inherits: Listing
	});

/**
 * Field Validators
 * @main Project
 */
var urlValidator = {
    validator: function(val) {
        return validator.isURL(val, {
            protocols: ['http', 'https'],
            require_tld: true,
            require_protocol: true,
            allow_underscores: true
        });
    },
    msg: 'Invalid external link URL'
};

/**
 * Model Fields
 * @main Program
 */
Program.add({
    href: {
        type: Types.Url,
        label: 'External Link URL',
        validate: urlValidator,
        required: true,
        initial: true
	}
});

/**
 * Hooks
 * =============
 */
Program.schema.pre('save', function(next) {

    // Save state for post hook
    this.wasNew = this.isNew;
    this.wasModified = this.isModified();
    
    next();

});

Program.schema.post('save', function(next) {

    // Make a post to slack when this Program is updated
    // keystone.get('slack').Post(Program.schema, this, true);

});

/**
 * Model Registration
 */
Program.defaultSort = 'sortOrder';
Program.register();
