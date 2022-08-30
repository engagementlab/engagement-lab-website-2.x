const { keystone, } = global;
const Person = keystone.list('Person').model;

module.exports = async done => {
    const allPersons = await Person.find({});

    allPersons.forEach(async element => {
        await Person.updateOne({ key: element.key, }, { enabled: true, });
    });

    done();
};
