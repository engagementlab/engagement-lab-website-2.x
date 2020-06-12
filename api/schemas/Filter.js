/**
 * Engagement Lab Website v2.x
 *
 * Filter page schema
 * @module filter
 * @class filter
 * @author Ralph Drake
 *
 * ==========
 */
const Filter = {

  schema: `
    type Filter {
      id: ID!
      date: Date
      category: String!
      appears: String!
    }
  `,
  queries: ['allFilterPages: Filter'],
  resolvers: {
    allFilterPages: async () => global.keystone.list('Filter').model.findOne({}).exec(),
  },

};
module.exports = Filter;
