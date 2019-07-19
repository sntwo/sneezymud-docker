# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

RUN apk update && apk add python
RUN export PYTHONPATH="$PYTHONPATH:/app"

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
COPY . /app

# start app
CMD ["npm", "start"]