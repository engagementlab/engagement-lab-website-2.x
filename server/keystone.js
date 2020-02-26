const { Keystone } = require('@keystone-alpha/keystone');
const { MongooseAdapter } = require('@keystone-alpha/adapter-mongoose');
const { GraphQLApp } = require('@keystone-alpha/app-graphql');
const { AdminUIApp } = require('@keystone-alpha/app-admin-ui');

const { GoogleAuthStrategy } = require('@keystone-alpha/auth-passport');
const { PasswordAuthStrategy } = require('@keystone-alpha/auth-password');
const { Text } = require('@keystone-alpha/fields');

const isDocker = require('is-docker');

const mongoUri = `mongodb://${isDocker() ? 'host.docker.internal' : 'localhost'}/engagement-lab`;
console.log('[Docker] mongoUri: ', mongoUri);

const cookieSecret = process.env.COOKIE_SECRET;
const keystone = new Keystone({
  name: 'Engagement Lab',
  adapter: new MongooseAdapter({
    mongoUri,
  }),
  cookieSecret,
});

// keystone.createList('Todo', {
//   fields: {
//     name: { type: Text },
//   },
// });


keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: { type: Text },

    // This field name must match the `idField` setting passed to the auth
    // strategy constructor below
    googleId: { type: Text },
  },
});


const googleStrategy = keystone.createAuthStrategy({
  type: GoogleAuthStrategy,
  list: 'User',
  config: {
    idField: 'googleId',
    appId: process.env.GOOGLE_CLIENT_ID,
    appSecret: process.env.GOOGLE_CLIENT_SECRET,
    loginPath: '/auth/',
    callbackPath: '/auth/callback',

    // Once a user is found/created and successfully matched to the
    // googleId, they are authenticated, and the token is returned here.
    // NOTE: By default KeystoneJS sets a `keystone.sid` which authenticates the
    // user for the API domain. If you want to authenticate via another domain,
    // you must pass the `token` as a Bearer Token to GraphQL requests.
    onAuthenticated: ({ token, item, isNewItem }, req, res) => {
      debugger;
      console.log('Authenticated', token);
      res.redirect('/');
    },

    // If there was an error during any of the authentication flow, this
    // callback is executed
    onError: (error, req, res) => {
      console.error(error);
      res.redirect('/?error=Uh-oh');
    },
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username', // default: 'email'
    secretField: 'password', // default: 'password'
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    // Setup the optional Admin UI
    new AdminUIApp({ adminPath: '/cms', authStrategy: googleStrategy }),
  ],
};
