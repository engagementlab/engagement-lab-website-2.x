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
    
    let projectFields = 'name image key projectType byline -_id';
    
    let initiativeData = initiative.find({}).sort([
        ['sortOrder', 'descending']
    ]).populate({
            path: 'projects',
            select: 'name key -_id',
            options: { limit: 2, sort: 'name' }
        });
    let projectData = project.find({ featured: true }, projectFields).limit(2);

    initiativeData.exec();
    projectData.exec();

    Bluebird.props({
            initiatives: initiativeData,
            projects: projectData
        })
        .then(results => {
            return res.status(200).json({
                status: 200,
                data: {
                    initiatives: results.initiatives,
                    projects: results.projects
                }
            });
        }).catch(err => {
            console.log(err);
        })

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