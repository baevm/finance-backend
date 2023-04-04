FROM node:18-alpine

WORKDIR /user/src/app

COPY . .

RUN yarn

RUN yarn build

USER node

CMD ["yarn", "start:prod"]

