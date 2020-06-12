/**
 * Engagement Lab Website v2.x
 *
 * Partner page schema
 * @module partner
 * @class partner
 * @author Ralph Drake
 *
 * ==========
 */
const Partner = {

  schema: `
    type Partner {
      id: ID!
      date: Date
      name: String!
      description: String!
      image: Image
      url: String
    }
  `,
  queries: ['allPartnerPages: Partner'],
  resolvers: {
    allPartnerPages: async () => global.keystone.list('Partner').model.findOne({}).exec(),
  },

};
module.exports = Partner;
