const { keystone, } = global;
const Studio = keystone.list('Studio').model;

// Move all students under collaborators
module.exports = async done => {
    const allStudios = await Studio.find({});

    allStudios.forEach(async element => {
        const studioEntry = await Studio.findOne({ key: element.key, });
        const studio = studioEntry._doc;
        // console.log(studio.key, Object.keys(studio._doc));
        const studentsMergedHtml = `<li>${studio.students.join('</li>\n<li>')}</li>`;
        const studentsMergedMd = `${studio.students.join('\r\n- ')}`;

        if (studio.collaborators && studio.collaborators.html.length > 0 && typeof studio.collaborators.html === 'string') {
            const newCollabHtml = `${`${studio.collaborators.html.substring(0, studio.collaborators.html.indexOf('</ul>'))}\n${studentsMergedHtml}`}</ul>\n`;
            const newCollabMd = `${studio.collaborators.md} \n- ${studentsMergedMd}`;

            const collaborators = {
                html: newCollabHtml, md: newCollabMd,
            };
            // studioEntry.save();
            await Studio.updateOne({ key: studio.key, }, { collaborators, });
        }
    });

    done();
};
