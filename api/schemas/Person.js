/**
 * Engagement Lab Website v2.x
 *
 * Person page schema
 * @module person
 * @class person
 * @author Ralph Drake
 *
 * ==========
 */
const Person = {

  // TODO: add 'category' select field (see api/models/Person.js line 46)
  // TODO: ask Johnny about managing relationships for title, cohortYear, project fields

  schema: `
    type Person {
      id: ID!
      date: Date
      name: String!
      title: String!
      project: String
      bio: String!
      image: Image
      cmapPerson: Boolean
      twitterURL: String
      fbURL: String
      igURL: String
      linkedInURL: String
      githubURL: String
      websiteURL: String
      email: String
      phone: String
    }
  `,
  queries: ['allPersonPages: Person'],
  resolvers: {
    allPersonPages: async () => global.keystone.list('Person').model.findOne({}).exec(),
  },

};
module.exports = Person;
