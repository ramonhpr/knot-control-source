FROM node:carbon
WORKDIR /usr/app
RUN git clone https://github.com/CESARBR/knot-cloud-source
RUN cd knot-cloud-source && npm install --production
EXPOSE 3000
WORKDIR /usr/app/knot-cloud-source
CMD ["npm","start"]