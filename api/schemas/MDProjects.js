/**
 * Engagement Lab Website v2.x
 *
 * MDProjects page schema
 * @module mdprojects
 * @class mdprojects
 * @author Ralph Drake
 *
 * ==========
 */
const { model, } = global.keystone.list('MDProject');

const GetAdjacent = async results => {
    const fields = 'key -_id';
    // Get one next/prev event from selected event's sortorder
    const nextProject = model
        .findOne(
            {
                enabled: true,
                sortOrder: {
                    $gt: results.sortOrder,
                },
            },
            fields
        )
        .limit(1);
    const prevProject = model
        .findOne(
            {
                enabled: true,
                sortOrder: {
                    $lt: results.sortOrder,
                },
            },
            fields
        )
        .sort({ sortOrder: -1, })
        .limit(1);

    const nextPrevResults = {
        next: await nextProject,
        prev: await prevProject,
    };

    // Populate next/prev and output
    try {
        const output = Object.assign(nextPrevResults, { project: results, });
        return output;
    } catch (err) {
        throw new Error(err);
    }
};
const MDProjects = {

    // TODO: add teamMembers ref field (see api/models/MDProjects.js line 102)

    schema: `
    type MDProject {
      id: ID!
      key: String!
      date: Date
      name: String!
      byline: String!
      cohortYear: Filter
      description: String!
      thumb: Image
      faculty: Person
      indexed: Boolean!
      enabled: Boolean!
      featured: Boolean!
      problem: String!
      intervention: String!
      impact: String!
      projectImages: [Image]
      resources: [Resource]
      publications: [Publication]
      pointOfContact: Person
      thesis: File
      primaryImage: Image
      primaryImageDescription: String
      partners: [Partner]
      bgImage: Image
    }
    type MDProjectResult {
        project: MDProject
        prev: MDProject
        next: MDProject
    }
  `,
    queries: ['allMDProjectPages: [MDProject]', 'getMDProject(key: String): MDProjectResult'],
    resolvers: {
        allMDProjectPages: async () => model.find({ enabled: true, }).populate('cohortYear').exec(),
        getMDProject: async (parent, args) => {
            const project = await model.findOne({ key: args.key, })
                .populate('cohortYear')
                .populate('publications')
                .populate('pointOfContact')
                .populate('partners')
                .populate('thesis')
                .populate('resources', 'name url file')
                .populate({
                    path: 'faculty',
                    select: 'key name -_id',
                })
                .exec();
            return GetAdjacent(project);
        },
    },

};
module.exports = MDProjects;
