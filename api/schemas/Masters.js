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
      name: String!
      programDescription: Markdown!
      applicationLink: String
      buttonTxt: String!
      cohortYear: ID
    }
  `,
    queries: ['allMastersPages: Masters'],
    resolvers: {
        allMastersPages: async () => global.keystone.list('Masters').model.findOne({}).exec(),
    },

};
module.exports = Masters;
