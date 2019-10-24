const keystone = global.keystone;
const Event = keystone.list('Event').model,
      Listing = keystone.list('Listing').model,
Promise = require('bluebird');
mongoose = global.keystone.get('mongoose');

Promise.promisifyAll(mongoose);

module.exports = (done) => {
  
    Event.find({}).execAsync().then((res) => {
  
        return Promise.each(res, (doc) => {
            return doc.save();
        }).then(() => {
            console.log('Updated events.');
            
            Listing.find({}).execAsync().then((res) => {
                
                return Promise.each(res, (doc) => {
                    return doc.save();
                }).then(() => {
                    console.log('Updated listings.');
                    done();
                });
                
            });

        });
    });
};