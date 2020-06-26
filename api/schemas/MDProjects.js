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
    type MDProjects {
      id: ID!
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
  queries: ['allMDProjectsPages: MDProjects'],
  resolvers: {
    allMDProjectsPages: async () => global.keystone.list('MDProjects').model.findOne({}).exec(),
  },

};
module.exports = MDProjects;
