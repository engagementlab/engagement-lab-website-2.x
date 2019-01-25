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

const bootstrap = require('el-bootstrapper'),
			express = require('express');


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
	}
);