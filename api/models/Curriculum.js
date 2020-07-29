/**
 * Engagement Lab Website v2.x
 *
 * Grad Curriculum Model
 * @module Curriculum
 * @class Curriculum
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;
const urlValidator = require('../utils').url;

/**
 * Curriculum model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Curriculum = new keystone.List('Curriculum', {
    label: 'Curricula',
    singular: 'Curriculum',
    plural: 'Curricula',
});

/**
 * Model Fields
 * @main Curriculum
 */
Curriculum.add({
    enabled: {
        type: Types.Boolean,
        label: 'Enabled',
        note: 'Will never appear on site if not enabled.',
    },
    name: {
        type: String,
        required: true,
        initial: true,
        index: true,
    },
    description: {
        type: Types.Textarea,
        required: true,
        initial: true,
    },
});

/**
 * Model Registration
 */
Curriculum.defaultSort = '-createdAt';
Curriculum.defaultColumns = 'name, enabled, updatedAt';
Curriculum.register();
