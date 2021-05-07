FROM node:alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL=https://labs-management.herokuapp.com/api/v1

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent

COPY . ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html


COPY nginx/default.conf.template /etc/nginx/default.conf.template
COPY docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
