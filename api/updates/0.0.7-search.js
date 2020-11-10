const { keystone, } = global;
const Project = keystone.list('Project').model;

module.exports = async done => {
    await Project.updateMany({ enabled: true, }, { indexed: true, });

    done();
};
