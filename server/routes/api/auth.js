/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015-2018
 * ==============
 * TV model API controller.
 *
 * Help: https://gist.github.com/JedWatson/9741171
 *
 * @class tv
 * @author Johnny Richardson
 *
 * ==========
 */
const async = require('async')
	  keystone = global.keystone;

var TV = keystone.list('TV');

/**
 * Get all TV Content
 */
exports.get = function(req, res) {

    console.log(req.user)
};
