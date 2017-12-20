const { MongoClient } = require('mongodb');
const config = require('config');

const databaseUri = `mongodb://${config.get('mongodb.host')}:${config.get('mongodb.port')}/${config.get('mongodb.db')}`;

module.exports = (done) => {
  MongoClient.connect(databaseUri, (err, client) => {
    if (err) {
      console.error(err);
      done(err);
    }
    const db = client.db(config.get('mongodb.db'));
    db.dropDatabase();
    client.close();
    done();
  });
};
