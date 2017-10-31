const client = require('mongodb').MongoClient;

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/knot_fog';

module.exports = function (done) {
  client.connect(databaseUri, (err, db) => {
    if (err) {
      console.error(err);
      done(err);
    }
    db.dropDatabase();
    db.close();
    done();
  });
};
