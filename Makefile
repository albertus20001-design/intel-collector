.PHONY: help install dev build check validate-sources update-pricing generate-wiki refresh-reports changelog daily-summary today-diff refresh

help:
	@printf "Available targets:\n"
	@printf "  make install           Install dependencies with pnpm\n"
	@printf "  make dev               Start Mintlify dev server\n"
	@printf "  make build             Validate docs build\n"
	@printf "  make check             Validate docs build\n"
	@printf "  make validate-sources  Validate source config and raw snapshots\n"
	@printf "  make update-pricing    Refresh raw snapshots from configured sources\n"
	@printf "  make generate-wiki     Regenerate wiki indexes and vendor pages\n"
	@printf "  make changelog         Append a changelog entry\n"
	@printf "  make daily-summary     Append a daily summary entry\n"
	@printf "  make today-diff        Regenerate TODAY_DIFF.md from git diff\n"
	@printf "  make refresh-reports   Update changelog, daily summary, and today diff\n"
	@printf "  make refresh           Refresh raw snapshots, validate, regenerate wiki, and refresh reports\n"

install:
	pnpm install

dev:
	npm run dev

build:
	npm run build

check:
	npm run check

validate-sources:
	npm run validate:sources

update-pricing:
	npm run update:pricing

generate-wiki:
	npm run generate:wiki

changelog:
	node scripts/generate-changelog.mjs

daily-summary:
	node scripts/generate-daily-summary.mjs

today-diff:
	node scripts/generate-today-diff.mjs

refresh-reports: changelog daily-summary today-diff

refresh: update-pricing validate-sources generate-wiki refresh-reports check
