---
title: 计费专题总览
---

# 计费专题总览

这个专题用于统一回答“怎么计费、差异在哪里、成本该怎么比较”这类问题。

建议阅读顺序：
1. 先看共性计费框架
2. 再看子专题（如缓存计费、服务端工具计费）
3. 最后看厂商差异对比

## 共性框架

大多数模型 / 平台计费问题，都可以先从下面几个维度拆解：

- **输入计费**：按输入 token、字符、请求量或上下文长度计费
- **输出计费**：按生成 token 或结果体量计费
- **缓存计费**：区分缓存写入、缓存读取 / 命中、缓存未命中
- **工具计费**：调用内置工具、服务端工具、检索、代码执行等是否单独收费
- **长上下文计费**：超长上下文是否加价，是否存在分档
- **多模态计费**：图像、音频、视频、文件输入是否单独计费
- **速率与额度**：RPM、TPM、RPD、配额、层级、最低充值等约束
- **聚合平台溢价**：聚合平台价格是否与原厂一致，是否因供应商路由不同而变化

## 推荐子专题

- [计费框架](./framework)
- [缓存计费](./cache-pricing)
- [服务端工具计费](./server-tool-pricing)
- [厂商差异](./vendor-differences)

## 主要参考来源

- [raw/anthropic/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/pricing.md)
- [raw/anthropic/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/api-rate-limits.md)
- [raw/openai/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/pricing.md)
- [raw/openai/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/api-rate-limits.md)
- [raw/google/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/pricing.md)
- [raw/google/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/api-rate-limits.md)
- [raw/deepseek/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/pricing.md)
- [raw/deepseek/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/api-rate-limits.md)
- [raw/openrouter/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/api-rate-limits.md)
- [raw/openrouter/faq.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/faq.md)

## 使用原则

回答计费类问题时，建议先给出共性结论，再补厂商差异，最后再提醒：

- 官方价格与聚合平台价格不要混讲
- 不同时间点价格可能变化
- 速率限制会直接影响“可用成本”，不只是单价问题
