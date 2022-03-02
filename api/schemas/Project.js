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
            partnersTxt: [String]
            customUrl: String
            date: Date
            description: String
            enabled: Boolean
            endYear: String
            externalLinkUrl: String
            featured: Boolean
            files: [Resource]
            format: Filter
            githubUrl: String
            id: ID!
            image: Image!
            key: String!
            name: String!
            partners: [Partner]
            primaryImage: Image
            principalInvestigator: [String]
            projectImages: [Image]
            primaryImageDescription: String
            projectLeads: [String]
            projectType: String
            publications: [Publication]
            resultsTxt: String!
            showFiles: Boolean
            sortOrder: Int
            startYear: String
            status: String
            strategyTxt: String!
            teamMembers: [String]
            galleryVideos: [String]
            galleryVideoTitles: [String]
            galleryVideoCaptions: [String]
            galleryVideoThumbails: [Image]
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
        allProjectPages: async () => model.find({ enabled: true, archived: { $ne: true, }, }).sort({ sortOrder: 1, }).exec(),

        allArchivedProjectPages: async () => model.find({ enabled: true, archived: true, }).exec(),

        allFeaturedProjectPages: async () => model.find({ enabled: true, featured: true, }).exec(),

        getProject: async (parent, args) => {
            const project = await model.findOne({ $or: [{ key: args.key, }, { customUrl: args.key, }], })
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
                    select: 'name file fileSummary.html',
                })
                .populate('partners')
                .populate('publications')
                .exec();
            return GetAdjacent(project);
        },
    },

};
module.exports = Project;
