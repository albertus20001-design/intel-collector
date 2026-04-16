---
name: proxy-snapshot-fetch
description: Use when refreshing this repo's vendor snapshots through a local proxy. This skill exports the project's proxy settings, runs the snapshot fetcher, validates outputs, and ensures failed fetch responses such as 403 pages, Cloudflare challenge pages, or ERROR_FETCHING_URL content are not kept in snapshot files.
---

# Proxy Snapshot Fetch

Use this skill when updating source snapshots in this repository and network access is flaky, region-blocked, or benefits from the local proxy at `127.0.0.1:7890`.

## What this skill does

- Exports the repo's proxy environment:
  - `https_proxy=http://127.0.0.1:7890`
  - `http_proxy=http://127.0.0.1:7890`
  - `all_proxy=socks5://127.0.0.1:7890`
- Runs the snapshot fetcher in [scripts/update-pricing.mjs](../scripts/update-pricing.mjs)
- Validates outputs with [scripts/validate-sources.mjs](../scripts/validate-sources.mjs)
- Confirms no failure markers remain in `data/`

## When to use it

- The user asks to refresh vendor data with a proxy
- Recent fetches returned 403, Cloudflare challenge pages, or placeholder HTML
- You need to guarantee that failed responses are not written into snapshot files

## Workflow

1. Run the bundled script:

```bash
./proxy-snapshot-fetch/scripts/run-update.sh
```

2. If validation fails, inspect the reported files and source URLs before changing `sources/index.yml`.

3. Do not keep any failed fetch body in snapshots. This repository's fetcher is expected to:
   - skip failed updates when a valid snapshot already exists
   - delete a snapshot if the on-disk file itself is already a failed placeholder

4. If a source is still blocked after proxying, prefer one of these actions:
   - keep the last known good snapshot
   - remove the source from public-facing vendor pages if it is persistently unavailable
   - replace the source URL with a more stable official endpoint

## Failure markers to treat as invalid

- `ERROR_FETCHING_URL`
- `403: Forbidden`
- `Just a moment...`
- `Enable JavaScript and cookies to continue`
- `Author Not Found`
- Cloudflare challenge markers such as `__cf_chl_tk`

## Files to know

- Fetcher: [scripts/update-pricing.mjs](../scripts/update-pricing.mjs)
- Validation: [scripts/validate-sources.mjs](../scripts/validate-sources.mjs)
- Source registry: [sources/index.yml](../sources/index.yml)
- Vendor page generation: [scripts/generate-vendor-pages.mjs](../scripts/generate-vendor-pages.mjs)

## Notes

- `OpenAI` sources may still be blocked even with the proxy. Treat that as a source limitation, not as a reason to preserve failure pages.
- `DeepSeek`, `OpenRouter`, and `Anthropic` have been validated to work with this proxy-based flow in this repo.
