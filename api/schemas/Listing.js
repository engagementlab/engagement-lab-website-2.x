/**
 * Engagement Lab Website v2.x
 *
 * Listing page schema
 * @module listing
 * @class listing
 * @author Ralph Drake
 *
 * ==========
 */
const Listing = {

  schema: `
    type Listing {
      id: ID!
      date: Date
      name: String!
      byline: String!
      description: String!
      image: Image
      indexed: Boolean!
    }
  `,
  queries: ['allListingPages: Listing'],
  resolvers: {
    allListingPages: async () => global.keystone.list('Listing').model.findOne({}).exec(),
  },

};
module.exports = Listing;
