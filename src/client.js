const dbus = require('dbus-native');

const sessionBus = dbus.sessionBus();
sessionBus.invoke({
  path: '/knot/control',
  destination: 'knot.control',
  interface: 'knot.control.service',
  member: 'factoryReset',
  signature: 's',
  body: [''],
}, (err, res) => {
  if (err) {
    console.error(err);
  }
  console.log(res);
});
