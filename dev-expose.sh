#!/usr/bin/env bash
set -euo pipefail

cleanup() {
  echo ""
  echo "Removing tailscale serve config..."
  kill "$TS_PID" 2>/dev/null || true
  tailscale serve --remove / 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "Setting up tailscale serve -> localhost:4321..."
tailscale serve http://localhost:4321 &
TS_PID=$!

echo "Starting dev server..."
npm run dev -- --host
