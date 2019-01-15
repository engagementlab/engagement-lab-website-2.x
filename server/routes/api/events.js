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
    let fields = 'name date key eventUrl -_id';
    
    // Get enabled events
    let eventsData = events.find({enabled: true}, fields).sort([
        ['date', 'descending']
    ]);
    // Execute queries
    eventsData.exec();

    Bluebird.props({
            events: eventsData,
        })
        .then(results => {
            return res.status(200).json({
                status: 200,
                data: results.events
            });
        }).catch(err => {
            console.log(err);
        });

}

/*
 * Get data
 */
exports.get = function (req, res) {

    let options = {};
    if (req.params.project_key)
        options.id = req.params.project_key;

    return buildData(options, res);

}