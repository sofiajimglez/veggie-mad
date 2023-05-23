FROM node:18.14.2-alpine3.17

COPY . /opt/veggie-mad

WORKDIR /opt/veggie-mad/api
RUN npm ci --only=production

WORKDIR /opt/veggie-mad/web
RUN npm ci --only=production

WORKDIR /opt/veggie-mad
EXPOSE 3000 3001

CMD ["npm", "start"]