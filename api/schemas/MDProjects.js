/**
 * Engagement Lab Website v2.x
 *
 * MDProjects page schema
 * @module mdprojects
 * @class mdprojects
 * @author Ralph Drake
 *
 * ==========
 */
const MDProjects = {

    // TODO: add teamMembers ref field (see api/models/MDProjects.js line 102)

    schema: `
    type MDProject {
      id: ID!
      key: String!
      date: Date
      name: String!
      byline: String!
      description: String!
      thumb: Image
      indexed: Boolean!
      enabled: Boolean!
      featured: Boolean!
      customUrl: String
    }
  `,
    queries: ['allMDProjectPages: [MDProject]'],
    resolvers: {
        allMDProjectPages: async () => global.keystone.list('MDProject').model.find({ enabled: true, }).exec(),
    },

};
module.exports = MDProjects;
