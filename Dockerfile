FROM alpine:latest
LABEL maintainer Elmo Todurov <elmo.todurov@eesti.ee>

RUN apk update && apk add build-base boost-dev mariadb mariadb-client mariadb-dev scons curl-dev gdb sudo git musl-dbg
RUN rm -f /var/cache/apk/*
ARG UID=1000
RUN adduser -D -u $UID sneezy
RUN echo "sneezy ALL=NOPASSWD: ALL" >> /etc/sudoers
RUN mkdir /tmp/cores

EXPOSE 7900

USER sneezy
WORKDIR /home/sneezy/sneezymud-docker/sneezymud/code
CMD scons -j`grep -c ^processor /proc/cpuinfo` -Q debug=1 -Q sanitize=0 -Q olevel=0 && mkdir -p ../lib/roomdata/saved ../lib/immortals ../lib/corpses/corrupt ../lib/rent/corrupt ../lib/player/corrupt && (for i in a b c d e f g h i j k l m n o p q r s t u v w x y z; do mkdir -p ../lib/rent/$i ../lib/account/$i ../lib/player/$i;done) && ./sneezy