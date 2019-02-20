FROM node:10
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app
RUN npm install -g nodemon --save
RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]