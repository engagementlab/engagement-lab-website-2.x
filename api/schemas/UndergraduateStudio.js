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
      faculty: [Person]
      semester: String!
    }
  `,
    queries: ['currentUndergraduateStudios: [UndergraduateStudio]'],
    resolvers: {
        currentUndergraduateStudios: async () => global.keystone.list('UndergraduateStudio').model.find({ current: true, })
            .populate('faculty').exec(),
    },

};
module.exports = UndergraduateStudio;
