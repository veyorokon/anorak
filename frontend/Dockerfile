FROM node:10.8-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git 

RUN npm install -g expo-cli
WORKDIR /frontend
