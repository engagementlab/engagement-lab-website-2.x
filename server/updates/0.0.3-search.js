const keystone = global.keystone;
const Event = keystone.list('Event').model,
Promise = require('bluebird');
mongoose = global.keystone.get('mongoose');

Promise.promisifyAll(mongoose);

module.exports = (done) => {
  
    Event.find({}).execAsync().then((res) => {
  
        return Promise.each(res, (doc) => {
            return doc.save();
        }).then(() => {
            done();
        });
    });
    
};