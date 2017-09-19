FROM node:v8.5.0

# Install other thrid party packages required by the app
RUN npm install

# 3001 is the port that container accepts request
EXPOSE 3000
EXPOSE 27017

CMD npm start 
