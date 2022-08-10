/**
 * Engagement Lab Website v2.x
 *
 * Studios schema
 * @module studios
 * @class studios
 * @author Johnny Richardson
 *
 * ==========
 */
const Studios = {

    schema: `
    type StudioIntro {
        summary: String
        initiativesSummary: String
        video: String
        videoThumbnail: Image
    }
    type Studio {
      id: ID!
      key: String
      name: String!
      customUrl: String
      enabled: Boolean
      status: String
      semester: String
      department: String
      departmentLabel: String
      sponsor: String
      sponsorLabel: String
      relatedLinks: [Resource]
      collaborators: Markdown
      contact: String
      intro: Markdown!
      body: Markdown!
      studentProjects: Markdown
      introduction: Markdown
      impact: Markdown
      roles: Markdown
      thumb: Image
      bgImage: Image
      galleryImages: [Image]
      galleryImageCaptions: [String]
      primaryImage: Image
      primaryImageDescription: String
      primaryImageCredit: String
      galleryVideos: [String]
      galleryVideoTitles: [String]
      galleryVideoCaptions: [String]
      galleryVideoThumbails: [Image]
    }
  `,
    queries: ['allStudios: [Studio], getStudio(key: String): Studio, getStudios(past: Boolean): [Studio], studiosIntro: StudioIntro'],
    resolvers: {
        allStudios: async () => global.keystone.list('Studio').model.find({ enabled: true, }).sort({ sortOrder: 1, }).exec(),

        getStudio: async (parent, args) => {
            const res = await global.keystone.list('Studio').model.findOne({ enabled: true, $or: [{ key: args.key, }, { customUrl: args.key, }], })
                .populate({
                    path: 'relatedLinks',
                    select: 'name file url',
                })
                .exec();
            return res;
        },
        getStudios: async (parent, args) => {
            const status = args.past ? 'Completed' : 'Ongoing';
            const res = await global.keystone.list('Studio').model.find({ status, enabled: true, })
                .exec();
            return res;
        },
        studiosIntro: async () => global.keystone.list('StudiosIntro').model.findOne({})
            .exec(),
    },

};
module.exports = Studios;
