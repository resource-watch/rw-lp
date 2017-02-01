FROM mhart/alpine-node:6.2

ENV NAME rw-lp
ENV USER microservice

RUN apk update && apk upgrade && apk add --no-cache --update bash git

RUN addgroup $USER && adduser -s /bin/bash -D -G $USER $USER

RUN npm install -g bower gulp pm2

RUN mkdir -p /opt/$NAME

COPY package.json /opt/$NAME/package.json
COPY bower.json /opt/$NAME/bower.json

RUN cd /opt/$NAME && npm install
RUN cd /opt/$NAME && bower install --allow-root

COPY ./app /opt/$NAME/app

COPY gulpfile.js /opt/$NAME/gulpfile.js
COPY server.js /opt/$NAME/server.js
COPY entrypoint.sh /opt/$NAME/entrypoint.sh

WORKDIR /opt/$NAME
RUN gulp build

RUN chown $USER:$USER /opt/$NAME

# Tell Docker we are going to use this ports
EXPOSE 8080
USER $USER

ENTRYPOINT ["./entrypoint.sh"]
