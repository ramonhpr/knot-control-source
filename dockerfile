FROM ubuntu:latest
RUN apt-get update && apt-get install -y curl dbus-x11 git apt-transport-https gcc g++ make 
# install mongo
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
RUN echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list

RUN apt-get update && apt-get install -y mongodb
RUN mkdir -p /data/db

# install node
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

# add yarn repo
RUN apt-get update && apt-get install -y curl apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# install knot dependencies
RUN git clone https://github.com/CESARBR/knot-gateway-webui /usr/local/bin/knot-web-master
RUN cd /usr/local/bin/knot-web-master && npm install && npm run build && npm prune --production

RUN mkdir -p /usr/local/bin/knot-fog-source
RUN git clone https://github.com/CESARBR/knot-cloud-source /usr/local/bin/knot-fog-source
RUN cd /usr/local/bin/knot-fog-source && npm install 

# Setup knot-control
RUN mkdir -p /usr/local/bin/knot-control
WORKDIR /usr/local/bin/knot-control
RUN mkdir -p /etc/knot
ADD ./config/keys.json /etc/knot/keys.json
ADD ./config/gatewayConfig.json /etc/knot/gatewayConfig.json
ADD https://raw.githubusercontent.com/CESARBR/knot-gateway-buildroot/master/board/raspberrypi/rootfs_overlay/etc/knot/start.sh /etc/knot/start.sh
ADD https://raw.githubusercontent.com/ramonhpr/knot-gateway-buildroot/522100c6a3674f12dedf332908d553a870d03871/board/raspberrypi/rootfs_overlay/etc/knot/stop.sh /etc/knot/stop.sh
ADD https://raw.githubusercontent.com/CESARBR/knot-gateway-buildroot/master/package/knot-fog/knot-fog /usr/local/bin/knot-fog
ADD https://raw.githubusercontent.com/CESARBR/knot-gateway-buildroot/master/package/knot-web/knot-web /usr/local/bin/knot-web
RUN chmod 777 /etc/knot/keys.json /etc/knot/gatewayConfig.json /etc/knot/start.sh /etc/knot/stop.sh /usr/local/bin/knot-fog /usr/local/bin/knot-web
RUN mkdir -p ./factoryReset
COPY ./src/factoryReset ./factoryReset
COPY ./src/server.js ./src/client.js ./src/factoryReset.js package.json run.sh ./
RUN chmod 777 run.sh
RUN npm install
CMD ["/bin/bash","-c",". ./run.sh"]