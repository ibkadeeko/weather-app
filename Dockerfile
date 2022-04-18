# common base image for development and production
FROM node:14.19.1-alpine3.14 AS base

WORKDIR /usr/src/app

FROM base AS builder

COPY ["package.json", "package-lock.json*", "./"]
# first set aside prod dependencies so we can copy in to the prod image
RUN npm install --pure-lockfile --production --silent
RUN cp -R node_modules /tmp/node_modules
RUN npm install --pure-lockfile
COPY . .
RUN npm run build

# release includes bare minimum required to run the app, copied from builder
FROM base as released

ENV NODE_ENV production
EXPOSE 8080

COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/city.list.json ./

CMD npm start
