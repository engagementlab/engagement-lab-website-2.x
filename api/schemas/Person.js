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
    queries: ['allPeople(cohortYear: ObjectID): [Person]',
        'allMastersPeople: [Person]',
        'allAlumniPeople: [Person]',
        'allStaffPeople: [Person]',
        'allFacultyPeople: [Person]',
        'getPerson(key: String): Person'],
    resolvers: {
        allPeople: async (parent, args) => {
            // If cohort year specified, get only those people
            const query = args.cohortYear ?

                { cohortYear: args.cohortYear, category: 'Masters', } :

                // Otherwise, get only non-alums or alums who are also faculty/staff
                {
                    $or: [
                        { alumni: { $ne: true, }, },
                        { alumni: true, category: { $in: ['faculty fellows', 'staff'], }, }
                    ],
                };

            return model.find(query).populate('cohortYear')
                // Sort by first name
                .sort([
                    ['name.first', 'ascending']
                ]).exec();
        },
        allStaffPeople: async () => model.find({ category: 'staff', }).sort([
            ['name.first', 'ascending']
        ]).exec(),
        allFacultyPeople: async () => model.find({ category: 'faculty leadership', }).sort([
            ['name.first', 'ascending']
        ]).exec(),
        allMastersPeople: async () => model.find({ category: 'Masters', alumni: { $ne: true, }, }).sort([
            ['name.first', 'ascending']
        ]).populate('cohortYear').exec(),
        allAlumniPeople: async () => model.find({ category: 'Masters', alumni: true, }).sort([
            ['name.first', 'ascending']
        ]).populate('cohortYear').exec(),
        getPerson: async (parent, args) => {
            const person = await model.findOne({ key: args.key, }).populate('cohortYear').populate('projects').populate('mdProjects')
                .exec();
            return person;
        },
    },

};
module.exports = Person;
