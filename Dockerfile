
# https://turbo.build/repo/docs/guides/tools/docker#example
# https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/
FROM node:22.5.1-alpine3.19 AS base

FROM base AS builder

RUN echo "step 1"
RUN apk update

RUN echo "step 1"
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install pnpm with corepack
RUN echo "step 3"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Enable `pnpm add --global` on Alpine Linux by setting
# home location environment variable to a location already in $PATH
# https://github.com/pnpm/pnpm/issues/784#issuecomment-1518582235
ENV PNPM_HOME=/usr/local/bin

RUN echo "step 4"
COPY . .

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

RUN echo "step 5"
RUN apk update

RUN echo "step 6"
RUN apk add --no-cache libc6-compat

WORKDIR /app
 
# First install the dependencies (as they change less often)
RUN echo "step 7"
COPY .gitignore .gitignore

RUN echo "step 8"
COPY --from=builder /app/hooore-components ./hooore-components

RUN echo "step 9"
COPY --from=builder /app/hooore-packages ./hooore-packages

RUN echo "step 10"
COPY --from=builder /app/package.json .

RUN echo "step 11"
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN echo "step 12"
RUN corepack enable pnpm && pnpm install --frozen-lockfile
 
# Build the project
RUN echo "step 13"
COPY --from=builder /app/ .