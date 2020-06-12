/**
 * Engagement Lab Website v2.x
 *
 * CommunityPlanIt page schema
 * @module cpicontent
 * @class cpicontent
 * @author Ralph Drake
 *
 * ==========
 */
const CPIContent = {

  schema: `
    type CPIContent {
    id: ID!
    date: Date
    intro: String!
    blurb: String!
    videoURL: String!
    }
  `,
  queries: ['allCPIContentPages: CPIContent'],
  resolvers: {
    allCPIContentPages: async () => global.keystone.list('CPIContent').model.findOne({}).exec(),
  },

};
module.exports = CPIContent;
