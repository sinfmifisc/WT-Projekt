#Das ist die Dockerfile für das Backend


# build environment
FROM node:10



COPY . .


# install and cache app dependencies
COPY package.json package.json
RUN npm install
RUN npm run build


# start app
EXPOSE 8443

CMD npm run-script production