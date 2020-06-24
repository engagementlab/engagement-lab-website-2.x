/**
 * Engagement Lab Website v2.x
 *
 * Project page schema
 * @module project
 * @class project
 * @author Ralph Drake
 *
 * ==========
 */
const Project = {

    // TODO: add projectType select field
    // TODO: add principalInvestigator and format relationship fields
    // TODO: Ask Johnny about implementing 'Project Media' and 'Project
    //       Information' categories

    schema: `
    type Project {
      id: ID!
      name: String!
      key: String!
      date: Date
      enabled: Boolean!
      featured: Boolean!
      archived: Boolean!
      byline: String
      projectType: String!
      sortOrder: Int
      customURL: String
    }
  `,
    queries: ['allProjectPages: [Project]', 'allArchivedProjectPages: [Project]'],
    resolvers: {
        allProjectPages: async () => global.keystone.list('Project').model.find({ enabled: true, archived: false, }).exec(),
        allArchivedProjectPages: async () => global.keystone.list('Project').model.find({ enabled: true, archived: false, }).exec(),
    },

};
module.exports = Project;
