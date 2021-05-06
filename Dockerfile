FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL=https://labs-management.herokuapp.com/api/v1

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

CMD ["npm", "run", "start"]