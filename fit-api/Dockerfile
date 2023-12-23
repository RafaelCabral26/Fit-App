FROM node:18.17-alpine

WORKDIR /fit-api
COPY package.json .
RUN npm install
COPY . .
#CMD ["npm", "run", "start"] 
CMD ["npm", "run", "dev"] 

