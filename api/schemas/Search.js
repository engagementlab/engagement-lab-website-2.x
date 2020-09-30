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
	  highlight: SearchHighlight      
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
                        multi_match: {
                            query: `*${nameString}*`,
                            fields: ['_type', 'name', 'key', 'content'],
                        },
                    },
                    highlight: {
                        require_field_match: true,
                        fields: {
                            name: {
                                pre_tags: [
                                    '<mark>'
                                ],
                                post_tags: [
                                    '</mark>'
                                ],
                            },
                            content: {
                                pre_tags: [
                                    '<mark>'
                                ],
                                post_tags: [
                                    '</mark>'
                                ],
                            },
                        },
                    },
                },
            });
            return body ? body.hits.hits : [];
        },

    },

};
module.exports = Search;
