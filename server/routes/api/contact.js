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

    let contact = keystone.list('Contact').model;
    let fields = 'name blurb students community -_id';
    
    // Get contact text
    let contactData = contact.find({}, fields);
    // Execute queries
    contactData.exec();

    Bluebird.props({
            contact: contactData,
        })
        .then(results => {
            return res.status(200).json({
                status: 200,
                data: results.contact
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