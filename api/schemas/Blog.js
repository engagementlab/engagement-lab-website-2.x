/**
 * Engagement Lab Website v2.x
 *
 * "New" Blog Item schema
 * @module news
 * @class news
 * @author Johnny Richardson
 *
 * ==========
 */
const Blog = {

    schema: `
    type Blog {
      id: ID!
      datePosted: Date
      title: String
      key: String
      image: Image
      body: Markdown!
    }
  `,
    queries: ['allBlogItems: [Blog]', 'getBlogItem(key: String): Blog'],
    resolvers: {
        allBlogItems: async () => global.keystone.list('Blog').model.find({ enabled: true, }).exec(),
        getBlogItem: async (parent, args) => {
            const newsItem = await global.keystone.list('Blog').model.findOne({ key: args.key, }).exec();
            return newsItem;
        },
    },

};
module.exports = Blog;
