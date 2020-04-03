const { Keystone } = require('@keystonejs/keystone');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');

const cloudinaryAdapter = new CloudinaryAdapter({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: process.env.CLOUDINARY_DIR,
});

const KeystoneApp = (callback) => {
  // The core `keystone` instance is always required.
  // Here you can setup the database adapter, set the name used throughout the
  // application (Admin UI, database name, etc), and other core config options.
  const keystone = new Keystone({
    name: process.env.APP_NAME,
    adapter: new MongooseAdapter(),
  });

  // TODO: Load all ./models in one call
  // All models need access to KS Instance and cloudinary adapter
  require('./models/About')(keystone, cloudinaryAdapter);
  require('./models/Image')(keystone, cloudinaryAdapter);

  keystone
    .prepare({
      apps: [new GraphQLApp({
      }), new AdminUIApp({ adminPath: '/cms' })],
      dev: process.env.NODE_ENV !== 'production',
    })
    .then(async ({ middlewares }) => {
      await keystone.connect();
      callback(middlewares, keystone);
    });
};

module.exports = KeystoneApp;
