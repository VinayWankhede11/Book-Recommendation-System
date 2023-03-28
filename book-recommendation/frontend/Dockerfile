# Use an official Node.js runtime as a parent image
FROM node:18.12.1-alpine3.16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the server will listen on
EXPOSE 3000

# Start the server
CMD ["npm", "start"]