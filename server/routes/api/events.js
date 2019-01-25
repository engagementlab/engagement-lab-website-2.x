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
    Bluebird = require('bluebird'),
    events = keystone.list('Event').model;

mongoose.Promise = require('bluebird');

var getAdjacent = (results, res) => {

    let fields = 'name key -_id';
    // Get one next/prev event from selected event's date
    let nextEvent = events.findOne({date: {
        $gt: results.events.date
    }}, fields).limit(1);
    let prevEvent = events.findOne({date: {
        $lt: results.events.date
    }}, fields).limit(1);

    // Poplulate next/prev and output response
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

var buildData = (options, res) => {

    let eventsData;
    let queries = {}; 
    let fields = 'name date key shortDescription eventUrl';
    
    if(options.id) {
        // Get one event
        fields += ' description.html images.public_id showButton buttonTxt';
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
            
            // When retrieving one event, also get next/prev ones
            if(options.id)
                getAdjacent(results, res);
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