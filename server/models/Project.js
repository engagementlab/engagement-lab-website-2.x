/**
 * Engagement Lab Website
 * 
 * Project Model
 * @module project
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;
var Listing = require('./Listing');
// See: https://github.com/chriso/validator.js
var validator = require('validator');

/**
 * @module project
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Project = new keystone.List('Project', {
    inherits: Listing,
    hidden: false
});

/**
 * Field Validators
 * @main Project
 */
var urlValidator = {
    validator: function(val) {
        return !val || validator.isURL(val, {
            protocols: ['http', 'https'],
            require_tld: true,
            require_protocol: false,
            allow_underscores: true
        });
    },
    msg: 'Invalid link URL (e.g. needs http:// and .org/)'
};

// Storage adapter for Azure
var azureFile = new keystone.Storage({
  adapter: require('keystone-storage-adapter-azure'),
  azure: {
    container: 'elabproject',
    generateFilename: function (file) {
        // Cleanup filename
        return file.originalname.replace(/[\\'\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, "").replace(/ /g, '_').toLowerCase();
    }
  },
  schema: {
    path: true,
    originalname: true,
    url: true
  }
});

/**
 * Model Fields
 * @main Project
 */
Project.add({

    enabled: {
        type: Types.Boolean,
        label: 'Enabled', 
        note: 'Determines if this project appears on the live site.'
    },
    customUrl: {
        type: String,
        label: 'Custom URL',
        note: 'Must be format of "projecturl". Overrides default "/projects/projectname".'
    },
    format: {
        type: Types.Relationship,
        ref: 'Filter',
        filters: {
            category: 'Format',
            appears: 'Project'
        },
        label: 'Type/Format of Product(s)',
        many: true, 
        note: 'What kind of project is this? Choose from below or add a Format Filter and choose \'Project\' as its destination.'
    },
    featured: {
        type: Types.Boolean,
        label: 'Featured', 
        note: 'Determines if this project appears on the home page in the featured project slider.'
    }
},

'Project Information', {

    challengeTxt: { type: Types.Textarea, label: 'Challenge' },
	strategyTxt: { type: Types.Textarea, label: 'Strategy + Approach' },
	resultsTxt: { type: Types.Textarea, label: 'Results' },

    externalLinkUrl: {
        type: Types.Url,
        label: 'Project Website URL',
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org" <br> Appears on the individual project page.'
    },
    githubUrl: {
        type: Types.Url,
        label: 'Github URL',
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org" <br> Appears on the individual project page.'
    }

},

'Project Media', {
    // Resource model reference for videos
    video: {
        type: Types.Relationship,
        ref: 'Resource',
        label: 'Project Videos',
        filters: {
            type: 'video'
        }

    },
/*     // Resource model reference for files
    files: {
        type: Types.Relationship,
        ref: 'Resource',
        label: 'Project Files',
        filters: {
            type: 'file'
        },
        many: true,
        note: 'Will appear in \'Resources\' tab on individual project page.'

    },
    // Resource model reference for articles
    articles: {
        type: Types.Relationship,
        ref: 'Resource',
        label: 'External Articles',
        filters: {
            type: 'article'
        },
        many: true,
        note: 'Will appear in \'News\' section on individual project page.'

    },
    // Resource model reference for articles
    blogs: {
        type: Types.Relationship,
        ref: 'Resource',
        label: 'Blog Posts',
        filters: {
            type: 'blog post'
        },
        many: true,
        note: 'Will appear in \'News\' section on individual project page.'

    } */
});

/**
 * Methods
 * =============
 */

// Remove a given resource from all projects that referenced it (videos and articles as of now)
Project.schema.statics.removeResourceRef = function(resourceId, callback) {

    Project.model.update({
            $or: [{
                'videos': resourceId
            }, {
                'articles': resourceId
            }, {
                'blogs': resourceId
            }, {
                'files': resourceId
            }]
        },

        {
            $pull: {
                'videos': resourceId,
                'articles': resourceId,
                'blogs': resourceId,
                'files': resourceId
            }
        },

        {
            multi: true
        },

        function(err, result) {

            callback(err, result);

            if (err)
                console.error(err);
        }
    );

};

/**
 * Hooks
 * =============
 */
Project.schema.pre('save', function(next) {

    // Save state for post hook
    this.wasNew = this.isNew;
    this.wasModified = this.isModified();

   /*  if (this.projectImages.length > 0 && (this.projectImages.length < this.projectImageCaptions.length)) {
        var err = new Error('You cannot have more images than their respective captions.');
        next(err);
    } */

    next();

});

Project.schema.post('save', function(next) {
    // Make a post to slack when this Project is updated
    // keystone.get('slack').Post(Project.model, this, true);

});

/**
 * Model Registration
 */
Project.defaultSort = 'sortOrder';
Project.defaultColumns = 'name, subdirectory, enabled, featured';
Project.register();