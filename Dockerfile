# Use the official lightweight Node.js 16 image.
FROM node:16-alpine

# Set the working directory inside the Docker container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the Docker image.
COPY package*.json ./

# Install dependencies in the Docker image.
RUN npm install

# Copy the rest of the application code to the Docker image.
COPY . .

# Copy the environment variables file.
COPY .env.local .env.local

# Build the Next.js application inside the Docker image.
RUN npm run build

# Expose the port Next.js runs on.
EXPOSE 3000

# Define the command to run the app.
CMD ["npm", "start"]