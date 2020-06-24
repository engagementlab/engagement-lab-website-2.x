const axios = require('axios');
const { registerPlugin } = require('@scullyio/scully');

const queryData = async (type) => {
    const body = `query { all${type}Pages { key } }`;
    const response = await axios.post('http://localhost:3000/graphql', { query: body });

    return response.data.data;
};

const initiativeIdPlugin = async (route, config) => {
    // Obtain all initiative keys via graphql query
    const response = await queryData('Initiative');
    const routes = [];

    response.allInitiatives.forEach((res) => {
        routes.push({ route: `/initiative/${res.key}` });
    });
    return Promise.resolve(routes);
};
const projectIdPlugin = async (route, config) => {
    // Obtain all project keys via graphql query
    const response = await queryData('Project');
    const routes = [];

    response.allProjects.forEach((res) => {
        routes.push({ route: `/project/${res.key}` });
    });
    return Promise.resolve(routes);
};

const validator = async (config) => [];
registerPlugin('router', 'initiatives', initiativeIdPlugin, validator);
registerPlugin('router', 'projects', projectIdPlugin, validator);
