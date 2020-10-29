const DataLoader = require('dataloader');
// models
const User = require('../../models/user');
// merge functions
const { waitingLength, nextInQueue, lastCalled } = require('./merge');
// bcrypt
const bcrypt = require('bcryptjs');
// jwt
const jwt = require('jsonwebtoken');
// socket.io
// const io = require('socket.io')(5000);

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

module.exports = {
  singleUser: async ({ userId }) => {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('User does not exist');
    }
    return user;
  },
  getStatus: async () => {
    const queueLength = await waitingLength();
    const nextInline = await nextInQueue();
    const lastServed = await lastCalled();

    return { queueLength, nextInline, lastServed };
  },
  waitingUsers: async () => {
    try {
      // object inside for filtering {title: 'A test'}
      const users = await User.find({ status: 'pending' }).limit(10);
      // because mongo return with the events some metadata I need
      // to filter out and return just the event array docs
      return users;
      // return events.map((event) => {
      //   return transformEvent(event);
      // });
    } catch (err) {
      throw err;
    }
  },
  servedUsers: async () => {
    try {
      // object inside for filtering {title: 'A test'}
      const users = await User.find({ status: 'served' }).limit(10);
      // because mongo return with the events some metadata I need
      // to filter out and return just the event array docs
      return users;
      // return events.map((event) => {
      //   return transformEvent(event);
      // });
    } catch (err) {
      throw err;
    }
  },
  createUser: async ({ userInput }, req) => {
    const { name, email, phone } = userInput;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User exists already.');
      }

      // const user = {};
      // io.on('connection', (socket) => {
      //   //socket.emit('new connection', 'hello world!');
      //   socket.on('new-user', (user) => {
      //     console.log(user);
      //     console.log(socket.id);
      //     users[socket.id] = user;
      //     socket.broadcast.emit('increment-queue');
      //   });
      // });

      const queueLength = await waitingLength();

      const user = new User({
        name: name,
        email: email,
        phone: +phone,
        status: 'pending',
        number: queueLength + 1,
      });

      const result = await user.save();

      const token = jwt.sign(
        { userId: result._id, email: result.email },
        'myprivatekeythatshouldbestorageontheserver',
        { expiresIn: '1h' }
      );

      return { userId: result._id, token: token, tokenExpiration: 12 };

      //return { ...result._doc, password: null };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error('Password is incorrect'); // Invalid Credentials
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'myprivatekeythatshouldbestorageontheserver',
      { expiresIn: '1h' }
    );

    return { userId: user.id, token: token, tokenExpiration: 12 };
  },
};
