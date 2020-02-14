
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve publication data
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
  const list = keystone.list('Publication').model;
  const fields = 'key title author date blurb context downloadUrls purchaseUrls -_id';
  // let data;

  /*
    if (options.id) {
      let addtlFields = `description challengeTxt strategyTxt resultsTxt
                         externalLinkUrl githubUrl projectImages`;
      data = list.findOne({
        key: options.id
      }, fields + ' ' + addtlFields).populate('format principalInvestigator');
    } else
  */
  const data = list.find({ enabled: true }, fields)
    .sort([['date', 'descending']])
    .populate({
      path: 'form',
      select: 'key -_id',
    })
    .populate({
      path: 'articleResource',
      select: 'file.url -_id',
    });

  Bluebird.props({
    jsonData: data,
  })
    .then((results) => {
      if (results.jsonData === null || results.jsonData.length < 1) return res.status(204).send();

      return res.status(200).json({
        status: 200,
        data: results.jsonData,
      });
    }).catch((err) => {
      console.log(err);
      return res.status(400);
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
