const stopScripts = require('./factoryReset/stopScripts');
const cleanDatabase = require('./factoryReset/cleanDatabase');
const cleanFiles = require('./factoryReset/cleanFiles');

module.exports = function (done) {
  stopScripts((errStop) => {
    if (errStop) {
      console.error(errStop);
      done(errStop);
    }
    cleanDatabase((errDb) => {
      if (errDb) {
        console.error(errDb);
        done(errDb);
      }
      cleanFiles((errFiles) => {
        if (errFiles) {
          console.error(errFiles);
          done(errFiles);
        }
        done(null);
      });
    });
  });
};
