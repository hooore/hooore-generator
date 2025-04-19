FROM node:22.5.1-alpine3.19

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY ./hooore/packages ./hooore/packages
COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml

# https://github.com/pnpm/pnpm/issues/9029
# https://github.com/nodejs/corepack/issues/612
RUN npm install -g corepack@latest

RUN corepack enable
RUN corepack prepare pnpm --activate
RUN pnpm install --frozen-lockfile
 
COPY . .

RUN pnpm run build:packages