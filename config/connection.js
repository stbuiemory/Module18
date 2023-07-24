const { connect, connection } = require('mongoose');

// Creates connection, has info for mongoDB if needed for future online deployment
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;