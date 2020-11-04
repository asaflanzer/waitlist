const port = process.env.PORT || 5000;
const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
// socket.io
// const io = require('socket.io')(8000);
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
// schemas
const graphQlSchema = require('./graphql/schema');
// resolvers
const graphQlResolvers = require('./graphql/resolvers');
// middleware
const isAuth = require('./middleware/is-auth');
const { userJoined, getCurrentUser } = require('./middleware/users');

const cors = require('cors');

const app = express();

// Resolve CORS
app.use(cors());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Parse body requests to JSON
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

//app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@dev-01-cluster.paql3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(port);

    // io.on('connection', (socket) => {
    //   //socket.emit('new connection', 'hello world!');
    //   // console.log(socket.id);

    //   // Queue Room
    //   socket.on('queue', (userId) => {
    //     const user = graphQlResolvers.singleUser(userId);
    //     console.log(user);

    //     const userJoined = userJoined(userId, number, room);

    //     // Join a rooom
    //     socket.join(userJoined.room); // TODO reference room to the user status='pending' && 'notified'

    //     // Broadcast everybody except the current user
    //     socket.broadcast
    //       .to(userJoined.room)
    //       .emit('message', 'A user has joined the queue');
    //   });

    //   // When user joins the queue
    //   socket.on('join-queue', (user) => {
    //     console.log('server got: ', user);
    //   });

    //   // Listen for updates
    //   // socket.on('call-next', (user) => {
    //   // io.emit('message', 'A user was called');
    //   // });

    //   // When user leaves the queue
    //   socket.on('leave-queue', () => {
    //     // Broadcast to all clients
    //     io.emit('message', 'A user has left the queue');
    //   });
    // });
  })
  .catch((err) => {
    console.log(err);
  });
