#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

export https_proxy="http://127.0.0.1:7890"
export http_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7890"

node scripts/update-pricing.mjs
node scripts/validate-sources.mjs

if rg -n "ERROR_FETCHING_URL|403: Forbidden|Just a moment|Enable JavaScript and cookies to continue|Author Not Found|__cf_chl_tk|Attention Required! \\| Cloudflare" data -S; then
  echo "invalid failure content still exists in data/"
  exit 1
fi

echo "proxy snapshot update succeeded"
