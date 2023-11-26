FROM node:18.17-alpine

WORKDIR /fit-api
COPY package.json .
RUN npm install
RUN npx tsc
COPY . .
CMD ["npm","start"] 

