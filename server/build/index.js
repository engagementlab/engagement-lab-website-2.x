'use strict';
/**
 * Lab website backend builder
 * Developed by Engagement Lab, 2020
 *
 * @author Johnny Richardson
 *
 * ==========
 */

require('dotenv').load();
const db = require('better-sqlite3')('../engagement-lab.db');

const MakeBuild = async function () {

    // Hook up mongo
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/engagement-lab', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    
    const mongo = mongoose.connection;
    mongo.on('error', console.error.bind(console, 'connection error:'));

        const winston = require('winston');
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.simple(),
            transports: [
                new(winston.transports.Console)({level: 'info'})
            ]
        });

    logger.info('----' + new Date() + '----');

     try {
        db.pragma('journal_mode = WAL');
        const create = db.prepare('CREATE TABLE IF NOT EXISTS projects(key text, body text)');
        create.run();
        require('./routes/projects')(db);
    }
    catch(e) {
        logger.error('Mongo error', e);
    }

   
};

module.exports = MakeBuild();