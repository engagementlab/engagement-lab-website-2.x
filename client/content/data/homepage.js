
const BuildData = async (mongo) => {
    
    const initiative = mongo.model('Initiative');
    const project = mongo.model('Project');
    const event = mongo.model('Event');
    const about = mongo.model('About');

    const projectFields = 'name image.public_id key projectType byline -_id';
    const eventFields = 'name date key -_id';
    const initiativeFields = 'name description image.public_id key projects -_id';

    // Get initiatives
    const initiativeData = initiative.find({}, initiativeFields).sort([
        ['sortOrder', 'ascending'],
    ])
    .populate({
    path: 'projects',
    select: 'name key -_id',
    options: { limit: 3, sort: 'name' },
    });
    // Get a couple featured projects
    const projectData = project.find({ featured: true }, projectFields).limit(2);
    // Get 3 events most recent by date
    const eventData = event.find({ enabled: true }, eventFields).sort([
        ['date', 'descending'],
    ]).limit(3);
    // Get tagline
    const taglineData = about.findOne({}, 'tagline -_id');

    let tagLineExec = await taglineData.exec();
    const data = {
        initiatives: await initiativeData.exec(),
        projects: await projectData.exec(),
        events: await eventData.exec(),
        tagline: tagLineExec.tagline
    };

    return data;

};
module.exports = BuildData;