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
    let fields = 'key name customUrl description';
    let data;

    if (options.id) {
        let addtlFields = 'byline challengeTxt strategyTxt resultsTxt externalLinkUrl githubUrl';
        data = list.findOne({
            key: options.id
        }, fields + ' ' + addtlFields).populate('format');
    }
    else if (options.limit)
        data = list.find({}, ).sort([
            ['sortOrder', 'ascending']
        ]);

    else if(options.featured)
        data = list.find({
            'enabled': true,
            'featured': true});

    else
        data = list.find({'enabled': true}, fields);

    data.exec();
    Bluebird.props({
            jsonData: data
        })
        .then(results => {
            return res.status(200).json({
                status: 200,
                data: results.jsonData
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