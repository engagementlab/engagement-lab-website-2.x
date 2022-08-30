/**
 * Engagement Lab Website v2.x
 *
 * Masters page schema
 * @module masters
 * @class masters
 * @author Ralph Drake and Johnny Richardson
 *
 * ==========
 */
const Masters = {

    schema: `
    type Masters {
      id: ID!
      name: String!
      programDescription: Markdown!
      partnerships: Markdown!
      coursesInfo: Markdown
      phases: [String]!
      faculty: [Person]
      projects: [MDProject]
      studiosBlurb: String!
      applicationBlurb: Markdown!
      applicationLink: String!
      buttonTxt: String!
      cohortYear: ID
    }
  `,
    queries: ['allMastersPages: Masters'],
    resolvers: {
        allMastersPages: async () => global.keystone.list('Masters').model.findOne({}).populate('faculty').populate({
            path: 'projects',
            populate: [{
                path: 'cohortYear',
                model: 'Filter',
            }, { path: 'faculty', model: 'Person', }
            ],
        }).exec(),
    },

};
module.exports = Masters;
