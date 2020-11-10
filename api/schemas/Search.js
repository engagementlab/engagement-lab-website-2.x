/**
 * Engagement Lab Website v2.x
 *
 * Search page schema
 * @module about
 * @class about
 * @author Johnny Richardson
 *
 * ==========
 */

const Search = {

    schema: `
    type SearchResult {
      _index: String
	  _type: String
	  _score: Float
	  _source: SearchContent
    }
  `,
    queries: ['searchQuery(term: String): [SearchResult]'],
    resolvers: {
        searchQuery: async (parent, args) => {
            const nameString = args.term;
            const {
                body,
            } = await global.elasti.search({
                index: 'listing',
                body: {
                    query: {
                        query_string: {
                            query: `*${nameString}*`,
                            fields: ['_type', 'name', 'key', 'content'],
                        },
                    },
                },
            });
            return body ? body.hits.hits : [];
        },

    },

};
module.exports = Search;
