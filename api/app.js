#!/usr/bin/env node;

/**
 * Engagement Lab Website v2.x content service
 * Developed by Engagement Lab, 2020
 * ==============
 * App start
 *
 * @author Johnny Richardson
 * @author Ralph Drake
 *
 * ==========
 */


/**
 * Module dependencies.
 */
// Load .env vars
require('dotenv').config();

const express = require('express');
const winston = require('winston');
const colors = require('colors');
const elasticsearch = require('elasticsearch');
const ServerUtils = require('./utils');

const keystone = require('./keystone');
const routes = require('./routes');

const start = () => {
  /**
 * Get port from environment and store in Express.
 */

  const productionMode = process.argv.slice(2)[0] && process.argv.slice(2)[0] === 'prod';
  const app = express();

  const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;

      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
  );

  global.logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
      new winston.transports.Console(),
    ],
  });
  global.elasti = undefined;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  if (process.env.SEARCH_ENABLED === 'true') searchBoot(app);
  else boot(app, productionMode);
};

const boot = (app, productionMode) => {
  keystone((middleware, keystoneInstance) => {
    const port = ServerUtils.normalizePort(process.env.PORT || '3000');

    app.use((req, res, next) => {
      res.locals.db = keystoneInstance;
      next();
    });

    // Load all routes for api
    routes(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    app.use(middleware).listen(port);
    global.logger.info(colors.bgCyan.bold.black(`Content API started (${productionMode ? 'Production' : 'Development'} Mode).`));
  });
};

const searchBoot = (app) => {
  global.elasti = new elasticsearch.Client({ node: process.env.ELASTISEARCH_NODE_URL });
  global.elasti.ping((error) => {
    if (error) {
      global.logger.error('Elasticsearch ERROR!', error);
    } else {
      global.logger.info(colors.bgGray.yellow(`Search cluster running at ${process.env.ELASTISEARCH_NODE_URL}`));
      boot(app);
    }
  });
};

module.exports = start();
