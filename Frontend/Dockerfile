FROM node:alpine

COPY questions.html .
COPY script.js .

RUN npm install -g http-server

ENTRYPOINT ["http-server"]
