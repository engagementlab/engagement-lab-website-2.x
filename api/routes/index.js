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
    const { keystone, } = global;
    const router = express.Router();
    const productionMode = process.argv.slice(2)[0] && process.argv.slice(2)[0] === 'prod';

    const importRoutes = keystone.importer(__dirname);

    // Import Route Controllers
    const routes = {
        get: importRoutes('./get'),
    };

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

    router.post('/post/contact', routes.get.contact.send);
    router.post('/api/post/newsletter/:email', routes.get.newsletter.signup);

    // Error
    router.get('*', (req, res) => {
        res.status(500).send(`No route found for path ${req.url}.`);
    });

    return router;
};

module.exports = Routes();
