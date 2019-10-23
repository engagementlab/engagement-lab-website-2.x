const keystone = global.keystone;
const Model = keystone.list('Event').model,
      Promise = require('bluebird');
mongoose = global.keystone.get('mongoose');

Promise.promisifyAll(mongoose);

module.exports = (done) => {
  
    Model.find({}).execAsync().then((res) => {
  
        return Promise.each(res, (doc) => {
            return doc.save();
        }).then(() => {
            console.log('Updated models.');
            done();
        });

    });
};