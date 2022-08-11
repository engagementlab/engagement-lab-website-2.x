import './plugins/keys';
import './plugins/routes';

exports.config = {
    // logFileSeverity: 0,
    inlineStateOnly: true,
    projectRoot: './src',
    projectName: 'elab-web',
    outDir: '../bin/app',
    distFolder: './dist/browser',
    routes: {
        // All studios pages
        '/initiatives/studio/:key': {
            type: 'studios',
        },
        // All studio initiatives pages
        '/initiatives/:key': {
            type: 'studioinitiatives',
        },
        // All grad project pages
        '/curriculum/graduate/projects/:key': {
            type: 'mdprojects',
        },
        // All grad faculty pages
        '/curriculum/graduate/faculty/:key': {
            type: 'gradfaculty',
        },
        // All undergrad faculty pages
        '/curriculum/undergraduate/faculty/:key': {
            type: 'gradfaculty',
        },
        // All grad student/alumni pages
        // '/graduate/students/:key': {
        //     type: 'gradstudents',
        // },
        // All project pages
        '/research/projects/:key': {
            type: 'projects',
        },
        // All event pages
        '/events/:key': {
            type: 'events',
        },
        // All news pages
        '/news/:key': {
            type: 'news',
        },
        // All archive pages
        '/news/archive/:key': {
            type: 'newsarchive',
        },
        // All people
        '/people/:key': {
            type: 'people',
        },
    },
};
