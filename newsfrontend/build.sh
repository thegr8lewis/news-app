#!/bin/bash

# Install dependencies
npm ci

# Build the project
npm run build

# Copy _redirects file to dist directory for proper routing
cp public/_redirects dist/_redirects

# Ensure all routes fall back to index.html
echo "/*    /index.html   200" > dist/_redirects