FROM node:16-alpine
WORKDIR /build
COPY ./ ./
WORKDIR /build/client
RUN npm install && npm run build
RUN cp -R /build/client/build/* /build/server/dist

WORKDIR /build/server
RUN npm install

FROM node:16-alpine
WORKDIR /app
COPY --from=0 /build/server/ ./
COPY services-config.yaml services-config.yaml

EXPOSE 8080
CMD [ "node", "server.js" ]