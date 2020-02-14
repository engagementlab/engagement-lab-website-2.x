
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
  const jobs = keystone.list('Job').model;
  const fields = 'title description url -_id';

  // Get enabled jobs
  const jobsData = jobs.find({ enabled: true }, fields).sort([
    ['createdAt', 'descending'],
  ]);

  // Execute queries
  Bluebird.props({
    jobs: jobsData,
  })
    .then((results) => res.status(200).json({
      status: 200,
      data: results.jobs,
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
