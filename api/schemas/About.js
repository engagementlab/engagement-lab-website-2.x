/**
 * Engagement Lab Website v2.x
 *
 * About page schema
 * @module about
 * @class about
 * @author Johnny Richardson
 *
 * ==========
 */
const About = {

    schema: `
    type About {
      id: ID!
      date: Date
      tagline: Markdown
      summary1: Markdown
      image: Image!
    }
  `,
    queries: ['allAboutPages: About'],
    resolvers: {
        allAboutPages: async () => global.keystone.list('About').model.findOne({}).exec(),
    },

};
module.exports = About;
