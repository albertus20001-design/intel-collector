# 主题总览

当前仓库将官方来源快照存放在 `raw/` 目录下，而按主题整理的说明与索引放在 `wiki/` 目录下。这样在回答模型、API 和价格问题时，可以优先依赖本地文件，而不是每次都去实时抓网页。

## 各厂商覆盖范围

- **Anthropic**：价格、API 总览、Messages API、旧版 Completions API、模型文档、Models API、错误码、速率限制。
- **OpenAI**：价格、错误码、速率限制、Models API、Responses API。
- **Google Gemini**：价格、API 总览、模型文档、结构化输出、函数调用、排障/错误、速率限制。
- **DeepSeek**：价格、简介、Chat Completions、模型列表、错误码、速率限制、函数调用、JSON 输出。
- **OpenRouter**：快速开始/简介、模型总览、鉴权、参数、响应、速率限制、错误、结构化输出、供应商路由选择、FAQ。

## 主题分类

### 专题入口

- [计费专题](./topics/billing)
- [模型专题](./topics/models)

### 1. 模型
优先参考：
- `raw/anthropic/api-models.md`
- `raw/anthropic/api-models-api.md`
- `raw/openai/api-models.md`
- `raw/google/api-models.md`
- `raw/deepseek/api-models.md`
- `raw/openrouter/api-models.md`

适用问题：
- 可用模型家族 / 变体
- 接口可见的模型 ID
- 兼容性 / 能力差异说明

### 2. 核心 API
优先参考：
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

适用问题：
- 鉴权头 / Base URL
- 请求结构
- 响应对象
- 核心接口行为

### 3. 价格与限制
优先参考：
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

适用问题：
- token 定价
- 套餐 / 消费控制线索
- RPM / TPM / 配额文档
- 缓存定价 / 长上下文定价 / server tools 定价 / 多模态定价

### 4. 错误与可靠性
优先参考：
- `raw/anthropic/api-error-codes.md`
- `raw/openai/api-errors.md`
- `raw/google/api-errors.md`
- `raw/deepseek/api-errors.md`
- `raw/openrouter/api-errors.md`
- `raw/openrouter/faq.md`

适用问题：
- 重试策略
- 常见错误类型
- 调试参考

### 5. 结构化输出与工具调用
优先参考：
- `raw/google/api-structured-output.md`
- `raw/google/api-function-calling.md`
- `raw/deepseek/api-function-calling.md`
- `raw/deepseek/api-json-output.md`
- `raw/openrouter/feature-structured-outputs.md`

适用问题：
- JSON Schema 输出
- function calling
- JSON mode / response_format 行为

### 6. 路由 / 聚合平台
优先参考：
- `raw/openrouter/routing-provider-selection.md`
- `raw/openrouter/faq.md`
- `raw/openrouter/api-models.md`

适用问题：
- 供应商选择
- 聚合平台特有行为
- 模型路由注意事项

## 实用离线工作流

在做厂商总结时，建议按下面顺序阅读：
1. 价格 + 速率限制
2. 模型文档
3. 核心 API 文档
4. 错误文档
5. 结构化输出 / 函数调用

## 已知缺口

- OpenAI 在本仓库里仍缺少一份稳定、干净的官方 Markdown 总览页；当前 `api-responses` 是最接近核心 API 总览的锚点。
- DeepSeek 快照来自官方 HTML 抽取，而不是稳定的 Markdown 端点，因此少量页面可能带有页脚噪音或编码残留。
- OpenRouter 仍有进一步扩充空间，例如 service tiers、guardrails、tool-calling、server tools、ZDR 和 usage accounting。
