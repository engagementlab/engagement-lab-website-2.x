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

async function find(nameString, res) {

	const { body } = await elasti.search({
        index: ['listing', 'event', 'publication'],
		body: {
			query: {
				multi_match: {
                    query: nameString,
                    fields: ['_type', 'name', 'key']
				}
			}
		}
    });
    
	for (const result of body.hits.hits) {
        console.log('res:', result);
    }
    res.status(200).json({
        status: 200,
        data: body
    });
    //     data: response.hits.hits
    // });
    // return res.status(200).json({
    //     status: 200,
    //     results: response.hits.hits
    // });
}

exports.all = function (req, res) {

    find(req.params.string, res)

}