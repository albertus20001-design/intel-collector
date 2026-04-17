# Topic Summary

This repo now stores official-source snapshots under `raw/`, while organized topic notes live under `wiki/`, so model, API, and pricing questions can be answered primarily from local files instead of live web fetches.

## Coverage by vendor

- **Anthropic**: pricing, API overview, Messages API, legacy Completions API, model docs, Models API, error codes, rate limits.
- **OpenAI**: pricing, error codes, rate limits, Models API, Responses API.
- **Google Gemini**: pricing, API overview, model docs, structured output, function calling, troubleshooting/errors, rate limits.
- **DeepSeek**: pricing, introduction, chat completions, model listing, error codes, rate limits, function calling, JSON output.
- **OpenRouter**: quickstart/introduction, model overview, authentication, parameters, responses, rate limits, errors, structured outputs, provider selection, FAQ.

## Topic taxonomy

### 1. Models
Answer from:
- `raw/anthropic/api-models.md`
- `raw/anthropic/api-models-api.md`
- `raw/openai/api-models.md`
- `raw/google/api-models.md`
- `raw/deepseek/api-models.md`
- `raw/openrouter/api-models.md`

Use for:
- available model families / variants
- endpoint-visible model IDs
- compatibility / model capability notes

### 2. Core API
Answer from:
- `raw/anthropic/api-overview.md`
- `raw/anthropic/api-messages.md`
- `raw/openai/api-responses.md`
- `raw/google/api-overview.md`
- `raw/deepseek/api-introduction.md`
- `raw/deepseek/api-chat.md`
- `raw/openrouter/api-introduction.md`
- `raw/openrouter/api-responses.md`
- `raw/openrouter/api-authentication.md`
- `raw/openrouter/api-parameters.md`

Use for:
- auth headers / base URLs
- request structure
- response objects
- core endpoint behavior

### 3. Pricing and Limits
Answer from:
- `raw/anthropic/pricing.md`
- `raw/anthropic/api-rate-limits.md`
- `raw/openai/pricing.md`
- `raw/openai/api-rate-limits.md`
- `raw/google/pricing.md`
- `raw/google/api-rate-limits.md`
- `raw/deepseek/pricing.md`
- `raw/deepseek/api-rate-limits.md`
- `raw/openrouter/api-rate-limits.md`
- `wiki/PRICING_TOPIC_GUIDE.md`

Use for:
- token pricing
- tiers / spend control cues
- RPM / TPM / quota docs
- cache pricing / prompt-length pricing / server-tool pricing / multimodal pricing

### 4. Errors and Reliability
Answer from:
- `raw/anthropic/api-error-codes.md`
- `raw/openai/api-errors.md`
- `raw/google/api-errors.md`
- `raw/deepseek/api-errors.md`
- `raw/openrouter/api-errors.md`
- `raw/openrouter/faq.md`

Use for:
- retry behavior
- common failure classes
- debugging references

### 5. Structured Output and Tool Use
Answer from:
- `raw/google/api-structured-output.md`
- `raw/google/api-function-calling.md`
- `raw/deepseek/api-function-calling.md`
- `raw/deepseek/api-json-output.md`
- `raw/openrouter/feature-structured-outputs.md`

Use for:
- JSON schema output
- function calling
- JSON mode / response_format behavior

### 6. Routing / Aggregation
Answer from:
- `raw/openrouter/routing-provider-selection.md`
- `raw/openrouter/faq.md`
- `raw/openrouter/api-models.md`

Use for:
- provider selection
- aggregator-specific behavior
- model routing caveats

## Practical offline workflow

When summarizing a vendor, prefer this read order:
1. pricing + rate limits
2. model docs
3. core API docs
4. errors
5. structured output / function calling

## Known gaps

- OpenAI still lacks a stable, clean official markdown overview page in this repo; `api-responses` currently serves as the best core API anchor.
- DeepSeek snapshots come from official HTML extraction rather than stable markdown endpoints, so some pages may contain minor footer or encoding noise.
- OpenRouter still has room to expand into service tiers, guardrails, tool-calling, server tools, ZDR, and usage accounting.
