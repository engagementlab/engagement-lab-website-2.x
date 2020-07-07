import './plugins/keys';

exports.config = {
    // logFileSeverity: 0,
    // inlineStateOnly: false,
    projectRoot: './src',
    projectName: 'elab-web',
    outDir: '../bin/app',
    routes: {
        // All initiative pages
        '/initiatives/:key': {
            type: 'initiatives',
        },
        // All event pages
        '/events/:key': {
            type: 'events',
        },
        // All project pages
        '/projects/:key': {
            type: 'projects',
        },
        // All people
        '/people/:key': {
            type: 'people',
        },
    },
};
