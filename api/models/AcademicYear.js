/**
 * Engagement Lab Website v2.x
 *
 * AcademicYear page Model
 * @module AcademicYear
 * @class AcademicYear
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;

/**
 * AcademicYear model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const AcademicYear = new keystone.List('AcademicYear', {
    map: {
        name: 'label',
    },
});

/**
 * Model Fields
 * @main AcademicYear
 */
AcademicYear.add({

    label: {
        type: String, default: '20xx - 20xx', required: true, initial: true,
    },

});

/**
 * Model Registration
 */

AcademicYear.register();
