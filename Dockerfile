# ────────── Stage 1: Dependencies ──────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install pnpm and copy lockfiles
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# ────────── Stage 2: Build ──────────
FROM node:20-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js (uses output: 'standalone') with a temporary empty schema DB for SSG routes
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN DATABASE_URL="file:/tmp/build.db" npx prisma db push --skip-generate && \
    DATABASE_URL="file:/tmp/build.db" npm run build && \
    rm -f /tmp/build.db

# ────────── Stage 3: Runner ──────────
FROM node:20-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static     ./.next/static
COPY --from=builder /app/public           ./public

# Prisma client binaries
COPY --from=builder /app/node_modules/.prisma             ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client      ./node_modules/@prisma/client
COPY --from=builder /app/prisma                           ./prisma

RUN mkdir -p /app/data /app/public/uploads && \
    chown -R nextjs:nodejs /app/data /app/public/uploads

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
