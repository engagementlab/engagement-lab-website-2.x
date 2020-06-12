/**
 * Engagement Lab Website v2.x
 *
 * Resource page schema
 * @module resource
 * @class resource
 * @author Ralph Drake
 *
 * ==========
 */
const Resource = {

  // TODO: Add 'type' select field
  // TODO: Ask Johnny about 'File' association

  schema: `
    type Resource {
      id: ID!
      date: Date
      name: String!
      url: String
      summary: String
      author: String
      fileSummary: String
      imageOverride: Image
    }
  `,
  queries: ['allResourcePages: Resource'],
  resolvers: {
    allResourcePages: async () => global.keystone.list('Resource').model.findOne({}).exec(),
  },

};
module.exports = Resource;
