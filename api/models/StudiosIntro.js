/**
 * Engagement Lab Website v2.x
 *
 * Studios index Model
 * @module studiosintro
 * @class studiosintro
 * @author Johnny Richardson
 *
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const { keystone, } = global;
const { Types, } = keystone.Field;

/**
 * studiosintro model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
const StudiosIntro = new keystone.List('StudiosIntro',
    {
        label: 'Initiatives Intro Page',
        singular: 'Initiatives Intro Page',
        nodelete: true,
        nocreate: true,
    });

/**
 * Model Fields
 * @main StudiosIntro
 */
StudiosIntro.add({
    name: {
        type: String, default: 'Initiatives Intro Page', hidden: true, required: true, initial: true,
    },
    summary: {
        type: Types.Textarea, label: 'Initiatives Summary Paragraph', required: true, initial: true,
    },
    initiativesSummary: {
        type: Types.Textarea, label: 'Initiatives Summary Paragraph', required: true, initial: true,
    },
    /* partneredStudiosThumbnail: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
    },
    graduateThesisThumbnail: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
    },
    cocurricularThumbnail: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
    }, */
});

/* 'Partnered Studios', {
    partneredSummary: {
        type: Types.Textarea, label: 'Summary Paragraph', required: true, initial: true,
    },
    partneredCurriculum: {
        type: Types.Textarea, label: 'Curriculum Paragraph', required: true, initial: true,
    },
    partneredSummaryImage: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
    },
},
'Graduate Thesis Studio', {
    gradSummary: {
        type: Types.Textarea, label: 'Graduate Summary Paragraph', required: true, initial: true,
    },
    gradCurriculum: {
        type: Types.Textarea, label: 'Curriculum Paragraph', required: true, initial: true,
    },
    gradSummaryImage: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
    },
},
'Co-curricular Studio', {
    coCurricularSummary: {
        type: Types.Textarea, label: 'Summary Paragraph', required: true, initial: true,
    },
    coCurricularSummaryImage: {
        type: Types.CloudinaryImage,
        folder: 'homepage-2.0/studios',
        autoCleanup: true,
        label: 'Co-curricular Studio Summary Image',
    },
    coCurricularPhases: {
        type: Types.TextArray,
        label: 'Co-curricular Phases',
    },
    currentCoCurricularStudios: {
        type: Types.Relationship,
        label: 'Current Studios',
        ref: 'Studio',
        many: true,
    },
} */

/**
 * Model Registration
 */
StudiosIntro.defaultSort = '-createdAt';
StudiosIntro.defaultColumns = 'name';
StudiosIntro.register();
