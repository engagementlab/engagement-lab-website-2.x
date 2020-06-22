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
            description: String
            downloadUrls: String
            purchaseUrls: String
        }
    `,
    queries: ['allPublications: [Publication]'],
    resolvers: {
        allPublications: async () => global.keystone.list('Publication').model.find({}).exec(),
    },

};
module.exports = Publication;
