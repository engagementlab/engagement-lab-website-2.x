import './plugins/keys';
import './plugins/routes';

exports.config = {
    // logFileSeverity: 0,
    puppeteerLaunchOptions: {
        headless: false,
        devTools: true,
        slowMo: 500,
    },
    inlineStateOnly: true,
    projectRoot: './src',
    projectName: 'elab-web',
    outDir: '../bin/app',
    distFolder: './dist/browser',
    routes: {
        // All studios pages
        '/studios/studio/:key': {
            type: 'studios',
        },
        // All grad project pages
        '/graduate/projects/:key': {
            type: 'mdprojects',
        },
        // All grad faculty pages
        '/graduate/faculty/:key': {
            type: 'gradfaculty',
        },
        // All grad student/alumni pages
        '/graduate/students/:key': {
            type: 'gradstudents',
        },
        // All project pages
        '/research/projects/:key': {
            type: 'projects',
        },
        // All initiative pages
        '/research/initiatives/:key': {
            type: 'initiatives',
        },
        // All event pages
        '/events/:key': {
            type: 'events',
        },
        // All people
        '/people/:key': {
            type: 'people',
        },
    },
};
