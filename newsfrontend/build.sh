#!/bin/bash

# Install dependencies
npm ci

# Build the project
npm run build

# Copy _redirects file to dist directory for proper routing
cp _redirects dist/_redirects