/**
 * Engagement Lab Website v2.x
 *
 * Undergraduate studio schema
 * @module undergraduate
 * @class undergraduate
 * @author Johnny Richardson
 *
 * ==========
 */
const UndergraduateStudio = {
    schema: `
    type UndergraduateStudio {
      id: ID!
      name: String!
      enabled: Boolean
      requiredCourse: Boolean
      description: Markdown
      faculty: [Person]
      semester: String!
      url: String
      year: AcademicYear
      video: String
      videoThumbnail: Image
    }
    type AcademicYear {
      label: String!
    }
  `,
    queries: ['allUndergraduateStudios: [UndergraduateStudio]', 'allYears: [AcademicYear]'],
    resolvers: {
        allUndergraduateStudios: async () => global.keystone
            .list('UndergraduateStudio')
            .model.find({ enabled: true, })
            .populate('faculty')
            .populate('year')
            .exec(),
        allYears: async () => global.keystone.list('AcademicYear').model.find({}, 'label').sort({ label: 'desc', }).exec(),
    },
};
module.exports = UndergraduateStudio;
