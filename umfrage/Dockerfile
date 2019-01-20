#Das ist die Dockerfile für das FrontEnd

#Darauf baut alles auf

# build environment
FROM node:10






# install and cache app dependencies
COPY . .
COPY package.json package.json
RUN npm install
RUN npm install react-scripts@1.1.1 -g 
RUN npm run build

# start app
RUN npm install -g serve
CMD serve -s build -p 3000
EXPOSE 3000

