/**
 * Engagement Lab Website v2.x
 *
 * Studio Model
 * @module studio
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * @module studio
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const Studio = new keystone.List('Studio', {
    autokey: {
        path: 'key',
        from: 'name',
        unique: true,
    },
});

/**
 * Model Fields
 * @main Studio
 */
Studio.add(
    'Metadata', {
        name: {
            type: String,
            label: 'Name',
            required: true,
            initial: true,
            index: true,
        },

        enabled: {
            type: Types.Boolean,
            label: 'Enabled',
            default: true,
            note: 'Determines if this studio appears on the live site.',
        },
        status: {
            type: Types.Select,
            options: 'Completed, Ongoing',
            required: true,
            initial: true,
        },
        customUrl: {
            type: String,
            label: 'Custom URL',
            note: 'Must be format of "studio-url". Overrides default "/studios/studio/studio-name".',
        },
    },

    'Studio Information', {

        semester: {
            type: String,
            required: true,
            initial: true,
            note: 'e.g. _Spring 2020_',
        },

        faculty: {
            type: Types.Relationship,
            required: true,
            initial: true,
            ref: 'Person',
            filters: {
                type: ['faculty leadership', 'faculty fellows'],
            },
            many: true,
        },
        department: {
            type: String,
            required: true,
            initial: true,
            note: 'e.g. _Visual and Media Arts_',
        },
        departmentLabel: {
            type: String,
            note: 'Override default sponsor of label of _Department Sponsor_',
        },
        sponsor: {
            type: String,
        },
        sponsorLabel: {
            type: String,
            note: 'Override default sponsor of label of _Class Sponsor_',
        },
        students: {
            type: Types.TextArray,
            required: true,
            initial: true,
        },
        relatedLinks: {
            type: Types.Relationship,
            ref: 'Resource',
            many: true,
        },
        collaborators: {
            type: Types.Markdown,
        },
        contact: {
            type: String,
        },
        body: {
            type: Types.Markdown,
            required: true,
            initial: true,
            note: 'Use _H1_ button to create header',
        },
        studentProjects: {
            type: Types.Markdown,
        },
    },

    'Studio Media', {
        instructions: {
            type: String,
            label: 'Please read!',
            noedit: true,
            note: '**All images below need to be very high quality.** <br />' +
        '_Thumbnail Image_: Image shown as thumb in listings. <br />' +
        '_Background Image_: Image shown as studio background. <br />' +
        '_Primary Image_: Image shown above intro. <br />' +
        '_Gallery Images_: Images below main studio info. To re-order, remove and upload again. <br />' +
        '_Image Captions_: Please specify in order of images. If an image has no caption, enter **#** in text field <br />' +
        '_Gallery Videos_: Videos show directly under main studio info and **replace** primary image. <br />' +
        '_Video Thumbnail Images_: Please specify in order of videos. Dimensions need to be 500x300px. <br />' +
        '_Video Captions_: Please specify in order of videos. If a video has no caption, enter **#** in text field.',
        },
        thumb: {
            type: Types.CloudinaryImage,
            label: 'Thumbnail Image',
            folder: 'homepage-2.0/studios',
            autoCleanup: true,
        },
        // Image for studio BG
        bgImage: {
            type: Types.CloudinaryImage,
            label: 'Background Image',
            folder: 'homepage-2.0/studios',
            autoCleanup: true,
        },
        primaryImage: {
            type: Types.CloudinaryImage,
            folder: 'homepage-2.0/studios',
            autoCleanup: true,
        },
        primaryImageDescription: {
            type: String,
        },
        primaryImageCredit: {
            type: String,
        },
        // Images for studio gallery
        galleryImages: {
            type: Types.CloudinaryImages,
            folder: 'homepage-2.0/studios',
            autoCleanup: true,
        },
        galleryImageCaptions: {
            type: Types.TextArray,
        },
        // Videos for studio gallery (replaces primary image)
        galleryVideos: {
            type: Types.TextArray,
            label: 'Gallery Video IDs',
            note: 'Must be video ID from a Vimeo URL (vimeo.com/**420657931** ← this is an ID)',
        },
        galleryVideoThumbails: {
            type: Types.CloudinaryImages,
            folder: 'homepage-2.0/studios',
            autoCleanup: true,
        },
        galleryVideoTitles: {
            type: Types.TextArray,
        },
        galleryVideoCaptions: {
            type: Types.TextArray,
        },

    }
);

/**
 * Methods
 * =============
 */

// Remove a given resource from all studios that referenced it (videos and articles as of now)
Studio.schema.statics.removeResourceRef = (resourceId, callback) => {
    Studio.model.update({
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
Studio.schema.pre('save', next => {
    // Save state for post hook
    this.wasNew = this.isNew;

    // Override key w/ custom URL if defined
    if (this.customUrl && this.customUrl.length > 0) { this.key = this.customUrl; }

    next();
});

Studio.schema.post('save', (doc, next) => {
    // Make a post to slack when this Studio is updated
    // keystone.get('slack').Post(Studio.model, this, true);

    if (process.env.SEARCH_ENABLED === 'true') {
    // Index doc on elasticsearch
        global.elasti.index({
            index: 'listing',
            type: 'studio',
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
Studio.defaultSort = 'sortOrder';
Studio.defaultColumns = 'name, enabled, featured';
Studio.register();
