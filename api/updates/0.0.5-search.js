const { keystone } = global;
const Publication = keystone.list('Publication').model;

module.exports = async (done) => {
  const res = await Publication.find({});
  // console.log(res)

  // res.forEach(doc => {
  //     doc.save();
  // });

  done();
};
