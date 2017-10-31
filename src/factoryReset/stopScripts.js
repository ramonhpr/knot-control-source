const childProcess = require('child_process');

const KNOT_PROCESSES = ['knot-fog', 'knot-web', 'knotd', 'nrfd', 'lorad'];

module.exports = function (done) {
  const ret = [];
  let err = null;
  let i;
  for (i = 0; i < KNOT_PROCESSES.length; i += 1) {
    try {
      childProcess.execFileSync('/etc/knot/stop.sh', [KNOT_PROCESSES[i]]);
      ret.push(KNOT_PROCESSES[i]);
    } catch (error) {
      err = error;
    }
  }
  done(err, ret);
};
