/**
 * Lab website backend builder
 * Developed by Engagement Lab, 2020
 *
 * @author Johnny Richardson
 *
 * ==========
 */

const colors = require('colors');
const winston = require('winston');
const db = require('better-sqlite3')('../engagement-lab.db');

const MakeBuild = async function () {
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

  // Hook up mongo
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/engagement-lab', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

  const mongo = mongoose.connection;
  mongo.on('error', console.error.bind(console, 'connection error:'));

  logger.info(`----${new Date()}----`);

  try {
    db.pragma('journal_mode = WAL');

    require('./routes/homepage')(db, colors, mongoose);
    // require('./routes/projects')(db, mongoose, colors);
  } catch (e) {
    logger.error('Mongo error', e);
  }
};

module.exports = MakeBuild();
