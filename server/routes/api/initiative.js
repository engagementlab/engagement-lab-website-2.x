
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve initiative data
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
  const initiative = keystone.list('Initiative').model;
  const fields = 'name key description longDescription projects -_id';

  // Get initiative text
  const initiativeData = initiative.findOne({ key: options.key }, fields).populate({
    path: 'projects',
    select: 'name key -_id',
    options: { sort: 'name' },
  });

  // Execute queries
  Bluebird.props({
    initiative: initiativeData,
  })
    .then((results) => {
      if (results.initiative === null) {
        return res.status(204).json({
          status: 204,
        });
      }

      return res.status(200).json({
        status: 200,
        data: results.initiative,
      });
    }).catch((err) => {
      console.log(err);
    });
};

/*
 * Get data
 */
exports.get = (req, res) => {
  const options = {};
  options.key = req.params.key;

  return buildData(options, res);
};
