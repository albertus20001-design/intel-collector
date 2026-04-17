# Topic Summary

This repo now stores official-source snapshots under `data/` so model, API, and pricing questions can be answered primarily from local files instead of live web fetches.

## Coverage by vendor

- **Anthropic**: pricing, API overview, Messages API, legacy Completions API, model docs, Models API, error codes, rate limits.
- **OpenAI**: pricing, error codes, rate limits, Models API, Responses API.
- **Google Gemini**: pricing, API overview, model docs, structured output, function calling, troubleshooting/errors, rate limits.
- **DeepSeek**: pricing, introduction, chat completions, model listing, error codes, rate limits, function calling, JSON output.
- **OpenRouter**: quickstart/introduction, model overview, authentication, parameters, responses, rate limits, errors, structured outputs, provider selection, FAQ.

## Topic taxonomy

### 1. Models
Answer from:
- `data/anthropic/api-models.md`
- `data/anthropic/api-models-api.md`
- `data/openai/api-models.md`
- `data/google/api-models.md`
- `data/deepseek/api-models.md`
- `data/openrouter/api-models.md`

Use for:
- available model families / variants
- endpoint-visible model IDs
- compatibility / model capability notes

### 2. Core API
Answer from:
- `data/anthropic/api-overview.md`
- `data/anthropic/api-messages.md`
- `data/openai/api-responses.md`
- `data/google/api-overview.md`
- `data/deepseek/api-introduction.md`
- `data/deepseek/api-chat.md`
- `data/openrouter/api-introduction.md`
- `data/openrouter/api-responses.md`
- `data/openrouter/api-authentication.md`
- `data/openrouter/api-parameters.md`

Use for:
- auth headers / base URLs
- request structure
- response objects
- core endpoint behavior

### 3. Pricing and Limits
Answer from:
- `data/anthropic/pricing.md`
- `data/anthropic/api-rate-limits.md`
- `data/openai/pricing.md`
- `data/openai/api-rate-limits.md`
- `data/google/pricing.md`
- `data/google/api-rate-limits.md`
- `data/deepseek/pricing.md`
- `data/deepseek/api-rate-limits.md`
- `data/openrouter/api-rate-limits.md`
- `docs/PRICING_TOPIC_GUIDE.md`

Use for:
- token pricing
- tiers / spend control cues
- RPM / TPM / quota docs
- cache pricing / prompt-length pricing / server-tool pricing / multimodal pricing

### 4. Errors and Reliability
Answer from:
- `data/anthropic/api-error-codes.md`
- `data/openai/api-errors.md`
- `data/google/api-errors.md`
- `data/deepseek/api-errors.md`
- `data/openrouter/api-errors.md`
- `data/openrouter/faq.md`

Use for:
- retry behavior
- common failure classes
- debugging references

### 5. Structured Output and Tool Use
Answer from:
- `data/google/api-structured-output.md`
- `data/google/api-function-calling.md`
- `data/deepseek/api-function-calling.md`
- `data/deepseek/api-json-output.md`
- `data/openrouter/feature-structured-outputs.md`

Use for:
- JSON schema output
- function calling
- JSON mode / response_format behavior

### 6. Routing / Aggregation
Answer from:
- `data/openrouter/routing-provider-selection.md`
- `data/openrouter/faq.md`
- `data/openrouter/api-models.md`

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
