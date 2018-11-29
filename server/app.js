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
	  var passport = require('passport');
	  var Auth0Strategy = require('passport-auth0');


var app = express();

	// support json encoded bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable view template compilation caching
app.enable('view cache');

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
	{
	  domain: process.env.AUTH0_DOMAIN,
	  clientID: process.env.AUTH0_CLIENT_ID,
	  clientSecret: process.env.AUTH0_CLIENT_SECRET,
	  callbackURL:
		process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
	},
	function (accessToken, refreshToken, extraParams, profile, done) {
	  // accessToken is the token to call Auth0 API (not needed in the most cases)
	  // extraParams.id_token has the JSON Web Token
	  // profile has all the information from the user
	  return done(null, profile);
	}
  );

  passport.use(strategy);
  
  // You can use this section to keep a smaller payload
  passport.serializeUser(function (user, done) {
	done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
	done(null, user);
  });
  

bootstrap.start(
	'./config.json', 
	app,
	__dirname + '/', 
	{
		'signin logo': 'https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,f_auto,w_228/v1543437936/logos/logo-lrg.svg'
	},
	() => {
		app.listen(3000);
	}
);