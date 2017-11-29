FROM alpine:3.5
RUN mkdir -p /usr/local/bin/knot-control
WORKDIR /usr/local/bin/knot-control
RUN apk add --no-cache \
        dbus-x11 \
        dbus-dev \
        dbus-glib-dev \
        make \
        g++ \
        nodejs
RUN mkdir -p ./factoryReset
COPY ./src/* ./
COPY ./src/factoryReset/ ./factoryReset
COPY package.json run.sh ./
RUN chmod 777 run.sh
RUN npm install --production
RUN mkdir -p /etc/knot
ADD ./docker/webui/config/keys.json /etc/knot/keys.json
ADD ./docker/webui/config/gatewayConfig.json /etc/knot/gatewayConfig.json
CMD ["/bin/bash","-c",". ./run.sh"]