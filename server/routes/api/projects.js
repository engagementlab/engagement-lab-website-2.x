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
    Bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

var buildData = (options, res) => {

    let list = keystone.list('Project').model;
    let fields = 'key image byline name featured projectType customUrl sortOrder -_id';
    let data;
    let countData;

    if (options.id) {
        let addtlFields = 'description challengeTxt strategyTxt resultsTxt externalLinkUrl githubUrl projectImages';
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
        data = list.find({}, ).sort([
            ['sortOrder', 'ascending']
        ]);

    else if(options.featured)
        data = list.find({
            'enabled': true,
            'featured': true})
            .sort([['sortOrder', 'descending']]);

    else
        data = list.find({'enabled': true}, fields)
                   .sort([['sortOrder', 'ascending']]);

    // Get count of all docs if needed
    // if(countData)
    //     countData.exec();
    data.exec();

    Bluebird.props({
            jsonData: data
        })
        .then(results => {
            
            let finalData = results.jsonData;

            // Assemble project theme index if one project pulled
            // if(countData) {

            //     let index = results.jsonData 
            //     finalData = {
            //         project: results.jsonData,
            //         themeIndex: results.countAmt
            //     }
            // }
            let resultObj = {
                status: 200,
                data: finalData
            };

            return res.status(200).json(resultObj);
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