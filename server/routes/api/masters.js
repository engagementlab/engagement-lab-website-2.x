
/**
 * Developed by Engagement Lab, 2018-2019
 * ==============
 * Route to retrieve masters program data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const { keystone } = global;

const buildData = async (res) => {
  const masters = keystone.list('Masters').model;
  const person = keystone.list('Person').model;

  const fields = 'programDescription.html applicationLink buttonTxt cohortYear -_id';
  const personFields = 'name title key image.public_id url -_id';

  try {
    // Get masters program info
    const mastersQuery = masters.findOne({}, fields);
    const mastersData = await mastersQuery.lean().exec();

    // Get current cohort via filter year in masters page data
    const peopleData = await person.find({ cohortYear: mastersData.cohortYear, category: 'Masters' }, personFields)
      .sort([['sortOrder', 'ascending']]).lean().exec();

    return res.status(200).json({
      status: 200,
      data: {
        masters: mastersData,
        people: peopleData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.toString());
  }
};

/*
 * Get data
 */
exports.get = (req, res) => buildData(res);
