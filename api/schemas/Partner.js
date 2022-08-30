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
    queries: ['allPartners: [Partner]'],
    resolvers: {
        allPartners: async () => global.keystone.list('Partner').model.find({}).sort({ name: 'asc', }).exec(),
    },

};
module.exports = Partner;
