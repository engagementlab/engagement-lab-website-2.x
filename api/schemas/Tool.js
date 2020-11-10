/**
 * Engagement Lab Website v2.x
 *
 * Tool schema
 * @module tool
 * @class tool
 * @author Johnny Richardson
 *
 * ==========
 */
const Tool = {

    schema: `
    type Tool {
      id: ID!
      date: Date
      name: String!
      project: String
      url: String
      file: File
      summary: String!
      image: Image!
    }
  `,
    queries: ['allTools: [Tool]'],
    resolvers: {
        allTools: async () => global.keystone.list('Tool').model.find({}).exec(),
    },

};
module.exports = Tool;
