const axios = require('axios');
const { registerPlugin } = require('@scullyio/scully');

const queryData = async (queryName, 
    customUrl) => {
    const body = `query { 
        ${queryName} { 
            key 
            ${customUrl ? 'customUrl' : ''} 
        } 
    }`;
    const response = await axios.post('http://localhost:3000/graphql', { query: body });
    // console.log(response)

    return response.data.data;
};

const studioIdPlugin = async (route, config) => {
    // Obtain all studio keys via graphql query
    const response = await queryData('allStudios', true);
    const routes = [];

    response.allStudios.forEach((res) => {
        routes.push({ route: `/studios/studio/${res.customUrl || res.key}` });
    });
    return Promise.resolve(routes);
};
const studioInitIdPlugin = async (route, config) => {
    // Obtain all studio keys via graphql query
    const response = await queryData('allStudioInitiatives');
    const routes = [];

    response.allStudioInitiatives.forEach((res) => {
        routes.push({ route: `/studios/initiatives/${res.customUrl || res.key}` });
    });
    return Promise.resolve(routes);
};
const mdprojectIdPlugin = async (route, config) => {
    // Obtain all grad project keys via graphql query
    const response = await queryData('allMDProjectPages', true);
    const routes = [];

    response.allMDProjectPages.forEach((res) => {


        routes.push({ route: `/graduate/projects/${res.customUrl || res.key}` });
    });
    return Promise.resolve(routes);
};
const projectIdPlugin = async (route, config) => {
    // Obtain all project keys via graphql query
    const response = await queryData('allProjectPages', true);
    const routes = [];

    response.allProjectPages.forEach((res) => {
        routes.push({ route: `/research/projects/${res.customUrl || res.key}` });
    });
    return Promise.resolve(routes);
};
const initiativeIdPlugin = async (route, config) => {
    // Obtain all initiative keys via graphql query
    const response = await queryData('allInitiativePages');
    const routes = [];
    response.allInitiativePages.forEach((res) => {
        routes.push({ route: `/research/initiatives/${res.key}` });
    });
    return Promise.resolve(routes);
};
const eventIdPlugin = async (route, config) => {
    // Obtain all event keys via graphql query
    const response = await queryData('allEvents');
    const routes = [];

    response.allEvents.forEach((res) => {
        routes.push({ route: `/events/${res.key}` });
    });
    return Promise.resolve(routes);
};
const personIdPlugin = async (route, config) => {
    // Obtain all person keys via graphql query
    const response = await queryData('allPeople');
    const routes = [];

    response.allPeople.forEach((res) => {
        routes.push({ route: `/people/${res.key}` });
    });
    return Promise.resolve(routes);
};
const facultyIdPlugin = async (route, config) => {
    // Obtain all faculty people keys via graphql query
    const body = `query {                         
        allMastersPages {
            faculty {
                key
            }
        }
    }`;
    const response = await axios.post('http://localhost:3000/graphql', { query: body });
    const routes = [];
    response.data.data.allMastersPages.faculty.forEach((res) => {
        routes.push({ route: `/graduate/faculty/${res.key}` });
    });
    return Promise.resolve(routes);
};
const gradIdPlugin = async (route, config) => {
    // Obtain all grad student/alumni people keys via graphql query
    const body = `query { 
        allMastersPeople {
            key
        }
        allAlumniPeople {
            key
        }
    }`;
    const response = await axios.post('http://localhost:3000/graphql', { query: body });
    const routes = []; 
    response.data.data.allMastersPeople.forEach((res) => {
        routes.push({ route: `/graduate/students/${res.key}` });
    });
    response.data.data.allAlumniPeople.forEach((res) => {
        routes.push({ route: `/graduate/students/${res.key}` });
    });
    return Promise.resolve(routes);
};

const validator = async (config) => [];
registerPlugin('router', 'studios', studioIdPlugin, validator);
registerPlugin('router', 'studioinitiatives', studioInitIdPlugin, validator);
registerPlugin('router', 'mdprojects', mdprojectIdPlugin, validator);
registerPlugin('router', 'gradfaculty', facultyIdPlugin, validator);
registerPlugin('router', 'gradstudents', gradIdPlugin, validator);
registerPlugin('router', 'projects', projectIdPlugin, validator);
registerPlugin('router', 'initiatives', initiativeIdPlugin, validator);
registerPlugin('router', 'events', eventIdPlugin, validator);
registerPlugin('router', 'people', personIdPlugin, validator);
