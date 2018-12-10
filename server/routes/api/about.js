'use strict';
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve about page data
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

    let aboutFields = 'missionStatement summary1 summary2 images.public_id research workshops tools teaching design -_id';
    let partnerFields = 'image.public_id url -_id';
    let personFields = 'name title key image.public_id url -_id';

    let about = keystone.list('About').model;
    let partner = keystone.list('Partner').model;
    let person = keystone.list('Person').model;

    // Get about
    let aboutData = about.find({}, aboutFields);
    // Get a couple featured projects
    let partnersData = partner.find({}, partnerFields);
    // Get faculty and staff
    let peopleData = person.find({category: {$in: ['faculty leadership', 'staff']}}, personFields)
                           .sort([['sortOrder', 'ascending']]);

    // Execute queries
    aboutData.exec();
    partnersData.exec();
    peopleData.exec();
    
    Bluebird.props({
            about: aboutData,
            partners: partnersData,
            people: peopleData
        })
        .then(results => {
            return res.status(200).json({
                status: 200,
                data: {
                    about: results.about,
                    partners: results.partners,
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

    return buildData(res);

}