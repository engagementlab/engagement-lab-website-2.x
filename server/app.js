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
if (process.env.NODE_ENV !== 'test')
	require('dotenv').load();

const bootstrap = require('@engagementlab/el-bootstrapper'),
	express = require('express');
const { Client } = require('@elastic/elasticsearch')

var app = express();
// Needs be accessible all througout app 
// TODO: module?
global.elasti = undefined;

const boot = (callback) => {
	bootstrap.start(
		'./config.json',
		app,
		__dirname + '/', {
			'name': 'Engagement Lab Home CMS'
		},
		() => {

			app.listen(process.env.PORT);

			if(callback)
				callback();

		}
	);
};

const searchBoot = () => {

	elasti = new Client({ node: process.env.ELASTISEARCH_NODE_URL });
	elasti.ping(function (error) {
		if (error) {
			console.trace('elasticsearch ERROR!', error);
		} else {
			console.log('search cluster running!');
			boot();
		}
	});

}

if (process.env.NODE_ENV === 'development')
	searchBoot();
else
	boot();