/**
 * Engagement Lab Website v2.x
 *
 * Undergraduate page schema
 * @module undergraduate
 * @class undergraduate
 * @author Johnny Richardson
 *
 * ==========
 */
const Undergraduate = {

    schema: `
    type Undergraduate {
      id: ID!
      name: String!
      description: Markdown
      curriculumDescription: Markdown
      currentStudiosYear: String
    }
  `,
    queries: ['allUndergraduatePages: Undergraduate'],
    resolvers: {
        allUndergraduatePages: async () => global.keystone.list('Undergraduate').model.findOne({}).exec(),
    },

};
module.exports = Undergraduate;
