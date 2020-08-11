/**
 * Engagement Lab Website v2.x
 *
 * Project Model
 * @module project
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;
const Listing = require('./Listing');
const urlValidator = require('../utils').url;

/**
 * @module project
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Project = new keystone.List('Project', {
    inherits: Listing,
    hidden: false,
});

/**
 * Model Fields
 * @main Project
 */
Project.add({

    enabled: {
        type: Types.Boolean,
        label: 'Enabled',
        note: 'Determines if this project appears on the live site.',
    },
    featured: {
        type: Types.Boolean,
        label: 'Featured',
        note: 'Determines if this project appears on the home page in the featured project slider.',
    },
    archived: {
        type: Types.Boolean,
        label: 'Archived',
        note: 'Determines if this project appears as archived (must also be "enabled").',
    },
    customUrl: {
        type: String,
        label: 'Custom URL',
        note: 'Must be format of "projecturl". Overrides default "/projects/projectname".',
    },
    format: {
        type: Types.Relationship,
        ref: 'Filter',
        filters: {
            category: 'Format',
            appears: 'Project',
        },
        label: 'Type/Format of Product(s)',
        many: true,
        note: 'What kind of project is this? Choose from below or add a Format Filter and choose \'Project\' as its destination.',
    },

    // Initiative model reference for which one(s) this belongs to
    initiatives: {
        type: Types.Relationship,
        label: 'Initiative(s)',
        ref: 'Initiative',
        many: true,
        note: 'Will classify which initiative(s) this project is sorted under.',
    },
    // Partner model reference
    partners: {
        type: Types.Relationship,
        label: 'Partner(s)',
        ref: 'Partner',
        many: true,
    },
},

'Project Information', {
    status: {
        type: Types.Select,
        options: 'Completed, Ongoing',
        required: true,
        initial: true,
        note: 'Used as a filter on `/research/projects`.',
    },

    startYear: {
        type: String,
        required: true,
        initial: true,
    },

    endYear: {
        type: String,
        dependsOn: {
            status: 'Completed',
        },
    },

    projectLeads: {
        type: Types.TextArray,
    },
    teamMembers: {
        type: Types.TextArray,
    },
    challengeTxt: {
        type: Types.Textarea,
        label: 'Problem Space',
    },
    strategyTxt: {
        type: Types.Textarea,
        label: 'Intervention',
    },
    resultsTxt: {
        type: Types.Textarea,
        label: 'Social Impact',
    },

    externalLinkUrl: {
        type: Types.Url,
        label: 'Project Website URL',
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org" <br> Appears on the individual project page.',
    },
    githubUrl: {
        type: Types.Url,
        label: 'Github URL',
        validate: urlValidator,
        note: 'Must be in format "http://www.something.org" <br> Appears on the individual project page.',
    },

},

'Project Media', {
    // Resource model reference for files
    files: {
        type: Types.Relationship,
        ref: 'Resource',
        label: 'Project Files',
        filters: {
            type: 'file',
        },
        many: true,
    },
    publications: {
        type: Types.Relationship,
        ref: 'Publication',
        label: 'Related Publications',
        many: true,
    },
    // Resource model reference for videos
    video: {
        type: Types.Relationship,
        ref: 'Resource',
        label: 'Project Videos',
        filters: {
            type: 'video',
        },
        note: '**All images below need to be very high quality.** <br />' +
         '_Project BG_: Image shown as project background. <br />' +
         '_Primary Image_: Image shown above `Problem Space`. <br />' +
         '_Project Images_: Images below main project info. To re-order, remove and upload again.',

    },
    // Image for project BG
    bgImage: {
        type: Types.CloudinaryImage,
        label: 'Background Image',
        folder: 'homepage-2.0/projects',
        autoCleanup: true,
    },
    primaryImage: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/projects',
        autoCleanup: true,
    },

    primaryImageDescription: {
        type: String,
    },
    // Images for project page
    projectImages: {
        type: Types.CloudinaryImages,
        folder: 'homepage-2.0/projects',
        autoCleanup: true,
    },

});

/**
 * Methods
 * =============
 */

// Remove a given resource from all projects that referenced it (videos and articles as of now)
Project.schema.statics.removeResourceRef = (resourceId, callback) => {
    Project.model.update({
        $or: [{
            videos: resourceId,
        }, {
            articles: resourceId,
        }, {
            blogs: resourceId,
        }, {
            files: resourceId,
        }],
    },

    {
        $pull: {
            videos: resourceId,
            articles: resourceId,
            blogs: resourceId,
            files: resourceId,
        },
    },

    {
        multi: true,
    },

    (err, result) => {
        callback(err, result);

        if (err) console.error(err);
    });
};

/**
 * Hooks
 * =============
 */
Project.schema.pre('save', next => {
    // Save state for post hook
    this.wasNew = this.isNew;

    // Override key w/ custom URL if defined
    if (this.customUrl && this.customUrl.length > 0) { this.key = this.customUrl; }

    next();
});

Project.schema.post('save', (doc, next) => {
    // Make a post to slack when this Project is updated
    // keystone.get('slack').Post(Project.model, this, true);

    if (process.env.SEARCH_ENABLED === 'true') {
    // Index doc on elasticsearch
        global.elasti.index({
            index: 'listing',
            type: 'project',
            id: doc._id.toString(),
            body: {
                name: doc.name,
                key: doc.key,
                content: doc.byline,
                description: doc.description,
            },
        }, (err, resp, status) => {
            console.log(resp, status);
            if (err) console.error(err);
        });
    }
    next();
});

/**
 * Model Registration
 */
Project.defaultSort = 'sortOrder';
Project.defaultColumns = 'name, enabled, featured';
Project.register();
