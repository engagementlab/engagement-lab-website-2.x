'use strict';
/**
 * Engagement Lab Website v2.x
 * 
 * Page category Model
 * @module listing
 * @class listing
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */
const keystone = global.keystone,   
      Types = keystone.Field.Types;

/**
 * @module listing
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Listing = new keystone.List('Listing', {
    hidden: true,
    sortable: true,
    autokey: {
        path: 'key',
        from: 'name',
        unique: true
    }
});

/**
 * Local Methods
 * =============
 */
let safeString = function(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(',', '');
};

/**
 * Model Fields
 * @main Listing
 */
Listing.add({
    name: {
        type: String,
        label: 'Name',
        required: true,
        initial: true,
        index: true
    },
    byline: {
        type: String,
        required: true,
        initial: true,
        note: 'This displays under the project/event name on its page.'
    },
    description: {
        type: String,
        required: true,
        initial: true,
    },
    image: {
        type: Types.CloudinaryImage,
        label: 'Thumbnail Image',
        folder: 'homepage-2.0/listings',
        autoCleanup: true, 
        note: 'This displays as the image/thumbnail when needed.'
    },
    indexed: {
        type: Boolean,
        hidden: true
    }
});

/**
 * Methods
 * =============
 */
Listing.schema.methods.safeName = function() {
    return safeString(this.name);
};

/**
 * Hooks
 * =============
 */
Listing.schema.pre('save', function(next) {

    // Save state for post hook
    this.wasNew = this.isNew;
    this.wasModified = this.isModified();

    next();

});

/* 
Listing.schema.post('save', function(doc, next) {
    
    var hook = elasticHooks.init('brand');
    // Make a post to slack when this Listing is updated
    keystone.get('slack').Post(Listing.schema, this, true);

    next();
}); */

// Listing.schema.plugin(mongoosastic);

/**
 * Model Registration
 */
Listing.defaultSort = 'sortOrder';
Listing.defaultColumns = 'name';
Listing.register();

exports = module.exports = Listing;