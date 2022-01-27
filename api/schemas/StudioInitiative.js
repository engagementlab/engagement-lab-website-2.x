/**
 * Engagement Lab Website v2.x
 *
 * StudioInitiative page schema
 * @module initiative
 * @class initiative
 * @author Ralph Drake
 *
 * ==========
 */
const StudioInitiative = {
    schema: `
        type StudioInitiative {
            id: ID!
            key: String!
            name: String!
            description: String!
            longDescription: String!
            thumb: Image
            body: Markdown
            url: String
            studios: [Studio]
            galleryVideos: [String]
            galleryVideoTitles: [String]
            galleryVideoCaptions: [String]
            galleryVideoThumbails: [Image]
        }
  `,
    queries: ['allStudioInitiatives: [StudioInitiative]',
        'getStudioInitiative(key: String): StudioInitiative'
    ],
    resolvers: {
        allStudioInitiatives: async () => global.keystone.list('StudioInitiative').model.find({}).sort({
            sortOrder: 1,
        }).populate({
            path: 'studios',
            select: 'key',
            match: {
                enabled: true,
            },
        }).exec(),
        getStudioInitiative: async (parent, args) => {
            const res = await global.keystone.list('StudioInitiative').model.findOne({
                key: args.key,
            }).populate({
                path: 'studios',
                select: 'name key thumb -_id',
                match: {
                    enabled: true,
                },
            }).exec();
            return res;
        },
    },

};
module.exports = StudioInitiative;
