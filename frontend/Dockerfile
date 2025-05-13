FROM node:20
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm i

# Copy the rest of the application code
COPY . .

CMD [ "npm", "run", "dev", "--","--no-open", "--host" ]