'use strict';
/**
 * Lab website backend builder
 * Developed by Engagement Lab, 2020
 *
 * @author Johnny Richardson
 *
 * ==========
 */

const keystone =  global.keystone;

var buildData = async (db, colors) => {
    
    const initiative = keystone.list('Initiative').model;
    const project = keystone.list('Project').model;
    const event = keystone.list('Event').model;
    const about = keystone.list('About').model;

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

    // Execute sql
    try {
        const create = db.prepare('CREATE TABLE IF NOT EXISTS homepage(body text)');
        create.run();
        db.prepare('DELETE FROM homepage').run();

        let json = JSON.stringify(data);
        let stmt = db.prepare("INSERT INTO homepage (body) VALUES (?)")
        stmt.run(json);

        logger.info(colors.bgBrightCyan.black('<====== Data: Homepage table done ======>'));
    }
    catch (err) {
        throw new Error(err);
    }

}

module.exports = buildData;
