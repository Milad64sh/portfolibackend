const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://Milad100761:milad123456@cluster0.lrayyzu.mongodb.net/?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('CONNECTED');
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'Database not found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
