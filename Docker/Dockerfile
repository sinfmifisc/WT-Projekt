#Das ist die Dockerfile
#Basis Image von Docker: Ubuntu 
#Darauf baut alles auf
FROM ubuntu:16.04

#Installation von NodeJS auf Ubuntu
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq 
