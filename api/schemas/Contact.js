/**
 * Engagement Lab Website v2.x
 *
 * Contact page schema
 * @module contact
 * @class contact
 * @author Ralph Drake
 *
 * ==========
 */
const Contact = {

  schema: `
    type Contact {
    id: ID!
    date: Date
    blurb: String
    students: String
    community: String
    }
  `,
  queries: ['allContactPages: Contact'],
  resolvers: {
    allContactPages: async () => global.keystone.list('Contact').model.findOne({}).exec(),
  },

};
module.exports = Contact;
