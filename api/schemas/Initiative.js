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
    schema: `
        type Initiative {
        id: ID!
        key: String!
        name: String!
        description: String!
        longDescription: String!
        image: Image,
        featuredProject: Project
        featuredProjectBlurb: String
        projects: [Project]
        }
  `,
    queries: ['allInitiativePages: [Initiative]',
        'getInitiative(key: String): Initiative'
    ],
    resolvers: {
        allInitiativePages: async () => global.keystone.list('Initiative').model.find({}).sort({
                sortOrder: 1,
            }).populate({
                path: 'featuredProject',
                select: 'key  -_id',
            }).populate({
                path: 'projects',
                select: 'key -_id',
            })
            .exec(),
        getInitiative: async (parent, args) => {
            const res = await global.keystone.list('Initiative').model.findOne({
                key: args.key,
            }).populate({
                path: 'featuredProject',
                select: 'name key image -_id',
            }).populate({
                path: 'projects',
                select: 'name key image startYear endYear -_id',
                match: {
                    enabled: true
                },
                options: {
                    sort: 'startYear',
                },
            }).exec();
            return res;
        },
    },

};
module.exports = Initiative;