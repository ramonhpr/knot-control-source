#!/bin/bash
export `dbus-launch`
mongod &
/etc/knot/start.sh knot-fog 3&> /dev/null
/etc/knot/start.sh knot-web 3&> /dev/null
node server.js &
/bin/bash
#run node client.js