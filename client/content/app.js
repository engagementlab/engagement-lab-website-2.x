
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

'use strict';
const start = (productionMode) => {

  const bootstrap = require('el-bootstrapper');
  const createError = require('http-errors');
  const express = require('express');
  const path = require('path');
  const fs = require('fs');
  const logger = require('morgan');

  // const indexRouter = require('./routes/index');

  const app = express();

  // Mongodb connection
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/engagement-lab', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
  
  const mongo = mongoose.connection;
  mongo.on('error', console.error.bind(console, 'connection error:'));

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // app.use('/', indexRouter(productionMode));

      app.use(function(req, res, next) {
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
      // if (callback) callback();
      // var models_path = __dirname + '/models'
      // fs.readdirSync(models_path).forEach(function (file) {
      //   let a = require(models_path+'/'+file).schema
      //   if(a) mongoose.model(file.replace('.js', ''), a)
      //   console.log(a)
        
      // });
      // logger.info(colors.bgCyan.bold.black('<==== Running Data Builder ====>'));
    },
  );
  
  return app;

}

module.exports = start;
