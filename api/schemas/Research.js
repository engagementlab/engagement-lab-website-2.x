/**
 * Engagement Lab Website v2.x
 *
 * Research page schema
 * @module job
 * @class job
 * @author Johnny Richardson
 *
 * ==========
 */
const Research = {

    schema: `
    type Research {
      id: ID!
      blurb: String!
    }
  `,
    queries: ['allResearchPages: Research'],
    resolvers: {
        allResearchPages: async () => global.keystone.list('Research').model.findOne().exec(),
    },

};
module.exports = Research;
