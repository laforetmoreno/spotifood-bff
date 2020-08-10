FROM node:12.16.1-alpine as base

RUN apk add --update --no-cache alpine-sdk python

WORKDIR /spotifood-bff/

COPY *.json  /spotifood-bff/
RUN yarn

COPY src /spotifood-bff/src/

EXPOSE 8888

FROM base as development

CMD yarn dev

FROM base as production

CMD npm dev