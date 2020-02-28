
/**
 * Engagement Lab Website v2.x
 * Developed by Engagement Lab, 2018-2020
 * ==============
 * App start
 *
 * @author Johnny Richardson
 *
 * ==========
 */

// Load .env vars
if (process.env.NODE_ENV !== 'test') require('dotenv').load();

const bootstrap = require('el-bootstrapper');
const express = require('express');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const winston = require('winston');
const colors = require('colors');

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
  
logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console()
  ]
});

// Needs be accessible all througout app
// TODO: module?
global.elasti = undefined;

const boot = (callback) => {
  bootstrap.start(
    './config.json',
    app,
    `${__dirname}/`, {
      name: 'Engagement Lab Home CMS',
    },
    () => {
      app.listen(process.env.PORT);

      if (callback) callback();

      logger.info(colors.bgCyan.bold.black('<==== Running Data Builder ====>'));
      require('./build')
    },
  );
};

const searchBoot = () => {
  elasti = new Client({ node: process.env.ELASTISEARCH_NODE_URL });
  elasti.ping((error) => {
    if (error) {
      console.trace('elasticsearch ERROR!', error);
    } else {
      console.log('search cluster running!');
      boot();
    }
  });
};


if (process.env.SEARCH_ENABLED === 'true') searchBoot();
else boot();
