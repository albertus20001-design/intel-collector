# Pricing Topic Guide

This document organizes the current offline pricing evidence into reusable topics so pricing questions can be answered from local snapshots instead of live web queries.

## General rules to remember first

Before comparing vendors, apply these common rules:

1. **Do not assume one vendor's pricing logic applies to another.**
   - Some vendors price by base input/output tokens.
   - Some add cache multipliers.
   - Some split by service tier (standard / batch / priority).
   - Some split by prompt length, cache hit status, or modality.

2. **Separate four pricing topics when answering.**
   - **Cache pricing**: read/write/cache-hit/storage costs.
   - **Input prompt length pricing**: whether price changes when prompt length crosses a threshold.
   - **Server tool pricing**: web search, web fetch, code execution, grounding, agent runtime, or per-request tool costs.
   - **Multimodal pricing**: different rates for text, image, video, audio, or per-image/per-minute billing.

3. **Answer with the vendor's native pricing unit.**
   - Most pages use **USD per 1M tokens**.
   - Some features are billed **per search**, **per request**, **per session-hour**, **per container-hour**, **per image**, or **per minute**.

4. **Cache pricing is not standardized across vendors.**
   - Anthropic uses explicit write/read multipliers.
   - OpenAI exposes cached-input pricing columns.
   - Gemini uses context-caching price plus storage price, often split by modality.
   - DeepSeek distinguishes cache hit vs cache miss.
   - OpenRouter exposes cache fields in a pricing schema, but values vary by model/provider.

5. **Tool/server-call pricing is often layered on top of token pricing.**
   - A vendor may charge normal input/output tokens **plus** an extra server-side tool fee.
   - Some server tools are free beyond token usage.

6. **Multimodal pricing is often model-specific rather than vendor-uniform.**
   - A vendor may price text/image/video together for one model but separate audio.
   - Live/audio/image generation models often use a different scheme from core chat models.

7. **When local evidence is incomplete, say so explicitly.**
   - Current offline coverage is strongest for Anthropic and Google pricing details.
   - OpenAI pricing is partly represented via source code tables.
   - DeepSeek pricing is concise and narrower.
   - OpenRouter is mostly a pricing-schema view, not one unified vendor price sheet.

---

## Topic 1: Cache pricing

### What this topic means
Questions in this topic ask how vendors charge for:
- cache writes
- cache reads / cache hits
- context cache storage
- cached input vs uncached input

### Vendor differences

#### Anthropic
**Rule shape:** explicit cache multipliers over base input price.

- 5-minute cache write = **1.25x** base input price
- 1-hour cache write = **2x** base input price
- cache read/hit = **0.1x** base input price
- these stack with other modifiers such as batch discount and data residency

**Practical difference:**
Anthropic is the clearest "multiplier model". You start from base input pricing for a specific Claude model, then apply cache multipliers.

**Examples of covered models in local snapshot:**
- Claude Opus 4.6 / 4.5 / 4.1 / 4
- Claude Sonnet 4.6 / 4.5 / 4 / 3.7
- Claude Haiku 4.5 / 3.5 / 3
- Claude Opus 3

#### OpenAI
**Rule shape:** cached input is a separate pricing column.

OpenAI pricing tables in the local snapshot commonly expose:
- input
- cached input
- output

**Practical difference:**
OpenAI's local pricing evidence does not currently split cache into Anthropic-style 5m write / 1h write / read multipliers. Instead, it shows a cached-input rate directly for many models.

**Examples visible in local snapshot:**
- gpt-5.4
- gpt-5.4-mini
- gpt-5.4-nano
- gpt-5.2
- gpt-5.1
- gpt-5
- gpt-5-mini
- gpt-5-nano
- gpt-4.1 / mini / nano
- gpt-4o / gpt-4o-mini
- o1 / o3 / o4-mini and others

#### Google Gemini
**Rule shape:** context caching price plus storage price, often split by service tier and modality.

Typical Gemini cache entries include:
- context caching price
- storage price per 1,000,000 tokens per hour
- sometimes separate text/image/video vs audio cache pricing
- for some Pro models, cache price also changes for `<=200k` vs `>200k` prompts

**Examples visible in local snapshot:**
- Gemini 3.1 Pro Preview / customtools
- Gemini 3.1 Flash-Lite Preview
- Gemini 3 Flash Preview
- Gemini 2.5 Pro
- Gemini 2.5 Flash
- Gemini 2.5 Flash-Lite

**Practical difference:**
Gemini is the richest "cache matrix" among the covered vendors: model + service tier + modality + sometimes prompt-length threshold.

#### DeepSeek
**Rule shape:** cache hit vs cache miss.

Local snapshot explicitly shows:
- input tokens (cache hit)
- input tokens (cache miss)
- output tokens

**Models visible in local snapshot:**
- `deepseek-chat`
- `deepseek-reasoner`

**Practical difference:**
DeepSeek gives the simplest cache distinction in the repo: cache hit vs cache miss, without Anthropic-style write durations.

#### OpenRouter
**Rule shape:** pricing schema fields rather than one fixed vendor rule.

