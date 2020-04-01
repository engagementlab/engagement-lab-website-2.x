
/**
 * Engagement Lab Website v2.x content service
 * Developed by Engagement Lab, 2020
 *
 * @author Johnny Richardson
 * Content API routing
 * ==========
 */

const express = require('express');

const Routes = () => {
  const { keystone } = global;
  const router = express.Router();
  const productionMode = process.argv.slice(2)[0] && process.argv.slice(2)[0] === 'prod';

  const importRoutes = keystone.importer(__dirname);

  // Import Route Controllers
  const routes = {
    get: importRoutes('./get'),
  };
  const routeIncludes = [keystone.middleware.api, keystone.middleware.cors];

  // Setup Route Bindings
  // CORS
  const corsPort = productionMode ? 1864 : 4200;

  router.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', `http://localhost:${corsPort}`);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD, PUT');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method');

    if (req.method === 'OPTIONS') res.send(200);
    else next();
  });

  router.get('/get/about', routeIncludes, routes.get.about);
  router.get('/get/events/:key?', routes.get.event.data);
  router.get('/get/homepage', routeIncludes, routes.get.homepage);
  router.get('/get/initiative/:key', routes.get.initiative.data);
  router.get('/get/contact', routes.get.contact);
  router.get('/get/jobs', routes.get.jobs);
  router.get('/get/masters/:key?', routes.get.masters);
  router.get('/get/privacy', routes.get.privacy);
  router.get('/get/projects/:key?', routes.get.project.data);
  router.get('/get/publications/:key?', routes.get.publication.data);

  router.get('/get/search/:string', routes.get.search);
  router.get('/get/team/:key?', routes.get.team.data);

  router.get('/keys/events', routes.get.event.keys);
  router.get('/keys/initiatives', routes.get.initiative.keys);
  router.get('/keys/projects', routes.get.project.keys);
  router.get('/keys/publications', routes.get.publication.keys);
  router.get('/keys/team', routes.get.team.keys);

  // Error
  router.get('*', (req, res) => {
    res.status(500).send(`No route found for path ${req.url}.`);
  });

  return router;
};

module.exports = Routes();
