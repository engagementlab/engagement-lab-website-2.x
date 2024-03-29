/**
 * Engagement Lab Website v2.x
 *
 * Person page schema
 * @module person
 * @class person
 * @author Ralph Drake, Johnny Richardson
 *
 * ==========
 */
const { model, } = global.keystone.list('Person');

const Person = {
    schema: `
        type Person {
            id: ObjectID!
            key: String!
            date: Date
            name: Name!
            enabled: Boolean!
            category: String!
            title: String
            cohortYear: Filter
            bio: Markdown!
            image: Image!
            relatedLinks: [String]
            projects: [Project]
            mdProjects: [MDProject] 
            contact: String
            alumni: Boolean
            onLeave: Boolean
        }
  `,
    queries: [
        'allPeople(cohortYear: ObjectID): [Person]',
        'allMastersPeople: [Person]',
        'allAlumniPeople: [Person]',
        'allStaffPeople: [Person]',
        'allFacultyPeople: [Person]',
        'allLeadershipPeople: [Person]',
        'getPerson(key: String): Person'
    ],
    resolvers: {
        allPeople: async (parent, args) => {
            // If cohort year specified, get only those people
            const query = args.cohortYear ?
                { cohortYear: args.cohortYear, category: 'Masters', } : // Otherwise, get only non-alums or alums who are also faculty/staff
                {
                    $or: [
                        { alumni: { $ne: true, }, },
                        { alumni: true, category: { $in: ['faculty fellows', 'staff'], }, }
                    ],
                };

            return (
                model
                    .find(query)
                    .populate('cohortYear')
                    // Sort by first name
                    .sort([['name.first', 'ascending']])
                    .exec()
            );
        },
        allStaffPeople: async () => model
            .find({ enabled: true, category: { $in: ['staff', 'lab assistants'], }, })
            .sort([['name.first', 'ascending']])
            .exec(),
        allFacultyPeople: async () => model
            .find({ enabled: true, category: 'faculty fellows', })
            .sort([['name.first', 'ascending']])
            .exec(),
        allLeadershipPeople: async () => model
            .find({ enabled: true, category: 'leadership', })
            .sort([['sortOrder', 'ascending']])
            .exec(),
        allMastersPeople: async () => {
            const cohort = await global.keystone
                .list('Filter')
                .model.findOne({
                    category: 'Cohort',
                    current: true,
                })
                .exec();
            const people = await model
                .find({ enabled: true, category: 'Masters', cohortYear: cohort, })
                .sort([['name.first', 'ascending']])
                .exec();
            return people;
        },
        allAlumniPeople: async () => model
            .find({ enabled: true, category: 'Masters', alumni: true, })
            .sort([['name.first', 'ascending']])
            .populate('cohortYear')
            .exec(),
        getPerson: async (parent, args) => {
            const person = await model
                .findOne({ key: args.key, })
                .populate('cohortYear')
                .populate('projects')
                .populate('mdProjects')
                .exec();
            return person;
        },
    },
};
module.exports = Person;
