FROM node:7.9.0

# make a folder where the application will reside
RUN mkdir -p /express-typescript-mongo-docker

RUN  apt-get update

WORKDIR /express-typescript-mongo-docker

# copy dist folder content to docker '/express-typescript-mongo-docker/dist' folder
COPY ./ /express-typescript-mongo-docker/



# Install other thrid party packages required by the app
RUN npm install

# 3001 is the port that container accepts request
EXPOSE 3001
EXPOSE 27017

CMD npm start 
