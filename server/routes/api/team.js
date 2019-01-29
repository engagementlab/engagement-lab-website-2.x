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

    let personFields = 'name title category key image.public_id url';
    let person = keystone.list('Person').model;
    let peopleData;
    let queryProps = {};

    var makeQuery = () => {

        // Execute query    
        Bluebird.props(queryProps)
            .then(results => {
                return res.status(200).json({
                    status: 200,
                    data: results
                });
            }).catch(err => {
                console.error(err);
            });

    }

    if (options.id) {

        // Get person whose id specified
        let addtlFields = 'bio email twitterURL fbURL linkedInURL githubURL websiteURL igURL cohortYear -_id';
        peopleData = person.findOne({
            key: options.id
        }, personFields + ' ' + addtlFields)
        .populate({
                path: 'cohortYear',
                select: 'name -_id'
        });
        
        queryProps = {
            person: peopleData
        };
        makeQuery();

    } else {
        let filter = keystone.list('Filter').model;

        // Get all people
        // We have to get the current cohort year manually since mongoose can't join,
        // and returning all CMAP people is inefficient
        filter.findOne({
            current: true,
            category: 'Cohort'
        }, '_id').exec((error, currentYr) => {

            // Get faculty, staff, board
            let peopleData = person.find({
                    category: {
                        $in: ['faculty leadership', 'staff', 'advisory board', 'faculty fellows']
                    }
                }, personFields + ' -_id')
                .sort([
                    ['sortOrder', 'ascending']
                ]);

            // Get current cohort
            let studentData = person.find({
                    cohortYear: currentYr,
                    category: 'CMAP'
                }, personFields + ' cohortYear -_id')
                .sort([
                    ['sortOrder', 'ascending']
                ]);
                
            queryProps = {
                staff: peopleData,
                students: studentData
            };
            makeQuery();
        });
    }

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