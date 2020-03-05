'use strict';
/**
 * Lab website backend builder
 * Developed by Engagement Lab, 2020
 *
 * @author Johnny Richardson
 *
 * ==========
 */

const keystone =  global.keystone,
    Project = keystone.list('Project').model;

var buildData = async (db) => {

    let fields = 'key image.public_id byline name featured archived projectType customUrl sortOrder ' +
                 '_id description challengeTxt strategyTxt resultsTxt externalLinkUrl githubUrl projectImages files showFiles';
    let data = Project.find({
                    enabled: true
                }, fields)
                .populate('principalInvestigator')
                .populate({
                     path: 'format',
                     select: 'name -_id'
                 })
                .populate({
                    path: 'files',
                    select: 'name file.filetype file.url fileSummary.html'
                });

    // Execute
    try {

        const create = db.prepare('CREATE TABLE IF NOT EXISTS projects(key text, body text)');
        create.run();
        db.prepare('DELETE FROM projects').run();

        let results = await data.exec();
        let stmt = db.prepare("INSERT INTO projects (key, body) VALUES (@key, @body)");
        
        let insert = db.transaction(res => {
            results.forEach(result => {
            
            let json = JSON.stringify(result);
            let id = result.customUrl || result.key;
    
            stmt.run({key:id, body:json});

            logger.info(colors.bgBrightCyan.black('<====== Data: Projects table done ======>'));
        
            });
        });
        insert(results);

    }
    catch (err) {
        console.log(err);
        return res.status(400);
    }

}

const Save = async function (db) {

    buildData(db);

};

module.exports = Save;
