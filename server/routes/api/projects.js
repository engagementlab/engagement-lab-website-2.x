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
const keystone =  global.keystone,
    mongoose = global.keystone.get('mongoose'),
    Bluebird = require('bluebird'),
    list = keystone.list('Project').model;

mongoose.Promise = require('bluebird');

var getAdjacent = (results, res) => {

    let fields = 'name key -_id';
    // Get one next/prev project from selected project's sortorder
    let nextProject = list.findOne({sortOrder: {
        $gt: results.projects.sortOrder
    }}, fields).limit(1);
    let prevProject = list.findOne({sortOrder: {
        $lt: results.projects.sortOrder
    }}, fields).sort({sortOrder: -1}).limit(1);

    
    // Poplulate next/prev and output response
    Bluebird.props({next: nextProject, prev: prevProject}).then(nextPrevResults => {
        console.log('prevproject', nextPrevResults.prev)
        let output = Object.assign(nextPrevResults, {project: results.projects});
        return res.status(200).json({
            status: 200,
            data: output
        });
    }).catch(err => {
        console.log(err);
    });

}

var buildData = (options, res) => {

    let fields = 'key image.public_id byline name featured projectType customUrl sortOrder';
    let data;
    let countData;

    if (options.id) {
        let addtlFields = '_id description challengeTxt strategyTxt resultsTxt externalLinkUrl githubUrl projectImages';
        countData = list.count({});
        data = list.findOne({
                    key: options.id
                }, fields + ' ' + addtlFields)
                .populate('principalInvestigator')
                .populate({
                     path: 'format',
                     select: 'name -_id'
                 });;
    }
    else if (options.limit)
        data = list.find({}).sort([
            ['sortOrder', 'ascending']
        ]);

    else if(options.featured)
        data = list.find({
            'enabled': true,
            'featured': true})
            .sort([['sortOrder', 'descending']]);

    else
        data = list.find({'enabled': true}, fields + ' -_id')
                   .sort([['sortOrder', 'ascending']]);

    // Execute
    Bluebird.props({
            projects: data
        })
        .then(results => {
            
            // When retrieving one project, also get next/prev ones
            if(options.id)
                getAdjacent(results, res);
            else {
         
                let resultObj = {
                    status: 200,
                    data: results.projects
                };

                return res.status(200).json(resultObj);
         
            }
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