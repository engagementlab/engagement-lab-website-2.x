
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

const events = keystone.list('Event').model;

mongoose.Promise = require('bluebird');

const getAdjacent = (results, res) => {
  const fields = 'name key -_id';
  // Get one next/prev event from selected event's date
  const nextEvent = events.findOne({
    enabled: true,
    date: {
      $gt: results.events.date,
    },
  }, fields).limit(1);
  const prevEvent = events.findOne({
    enabled: true,
    date: {
      $lt: results.events.date,
    },
  }, fields).limit(1);

  // Poplulate next/prev and output response
  Bluebird.props({ next: nextEvent, prev: prevEvent }).then((nextPrevResults) => {
    const output = Object.assign(nextPrevResults, { event: results.events });
    return res.status(200).json({
      status: 200,
      data: output,
    });
  }).catch((err) => {
    console.log(err);
  });
};

const buildData = (options, res) => {
  let eventsData;
  const queries = {};
  let fields = 'name date key shortDescription eventUrl';

  if (options.id) {
    // Get one event
    fields += ' description.html images.public_id showButton buttonTxt';
    eventsData = events.findOne({ key: options.id }, fields);
  } else {
    // Get enabled events
    fields += ' -_id';
    eventsData = events.find({ enabled: true }, fields).sort([
      ['date', 'descending'],
    ]);
  }
  queries.events = eventsData;

  // Execute queries
  Bluebird.props(queries)
    .then((results) => {
      // When retrieving one event, also get next/prev ones
      if (options.id) {
        getAdjacent(results, res);
      } else {
        return res.status(200).json({
          status: 200,
          data: results.events,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
};

/*
 * Get data
 */
exports.get = (req, res) => {
  const options = {};
  if (req.params.key) options.id = req.params.key;

  return buildData(options, res);
};
