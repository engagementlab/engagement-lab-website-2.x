'use strict';
/**
 * Lab website backend builder
 * Developed by Engagement Lab, 2020
 *
 * @author Johnny Richardson
 *
 * ==========
 */

const colors = require('colors');
const db = require('better-sqlite3')('../engagement-lab.db');

const MakeBuild = async function () {

    // Hook up mongo
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/engagement-lab', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    
    const mongo = mongoose.connection;
    mongo.on('error', console.error.bind(console, 'connection error:'));

    logger.info('----' + new Date() + '----');

     try {
        db.pragma('journal_mode = WAL');
        
        require('./routes/homepage')(db, colors);
        require('./routes/projects')(db, colors);
    }
    catch(e) {
        logger.error('Mongo error', e);
    }

   
};

module.exports = MakeBuild();