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
        partneredStudiosThumbnail: Image
        graduateThesisThumbnail: Image
        cocurricularThumbnail: Image
        partneredSummary: String
        partneredCurriculum: String
        partneredSummaryImage: Image
        currentPartneredStudios: [Studio]
        previousPartneredStudios: [Studio]
        gradSummary: String
        gradCurriculum: String
        gradSummaryImage: Image
        coCurricularSummary: String
        coCurricularSummaryImage: Image
        coCurricularPhases: [String]
        currentCoCurricularStudios: [Studio]
    }
    type Studio {
      id: ID!
      key: String
      name: String!
      customUrl: String
      enabled: Boolean
      status: String
      semester: String
      faculty: [Person]
      department: String
      departmentLabel: String
      sponsor: String
      sponsorLabel: String
      students: [String]
      relatedLinks: [Resource]
      collaborators: Markdown
      contact: String
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
        allStudios: async () => global.keystone.list('Studio').model.find({ enabled: true, }).exec(),

        getStudio: async (parent, args) => {
            const res = await global.keystone.list('Studio').model.findOne({ enabled: true, $or: [{ key: args.key, }, { customUrl: args.key, }], })
                .populate({
                    path: 'faculty',
                    select: 'key name -_id',
                })
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
                .populate({
                    path: 'faculty',
                    select: 'key name -_id',
                })
                .exec();
            return res;
        },
        studiosIntro: async () => global.keystone.list('StudiosIntro').model.findOne({})
            .populate({
                path: 'currentPartneredStudios',
                populate: {
                    path: 'faculty',
                    model: 'Person',
                },
            })
            .populate({
                path: 'currentCoCurricularStudios',
                populate: {
                    path: 'faculty',
                    model: 'Person',
                },
            }).populate({
                path: 'previousPartneredStudios',
                populate: {
                    path: 'faculty',
                    model: 'Person',
                },
            })
            .exec(),
    },

};
module.exports = Studios;
