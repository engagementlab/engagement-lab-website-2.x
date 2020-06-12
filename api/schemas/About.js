/**
 * Engagement Lab Website v2.x
 *
 * About page schema
 * @module about
 * @class about
 * @author Johnny Richardson
 *
 * ==========
 */
const About = {

  schema: `
    type About {
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
  queries: ['allAboutPages: About'],
  resolvers: {
    allAboutPages: async () => global.keystone.list('About').model.findOne({}).exec(),
  },

};
module.exports = About;
