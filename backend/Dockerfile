FROM node:20-alpine

# 1. Create a group and user
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

WORKDIR /app

# 2. Set ownership and install dependencies
COPY --chown=nonroot:nonroot package*.json ./
RUN npm install

# 3. Copy source code
COPY --chown=nonroot:nonroot . .

# 4. Switch to non-root user
USER nonroot

# Local/dev default port (docker-compose maps 5000:5000 and sets PORT=5000).
# Deployments that require a different port (e.g. Cloud Run's 8080) should
# override PORT via the platform's environment configuration.
EXPOSE 5000

# Use the PORT environment variable if available, otherwise default to 5000
ENV PORT=5000

CMD ["node", "server.js"]