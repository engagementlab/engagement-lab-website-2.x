/**
 * Engagement Lab Website v2.x
 *
 * Project page schema
 * @module project
 * @class project
 * @author Ralph Drake, Johnny Richardson
 *
 * ==========
 */
const { model, } = global.keystone.list('Project');

const GetAdjacent = async results => {
    const fields = 'name key -_id';
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
const Project = {

    // TODO: add principalInvestigator and format relationship fields
    // TODO: Ask Johnny about implementing 'Project Media' and 'Project
    //       Information' categories

    schema: `
        type Project {
            archived: Boolean
            byline: String
            challengeTxt: String
            customUrl: String
            date: Date
            description: String
            enabled: Boolean
            externalLinkUrl: String
            featured: Boolean
            files: [File]
            format: Filter
            githubUrl: String
            id: ID!
            image: Image!
            key: String!
            name: String!
            principalInvestigator: [String]
            projectImages: [Image]!
            projectType: String!
            resultsTxt: String!
            showFiles: Boolean
            sortOrder: Int
            strategyTxt: String!
            initiatives: [Initiative]
        }
        type ProjectResult {
            project: Project
            prev: Project
            next: Project
        }
  `,
    queries: ['allProjectPages: [Project]',
        'allArchivedProjectPages: [Project]',
        'allFeaturedProjectPages: [Project]',
        'getProject(key: String): ProjectResult'],
    resolvers: {
        allProjectPages: async () => model.find({ enabled: true, archived: { $ne: true, }, })
            .populate({
                path: 'initiatives',
                select: 'key -_id',
            })
            .sort([['sortOrder', 'ascending']]).exec(),

        allArchivedProjectPages: async () => model.find({ enabled: true, archived: true, }).exec(),

        allFeaturedProjectPages: async () => model.find({ enabled: true, featured: true, }).exec(),

        getProject: async (parent, args) => {
            const project = await model.findOne({ key: args.key, })
                .populate({
                    path: 'principalInvestigator',
                    select: 'name -_id',
                })
                .populate({
                    path: 'format',
                    select: 'name -_id',
                })
                .populate({
                    path: 'files',
                    select: 'name file.filetype file.url fileSummary.html',
                })
                .exec();
            return GetAdjacent(project);
        },
    },

};
module.exports = Project;
