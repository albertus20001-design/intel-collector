---
title: 缓存计费
---

# 缓存计费

先讲共性，再看厂商差异。

## 共性

缓存计费通常关注三件事：

- **缓存写入**：首次写入缓存是否收费
- **缓存读取 / 命中**：命中缓存时是否按更低价格收费
- **缓存未命中**：未命中时是否退回普通输入价格

缓存机制的核心不是“有没有”，而是：

- 命中率高不高
- 写入价格是否过高
- 命中后的折扣够不够大
- 适不适合长提示词、重复系统提示、固定上下文场景

## 适用场景

- 长系统提示词
- 多轮对话中的固定上下文
- 重复模板任务
- 同一知识底座上的批量生成

## 厂商差异

### Anthropic

Anthropic 的价格体系里，对缓存写入 / 缓存读取的表述通常相对明确，是理解缓存计费最适合的参考样本之一。

主要看：
- [raw/anthropic/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/pricing.md)

### OpenAI

OpenAI 价格页里会涉及“缓存输入（cached input）”一类表述，适合拿来和 Anthropic 对照，看缓存折扣是如何落在输入侧的。

主要看：
- [raw/openai/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/pricing.md)

### Google Gemini

Google 更需要结合具体模型和价格页来判断，有时重点不只是缓存，而是长上下文和多模态成本一起看。

主要看：
- [raw/google/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/pricing.md)

### DeepSeek

DeepSeek 的资料更适合用于补充是否存在折扣、输入输出结构和限流约束，缓存规则通常不像 Anthropic 那样成为主叙事中心。

主要看：
- [raw/deepseek/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/pricing.md)

### OpenRouter

OpenRouter 更像是在原厂之上再加一层可用性 / 路由语境。比较 缓存 成本时，要额外注意：

- 你看到的是不是原厂直连价格
- 供应商切换是否影响最终成本
- 平台是否对缓存能力有额外抽象或限制

主要看：
- [raw/openrouter/faq.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/faq.md)
- [raw/openrouter/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/api-rate-limits.md)

## 实务判断

如果用户问“缓存值不值得开”，优先看：

1. 提示词是否足够长且重复
2. 命中率是否稳定
3. 缓存写入 / 缓存读取差价是否足够大
4. 是否会被限流 / 供应商切换抵消收益
