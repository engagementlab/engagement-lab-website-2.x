/**
 * Engagement Lab Website v2.x
 *
 * Person page schema
 * @module person
 * @class person
 * @author Ralph Drake
 *
 * ==========
 */
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
            project: String
            bio: Markdown!
            image: Image!
            cmapPerson: Boolean
            twitterURL: String
            fbURL: String
            igURL: String
            linkedInURL: String
            githubURL: String
            websiteURL: String
            email: String
            phone: String
        }
  `,
    queries: ['allPeople(cohortYear: ObjectID): [Person]', 'allMastersPeople: [Person]', 'allStaffPeople: [Person]'],
    resolvers: {
        allPeople: async (parent, args) => {
            const query = args.cohortYear ? { cohortYear: args.cohortYear, category: 'Masters', } : {};
            return global.keystone.list('Person').model.find(query).exec();
        },
        allStaffPeople: async () => global.keystone.list('Person').model.find({ category: { $in: ['faculty leadership', 'staff'], }, }).exec(),
        allMastersPeople: async () => global.keystone.list('Person').model.find({ category: 'Masters', }).populate('cohortYear').exec(),
    },

};
module.exports = Person;
