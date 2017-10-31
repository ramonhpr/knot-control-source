const childProcess = require('child_process');

const KNOT_PROCESSES = ['knot-fog', 'knot-web', 'knotd', 'nrfd', 'lorad'];

function stopByName(name) {
  try {
    childProcess.execFileSync('/etc/knot/stop.sh', [name]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = function (done) {
  const ret = [];
  let i;
  for (i = 0; i < KNOT_PROCESSES.length; i += 1) {
    if (stopByName(KNOT_PROCESSES[i])) {
      ret.push(KNOT_PROCESSES[i]);
    }
  }
  done(null, ret);
};
