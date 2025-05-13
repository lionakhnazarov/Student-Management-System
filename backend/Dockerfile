FROM node:20
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm i

# Copy the rest of the application code
COPY . .

EXPOSE 5007
CMD [ "npm", "run", "start" ]