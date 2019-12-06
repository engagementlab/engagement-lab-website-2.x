const keystone = global.keystone;
const Publication = keystone.list('Publication').model;

module.exports = async (done) => {
  
    let res = await Publication.find({});
    // console.log(res)

    // res.forEach(doc => {
    //     doc.save();
    // });
    
    done();

};