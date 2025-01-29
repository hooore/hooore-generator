
# https://turbo.build/repo/docs/guides/tools/docker#example
# https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/
FROM node:22.5.1-alpine3.19 AS base

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install pnpm with corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Enable `pnpm add --global` on Alpine Linux by setting
# home location environment variable to a location already in $PATH
# https://github.com/pnpm/pnpm/issues/784#issuecomment-1518582235
ENV PNPM_HOME=/usr/local/bin

COPY . .

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/hooore-components ./hooore-components
COPY --from=builder /app/hooore-packages ./hooore-packages
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN corepack enable pnpm && pnpm install --frozen-lockfile
 
# Build the project
COPY --from=builder /app/ .