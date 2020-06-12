/**
 * Engagement Lab Website v2.x
 *
 * User page schema
 * @module user
 * @class user
 * @author Ralph Drake
 *
 * ==========
 */
const User = {

  // TODO: Ask Johnny about Types.Name and Types.Email
  // TODO: Ask Johnny about 'Permissions' category

  schema: `
    type User {
      id: ID!
      date: Date
      name: String!
      email: String!
      isAdmin: Boolean!
    }
  `,
  queries: ['allUserPages: User'],
  resolvers: {
    allUserPages: async () => global.keystone.list('User').model.findOne({}).exec(),
  },

};
module.exports = User;
