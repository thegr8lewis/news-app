#!/bin/bash

# Install dependencies
npm install

# Build the project
npm run build

# Copy _redirects file from root to dist directory for proper routing
cp _redirects dist/_redirects

# Also copy from public if it exists
if [ -f "public/_redirects" ]; then
    cp public/_redirects dist/_redirects
fi

# Create fallback files for common routes
cp dist/index.html dist/admin.html
cp dist/index.html dist/test.html

# Verify _redirects file exists
echo "Contents of _redirects file:"
cat dist/_redirects

# Ensure proper permissions
chmod 644 dist/_redirects

# List all files in dist
echo "Files in dist directory:"
ls -la dist/