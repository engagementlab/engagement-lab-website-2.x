/**
 * Engagement Lab Website v2.x
 *
 * CPI CPIPartner Model
 * @module models
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;
const Listing = require('./Listing');
const urlValidator = require('../utils').url;

/**
 * @module models
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const CPIPartner = new keystone.List('CPIPartner',
    {
        label: 'Community PlanIt Partners',
        sortable: true,
        hidden: true,
        inherits: Listing,
    });

/**
 * Model Fields
 * @main Project
 */
CPIPartner.add({
    url: {
        type: Types.Url,
        label: 'Project Website URL',
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org"',
    },
});

/**
 * Model Registration
 */
CPIPartner.defaultSort = 'sortOrder';
CPIPartner.defaultColumns = 'name';
CPIPartner.register();
