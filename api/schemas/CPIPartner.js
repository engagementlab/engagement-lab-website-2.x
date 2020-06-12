/**
 * Engagement Lab Website v2.x
 *
 * CommunityPlanIt Partner page schema
 * @module cpipartner
 * @class cpipartner
 * @author Ralph Drake
 *
 * ==========
 */
const CPIPartner = {

  schema: `
    type CPIPartner {
    id: ID!
    date: Date
    url: String!
    }
  `,
  queries: ['allCPIPartnerPages: CPIPartner'],
  resolvers: {
    allCPIPartnerPages: async () => global.keystone.list('CPIPartner').model.findOne({}).exec(),
  },

};
module.exports = CPIPartner;
