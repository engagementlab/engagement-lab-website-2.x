const keystone = global.keystone;
const express = require('express');
var router = express.Router();
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('render', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    api: importRoutes('./api'),
    views: importRoutes('./views')
};

// Views
router.get('/', routes.views.index);

router.get('/unlockinghealth', routes.views.html.unlockinghealth);
router.get('/riskhorizon', routes.views.html.riskhorizon);
router.get('/cmp', routes.views.html.cmp);

router.get('/about', routes.views.about);
router.get('/jobs', routes.views.jobs);
router.get('/people', routes.views.people);
router.get('/privacy', routes.views.privacy);
router.get('/people/:person', routes.views.person);

router.get('/publications', routes.views.projects.publications);
router.get('/publications/:publication_key', routes.views.projects.publication);

// Redirect projects to /all
router.all('/projects/', routes.views.projects.projectsAll);
router.get('/projects/:project_key', routes.views.projects.project);
router.get('/projects/:subdirectory*?/:project_key', function(req, res, next) {
  res.redirect('/projects/' + req.params.project_key);
  next();
});

router.get('/cmap', routes.views.cmap);
router.get('/cmap/alumni', routes.views.alumni);

router.get('/press', routes.views.press);

router.all('/tamagagement', routes.views.tamagagement);

// CommunityPlanIt redirect (boston.communityplanit.org)
router.all('/climatesmartboston', function(req, res, next) {
    res.redirect('https://www.communityplanit.org/bostonclimate/');
});
router.all('/api/cpi/register', keystone.middleware.api, routes.api.communityplanit.create);
router.all('/api/tv/get', [keystone.middleware.api, keystone.middleware.cors], routes.api.tv.get);

// Participatory Pokémon Go redirect
router.all('/pokemon', function(req, res, next) {
    res.redirect('https://elab.us.launchpad6.com/');
});

module.exports = router;