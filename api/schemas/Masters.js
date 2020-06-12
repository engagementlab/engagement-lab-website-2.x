/**
 * Engagement Lab Website v2.x
 *
 * Masters page schema
 * @module masters
 * @class masters
 * @author Ralph Drake
 *
 * ==========
 */
const Masters = {

  // TODO: modify cohortYear def & field? (see api/models/Masters.js line 71)

  schema: `
    type Masters {
      id: ID!
      date: Date
      enabled: Boolean!
      name: String!
      programDescription: String!
      applicationLink: String
      buttonTxt: String!
      cohortYear: Int
    }
  `,
  queries: ['allMastersPages: Masters'],
  resolvers: {
    allMastersPages: async () => global.keystone.list('Masters').model.findOne({}).exec(),
  },

};
module.exports = Masters;
