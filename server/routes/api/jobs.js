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

    let jobs = keystone.list('Job').model;
    let fields = 'title description url -_id';
    
    // Get enabled jobs
    let jobsData = jobs.find({enabled: true}, fields).sort([
        ['createdAt', 'descending']
    ]);
    // Execute queries
    jobsData.exec();

    Bluebird.props({
            jobs: jobsData,
        })
        .then(results => {
            return res.status(200).json({
                status: 200,
                data: results.jobs
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