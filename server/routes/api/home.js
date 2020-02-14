
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
  const initiative = keystone.list('Initiative').model;
  const project = keystone.list('Project').model;
  const event = keystone.list('Event').model;
  const about = keystone.list('About').model;

  const projectFields = 'name image.public_id key projectType byline -_id';
  const eventFields = 'name date key -_id';
  const initiativeFields = 'name description image.public_id key projects -_id';

  // Spit on dev server
  if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);

  // Get initiatives
  const initiativeData = initiative.find({}, initiativeFields).sort([
    ['sortOrder', 'ascending'],
  ])
    .populate({
      path: 'projects',
      select: 'name key -_id',
      options: { limit: 3, sort: 'name' },
    });
    // Get a couple featured projects
  const projectData = project.find({ featured: true }, projectFields).limit(2);
  // Get 3 events most recent by date
  const eventData = event.find({ enabled: true }, eventFields).sort([
    ['date', 'descending'],
  ]).limit(3);
    // Get tagline
  const taglineData = about.findOne({}, 'tagline -_id');

  // Execute queries
  Bluebird.props({
    initiatives: initiativeData,
    projects: projectData,
    events: eventData,
    tagline: taglineData,
  })
    .then((results) => res.status(200).json({
      status: 200,
      data: {
        initiatives: results.initiatives,
        projects: results.projects,
        events: results.events,
        tagline: results.tagline.tagline,
      },
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
