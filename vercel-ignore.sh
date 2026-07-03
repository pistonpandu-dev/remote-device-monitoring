#!/bin/bash

# Check if the build should be ignored
if [[ "$VERCEL_ENV" == "production" ]]; then
  # Always build for production
  exit 1
else
  # For preview deployments, check if there are changes in specific folders
  if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
    exit 1
  fi

  # Check if there are changes in src/ or public/ folders
  if git diff --quiet HEAD^ HEAD -- src/ public/; then
    echo "🛑 - No changes in src/ or public/ folders, ignoring build"
    exit 0
  else
    echo "✅ - Changes detected in src/ or public/ folders, proceeding with build"
    exit 1
  fi
fi
