/**
 * Engagement Lab Website v2.x
 *
 * Search page schema
 * @module about
 * @class about
 * @author Johnny Richardson
 *
 * ==========
 */
const Search = {

    schema: `
    type Search {
      id: ID!
      date: Date
      tagline: String
      missionStatement: String
      summary1: String
      summary2: String
      images: [Image]
      research: String!
      workshops: String!
      tools: String!
      teaching: String!
      design: String!
    }
  `,
    queries: ['allSearchPages: Search'],
    resolvers: {
        allSearchPages: async () => global.keystone.list('Search').model.findOne({}).exec(),
    },

};
module.exports = Search;
