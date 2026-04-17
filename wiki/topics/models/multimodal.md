# 多模态专题

先讲共性，再看厂商差异。

## 共性

多模态通常关注：

- 图片、音频、视频、文件是否支持
- 输入格式与限制
- 计费方式是否与文本分开
- 输出能否稳定进入结构化流程
- API 设计是否便于工作流接入

## 适用场景

- 图像理解
- OCR / 文档理解
- 音视频内容分析
- 带截图 / 文件的智能体工作流

## 厂商差异

### OpenAI

OpenAI 是多模态工作流的重要参考对象，适合结合 Responses API 和文件 / 图像输入一起看。

主要看：
- [raw/openai/api-responses.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/api-responses.md)
- [raw/openai/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/pricing.md)

### Google Gemini

Google 多模态叙事也很强，适合和长上下文一起观察整体能力边界。

主要看：
- [raw/google/api-overview.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/api-overview.md)
- [raw/google/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/pricing.md)

### Anthropic

Anthropic 更适合作为消息结构与能力边界补充样本，而不是单独的多模态成本主样本。

主要看：
- [raw/anthropic/api-messages.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/api-messages.md)
- [raw/anthropic/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/pricing.md)

### DeepSeek

DeepSeek 当前更适合作为基础 API 与价格竞争力参考，多模态叙事通常不是第一优先项。

主要看：
- [raw/deepseek/api-introduction.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/api-introduction.md)
- [raw/deepseek/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/pricing.md)

### OpenRouter

OpenRouter 的关键是多模态能力是否在不同 供应商下保持一致，以及平台抽象是否带来额外限制。

主要看：
- [raw/openrouter/api-models.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/api-models.md)
- [raw/openrouter/faq.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/faq.md)

## 实务判断

如果用户问“哪个多模态更适合”，优先看：

1. 支持哪些输入类型
2. 成本结构是不是可接受
3. 结果能不能稳定进入后续 workflow
4. 是否需要走聚合平台
