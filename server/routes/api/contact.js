
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve project data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const { keystone } = global;
const mongoose = global.keystone.get('mongoose');
const Bluebird = require('bluebird');

mongoose.Promise = require('bluebird');

const buildData = (options, res) => {
  const contact = keystone.list('Contact').model;
  const fields = 'name blurb students community -_id';

  // Get contact text
  const contactData = contact.find({}, fields);
  // Execute queries
  contactData.exec();

  Bluebird.props({
    contact: contactData,
  })
    .then((results) => res.status(200).json({
      status: 200,
      data: results.contact,
    })).catch((err) => {
      console.log(err);
    });
};

/*
 * Get data
 */
exports.get = (req, res) => {
  const options = {};
  if (req.params.project_key) options.id = req.params.project_key;

  return buildData(options, res);
};
