
/**
 * Developed by Engagement Lab, 2018-2019
 * ==============
 * Route to search all models
 * @class search
 * @author Johnny Richardson
 *
 * ==========
 */

/*
 * Query elastisearch cluster
 */

async function find(nameString, res) {
  try {
    const {
      body,
    } = await elasti.search({
      index: ['listing', 'event', 'publication'],
      body: {
        query: {
          query_string: {
            query: `${nameString}*`,
            fields: ['_type', 'name', 'key', 'content'],
          },
        },
        highlight: {
          require_field_match: true,
          fields: {
            name: {
              pre_tags: [
                '<mark>',
              ],
              post_tags: [
                '</mark>',
              ],
            },
            content: {
              pre_tags: [
                '<mark>',
              ],
              post_tags: [
                '</mark>',
              ],
            },
          },
        },
      },
    });
    res.status(200).json({
      status: 200,
      data: body.hits.hits,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.trace(error.message);
  }
}

exports.all = (req, res) => {
  find(req.params.string, res);
};
