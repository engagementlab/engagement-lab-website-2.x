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
    api: importRoutes('./api')
};
let routeIncludes = [keystone.middleware.api, keystone.middleware.cors];

// router.get('/unlockinghealth', routes.views.html.unlockinghealth);
// router.get('/riskhorizon', routes.views.html.riskhorizon);
// router.get('/cmp', routes.views.html.cmp);

// router.get('/about', routes.views.about);
// router.get('/jobs', routes.views.jobs);
// router.get('/people', routes.views.people);
// router.get('/privacy', routes.views.privacy);
// router.get('/people/:person', routes.views.person);

// router.get('/publications', routes.views.projects.publications);
// router.get('/publications/:publication_key', routes.views.projects.publication);

// // Redirect projects to /all
// router.all('/projects/', routes.views.projects.projectsAll);
// router.get('/projects/:project_key', routes.views.projects.project);
// router.get('/projects/:subdirectory*?/:project_key', function(req, res, next) {
//   res.redirect('/projects/' + req.params.project_key);
//   next();
// });

// router.get('/cmap', routes.views.cmap);
// router.get('/cmap/alumni', routes.views.alumni);

// router.get('/press', routes.views.press);

// router.all('/tamagagement', routes.views.tamagagement);

// // CommunityPlanIt redirect (boston.communityplanit.org)
// router.all('/climatesmartboston', function(req, res, next) {
//     res.redirect('https://www.communityplanit.org/bostonclimate/');
// });

// Setup Route Bindings 
// CORS
router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD, PUT');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method");
    
    if(req.method === 'OPTIONS')
        res.send(200);
    else
        next();

});

router.get('/api/homepage/get', routeIncludes, routes.api.home.get);
router.get('/api/about/get', routeIncludes, routes.api.about.get);
router.get('/api/team/get', routeIncludes, routes.api.team.get);
router.get('/api/team/get/:person_key?', routeIncludes, routes.api.team.get);
router.get('/api/initiative/get/:key', routeIncludes, routes.api.initiative.get);
router.get('/api/projects/get/:project_key?', routeIncludes, routes.api.projects.get);
router.get('/api/publications/get/:project_key?', routeIncludes, routes.api.publications.get);
router.get('/api/events/get/:event_key?', routeIncludes, routes.api.events.get);
router.get('/api/contact/get', routeIncludes, routes.api.contact.get);
router.get('/api/jobs/get', routeIncludes, routes.api.jobs.get);
router.get('/api/masters/get', routeIncludes, routes.api.masters.get);

router.all('/api/tv/get', routeIncludes, routes.api.tv.get);

module.exports = router;