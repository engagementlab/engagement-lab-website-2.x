/**
 * Engagement Lab Website v2.x
 *
 * Page category Model
 * @module listing
 * @class listing
 * @author Jay Vachon, Johnny Richardson, Eron Salling
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */
const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * @module listing
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Listing = new keystone.List('Listing', {
    hidden: true,
    sortable: true,
    autokey: {
        path: 'key',
        from: 'name',
        unique: true,
    },
});

/**
 * Local Methods
 * =============
 */
const safeString = str => str.toLowerCase().replace(/\s+/g, '-').replace(',', '');

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
        index: true,
    },
    byline: {
        type: String,
        note: 'This displays under the project/event name on its page.',
    },
    description: {
        type: String,
    },
    indexed: {
        type: Boolean,
        hidden: true,
    },
});

/**
 * Methods
 * =============
 */
Listing.schema.methods.safeName = () => safeString(this.name);

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
