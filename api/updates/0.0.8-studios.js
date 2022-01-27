const { keystone, } = global;
const Studio = keystone.list('Studio').model;

// Move all students under collaborators
module.exports = async done => {
    const allStudios = await Studio.find({});

    allStudios.forEach(async element => {
        const studio = await Studio.findOne({ key: element.key, });
        const studentsMergedHtml = `<li>${studio.students.join('</li>\n<li>')}</li>`;
        const studentsMergedMd = `${studio.students.join('\r\n- ')}`;

        if (studio.collaborators && studio.collaborators.html.length > 0 && typeof studio.collaborators.html === 'string') {
            const newCollabHtml = `${`${studio.collaborators.html.substring(0, studio.collaborators.html.indexOf('</ul>'))}\n${studentsMergedHtml}`}</ul>\n`;
            const newCollabMd = `${studio.collaborators.md} \n- ${studentsMergedMd}`;

            studio.collaborators = {
                html: newCollabHtml, md: newCollabMd,
            };
            studio.save();
        }
    });

    done();
};
