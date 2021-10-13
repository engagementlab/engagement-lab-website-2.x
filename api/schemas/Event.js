/**
 * Engagement Lab Website v2.x
 *
 * Event page schema
 * @module event
 * @class event
 * @author Johnny Richardson
 *
 * ==========
 */
const { model, } = global.keystone.list('Event');
const GetAdjacent = async results => {
    const fields = 'name key -_id';
    const list = global.keystone.list('Event').model;
    // Get one next/prev event from selected event's sortorder
    const nextEvent = list
        .findOne(
            {
                enabled: true,
                date: {
                    $gt: results.date,
                },
            },
            fields
        );
    const prevEvent = list
        .find(
            {
                enabled: true,
                date: {
                    $lt: results.date,
                },
            },
            fields
        )
        .sort([['date', 'descending']])
        .limit(1);

    const nextPrevResults = {
        next: await nextEvent,
        prev: await prevEvent,
    };

    // Poplulate next/prev and output
    try {
        const output = Object.assign(nextPrevResults, { event: results, });
        return output;
    } catch (err) {
        throw new Error(err);
    }
};
const Event = {

    schema: `
    type Event {
      id: ID!
      enabled: Boolean
      name: String
      key: String
      date: Date!
      images: [Image]
      videoId: String
      videoThumbnail: Image
      shortDescription: String!
      description: Markdown!
      eventUrl: String
      showButton: Boolean
      buttonTxt: String
      additionalURL: String
    }
    type EventResult {
      event: Event
      prev: [Event]
      next: Event
    }
  `,
    queries: ['allEvents: [Event]', 'recentEvents: [Event]', 'upcomingEvents: [Event]', 'getEvent(key: String): EventResult'],
    resolvers: {
        allEvents: async () => model.find({ enabled: true, }).sort([['date', 'descending']]).exec(),
        recentEvents: async () => model.find({ enabled: true, }).sort([['date', 'descending']]).limit(3).exec(),
        upcomingEvents: async () => model.find({ enabled: true, date: { $gt: new Date().getTime(), }, }).sort([['date', 'descending']]).limit(3).exec(),
        getEvent: async (parent, args) => {
            const event = await model.findOne({ key: args.key, }).exec();

            /*
             If no video thumb, return object with empty public ID
             - This is not ideal but it eliminates client having to eval
               if videoId non-null and then querying for thumbail
            */
            // eslint-disable-next-line no-underscore-dangle
            if (Object.keys(event._doc.videoThumbnail).length === 0) {
                // eslint-disable-next-line no-underscore-dangle
                event._doc.videoThumbnail = { public_id: '', };
            }

            return GetAdjacent(event);
        },
    },

};
module.exports = Event;
