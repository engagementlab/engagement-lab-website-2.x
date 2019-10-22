'use strict';
/**
 * Developed by Engagement Lab, 2018-2019
 * ==============
 * Route to retrieve masters program data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone;

var buildData = async (res) => {

    let masters = keystone.list('Masters').model;
    let person = keystone.list('Person').model;

    let fields = 'programDescription.html applicationLink buttonTxt cohortYear -_id';
    let personFields = 'name title key image.public_id url -_id';

    try {
        
        // Get masters program info
        let mastersQuery = masters.findOne({}, fields);
        let mastersData = await mastersQuery.lean().exec();
        
        // Get current cohort via filter year in masters page data
        let peopleData = await person.find({cohortYear: mastersData.cohortYear, category: 'Masters'}, personFields)
        .sort([['sortOrder', 'ascending']]).lean().exec();
        
        return res.status(200).json({
            status: 200,
            data: { 
                masters: mastersData,
                people: peopleData
            }
        });
        
    }
    catch(e) {
        console.log(e)
        res.status(500).send(e.toString());
    }
}

/*
 * Get data
 */
exports.get = function (req, res) {

    return buildData(res);

}