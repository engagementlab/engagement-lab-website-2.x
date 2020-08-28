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

    // TODO: modify cohortYear def & field? (see api/models/Masters.js line 71)

    schema: `
    type Masters {
      id: ID!
      name: String!
      programDescription: String!
      partnerships: String!
      phases: [String]!
      learningObjectives: String!
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
