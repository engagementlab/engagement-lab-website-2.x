/**
 * Engagement Lab Website v2.x
 *
 * Initiative page schema
 * @module initiative
 * @class initiative
 * @author Ralph Drake
 *
 * ==========
 */
const Initiative = {

  // TODO: Create 'projects' relation (see api/models/Initiative.js line 49)

  schema: `
    type Initiative {
      id: ID!
      date: Date
      name: String!
      description: String!
      longDescription: String!
      image: Image
    }
  `,
  queries: ['allInitiativePages: Initiative'],
  resolvers: {
    allInitiativePages: async () => global.keystone.list('Initiative').model.findOne({}).exec(),
  },

};
module.exports = Initiative;
