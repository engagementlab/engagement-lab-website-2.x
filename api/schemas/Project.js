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
      date: Date
      enabled: Boolean!
      featured: Boolean!
      archived: Boolean!
      customURL: String
    }
  `,
  queries: ['allProjectPages: Project'],
  resolvers: {
    allProjectPages: async () => global.keystone.list('Project').model.findOne({}).exec(),
  },

};
module.exports = Project;
