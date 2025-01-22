
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

RUN pnpm add --global turbo@^2.0.9

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

ARG PG_URL="YYY"
ENV PG_URL=${PG_URL}

ARG PROJECT_ID="BBB"
ENV PROJECT_ID=${PROJECT_ID}

ARG NEXT_PUBLIC_UMAMI_ID="AAA"
ENV NEXT_PUBLIC_UMAMI_ID=${NEXT_PUBLIC_UMAMI_ID}

ARG NEXT_PUBLIC_UMAMI_URL="ZZZ"
ENV NEXT_PUBLIC_UMAMI_URL=${NEXT_PUBLIC_UMAMI_URL}

ARG NEXT_PUBLIC_ICONIFY_API_URL="XXX"
ENV NEXT_PUBLIC_ICONIFY_API_URL=${NEXT_PUBLIC_ICONIFY_API_URL}

RUN pnpm run build

FROM nginx:1.27.0 AS runner
WORKDIR /app

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=installer /out /var/www/out