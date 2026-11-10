#!/usr/bin/env bash
# Export this project's source code (no dependencies, no build output, no git metadata).
# Usage:  ./export-source.sh [output-name]        (default: soil-sourness-calculator.zip)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_NAME="${1:-soil-sourness-calculator.zip}"
STAGE="$(mktemp -d)/soil-sourness-calculator"
mkdir -p "$STAGE"

# Folders that are real source.
for dir in src public; do
  [ -d "$ROOT/$dir" ] && cp -R "$ROOT/$dir" "$STAGE/"
done

# Config + docs at the project root.
for file in \
  package.json bun.lock bunfig.toml tsconfig.json vite.config.ts vitest.config.ts \
  eslint.config.js components.json .prettierrc .prettierignore .gitignore \
  README.md AGENTS.md roadmap.md; do
  [ -f "$ROOT/$file" ] && cp "$ROOT/$file" "$STAGE/"
done

# Never ship dependencies, build output, or repository metadata.
find "$STAGE" \( -name node_modules -o -name dist -o -name .output -o -name .git \) -prune -exec rm -rf {} +

( cd "$(dirname "$STAGE")" && zip -rq "$OUT_NAME" "$(basename "$STAGE")" )
mv "$(dirname "$STAGE")/$OUT_NAME" "$ROOT/$OUT_NAME"
rm -rf "$(dirname "$STAGE")"

echo "Exported: $ROOT/$OUT_NAME"
echo "Run 'bun install' (or 'npm install') inside the folder, then 'bun run dev'."
