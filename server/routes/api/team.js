
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve team page data
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
  const personFields = 'name title category key image.public_id url';
  const person = keystone.list('Person').model;
  let peopleData;
  let queryProps = {};

  const makeQuery = () => {
    // Execute query
    Bluebird.props(queryProps)
      .then((results) => res.status(200).json({
        status: 200,
        data: results,
      })).catch((err) => {
        console.error(err);
      });
  };

  if (options.id) {
    // Get person whose id specified
    const addtlFields = 'bio email twitterURL fbURL linkedInURL githubURL websiteURL igURL cohortYear -_id';
    peopleData = person.findOne({
      key: options.id,
    }, `${personFields} ${addtlFields}`)
      .populate({
        path: 'cohortYear',
        select: 'name -_id',
      });

    queryProps = {
      person: peopleData,
    };
    makeQuery();
  } else {
    const filter = keystone.list('Filter').model;

    // Get all people
    // We have to get the current cohort year manually since mongoose can't join,
    // and returning all CMAP people is inefficient
    filter.findOne({
      current: true,
      category: 'Cohort',
    }, '_id').exec((error, currentYr) => {
      // Get faculty, staff, board
      const peopleData = person.find({
        category: {
          $in: ['faculty leadership', 'staff', 'advisory board', 'faculty fellows'],
        },
      }, `${personFields} -_id`)
        .sort([
          ['sortOrder', 'ascending'],
        ]);

      // Get current cohort
      const studentData = person.find({
        cohortYear: currentYr,
        category: 'CMAP',
      }, `${personFields} cohortYear -_id`)
        .sort([
          ['sortOrder', 'ascending'],
        ]);

      queryProps = {
        staff: peopleData,
        students: studentData,
      };
      makeQuery();
    });
  }
};

/*
 * Get data
 */
exports.get = (req, res) => {
  const options = {};
  if (req.params.person_key) options.id = req.params.person_key;

  return buildData(options, res);
};
