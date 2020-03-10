
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
  router.get('/get/homepage', routeIncludes, routes.get.homepage);
  router.get('/get/projects', routes.get.project.data);
  router.get('/get/projects/:key', routes.get.project.data);

  router.get('/keys/projects', routes.get.project.keys);

  // router.get('/get/team/get', routeIncludes, routes.api.team.get);
  // router.get('/get/team/get/:person_key?', routeIncludes, routes.api.team.get);
  // router.get('/get/initiative/get/:key', routeIncludes, routes.api.initiative.get);


  // router.get('/get/projects/get/archived/', routeIncludes, routes.api.projects.archived);
  // router.get('/get/projects/get/:project_key?', routeIncludes, routes.api.projects.get);


  // router.get('/get/publications/get/:project_key?', routeIncludes, routes.api.publications.get);
  // router.get('/get/events/get/:key?', routeIncludes, routes.api.events.get);
  // router.get('/get/contact/get', routeIncludes, routes.api.contact.get);
  // router.get('/get/jobs/get', routeIncludes, routes.api.jobs.get);
  // router.get('/get/masters/get', routeIncludes, routes.api.masters.get);

  return router;
};

module.exports = Routes();
