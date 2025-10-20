# minimal prod image
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate && pnpm i --prod --frozen-lockfile || true

FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate && pnpm i --frozen-lockfile && pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
