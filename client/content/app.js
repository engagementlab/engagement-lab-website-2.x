
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


const bootstrap = require('el-bootstrapper');
const mongoose = require('mongoose');
const express = require('express');
const winston = require('winston');
const colors = require('colors');

const start = (productionMode) => {
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

  // Mongodb connection
  mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

  const mongo = mongoose.connection;
  mongo.on('error', console.error.bind(console, 'connection error:'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // app.use('/', indexRouter(productionMode));

  app.use((req, res, next) => {
    res.locals.db = global.keystone;
    next();
  });

  bootstrap.start(
    './config.json',
    app,
    `${__dirname}/`, {
      name: 'Engagement Lab Home CMS',
    },
    () => {
      global.logger.info(colors.bgCyan.bold.black(`Content API started (${productionMode ? 'Production' : 'Development'} Mode).`));
    },
  );

  return app;
};

module.exports = start;
