/**
 * Engagement Lab Website v2.x
 *
 * News Item schema
 * @module news
 * @class news
 * @author Johnny Richardson
 *
 * ==========
 */
const News = {

    schema: `
    type NewsItem {
      id: ID!
      datePosted: Date
      title: String
      key: String
      url: String
      image: Image
      body: Markdown!
    }
  `,
    queries: ['allNewsItems: [NewsItem]'],
    resolvers: {
        allNewsItems: async () => global.keystone.list('NewsItem').model.find({ enabled: true, }).exec(),
    },

};
module.exports = News;
