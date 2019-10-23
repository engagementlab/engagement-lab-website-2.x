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
				query_string: {
                    query:  nameString + '*',
                    fields: ['_type', 'name', 'key', 'content']
				}
            },
            highlight: {
                require_field_match: true,
                fields: {
                    name: {
                        pre_tags: [
                            "<mark>"
                        ],
                        post_tags: [
                            "</mark>"
                        ]
                    },
                    content: {
                        pre_tags: [
                            "<mark>"
                        ],
                        post_tags: [
                            "</mark>"
                        ]
                    }
                }
            }
		}
    });
    
    res.status(200).json({
        status: 200,
        data: body.hits.hits
    });
}

exports.all = function (req, res) {

    find(req.params.string, res)

}