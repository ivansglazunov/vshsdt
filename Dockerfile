FROM node:lts
MAINTAINER "Ivan S Glazunov <ivansglazunov@gmail.com>"

# Copy the application to the Docker image
COPY [".", "/usr/src/app"]
WORKDIR "/usr/src/app"

RUN set -ex \
  && npm install \
  && npm run docker-build

CMD ["npm", "run", "docker-start"]
