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
        )
        .limit(1);
    const prevEvent = list
        .findOne(
            {
                enabled: true,
                date: {
                    $lt: results.date,
                },
            },
            fields
        )
        .sort({ sortOrder: -1, })
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
      name: String!
      key: String!
      date: Date!
      images: [Image]
      shortDescription: String!
      description: Markdown!
      eventUrl: String
      showButton: Boolean
      buttonTxt: String
      additionalURL: String
    }
    type EventResult {
      event: Event
      prev: Event
      next: Event
    }
  `,
    queries: ['allEvents: [Event]', 'recentEvents: [Event]', 'getEvent(key: String): EventResult'],
    resolvers: {
        allEvents: async () => model.find({ enabled: true, }).sort([['date', 'descending']]).exec(),
        recentEvents: async () => model.find({ enabled: true, }).sort([['date', 'descending']]).limit(3).exec(),
        getEvent: async (parent, args) => {
            const event = await model.findOne({ key: args.key, }).exec();
            return GetAdjacent(event);
        },
    },

};
module.exports = Event;
