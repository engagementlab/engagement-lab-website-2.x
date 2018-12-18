'use strict';
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve team page data
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

    let personFields = 'name title category key image.public_id url -_id';
    let person = keystone.list('Person').model;
    let peopleData;

    if (options.id) {
        // Get person whose id specified
        let addtlFields = 'bio email twitterURL fbURL linkedInURL githubURL websiteURL igURL';
        peopleData = person.findOne({
            key: options.id
        }, personFields + ' ' + addtlFields);
    }
    else {
        // Get all people
        peopleData = person.find({}, personFields)
                            .sort([['sortOrder', 'ascending']]);
    }

    // Execute query
    peopleData.exec();
    
    Bluebird.props({
            people: peopleData
        })
        .then(results => {
            return res.status(200).json({
                status: 200,
                data: {
                    people: results.people
                }
            });
        }).catch(err => {
            console.error(err);
        });

}

/*
 * Get data
 */
exports.get = function (req, res) {

    let options = {};
    if (req.params.person_key)
        options.id = req.params.person_key;

    return buildData(options, res)

}