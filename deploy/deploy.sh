#!/bin/bash
# deploy.sh — Run this on the VPS to deploy Makan Landscape
# Usage: bash deploy.sh
set -e

APP_DIR="/var/www/makan"
REPO="git@github.com:YOUR_ORG/makan.git"  # ← update this

echo "── Pulling latest code ──"
cd $APP_DIR
git pull origin main

echo "── Installing dependencies ──"
pnpm install --frozen-lockfile

echo "── Generating Prisma client ──"
npx prisma generate

echo "── Running DB migrations ──"
npx prisma migrate deploy

echo "── Building Next.js ──"
npm run build

echo "── Syncing static assets for Nginx ──"
# Nginx serves these directly — symlink already points here via alias

echo "── Restarting PM2 ──"
pm2 reload ecosystem.config.js --update-env

echo "── Warming up pages & image cache ──"
sleep 2
curl -s -o /dev/null "http://127.0.0.1:3000/ar" || true
curl -s -o /dev/null "http://127.0.0.1:3000/en" || true
curl -s -o /dev/null "http://127.0.0.1:3000/ar/about" || true
curl -s -o /dev/null "http://127.0.0.1:3000/ar/services" || true
curl -s -o /dev/null "http://127.0.0.1:3000/ar/projects" || true
curl -s -o /dev/null "http://127.0.0.1:3000/ar/contact" || true
curl -s -o /dev/null "http://127.0.0.1:3000/ar/team" || true

echo "✅ Deployment complete & cache warmed!"
