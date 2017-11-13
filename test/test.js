const test = require('tape');
const stopScripts = require('../src/factoryReset/stopScripts');
const cleanFiles = require('../src/factoryReset/cleanFiles');
const cleanDb = require('../src/factoryReset/cleanDatabase');

// FIXME: How to start the KNoT scripts for test?
test('Stop all KNoT daemons', (t) => {
  stopScripts((err, listStoped) => {
    t.assert(!err && listStoped.length > 0, `Number of scripts stopped ${listStoped.length}`);
  });
  t.end();
});

// This test is running twice, for clean keys.json and gatewayConfig.json
test('Clean config files', (t) => {
  cleanFiles((err) => {
    t.assert(!err, 'Files cleaned');
  });
  t.end();
});

test('Clean database', (t) => {
  cleanDb((err) => {
    t.assert(!err, 'Database cleaned');
  });
  t.end();
});
