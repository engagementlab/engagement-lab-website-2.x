'use strict';
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve project data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone,
    mongoose = global.keystone.get('mongoose'),
    Bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

var buildData = (options, res) => {

    let events = keystone.list('Event').model;
    let eventsData;
    let queries = {}; 
    let fields = 'name date key shortDescription eventUrl';
    
    if(options.id) {
        // Get one event
        fields += ' description images.public_id';
        eventsData = events.findOne({key: options.id}, fields);
    }
    else {
        // Get enabled events
        fields += ' -_id';
        eventsData = events.find({ enabled: true}, fields).sort([
            ['date', 'descending']
        ]);
    }
    queries.events = eventsData;
    
    // Execute queries
    Bluebird.props(queries)
        .then(results => {
            
            if(options.id) {
                
                // When retrieving one event, also get next/prev ones
                let fields = 'name key -_id';
                let nextEvent = events.findOne({date: {
                    $gt: results.events.date
                }}, fields).limit(1);
                let prevEvent = events.findOne({date: {
                    $lt: results.events.date
                }}, fields).limit(1);

                Bluebird.props({next: nextEvent, prev: prevEvent}).then(nextPrevResults => {
                    let output = Object.assign(nextPrevResults, {event: results.events});
                    return res.status(200).json({
                        status: 200,
                        data: output
                    });
                }).catch(err => {
                    console.log(err);
                });

            }
            else {
                return res.status(200).json({
                    status: 200,
                    data: results.events
                });
            }

        }).catch(err => {
            console.log(err);
        });

}

/*
 * Get data
 */
exports.get = function (req, res) {

    let options = {};
    if (req.params.key)
        options.id = req.params.key;

    return buildData(options, res);

}