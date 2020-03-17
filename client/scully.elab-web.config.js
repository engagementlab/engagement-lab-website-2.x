exports.config = {
  projectRoot: './src',
  projectName: 'elab-web',
  outDir: './dist/static',
  routes: {
    // All initiative pages
    '/initiatives/:key': {
      type: 'json',
      key: {
        url: 'http://localhost:3000/keys/initiatives',
        property: 'key',
      },
    },
    // All project pages
    '/projects/:key': {
      type: 'json',
      key: {
        url: 'http://localhost:3000/keys/projects',
        property: 'key',
      },
    },
  }
};