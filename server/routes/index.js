/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to hrouteren for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#router.VERB
 */

const keystone = global.keystone;
const express = require('express');
const passport = require('passport');
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

// keystone redirect
// Perform the login, after login Auth0 will redirect to callback
router.get('/keystone', passport.authenticate('auth0', {
    scope: 'openid email profile'
  }), function (req, res) {
    res.redirect('/');
  });

  router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/cms'); }
      req.logIn(user, function (err) {
        //   console.log('user',user)
        if (err) { return next(err); }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;

        res.redirect(returnTo || '/cms');
      });
    })(req, res, next);
  });

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
router.get('/authenticate', function (req, res, next) {
    // const { _raw, _json, ...userProfile } = req.user;
    console.log(req.session.passport.user)
  });

// Participatory Pokémon Go redirect
router.all('/pokemon', function(req, res, next) {
    res.redirect('https://elab.us.launchpad6.com/');
});

// // Dynamic directory routes
// router.get('/:directory', routes.views.directory);
// router.get('/:directory/:subdirectory', routes.views.subdirectory);

module.exports = router;