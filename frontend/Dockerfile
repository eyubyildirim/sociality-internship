FROM node:14
# Add a work directory
WORKDIR /app-frontend
# Cache and Install dependencies
COPY package.json /app-frontend
RUN npm install
# Copy app files
COPY . /app-frontend
# Start the app
CMD [ "npm", "start" ]