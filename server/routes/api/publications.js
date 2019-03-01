'use strict';
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve publication data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone =  global.keystone,
    mongoose = global.keystone.get('mongoose'),
    Bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

var buildData = (options, res) => {

    let list = keystone.list('Publication').model;
    let fields = 'key title author date blurb context downloadUrls purchaseUrls -_id';
    let data;

/*     if (options.id) {
        // let addtlFields = 'description challengeTxt strategyTxt resultsTxt externalLinkUrl githubUrl projectImages';
        // data = list.findOne({
        //     key: options.id
        // }, fields + ' ' + addtlFields).populate('format principalInvestigator');
    }
    else */
        data = list.find({'enabled': true}, fields)
                   .sort([['date', 'descending']])
                   .populate({
                        path: 'form',
                        select: 'key -_id'
                    })
                   .populate({
                        path: 'articleResource',
                        select: 'file.url -_id'
                    });

    Bluebird.props({
            jsonData: data
        })
        .then(results => {

            if(results.jsonData === null || results.jsonData.length < 1)
                return res.status(204).send();

            return res.status(200).json({
                status: 200,
                data: results.jsonData
            });

        }).catch(err => {
            console.log(err);
            return res.status(400);
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