/**
 * Engagement Lab Website v2.x
 *
 * Grad Curriculum schema
 * @module Curriculum
 * @class Curriculum
 * @author Johnny Richardson
 *
 * ==========
 */
const Curriculum = {

    schema: `
    type Curriculum {
      id: ID!
      enabled: Boolean!
      name: String!
      description: String!
    }
  `,
    queries: ['allCurriculumPages: [Curriculum]'],
    resolvers: {
        allCurriculumPages: async () => global.keystone.list('Curriculum').model.find({ enabled: true, }).exec(),
    },

};
module.exports = Curriculum;
