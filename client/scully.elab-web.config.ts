import './plugins/keys';

exports.config = {
    projectRoot: './src',
    projectName: 'elab-web',
    outDir: './dist/static',
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
    },
};
