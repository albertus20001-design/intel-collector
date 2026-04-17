---
title: 厂商差异
---

# 厂商差异

这一页不重复定义，只强调计费上的差异点。

## 先看共性结论

- **Anthropic**：缓存计费叙事更清楚，适合用作缓存计费参考样本
- **OpenAI**：工具、Responses API、缓存输入 等组合更值得一起看
- **Google Gemini**：多模态、长上下文、模型分层一起看更有意义
- **DeepSeek**：价格竞争力和基础 API 结构更值得重点看
- **OpenRouter**：关键不是“标价本身”，而是平台抽象、供应商路由和最终可用成本

## 分厂商看

### Anthropic

更适合回答：
- 缓存写入 / 缓存 read 怎么理解
- 速率限制和层级如何影响使用

参考：
- [raw/anthropic/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/pricing.md)
- [raw/anthropic/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/api-rate-limits.md)

### OpenAI

更适合回答：
- 缓存输入 怎么看
- Responses / 工具调用与成本如何叠加

参考：
- [raw/openai/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/pricing.md)
- [raw/openai/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/api-rate-limits.md)
- [raw/openai/api-responses.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/api-responses.md)

### Google Gemini

更适合回答：
- 多模态和长上下文如何影响成本
- 免费层与付费层如何区分

参考：
- [raw/google/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/pricing.md)
- [raw/google/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/api-rate-limits.md)

### DeepSeek

更适合回答：
- 基础输入 / 输出价格竞争力
- 在成本敏感场景下是否值得优先比较

参考：
- [raw/deepseek/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/pricing.md)
- [raw/deepseek/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/api-rate-limits.md)

### OpenRouter

更适合回答：
- 同一模型经不同 供应商 / 平台路径后的成本差异
- 聚合平台下，为什么“官方单价便宜”不一定等于“最终更省”

参考：
- [raw/openrouter/faq.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/faq.md)
- [raw/openrouter/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/api-rate-limits.md)
- [raw/openrouter/api-models.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/api-models.md)

## 回答模板

如果用户问“谁更便宜”，建议按这个顺序：

1. 先问是比原厂还是比聚合平台
2. 再问是短提示还是长提示
3. 再问是否有缓存 / 工具 / 多模态
4. 最后才给结论

因为很多“便宜”只是单价便宜，不代表总成本更低。