OpenRouter's model schema includes:
- `input_cache_read`
- `input_cache_write`

**Practical difference:**
OpenRouter documents how cache pricing can be represented, but current offline evidence is schema-oriented. Actual values depend on the specific routed model/provider.

---

## Topic 2: Input prompt length pricing

### What this topic means
Questions in this topic ask whether input cost changes when a prompt crosses a length threshold.

### Vendor differences

#### Anthropic
**Current local rule:** no general Gemini-style prompt-length threshold pricing is documented.

Relevant local note:
- long context pricing for Claude Mythos Preview, Opus 4.6, and Sonnet 4.6 is described as standard pricing across the full context window
- fast mode for Opus 4.6 applies across the full context window, including requests over 200k input tokens

**Practical difference:**
Anthropic's current local docs emphasize that long context can remain at standard per-token rates rather than switching to a higher length tier.

#### OpenAI
**Current local rule:** no explicit Gemini-style `<= threshold / > threshold` prompt-length tier is clearly documented in current offline pricing tables.

**Practical difference:**
OpenAI in the current snapshot is primarily split by model, tier, and cached-input behavior, not by prompt-length thresholds.

#### Google Gemini
**Current local rule:** yes, some models explicitly use prompt-length tiers.

Documented tier shape:
- `prompts <= 200k tokens`
- `prompts > 200k tokens`

This affects:
- input price
- output price
- context caching price

**Models clearly showing this in local snapshot:**
- `gemini-3.1-pro-preview`
- `gemini-3.1-pro-preview-customtools`
- `gemini-2.5-pro`
- `gemini-2.5-computer-use-preview-10-2025`

**Practical difference:**
Gemini is the clearest vendor in the repo with true prompt-length threshold pricing.

#### DeepSeek
**Current local rule:** no prompt-length tiering shown in current offline pricing snapshot.

#### OpenRouter
**Current local rule:** no unified OpenRouter-wide prompt-length rule is documented in current schema snapshot.

---

## Topic 3: Server tool / server-side call pricing

### What this topic means
Questions in this topic ask about:
- web search
- web fetch
- code execution
- grounding
- managed/hosted agent runtime
- per-request tool or request charges

### Vendor differences

#### Anthropic
Anthropic is the most detailed vendor in the offline snapshot.

**General rule:**
Tool use cost can include:
- normal input tokens
- normal output tokens
- extra tokens from tool definitions / tool use / tool results
- extra server-side tool charges when applicable

**Explicit server-side tool pricing in local snapshot:**
- **Web search**: `$10 / 1,000 searches`
- **Web fetch**: no additional charge beyond standard token costs
- **Code execution**:
  - free when used together with web search or web fetch
  - otherwise billed by execution time
  - first 1,550 hours/month free
  - then `$0.05 / hour / container`
- **Claude Managed Agents**:
  - token pricing still applies
  - plus session runtime at `$0.08 / session-hour`

**Extra token overhead examples:**
- bash tool: +245 input tokens
- text editor: +700 input tokens
- computer use tool: extra system prompt + tool definition tokens, plus screenshot/vision-related cost

#### OpenAI
**Current local evidence:** incomplete for a vendor-grade server-tool pricing summary.

The offline pricing source clearly indicates separate sections for:
- realtime and audio generation models
- image generation models
- multimodal models

However, current local evidence does **not** provide an Anthropic-level breakdown for OpenAI server-side tools such as web search, file search, or code interpreter pricing.

**Safe working rule:**
Use local pricing tables for model/tier/cache information, but answer cautiously on server-tool surcharges unless more direct offline snapshots are added.

#### Google Gemini
Gemini's current local evidence most clearly exposes **grounding** pricing.

**Server-call pattern visible in local snapshot:**
- Grounding with Google Search
- Grounding with Google Maps
- for some image models, Google Web and Image Search grounding

**Typical rule shape:**
- free allowance first
- then charged per 1,000 search queries or grounded prompts

**Common examples in local snapshot:**
- many Gemini 3 models: `5,000 prompts per month` free, then `$14 / 1,000 search queries`
- some Gemini 2.5 models: `1,500 RPD` free, then `$35 / 1,000 grounded prompts`
- Maps examples: `10,000 RPD` or `1,500 RPD` free, then `$25 / 1,000 grounded prompts`

#### DeepSeek
**Current local evidence:** tool capability is present, but separate server-tool surcharge rules are not explicitly documented in the local pricing file.

Visible capability flags include:
- JSON Output
- Tool Calls
- Chat Prefix Completion
- FIM Completion

**Safe working rule:**
Acknowledge tool support, but do not claim an extra server-tool fee structure from current offline pricing evidence.

#### OpenRouter
**Rule shape:** pricing schema can represent request- or tool-related costs.

OpenRouter pricing schema includes:
- `request`
- `web_search`
- `internal_reasoning`

**Practical difference:**
OpenRouter documents the fields that may carry server-call pricing, but current local evidence is schema-level rather than a complete cross-model fee sheet.

---

## Topic 4: Multimodal pricing

