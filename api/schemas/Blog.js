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
      body: Markdown!
    }
  `,
    queries: ['allBlogItems: [Blog]', 'getBlogItem(key: String): Blog'],
    resolvers: {
        allBlogItems: async () => global.keystone.list('Blog').model.find({ enabled: true, }).sort({ datePosted: -1, }).exec(),
        getBlogItem: async (parent, args) => {
            const newsItem = await global.keystone.list('Blog').model.findOne({ key: args.key, }).exec();
            // Optimize image tags
            newsItem.body.html = newsItem.body.html.replace(/upload\/v1/gm, 'upload/c_scale,f_auto,w_700/v1/');
            newsItem.body.html = newsItem.body.html.replace(/<img src/gm, '<img style="max-width:700px" src');
            return newsItem;
        },
    },

};
module.exports = Blog;
