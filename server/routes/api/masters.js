'use strict';
/**
 * Developed by Engagement Lab, 2018-2019
 * ==============
 * Route to retrieve masters program data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone,
    mongoose = require('mongoose'),
    Bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

var buildData = (res) => {

    let masters = keystone.list('Masters').model;
    let person = keystone.list('Person').model;
    let filter = keystone.list('Filter').model;

    let fields = 'programDescription.html applicationLink buttonTxt -_id';
    let personFields = 'name title key image.public_id url -_id';
    
    // Spit on dev server
    if(process.env.NODE_ENV === 'development')
        mongoose.set('debug', true);
    
    // Get masters program text
    let mastersData = masters.findOne({}, fields);

    // We have to get the current cohort year manually since mongoose can't join,
    // and returning all CMAP people is inefficient
    filter.findOne({current: true, category: 'Cohort'}, '_id').exec((error, currentYr) => {

        // Get current cohort
        let peopleData = person.find({cohortYear: currentYr, category: 'CMAP'}, personFields)
                            .sort([['sortOrder', 'ascending']]);
        
        // Execute queries
        Bluebird.props({
                masters: mastersData,
                people: peopleData
            })
            .then(results => {
                return res.status(200).json({
                    status: 200,
                    data: results
                });
            }).catch(err => {
                console.log(err);
            });


        });
    
}

/*
 * Get data
 */
exports.get = function (req, res) {

    return buildData(res);

}