/**
 * Engagement Lab Website v2.x
 *
 * Undergraduate studio schema
 * @module undergraduate
 * @class undergraduate
 * @author Johnny Richardson
 *
 * ==========
 */
const UndergraduateStudio = {

    schema: `
    type UndergraduateStudio {
      id: ID!
      name: String!
      current: Boolean
      description: Markdown
    }
  `,
    queries: ['currentUndergraduateStudios: UndergraduateStudio'],
    resolvers: {
        currentUndergraduateStudios: async () => global.keystone.list('UndergraduateStudio').model.find({ current: true, }).exec(),
    },

};
module.exports = UndergraduateStudio;
