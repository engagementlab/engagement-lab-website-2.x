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
        'getPerson(key: String): Person'],
    resolvers: {
        allPeople: async (parent, args) => {
            const query = args.cohortYear ? { cohortYear: args.cohortYear, category: 'Masters', } : {};
            return model.find(query).populate('cohortYear')
                .sort([
                    ['sortOrder', 'ascending']
                ]).exec();
        },
        allStaffPeople: async () => model.find({ category: { $in: ['faculty leadership', 'staff'], }, }).exec(),
        allMastersPeople: async () => model.find({ category: 'Masters', alumni: { $ne: true, }, }).populate('cohortYear').exec(),
        allAlumniPeople: async () => model.find({ category: 'Masters', alumni: true, }).populate('cohortYear').exec(),
        getPerson: async (parent, args) => {
            const person = await model.findOne({ key: args.key, }).populate('cohortYear').populate('projects').populate('mdProjects')
                .exec();
            return person;
        },
    },

};
module.exports = Person;
