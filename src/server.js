const bus = require('dbus-native').sessionBus();
const factoryReset = require('./factoryReset');

const name = 'knot.control';
const exampleIface = {
  name: 'knot.control.service',
  methods: {
    factoryReset: ['s', ''],
  },
};

const example = {
  factoryReset: () => {
    factoryReset((err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Factory Reset Successfully');
      }
    });
  },
};
bus.requestName(name, 0);
bus.exportInterface(example, '/knot/control', exampleIface);
