
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
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// Sqlite db connection, accessible to all 
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(__dirname, '../../' ,'engagement-lab.db'));

app.use(function(req, res, next) {
  res.locals.db = db;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter(productionMode, db));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
return app;
}

module.exports = start;
