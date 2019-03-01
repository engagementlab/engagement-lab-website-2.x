'use strict';
/**
 * Engagement Lab Website v2.x
 * Developed by Engagement Lab, 2018
 * ==============
 * App start
 *
 * @author Johnny Richardson
 *
 * ==========
 */

// Load .env vars
if(process.env.NODE_ENV !== 'test')
	require('dotenv').load();

const bootstrap = require('@engagementlab/el-bootstrapper'),
	  express = require('express'),
	  elasticsearch = require('elasticsearch');


var app = express();
bootstrap.start(
	'./config.json', 
	app,
	__dirname + '/', 
	{
		'name': 'Engagement Lab Home CMS'
	},
	() => {

		app.listen(process.env.PORT);

		if(process.env.NODE_ENV === 'development'){
			var client = new elasticsearch.Client({
				host: 'localhost:9200',
				log: 'trace'
			});

			client.ping({
				// ping usually has a 3000ms timeout
				requestTimeout: 1000
			}, function (error) {
				if (error) {
				console.trace('elasticsearch cluster is down!');
				} else {
				console.log('All is well');
				}
			});
		}

	}
);