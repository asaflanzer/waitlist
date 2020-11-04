const DataLoader = require('dataloader');
// models
const Event = require('../../models/event');
const User = require('../../models/user');
// helpers
const { dateToString } = require('../../helpers/date');

const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const waitingLength = async () => {
  try {
    const queueLength = await User.countDocuments({
      $or: [{ status: 'pending' }, { status: 'notified' }],
    });
    return queueLength;
  } catch (err) {
    throw err;
  }
};
const nextInQueue = async () => {
  try {
    const nextInline = await User.findOne({ status: 'pending' }).sort({
      number: 1,
    });
    return nextInline;
  } catch (err) {
    throw err;
  }
};
const lastCalled = async () => {
  try {
    const lastServed = await User.findOne({ status: 'served' }).sort({
      updatedAt: -1,
    });
    return lastServed;
  } catch (err) {
    throw err;
  }
};
//refactor events function to use async/await and try/catch for error handling
const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await eventLoader.load(eventId.toString()); // old: Event.findById(eventId);
    return event; // old: transformEvent(event); // since the eventLoader already transformsEvent
  } catch (err) {
    throw err;
  }
};

//refactor events function to use async/await and try/catch for error handling
const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString()); // old: User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents), // old: events.bind...
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};

const transformBooking = (booking) => {
  console.log('booking._doc.event: ', booking._doc.event);
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;

exports.waitingLength = waitingLength;
exports.nextInQueue = nextInQueue;
exports.lastCalled = lastCalled;
