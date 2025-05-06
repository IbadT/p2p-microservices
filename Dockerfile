# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

# Build the application
RUN npm run build && \
    echo "Checking dist directory contents:" && \
    ls -la dist/ && \
    echo "Checking if main.js exists:" && \
    test -f dist/main.js && \
    echo "Build successful"

# Development stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

# Expose port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy Prisma schema and generated client
COPY prisma ./prisma
COPY --from=builder /app/src/proto/generated ./src/proto/generated

# Copy built application and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Verify the dist directory contents
RUN echo "Verifying dist directory contents:" && \
    ls -la dist/ && \
    echo "Verifying main.js exists:" && \
    test -f dist/main.js && \
    echo "Verification successful"

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]