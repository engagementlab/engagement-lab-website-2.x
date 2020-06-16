/**
 * Engagement Lab Website v2.x content service
 * Developed by Engagement Lab, 2020
 * ==============
 * App start
 *
 * @author Johnny Richardson
 * @author Ralph Drake
 *
 * ==========
 */

const {
    GraphQLScalarType,
} = require('graphql');
const {
    ApolloServer,
    ApolloError,
    gql,
} = require('apollo-server');
const bootstrap = require('@engagementlab/el-bootstrapper');
const express = require('express');
const winston = require('winston');
const colors = require('colors');
const elasticsearch = require('elasticsearch');

const start = productionMode => {
    const app = express();

    const logFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => {
            const {
                timestamp, level, message, ...args
            } = info;

            const ts = timestamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        })
    );

    global.logger = winston.createLogger({
        level: 'info',
        format: logFormat,
        transports: [
            new winston.transports.Console()
        ],
    });
    global.elasti = undefined;

    app.use(express.json());
    app.use(express.urlencoded({ extended: false, }));

    app.use((req, res, next) => {
        res.locals.db = global.keystone;
        next();
    });

    apollo(app);

    if (process.env.SEARCH_ENABLED === 'true') searchBoot(app);
    else boot(app, productionMode);

    return app;
};

const boot = (app, productionMode) => {
    bootstrap.start(
        './config.json',
        app,
        `${__dirname}/`, {
            name: 'Engagement Lab Home CMS',
        },
        () => {
            global.logger.info(colors.bgCyan.bold.black(`Content API started (${productionMode ? 'Production' : 'Development'} Mode).`));
        }
    );
};

const searchBoot = app => {
    global.elasti = new elasticsearch.Client({ node: process.env.ELASTISEARCH_NODE_URL, });
    global.elasti.ping(error => {
        if (error) {
            global.logger.error('Elasticsearch ERROR!', error);
        } else {
            global.logger.info(colors.bgGray.yellow(`Search cluster running at ${process.env.ELASTISEARCH_NODE_URL}`));
            boot(app);
        }
    });
};

const apollo = app => {
    const schemaModules = require('./schemas')();
    const schemas = schemaModules.map(mod => mod.schema);
    const queries = schemaModules.map(mod => mod.queries);
    const resolvers = schemaModules.map(mod => mod.resolvers);
    const resolversObj = {};

    /**
   * Custom scalar type for Dates in schema
   */
    const DateType = new GraphQLScalarType({
        name: 'Date',
        description: 'Date and time field.',
        serialize(value) {
            const result = new Date(value).toDateString();
            return result;
        },
    });

    /**
     * App's GraphQL types
     */
    const TypeDefs = gql`
    scalar Date
    """Image type definition"""
    type Image {
      public_id: String
      version: Int!
      signature: String!
      width: Int!
      height: Int!
      format: String!
      resource_type: String!
      url: String!
      secure_url: String!
    }
    """Markdown type definition"""
    type Markdown {
      html: String
      md: String
    }
    """Name type definition"""
    type Name {
      first: String
      last: String
    }
    ${schemas.join(' ')}
	  type Query {
      ${queries.join(' ')}
    }
  `;
    // Assemble all resolver to object
    resolvers.forEach(res => Object.keys(res).forEach(k => { resolversObj[k] = res[k]; }));

    /**
     * App's GraphQL resolvers
     */
    const Resolvers = {
        Query: resolversObj,
        Date: DateType,
    };

    /**
     * App's Apollo server instance
     */
    const Apollo = new ApolloServer({
        typeDefs: TypeDefs,
        resolvers: Resolvers,
        formatError: err => {
            // Otherwise return the original error.  The error can also
            // be manipulated in other ways, so long as it's returned.
            global.logger.error(err);
            return err;
        },
    });

    // Mount apollo middleware (/graphql)
    app.use(Apollo.getMiddleware());
};

module.exports = start;
