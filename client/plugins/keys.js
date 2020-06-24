const axios = require('axios');
const { registerPlugin } = require('@scullyio/scully');

const queryData = async (queryName) => {
    const body = `query { ${queryName} { key } }`;
    const response = await axios.post('http://localhost:3000/graphql', { query: body });

    return response.data.data;
};

const initiativeIdPlugin = async (route, config) => {
    // Obtain all initiative keys via graphql query
    const response = await queryData('allInitiativePages');
    const routes = [];

    response.allInitiativePages.forEach((res) => {
        routes.push({ route: `/initiative/${res.key}` });
    });
    return Promise.resolve(routes);
};
const projectIdPlugin = async (route, config) => {
    // Obtain all project keys via graphql query
    const response = await queryData('allProjectPages');
    const routes = [];

    response.allProjectPages.forEach((res) => {
        routes.push({ route: `/project/${res.key}` });
    });
    return Promise.resolve(routes);
};
const eventIdPlugin = async (route, config) => {
    // Obtain all event keys via graphql query
    const response = await queryData('allEvents');
    const routes = [];

    response.allEvents.forEach((res) => {
        routes.push({ route: `/event/${res.key}` });
    });
    return Promise.resolve(routes);
};


const validator = async (config) => [];
registerPlugin('router', 'initiatives', initiativeIdPlugin, validator);
registerPlugin('router', 'projects', projectIdPlugin, validator);
registerPlugin('router', 'events', eventIdPlugin, validator);
