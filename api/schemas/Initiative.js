/**
 * Engagement Lab Website v2.x
 *
 * Initiative page schema
 * @module initiative
 * @class initiative
 * @author Ralph Drake
 *
 * ==========
 */
const Initiative = {

    // TODO: Create 'projects' relation (see api/models/Initiative.js line 49)

    schema: `
    type Initiative {
      id: ID!
      key: String!
      name: String!
      description: String!
      longDescription: String!
      image: Image,
      projects: [Project]
    }
  `,
    queries: ['allInitiativePages: [Initiative]',
        'getInitiative(key: String): Initiative'],
    resolvers: {
        allInitiativePages: async () => global.keystone.list('Initiative').model.find({}).sort({ sortOrder: 1, }).exec(),
        getInitiative: async (parent, args) => {
            const res = await global.keystone.list('Initiative').model.findOne({ key: args.key, }).populate({
                path: 'projects',
                select: 'name key image -_id',
                options: { sort: 'name', },
            }).exec();
            return res;
        },
    },

};
module.exports = Initiative;
