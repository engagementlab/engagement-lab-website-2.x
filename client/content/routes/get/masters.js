
/**
 * @fileoverview Engagement Lab Website v2.x content service
 * @copyright Engagement Lab at Emerson College, 2020
 *
 * @author Johnny Richardson
 * @description Route to retrieve masters program page datta
 *
 * ==========
 */
const BuildData = async (req, res) => {
  const { db } = res.locals;

  const person = db.list('Person').model;
  const masters = db.list('Masters').model;

  const fields = 'programDescription.html applicationLink buttonTxt cohortYear -_id';
  const personFields = 'name title key image.public_id url -_id';

  try {
    // Get masters program info
    const mastersQuery = masters.findOne({}, fields).lean();
    const data = {
      masters: await mastersQuery.exec(),
    };

    // Get current cohort via filter year in masters page data
    const peopleQuery = person.find({ cohortYear: data.masters.cohortYear, category: 'Masters' }, personFields)
      .sort([['sortOrder', 'ascending']]).lean();

    data.people = await peopleQuery.exec();

    res.json(data);
  } catch (e) {
    res.status(500).send(e.toString());
  }
};

module.exports = (req, res) => BuildData(req, res);
