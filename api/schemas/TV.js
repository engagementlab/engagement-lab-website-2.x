/**
 * Engagement Lab Website v2.x
 *
 * TV page schema
 * @module tv
 * @class tv
 * @author Ralph Drake
 *
 * ==========
 */
const TV = {

  schema: `
    type TV {
      id: ID!
      date: Date
      name: String
      currentBlurb: String
      slideshowImages: [Image]!
      displayVideo: Boolean
      videoId: Int
    }
  `,
  queries: ['allTVPages: TV'],
  resolvers: {
    allTVPages: async () => global.keystone.list('TV').model.findOne({}).exec(),
  },

};
module.exports = TV;
