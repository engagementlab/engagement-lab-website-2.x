/**
 * Engagement Lab Website v2.x
 *
 * PartnerIntro page schema
 * @module partnerintro
 * @class partnerintro
 * @author Johnny Richardson
 *
 * ==========
 */
const PartnerIntro = {

    schema: `
    type PartnerIntro {
      id: ID!
      intro: Markdown
      summary1: String
      summary2: String
      image: Image!
    }
  `,
    queries: ['allPartnerIntroPages: PartnerIntro'],
    resolvers: {
        allPartnerIntroPages: async () => global.keystone.list('PartnerIntro').model.findOne({}).exec(),
    },

};
module.exports = PartnerIntro;
