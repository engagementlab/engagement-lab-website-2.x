const keystone = global.keystone;
const Listing = keystone.list('Listing').model,
      Promise = require('bluebird');
mongoose = global.keystone.get('mongoose');

Promise.promisifyAll(mongoose);

module.exports = (done) => {
  
    Listing.find({}).execAsync().then((res) => {
  
        return Promise.each(res, (doc) => {
            return doc.save();
        }).then(() => {
            console.log('Updated models.');
            done();
        });

    });
};