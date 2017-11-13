#!/bin/bash
export `dbus-launch`
mongod &
/etc/knot/start.sh knot-fog 3&>1
/etc/knot/start.sh knot-web 3&>1
node server.js &
/bin/bash
#run node client.js