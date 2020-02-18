
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve about page data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const { keystone } = global;
const mongoose = global.keystone.get('mongoose');
const Bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

const buildData = (res) => {
  const aboutFields = 'missionStatement summary1 summary2 images.public_id research workshops tools teaching design -_id';
  const partnerFields = 'name image.public_id url -_id';
  const personFields = 'name title key image.public_id url -_id';

  const about = keystone.list('About').model;
  const partner = keystone.list('Partner').model;
  const person = keystone.list('Person').model;

  // Get about
  const aboutData = about.find({}, aboutFields);
  // Get a couple featured projects
  const partnersData = partner.find({}, partnerFields);
  // Get faculty and staff
  const peopleData = person.find({ category: { $in: ['faculty leadership', 'staff'] } }, personFields)
    .sort([['sortOrder', 'ascending']]);

  Bluebird.props({
    about: aboutData,
    partners: partnersData,
    people: peopleData,
  })
    .then((results) => res.status(200).json({
      status: 200,
      data: {
        about: results.about,
        partners: results.partners,
        people: results.people,
      },
    })).catch((err) => {
      console.error(err);
    });
};

/*
 * Get data
 */
exports.get = (req, res) => buildData(res);
