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

var Event = new keystone.List('Event', {
    label: 'Events',
    singular: 'Event',
    autokey: {
        path: 'event_key',
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
        initial: true
    },
    image: {
        type: Types.CloudinaryImage,
        label: 'Event Image',
        folder: 'homepage-2.0/events',
    },
    description: {
        type: Types.Markdown,
        label: 'Long Description',
        note: 'Shown on individual event page. No character limit.',
        required: true,
        initial: true
    },
    eventbriteURL: {
        type: String,
        label: 'Eventbrite URL'
    },
    hackpadURL: {
        type: String,
        label: 'Hackpad URL'
    },
    additionalURL: {
        type: String,
        label: "Summary Blog Post URL"
    },
    featured: {
        type: Types.Boolean,
        label: 'Featured Event',
        note: 'Only one event should be featured'
    },
    enabled: {
        type: Types.Boolean,
        label: 'Enabled',
        note: 'Will never appear on site if not enabled'
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
Event.defaultColumns = 'name, featured, enabled';
Event.register();