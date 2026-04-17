---
title: 价格主题指南
---

# 价格主题指南

本页用于说明在这个仓库里，关于模型价格、速率限制和计费方式的问题应优先参考哪些本地资料。

## 推荐阅读顺序

1. 厂商官方价格页快照
2. 厂商速率限制 / 配额文档
3. 相关 FAQ 或聚合平台限制说明
4. 同主题的厂商对比结论
5. 计费专题子页面（共性 → 子专题 → 厂商差异）

## 专题入口

- [计费专题总览](./topics/billing)
- [计费框架](./topics/billing/framework)
- [缓存计费](./topics/billing/cache-pricing)
- [服务端工具计费](./topics/billing/server-tool-pricing)
- [厂商差异](./topics/billing/vendor-differences)

## 按厂商查看

### Anthropic
- [raw/anthropic/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/pricing.md)
- [raw/anthropic/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/anthropic/api-rate-limits.md)

重点关注：
- 输入 / 输出 token 定价
- 缓存写入 / 缓存读取
- 不同使用层级或额度限制

### OpenAI
- [raw/openai/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/pricing.md)
- [raw/openai/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openai/api-rate-limits.md)

重点关注：
- 模型分层价格
- 输入 / 输出 / 缓存 token 价格
- 速率限制与使用层级

### Google Gemini
- [raw/google/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/pricing.md)
- [raw/google/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/google/api-rate-limits.md)

重点关注：
- 免费层与付费层差异
- 多模态或长上下文的价格变化
- 配额与速率限制

### DeepSeek
- [raw/deepseek/pricing.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/pricing.md)
- [raw/deepseek/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/deepseek/api-rate-limits.md)

重点关注：
- 输入 / 输出价格
- 折扣策略或缓存相关说明
- API 限流规则

### OpenRouter
- [raw/openrouter/api-rate-limits.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/api-rate-limits.md)
- [raw/openrouter/faq.md](https://github.com/albertus20001-design/llm-collector/blob/main/raw/openrouter/faq.md)

重点关注：
- 聚合平台的限制规则
- 不同供应商路由可能带来的成本差异
- 平台侧费用或使用说明

## 回答价格问题时的建议

当你需要回答“哪个更便宜”“某模型单价是多少”“吞吐和成本怎么权衡”这类问题时，建议：

- 先引用本地原始快照里的事实
- 再补充简短对比结论
- 将“官方单价”和“聚合平台实际可用成本”分开说
- 明确价格是否可能因为区域、套餐、时间而变化

## 注意事项

- 价格信息变化较快，结论应尽量附带来源路径和快照时间。
- 如果某家厂商没有完整价格表，应明确标注“信息不完整”，不要强行补齐。
- 聚合平台价格不等于原厂价格，比较时不要混为一谈。
