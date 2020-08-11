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
      sponsor: String
      students: [String]
      relatedLinks: [Resource]
      collaborators: [String]
      contact: String
      introduction: Markdown!
      impact: Markdown!
      roles: Markdown!
      thumb: Image
      bgImage: Image
      galleryImages: [Image]
      galleryImageCaptions: [String]
      primaryImage: Image
      primaryImageDescription: String
    }
  `,
    queries: ['allStudios: [Studio], getStudio(key: String): Studio, studiosIntro: StudioIntro'],
    resolvers: {
        allStudios: async () => global.keystone.list('Studio').model.find({ enabled: true, }).exec(),

        getStudio: async (parent, args) => {
            const res = await global.keystone.list('Studio').model.findOne({ $or: [{ key: args.key, }, { customUrl: args.key, }], })
                .populate({
                    path: 'faculty',
                    select: 'key name -_id',
                })
                .populate({
                    path: 'relatedLinks',
                    select: 'name file url',
                })
                .exec();
            // return GetAdjacent(project);
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
            .populate('previousPartneredStudios')
            .populate('currentCoCurricularStudios')
            .exec(),
    },

};
module.exports = Studios;
