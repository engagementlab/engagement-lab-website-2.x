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
    Kind,
} = require('graphql');
const {
    ObjectID,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('mongodb');
const {
    ApolloServer,
    gql,
} = require('apollo-server');
const bootstrap = require('@engagementlab/el-bootstrapper');
const express = require('express');
const winston = require('winston');
const colors = require('colors');
const { Client, } = require('@elastic/elasticsearch');

const apollo = app => {
    // eslint-disable-next-line global-require
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
    """ObjectId scalar definition"""
    scalar ObjectID
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
    """File type definition"""
    type File {
        name: String
        fileType: String
        url: String
        summary: String
    }
    """Search result content definition"""
    type SearchContent {
        name: String
        key: String
        content: String
        description: String
    }
    """Search result term highlight definition"""
    type SearchHighlight {
        name: [String]
        content: [String]
        description: [String]
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
        ObjectID: new GraphQLScalarType({
            name: 'ObjectID',
            description: 'The `ObjectID` scalar type represents a [`BSON`](https://en.wikipedia.org/wiki/BSON) ID commonly used in `mongodb`.',
            serialize(_id) {
                if (_id instanceof ObjectID) {
                    return _id.toHexString();
                } if (typeof _id === 'string') {
                    return _id;
                }
                throw new Error(`${Object.getPrototypeOf(_id).constructor.name} not convertible to `);
            },
            parseValue(_id) {
                if (typeof _id === 'string') {
                    return ObjectID.createFromHexString(_id);
                }
                throw new Error(`${typeof _id} not convertible to ObjectID`);
            },
            parseLiteral(ast) {
                if (ast.kind === Kind.STRING) {
                    return ObjectID.createFromHexString(ast.value);
                }
                throw new Error(`${ast.kind} not convertible to ObjectID`);
            },
        }),
    };

    /**
     * App's Apollo server instance
     */
    const Apollo = new ApolloServer({
        typeDefs: TypeDefs,
        resolvers: Resolvers,
        playground: process.env.NODE_ENV === 'development',
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

const boot = (app, productionMode) => {
    bootstrap.start(
        './config.json',
        app,
        `${__dirname}/`, {
            name: 'Engagement Lab Home CMS',
        },
        () => {
            // We do not need Apollo in prod env
            if (process.env.NODE_ENV !== 'production') { apollo(app); }

            global.logger.info(colors.bgCyan.bold.black(`Content API started (${productionMode ? 'Production' : 'Development'} Mode).`));
        },
        process.env.DB_URI
    );
};

const searchBoot = (app, productionMode) => {
    global.elasti = new Client({ node: process.env.ELASTISEARCH_NODE_URL, });
    global.elasti.ping(error => {
        if (error) {
            global.logger.error('Elasticsearch ERROR!', error);
        } else {
            global.logger.info(colors.bgGray.yellow(`Search cluster running at ${process.env.ELASTISEARCH_NODE_URL}`));
            boot(app, productionMode);
        }
    });
};

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

    if (process.env.SEARCH_ENABLED === 'true') searchBoot(app, productionMode);
    else boot(app, productionMode);

    if (productionMode) { global.logger.info('Running in production mode'); }

    return app;
};

module.exports = start;
