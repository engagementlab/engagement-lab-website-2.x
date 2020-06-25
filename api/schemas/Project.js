/**
 * Engagement Lab Website v2.x
 *
 * Project page schema
 * @module project
 * @class project
 * @author Ralph Drake, Johnny Richardson
 *
 * ==========
 */
const { model, } = global.keystone.list('Project');
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
      image: Image!
      byline: String
      projectType: String!
      sortOrder: Int
      customURL: String
    }
  `,
    queries: ['allProjectPages: [Project]', 'allArchivedProjectPages: [Project]', 'allFeaturedProjectPages: [Project]'],
    resolvers: {
        allProjectPages: async () => model.find({ enabled: true, archived: { $ne: true, }, }).sort([['sortOrder', 'ascending']]).exec(),
        allArchivedProjectPages: async () => model.find({ enabled: true, archived: true, }).exec(),
        allFeaturedProjectPages: async () => model.find({ enabled: true, featured: true, }).exec(),
    },

};
module.exports = Project;
