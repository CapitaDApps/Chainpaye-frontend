#!/bin/bash
# Code Formatting Script for Chainpaye

echo "Formatting codebase..."

# Check if prettier is available, otherwise use eslint --fix
if npx prettier --version >/dev/null 2>&1; then
  npx prettier --write .
else
  echo "Prettier not found, using eslint --fix..."
  npm run lint -- --fix
fi

echo "Done!"
