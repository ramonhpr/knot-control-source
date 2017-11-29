FROM node:carbon
WORKDIR /usr/app
RUN git clone https://github.com/CESARBR/knot-gateway-webui
COPY ./production.json ./knot-gateway-webui/config/default.json
RUN cd knot-gateway-webui && npm install && npm run build && npm prune --production
EXPOSE 8080
RUN mkdir -p /etc/knot
COPY ./config/gatewayConfig.json ./config/keys.json /etc/knot/
RUN mkdir -p /usr/local/bin/knot-fog-source && touch /usr/local/bin/knot-fog-source/.env
WORKDIR /usr/app/knot-gateway-webui
CMD ["npm","start"]