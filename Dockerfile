# ----------- Stage 1: Dependencies ----------- 
FROM node:24-slim AS deps
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# ----------- Stage 2: Builder -----------
FROM node:24-slim AS builder
WORKDIR /app

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# ----------- Stage 3: Production Runner -----------
FROM node:24-slim AS runner
WORKDIR /app

# Copy only necessary files for runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start"]
