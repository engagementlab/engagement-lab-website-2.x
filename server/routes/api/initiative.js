'use strict';
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve initiative data
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
    let fields = 'name key description longDescription projects -_id';
    
    // Get initiative text
    let initiativeData = initiative.findOne({key: options.key}, fields).populate({
        path: 'projects',
        select: 'name key -_id',
        options: { sort: 'name' }
    });;
    // Execute queries
    initiativeData.exec();

    Bluebird.props({
            initiative: initiativeData,
        })
        .then(results => {
            if(results.initiative === null) {
                return res.status(204).json({
                    status: 204
                });
            }
                
            return res.status(200).json({
                status: 200,
                data: results.initiative
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
    options.key = req.params.key;

    return buildData(options, res);

}