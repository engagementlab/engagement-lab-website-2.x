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
      content: Markdown!
      lastUpdated: Date
    }
  `,
    queries: ['allPrivacyPages: Privacy'],
    resolvers: {
        allPrivacyPages: async () => global.keystone.list('Privacy').model.findOne({}).exec(),
    },

};
module.exports = Privacy;
