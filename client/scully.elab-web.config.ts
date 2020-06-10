import './plugins/initiatives';
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
            type: 'json',
            key: {
                url: 'http://localhost:3000/keys/events',
                property: 'key',
            },
        },
        // All project pages
        '/projects/:key': {
            type: 'projects',
        },
    },
};
