
# https://turbo.build/repo/docs/guides/tools/docker#example
# https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/
FROM node:22.5.1-alpine3.19 AS base

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY hooore-components ./hooore-components
COPY hooore-packages ./hooore-packages
COPY package.json .
COPY pnpm-lock.yaml ./pnpm-lock.yaml
# https://github.com/pnpm/pnpm/issues/9029
# https://github.com/nodejs/corepack/issues/612
RUN npm install -g corepack@latest
# Install pnpm with corepack
RUN corepack enable
RUN corepack prepare pnpm --activate
RUN pnpm install --frozen-lockfile
 
# Build the project
COPY . .