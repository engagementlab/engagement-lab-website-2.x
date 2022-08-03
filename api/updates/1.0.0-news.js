const path = require('path');
const fs = require('fs');

const { keystone, } = global;
const Blog = keystone.list('Blog').model;

module.exports = async done => {
    const files = fs.readdirSync(path.join(process.cwd(), 'medium'));

    // console.log('\nCurrent directory filenames:');
    files.map(file => {
        if (file.endsWith('.md')) {
            console.log(`Creating "${file}"`);
            // Get date from file name
            const postDate = file.match(/(\d{4})-(\d{2})-(\d{2})/gm)[0].split('-');
            const datePosted = new Date(postDate[0], postDate[1] - 1, postDate[2]).getTime();

            const content = fs.readFileSync(path.join(process.cwd(), 'medium', file), 'utf-8');
            // Get title from body
            const title = content.match(/#.*\n{1}$/gm)[0].split('# ')[1].replace(/[_*]+/gm, '');
            const body = content.replace(`# ${title}`, '');

            const post = new Blog({
                title, body: { md: body, }, datePosted, enabled: true,
            });
            return post.save();
        }
    });

    await Promise.all(files);

    done();
};
