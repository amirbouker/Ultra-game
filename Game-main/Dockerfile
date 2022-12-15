FROM node:14

# Install PM2
RUN npm install -g pm2

# Set working directory
RUN mkdir -p /var/www/game-main
WORKDIR /var/www/game-main

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/game-main/node_modules/.bin:$PATH
# create user with no password
RUN adduser --disabled-password demo

# Copy existing application directory contents
COPY . /var/www/game-main
# install and cache app dependencies
COPY package.json /var/www/game-main/package.json
COPY package-lock.json /var/www/game-main/package-lock.json

# grant a permission to the application
RUN chown -R demo:demo /var/www/game-main
USER demo

# clear application caching
#RUN npm cache clean --force
# install all dependencies
RUN npm install


EXPOSE 8882
# start run in production environment
#CMD [ "npm", "run", "pm2:delete" ]
#CMD [ "npm", "run", "build-docker:dev" ]

# start run in development environment
CMD [ "npm", "run", "start:dev" ]
