FROM node:16.14-alpine
WORKDIR /backend
COPY package*.jason ./
RUN npm install
COPY . .
EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]