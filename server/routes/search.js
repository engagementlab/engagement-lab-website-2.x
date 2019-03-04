'use strict';
/**
 * Developed by Engagement Lab, 2018-2019
 * ==============
 * Route to search all models
 * @class search
 * @author Johnny Richardson
 *
 * ==========
 */

/*
 * Query elastisearch cluster
 */

function find(nameString, res) {

	elasti.search({
        index: ['listing', 'event', 'publication'],
		body: {
			query: {
				multi_match: {
                    query: nameString,
                    fields: ['_type', 'name', 'key']
				}
			}
		}
	}).then((response) => {
        res.status(200).json({
            status: 200,
            data: response.hits.hits
        });
    });
	// for (const result of response.hits.hits) {
    //     console.log('res:', result);
	// }
    // return res.status(200).json({
    //     status: 200,
    //     results: response.hits.hits
    // });
}

exports.all = function (req, res) {

    find(req.params.string, res)

}