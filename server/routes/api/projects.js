
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

const list = keystone.list('Project').model;

mongoose.Promise = require('bluebird');

const getAdjacent = (results, res) => {
  const fields = 'name key -_id';
  // Get one next/prev project from selected project's sortorder
  const nextProject = list.findOne({
    enabled: true,
    sortOrder: {
      $gt: results.projects.sortOrder,
    },
  }, fields).limit(1);
  const prevProject = list.findOne({
    enabled: true,
    sortOrder: {
      $lt: results.projects.sortOrder,
    },
  }, fields).sort({ sortOrder: -1 }).limit(1);


  // Poplulate next/prev and output response
  Bluebird.props({ next: nextProject, prev: prevProject }).then((nextPrevResults) => {
    const output = Object.assign(nextPrevResults, { project: results.projects });
    return res.status(200).json({
      status: 200,
      data: output,
    });
  }).catch((err) => {
    console.log(err);
  });
};

const buildData = (options, res) => {
  const fields = 'key image.public_id byline name featured archived projectType customUrl sortOrder';
  let data;

  // Get one project
  if (options.id) {
    const addtlFields = '_id description challengeTxt strategyTxt resultsTxt externalLinkUrl githubUrl projectImages files showFiles';
    data = list.findOne({
      key: options.id,
    }, `${fields} ${addtlFields}`)
      .populate('principalInvestigator')
      .populate({
        path: 'format',
        select: 'name -_id',
      })
      .populate({
        path: 'files',
        select: 'name file.filetype file.url fileSummary.html',
      });
  } else if (options.archived) {
    data = list.find({
      enabled: true,
      archived: true,
    },
    fields)
      .sort([['sortOrder', 'descending']]);
  } else {
    data = list.find({ enabled: true }, `${fields} -_id`)
      .sort([['sortOrder', 'ascending']]);
  }

  // Execute
  Bluebird.props({
    projects: data,
  })
    .then((results) => {
      if (results.projects === null || results.projects.length < 1) {
        return res.status(204).send();
      }

      // When retrieving one project, also get next/prev ones
      if (options.id) { getAdjacent(results, res); } else {
        const resultObj = {
          status: 200,
          data: results.projects,
        };

        return res.status(200).json(resultObj);
      }
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
  if (req.params.project_key) { options.id = req.params.project_key; }

  return buildData(options, res);
};

exports.archived = (req, res) => buildData({ archived: true }, res);
