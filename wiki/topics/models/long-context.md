---
title: 长上下文专题
---

# 长上下文专题

先讲共性，再看厂商差异。

## 共性

长上下文不只是“能塞多少 token”，还包括：

- 是否真的能稳定利用长上下文
- 长提示下是否明显变慢
- 中后段信息是否容易丢失
- 价格是否随上下文变长而变得不划算
- 缓存 是否能缓解长提示成本

## 适用场景

- 大文档总结
- 长代码仓库分析
- 多文件问答
- 多轮智能体工作流
- 长 系统提示词 场景

## 厂商差异

### Google Gemini

Google 在长上下文叙事上通常更突出，适合做“大上下文能力”参考样本。

主要看：
- [raw/google/api-models.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/api-models.md)
- [raw/google/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/pricing.md)

### Anthropic

Anthropic 更适合结合 缓存 和长提示一起看，重点不是最大窗口数字本身，而是长上下文下的实际可用性。

主要看：
- [raw/anthropic/api-models.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/api-models.md)
- [raw/anthropic/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/pricing.md)

### OpenAI

OpenAI 更适合结合 Responses API、工具和实际工作流一起看，不只是孤立比较上下文长度。

主要看：
- [raw/openai/api-models.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/api-models.md)
- [raw/openai/api-responses.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/api-responses.md)
- [raw/openai/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/pricing.md)

### DeepSeek

DeepSeek 适合补充成本敏感场景下的比较，但更需要结合价格与稳定性一起判断。

主要看：
- [raw/deepseek/api-models.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/api-models.md)
- [raw/deepseek/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/pricing.md)

### OpenRouter

OpenRouter 的重点是：即使同一模型可用，最终体验仍可能受 供应商路由和平台抽象影响。

主要看：
- [raw/openrouter/api-models.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/api-models.md)
- [raw/openrouter/faq.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/faq.md)

## 实务判断

如果用户问“长上下文值不值得买”，优先看：

1. 任务是否真的需要大窗口
2. 是否能配合 缓存 降成本
3. 是否存在更便宜的分段检索 / RAG 替代方案
4. 长上下文下的稳定性是否足够
