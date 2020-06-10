
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
const Event = {
	
	schema: `
	  type Event {
		id: ID!
		enabled: Boolean
		name: String
		key: String
		date: Date
		images: [Image]
		shortDescription: String
		description: String
		eventUrl: String
		showButton: Boolean
		buttonTxt: String
		additionalURL: String
	  }
	`,
	queries: ['allEvents: [Event]', 'recentEvents: [Event]'],
	resolvers: {
		allEvents: async () => global.keystone.list('Event').model.find({enabled: true}).exec(),
		recentEvents: async () => global.keystone.list('Event').model.find({enabled: true}).sort([['date', 'descending'],]).limit(3).exec()
	}
	
}
module.exports = Event;