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
    queries: ['allPublications: [Publication]'],
    resolvers: {
        allPublications: async () => global.keystone.list('Publication').model.find({})
            .sort([['date', 'descending']])
            .populate({
                path: 'form',
                select: 'key -_id',
            })
            .populate({
                path: 'articleResource',
                select: 'file.url -_id',
            }),
    },

};
module.exports = Publication;
