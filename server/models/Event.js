'use strict';
/**
 * Engagement Lab Website v2.x
 * 
 * Event page Model
 * @module models
 * @class Event
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */
const keystone = global.keystone;
const Types = keystone.Field.Types;
const urlValidator = require('../utils').url;

var Event = new keystone.List('Event', {
    label: 'Events',
    singular: 'Event',
    autokey: {
        path: 'key',
        from: 'name',
        unique: true
    },
    hidden: false
});

/**
 * Model Fields
 * @main About
 */
Event.add({

    enabled: {
        type: Types.Boolean,
        label: 'Enabled',
        note: 'Will never appear on site if not enabled'
    },
    name: {
        type: String,
        default: 'Name of Event',
        required: true,
        initial: true,
        index: true
    },
    date: {
        type: Date,
        label: 'Event Date',
        default: Date.now,
        required: true,
        initial: true,
        note: 'You must specify a valid start time, or the date will not save properly.'
    },
    images: {
        type: Types.CloudinaryImages,
        label: 'Event Images',
        folder: 'homepage-2.0/events',
    },
    shortDescription: {
        type: Types.Text,
        note: 'Shown on event index page. Limit 200 characters.',
        required: true,
        initial: true,
        max: 200
    },
    description: {
        type: Types.Markdown,
        label: 'Long Description',
        note: 'Shown on individual event page. No character limit.',
        required: true,
        initial: true
    },
    eventUrl: {
        type: Types.Url,
        label: 'Event URL',
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org".'
    },
    showButton: {
        type: Boolean,
        label: 'Show URL link as button'
    },
    buttonTxt: {
        type: String,
        label: 'Label text on button',
        dependsOn: {showButton: true}
    },
    additionalURL: {
        type: String,
        label: "Summary Blog Post URL (current not used)"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        noedit: true,
        hidden: true
    }

});

Event.schema.pre('save', function (next) {

    // Save state for post hook
    this.wasNew = this.isNew;
    this.wasModified = this.isModified();

    next();

});

/**
 * Model Registration
 */
Event.defaultSort = '-createdAt';
Event.defaultColumns = 'name, date, enabled';
Event.register();