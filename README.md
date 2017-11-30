# knot-control-source

KNoT Control is part of KNoT project. It is a service daemon running in KNoT gateway and is responsible for controlling the execution and configuration of all other services/daemons running in the gateway.

## Docker
To build you will need to have the knot repositories knot-hal-source and knot-service-source

`$ ./build-docker.sh`

To run:

`$ docker run -it knot-control`

When the setup has finished you must the the client application:

`# node client.js`