/**
 * Engagement Lab Website v2.x
 *
 * Studios schema
 * @module studios
 * @class studios
 * @author Johnny Richardson
 *
 * ==========
 */
const Studios = {

    schema: `
    type StudioIntro {
        summary: String
    }
    type Studio {
      id: ID!
      key: String
    }
  `,
    queries: ['allStudios: [Studio], studiosIntro: StudioIntro'],
    resolvers: {
        allStudios: async () => global.keystone.list('Studio').model.find({ enabled: true, }).exec(),
        studiosIntro: async () => global.keystone.list('StudiosIntro').model.findOne({}).exec(),
    },

};
module.exports = Studios;
