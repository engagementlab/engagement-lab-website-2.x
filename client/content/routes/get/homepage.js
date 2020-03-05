'use strict';
/**
 * Lab website backend builder
 * Developed by Engagement Lab, 2020
 *
 * @author Johnny Richardson
 *
 * ==========
 */
const BuildData = async (req, res) => {
    
    const db = res.locals.db;
    const initiative = db.list('Initiative').model;
    const project = db.list('Project').model;
    const event = db.list('Event').model;
    const about = db.list('About').model;

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

    res.json(data);

}

module.exports = (req, res) => BuildData(req, res);
