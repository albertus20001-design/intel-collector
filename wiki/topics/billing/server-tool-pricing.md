---
title: 服务端工具计费
---

# 服务端工具计费

先讲共性，再看差异。

## 共性

工具计费常见有三层：

- **模型 token 费用**：调用工具前后的推理 token 仍然要计费
- **工具本身费用**：检索、搜索、代码执行、文件处理、外部连接器可能单独收费
- **结果处理费用**：工具返回内容重新喂给模型时，会再次进入输入 / 输出计费

所以“工具调用”通常不是一笔费用，而是一个费用链条。

## 常见子项

- 网页搜索（Web Search）
- 文件检索（File Search / Retrieval）
- 代码解释器 / 代码执行（Code Interpreter / Code Execution）
- 服务端工具（Server Tools）
- 外部 API / 第三方 SaaS 调用

## 厂商差异

### OpenAI

OpenAI 在工具、Responses API 和代理式能力上资料较多，适合用来观察“模型 token + 工具能力”叠加成本。

主要看：
- [raw/openai/api-responses.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/api-responses.md)
- [raw/openai/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/pricing.md)

### Google Gemini

Google 适合结合函数调用、结构化输出与模型能力一起看，但工具成本描述可能分散在功能文档和价格文档里。

主要看：
- [raw/google/api-function-calling.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/api-function-calling.md)
- [raw/google/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/pricing.md)

### Anthropic

Anthropic 更适合作为工具调用范式和消息结构参考，价格判断仍主要回到价格文档本身。

主要看：
- [raw/anthropic/api-messages.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/api-messages.md)
- [raw/anthropic/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/pricing.md)

### OpenRouter

OpenRouter 是理解服务端工具 / 平台工具抽象的重点对象。实际判断时，要把“平台层工具能力”与“底层供应商成本”分开看。

主要看：
- [raw/openrouter/api-parameters.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/api-parameters.md)
- [raw/openrouter/faq.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/faq.md)

### DeepSeek

DeepSeek 目前更适合作为函数调用和 JSON 输出能力补充样本，而不是服务端工具计费主样本。

主要看：
- [raw/deepseek/api-function-calling.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/api-function-calling.md)
- [raw/deepseek/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/pricing.md)

## 实务判断

如果用户问“工具为什么贵”，可以按这个链条解释：

1. 模型先为是否调用工具做推理
2. 工具本身可能收费
3. 工具返回结果又会增加输入 token
4. 后续总结 / 结构化输出还会继续产生成本
