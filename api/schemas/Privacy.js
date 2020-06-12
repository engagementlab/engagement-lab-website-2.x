/**
 * Engagement Lab Website v2.x
 *
 * Privacy page schema
 * @module privacy
 * @class privacy
 * @author Ralph Drake
 *
 * ==========
 */
const Privacy = {
  schema: `
    type Privacy {
      id: ID!
      date: Date
      name: String!
      content: String!
      lastUpdated: Date
    }
  `,
  queries: ['allPrivacyPages: Privacy'],
  resolvers: {
    allPrivacyPages: async () => global.keystone.list('Privacy').model.findOne({}).exec(),
  },

};
module.exports = Privacy;
