
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve data by url
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
  const list = keystone.list('Project').model;
  let data;

  if (options.id !== undefined) {
    data = list.findOne({
      key: options.id,
    });
  } else if (options.limit) {
    data = list.find({}).sort([
      ['sortOrder', 'ascending'],
    ]);
  } else data = list.find({});

  Bluebird.props({
    jsonData: data,
  })
    .then((results) => res.status(200).json({
      status: 200,
      data: results.jsonData,
    })).catch((err) => {
      console.log(err);
    });
};

/*
 * Get data
 */
exports.get = (req, res) => {
  const options = {};
  if (req.params.id) options.id = req.params.id;

  return buildData(options, res);
};
