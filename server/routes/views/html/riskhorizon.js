'use strict';
/**
 * Engagement Lab Website v2.x
 * Developed by Engagement Lab, 2016
 * ==============
 * 'Risk Horizon' static site view.
 *
 * @module html
 * @author Johnny Richardson
 *
 * ==========
 */
var path = require('path');

exports = module.exports = function(req, res) {

    // Render the view
    res.sendFile('templates/html/riskhorizon.html', {root: path.join(__dirname, '../../../') });

};
