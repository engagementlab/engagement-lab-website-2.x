const express = require('express')
const router = express.Router();

// Setup Route Bindings
// CORS
router.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1864');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD, PUT');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method');

  if (req.method === 'OPTIONS') res.send(200);
  else next();
});

router.get('/get/homepage', require('./get/home'));
router.get('/get/projects', require('./get/projects'));
// router.get('/get/about/get', routeIncludes, routes.api.about.get);
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

module.exports = router;
