/**
 * Engagement Lab Website v2.x
 * Developed by Engagement Lab, 2018
 * ==============
 * App utilities
 *
 * @author Johnny Richardson
 *
 * ==========
 */

// TODO: Make npm package
const validator = require('validator');

const urlValidator = {
  validator(val) {
    return !val || validator.isURL(val, {
      protocols: ['http', 'https'],
      require_tld: true,
      require_protocol: false,
      allow_underscores: true,
    });
  },
  msg: 'Invalid link URL (e.g. needs http:// and .abc/)',
};

exports.url = urlValidator;
