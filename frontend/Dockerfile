# frontend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all source code
COPY . .

# Build the Next.js application
RUN npm run build

# Set environment variable for production
ENV NODE_ENV=production

# Expose Next.js port
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "run", "start"]
