// models
const Event = require('../../models/event');
const User = require('../../models/user');
// merge functions
const { transformEvent } = require('./merge');
// helpers
const { dateToString } = require('../../helpers/date');

module.exports = {
  events: async () => {
    try {
      // object inside for filtering {title: 'A test'}
      const events = await Event.find();
      // because mongo return with the events some metadata I need
      // to filter out and return just the event array docs
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput }, req) => {
    const { title, description, price, date } = eventInput;
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const event = new Event({
      title: title,
      description: description,
      price: +price,
      date: new Date(date),
      creator: req.userId,
    });
    let createdEvent;

    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      // Return Event
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
