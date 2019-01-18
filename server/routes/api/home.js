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

    let initiative = keystone.list('Initiative').model;
    let project = keystone.list('Project').model;
    let event = keystone.list('Event').model;
    
    let projectFields = 'name image key projectType byline -_id';
    let eventFields = 'name date key eventUrl -_id';
    let initiativeFields = 'name description key projects -_id';
    
    // Spit on dev server
    if(process.env.NODE_ENV === 'development')
        mongoose.set('debug', true);

    // Get initiatives
    let initiativeData = initiative.find({}, initiativeFields).sort([
        ['sortOrder', 'ascending']
    ])
    .populate({
            path: 'projects',
            select: 'name key -_id',
            options: { limit: 3, sort: 'name' }
        });
    // Get a couple featured projects
    let projectData = project.find({ featured: true }, projectFields).limit(2);
    // Get 3 events most recent by date
    let eventData = event.find({ enabled: true }, eventFields).sort([
        ['date', 'descending']
    ]).limit(3);
    
    // Execute queries
    Bluebird.props({
            initiatives: initiativeData,
            projects: projectData,
            events: eventData
        })
        .then(results => {
            return res.status(200).json({
                status: 200,
                data: {
                    initiatives: results.initiatives,
                    projects: results.projects,
                    events: results.events
                }
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