const keystone = global.keystone;
const Listing = keystone.list('Listing').model,
Promise = require('bluebird');
mongoose = global.keystone.get('mongoose');

Promise.promisifyAll(mongoose);

module.exports = (done) => {
  
            
    Listing.find({}).execAsync().then((listings) => {
        
        return Promise.each(listings, (listingDoc) => {
            return listingDoc.save();
        }).then(() => {
            console.log('Updated listings.');
            done();
        });
        
    });

};