### What this topic means
Questions in this topic ask whether vendors charge differently for:
- text
- image
- video
- audio
- image generation outputs
- realtime/audio minute-based usage

### Vendor differences

#### Anthropic
**Rule shape in current local evidence:** mostly token-based rather than a vendor-wide modality price matrix.

Relevant local clues:
- normal token pricing applies to model use
- tool use and computer use add token overhead
- screenshots and visual content are effectively part of vision/token usage

**Practical difference:**
Anthropic's local pricing snapshot is strongest on tokens, tools, and cache—not on a vendor-wide modality-by-modality price table.

#### OpenAI
**Rule shape in current local evidence:** multimodal pricing clearly exists, but current local offline snapshot is less directly readable than Gemini.

Local pricing source clearly contains pricing sections for:
- multimodal models
- realtime and audio generation models
- image generation models

**Practical difference:**
OpenAI definitely has model families with multimodal price separation, but current offline extraction is more table-code oriented than narrative.

#### Google Gemini
Gemini has the clearest multimodal pricing in current offline coverage.

**Patterns visible across models:**
- many models price `text / image / video` together
- audio is often charged separately and higher
- live/audio models can use token pricing **or** minute-based pricing
- image generation models can quote per-image-equivalent prices by output resolution

**Examples:**
- Gemini 2.5 Flash: input separates `(text/image/video)` vs `audio`
- Gemini 2.5 Flash-Lite: same structure, cheaper rates
- Gemini 3.1 Flash Live Preview:
  - text input/output rates
  - audio priced by token or per minute
  - image/video input can also be priced per minute
- Gemini 3.1 Flash Image Preview:
  - image output converted to per-image equivalents for 0.5K / 1K / 2K / 4K
- Gemini 3 Pro Image Preview:
  - separate text/image input behavior and image output prices by resolution bucket
- Gemini 3.1 Flash TTS Preview:
  - text input pricing
  - audio output pricing

#### DeepSeek
**Current local evidence:** no explicit vendor-wide multimodal price breakdown found in the local pricing snapshot.

**Practical difference:**
Current offline pricing evidence for DeepSeek is still primarily text-token pricing.

#### OpenRouter
**Rule shape:** multimodality is represented through schema and model metadata.

Relevant local schema fields:
- `architecture.input_modalities`
- `architecture.output_modalities`
- pricing field `image`

**Practical difference:**
OpenRouter exposes a way to inspect modality support and image-related pricing per model, but current local evidence is schema-oriented, not a single vendor-wide multimodal price table.

---

## Quick compare summary

### Cache pricing
- **Anthropic**: explicit read/write multipliers
- **OpenAI**: cached-input price column
- **Gemini**: cache price + storage price, often split by modality and tier
- **DeepSeek**: cache hit vs cache miss
- **OpenRouter**: schema fields for cache read/write

### Input prompt length pricing
- **Anthropic**: no general prompt-length tier in current local evidence
- **OpenAI**: no clear prompt-length tier in current local evidence
- **Gemini**: strongest example of `<=200k` vs `>200k` threshold pricing
- **DeepSeek**: none shown in current local snapshot
- **OpenRouter**: none shown as a unified rule

### Server tool / server-side call pricing
- **Anthropic**: strongest and most explicit local coverage
- **OpenAI**: local server-tool pricing detail currently incomplete
- **Gemini**: grounding/search/maps pricing is explicit
- **DeepSeek**: tool support visible, extra server-call fee structure not explicit in current local pricing file
- **OpenRouter**: schema can represent request/web_search/internal_reasoning costs

### Multimodal pricing
- **Anthropic**: token/tool oriented, less modality-table driven
- **OpenAI**: multimodal sections exist, but offline extraction is less clean
- **Gemini**: richest modality-specific pricing in local coverage
- **DeepSeek**: limited local multimodal pricing evidence
- **OpenRouter**: modality support and image pricing are schema-expressed per model

---

## Best local files for each topic

### Cache pricing
- `data/anthropic/pricing.md`
- `data/openai/pricing.md`
- `data/google/pricing.md`
- `data/deepseek/pricing.md`
- `data/openrouter/api-models.md`

### Input prompt length pricing
- `data/google/pricing.md`
- `data/anthropic/pricing.md`
- `data/openai/pricing.md`

### Server tool / server-side call pricing
- `data/anthropic/pricing.md`
- `data/google/pricing.md`
- `data/openrouter/api-models.md`

### Multimodal pricing
- `data/google/pricing.md`
- `data/openai/pricing.md`
- `data/anthropic/pricing.md`
- `data/openrouter/api-models.md`

## Current evidence caveats

- `data/openai/pricing.md` is useful but partially source-code/table-structure oriented, so read conservatively.
- `data/deepseek/pricing.md` is concise and may include extraction noise, but the cache-hit/cache-miss signal is clear.
- `data/openrouter/api-models.md` is a schema-level pricing reference, not a single unified price table.
- OpenRouter usage-accounting expansion mentioned in earlier work is not present in this worktree, so current offline answers should remain schema-based for OpenRouter pricing mechanics.
