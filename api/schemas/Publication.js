/**
 * Engagement Lab Website v2.x
 *
 * Publication schema
 * @module project
 * @class schemas
 * @author Johnny Richardson
 *
 * ==========
 */
const Publication = {

    schema: `

        """Publication results type definition"""
        type PublicationResults {
            _id: String!
            publications: [Publication]
        }
        type Publication {
            id: ID!
            title: String!
            key: String!
            date: Date
            author: String
            blurb: String
            context: String
            description: Markdown!
            downloadUrls: String
            purchaseUrls: String
            form: Filter
        }
    `,
    queries: ['allPublications: [PublicationResults]'],
    resolvers: {
        // We show the publications descending by year, so group by year and then sort groups
        allPublications: async () => global.keystone.list('Publication').model.aggregate([
            {
                $match: {
                    enabled: true,
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y', date: '$date', }, },
                    publications: { $push: '$$ROOT', },
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            }
        ]).exec(),
    },

};
module.exports = Publication;
