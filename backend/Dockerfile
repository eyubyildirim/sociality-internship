FROM node:14
WORKDIR /app-backend
COPY package.json /app-backend
RUN npm install
COPY . /app-backend
CMD ["npm", "start"]