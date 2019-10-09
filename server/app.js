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
	express = require('express'),
	elasticsearch = require('elasticsearch');

// Needs be accessible all througout app 
// TODO: module?
global.elasti = undefined;

const { keystone, apps } = require('./keystone');

const boot = (callback) => {

	keystone.prepare({ apps, dev: process.env.NODE_ENV !== 'production' })
	.then(async ({ middlewares }) => {
		await keystone.connect();
		const app = express();
		app.use(middlewares);

		app.listen(process.env.PORT);
	})
	.catch(error => {
		console.error(error);
	});

};

const search = () => {

	if (process.env.NODE_ENV === 'development') {
		elasti = new elasticsearch.Client({
			host: 'localhost:9200'
		});
		// global.elasti = elasti;

		elasti.ping({
			// ping usually has a 3000ms timeout
			requestTimeout: 1000
		}, function (error) {
			if (error) {
				console.trace('elasticsearch ERROR!', error);
			} else {
				console.log('search cluster running!');
/* 				elasti.indices.create({
					index: 'publications'
				}, function (err, resp, status) {
					if (err) {
						// console.log(err);
					} else {
						console.log("create", resp);
					}
				});
				*/
			}
			boot();
		});
	}

}
/* 
if (process.env.NODE_ENV === 'development')
	search();
else */
	boot();