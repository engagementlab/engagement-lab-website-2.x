/**
 * Engagement Lab Website v2.x
 *
 * Job page schema
 * @module job
 * @class job
 * @author Ralph Drake
 *
 * ==========
 */
const Job = {

    schema: `
    type Job {
      id: ID!
      date: Date
      enabled: Boolean!
      title: String!
      description: String!
      url: String!
    }
  `,
    queries: ['allJobs: [Job]'],
    resolvers: {
        allJobs: async () => global.keystone.list('Job').model.find({ enabled: true, }).exec(),
    },

};
module.exports = Job;
