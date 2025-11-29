# Use Node.js 24-slim image
FROM node:24-slim

# Set working directory
WORKDIR /app

# Build-time environment variables
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_API
ARG NEXT_PUBLIC_CHATBOT_API_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Convert ARG → ENV (needed for Next.js build)
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_API=$NEXT_PUBLIC_BASE_API
ENV NEXT_PUBLIC_CHATBOT_API_URL=$NEXT_PUBLIC_CHATBOT_API_URL
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Install system dependencies
RUN apt update && apt install -y curl

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build with env variables
RUN npm run build

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start"]
