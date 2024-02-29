FROM node:21.2-alpine3.18

# We use nodemon to restart the server every time there's a change
# RUN npm install -g nodemon

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY ./ ./
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]