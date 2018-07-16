FROM ubuntu:latest as base

RUN apt-get update && apt-get install -y cmake
RUN apt-get install -y libx11-dev
RUN apt-get install -y libpng-dev
RUN apt-get install -y git
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y yarn

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app/server
# Install dependencies for server
RUN npm install

# Move into AngularApp directory
WORKDIR /usr/src/app/server/client
# Install dependencies for AngularApp
RUN npm install

# Move into server directory
WORKDIR /usr/src/app/server

RUN node scripts/build.js
# Install dependencies for serve

CMD ["npm", "start"]