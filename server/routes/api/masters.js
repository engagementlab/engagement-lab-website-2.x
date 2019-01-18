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
    mongoose = global.keystone.get('mongoose'),
    Bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

var buildData = (res) => {

    let masters = keystone.list('Masters').model;
    let fields = 'programDescription.html applicationLink buttonTxt -_id';
    
    // Get masters program text
    let mastersData = masters.find({}, fields);
    
    // Execute queries
    Bluebird.props({
            masters: mastersData,
        })
        .then(results => {
            return res.status(200).json({
                status: 200,
                data: results.masters
            });
        }).catch(err => {
            console.log(err);
        });

}

/*
 * Get data
 */
exports.get = function (req, res) {

    return buildData(res);

}