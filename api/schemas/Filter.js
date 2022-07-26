/**
 * Engagement Lab Website v2.x
 *
 * Filter page schema
 * @module filter
 * @class filter
 * @author Ralph Drake
 *
 * ==========
 */
const Filter = {

    schema: `
    type Filter {
      id: ID!
      date: Date
      name: String!
      category: String!
      appears: String!
      key: String
      label: String
    }
  `,
    queries: ['allFilters: [Filter], allCohorts: [Filter]'],
    resolvers: {
        allFilters: async () => global.keystone.list('Filter').model.findOne({}).exec(),
        allCohorts: async () => global.keystone.list('Filter').model.find({
            category: 'Cohort',
        }, 'key label name _id')
            .sort([
                ['key', 'ascending']
            ]).exec(),
    },

};
module.exports = Filter;
