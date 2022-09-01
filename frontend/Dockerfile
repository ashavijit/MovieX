FROM node:14-alpine
WORKDIR /etc/frontend

COPY package.json .
COPY yarn.lock .
RUN npm install --save jquery
RUN npm i --save react-select
RUN yarn install
COPY . .
EXPOSE 3000
RUN yarn build

CMD ["npm", "start"]