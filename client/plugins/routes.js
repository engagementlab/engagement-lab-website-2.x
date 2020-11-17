const fs = require('fs');
const {
  registerPlugin
} = require('@scullyio/scully');

/**
 * Creates a pa11y config file w/ all routes discovered by Scully build
 * @function
 * @param {Array} routes - all routes in app
 */
const createPa11yConfig = (routes) => {

  let allRoutes = [];
  routes.forEach(e => {
    allRoutes.push(`"https://qa.elab.emerson.edu${
        e.route === '' ? '/' : e.route
    }"`);
  });

  let config = `{
        "urls":  [${allRoutes}]
    }`;

  if (fs.existsSync('.pa11yci'))
    fs.unlinkSync('.pa11yci');

  fs.writeFileSync('.pa11yci', config);

};

const validator = async (config) => [];
registerPlugin('routeDiscoveryDone', 'allRoutes', createPa11yConfig, validator);
