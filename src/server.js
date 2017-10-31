const bus = require('dbus-native').sessionBus();
const factoryReset = require('./factoryReset');

const name = 'knot.control';
const knotIface = {
  name: 'knot.control.service',
  methods: {
    factoryReset: ['s', ''],
  },
};

const knotServices = {
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
bus.exportInterface(knotServices, '/knot/control', knotIface);
