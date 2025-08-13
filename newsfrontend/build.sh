#!/bin/bash

# Install dependencies
npm install

# Build the project
npm run build

# Copy _redirects file to dist directory for proper routing
cp public/_redirects dist/_redirects

# Verify _redirects file exists
echo "Contents of _redirects file:"
cat dist/_redirects