# 模型专题总览

这个专题用于回答“该选哪个模型、模型之间差在哪、不同场景如何取舍”这类问题。

建议阅读顺序：
1. 先看模型选择框架
2. 再看长上下文、多模态等子专题
3. 最后看厂商差异

## 共性判断框架

讨论模型时，通常先看这些维度：

- **能力边界**：推理、代码、写作、结构化输出、多语言、多模态
- **上下文能力**：最大上下文长度、长上下文稳定性、长提示退化情况
- **工具能力**：function calling、structured output、agent/tool 兼容性
- **可靠性**：错误率、限流、稳定性、可用区域、权限限制
- **成本**：输入 / 输出价格、缓存、工具链成本、聚合平台溢价
- **可接入性**：官方 API、聚合平台、兼容层、SDK 生态

## 推荐子专题

- [模型选择框架](./selection-framework)
- [长上下文专题](./long-context)
- [多模态专题](./multimodal)
- [厂商差异](./vendor-differences)

## 主要参考来源

- `raw/anthropic/api-models.md`
- `raw/anthropic/api-models-api.md`
- `raw/openai/api-models.md`
- `raw/google/api-models.md`
- `raw/deepseek/api-models.md`
- `raw/openrouter/api-models.md`
- `raw/google/api-structured-output.md`
- `raw/google/api-function-calling.md`
- `raw/deepseek/api-function-calling.md`
- `raw/openrouter/feature-structured-outputs.md`

## 使用原则

回答模型选型问题时，先给共性框架，再给场景建议，不要一上来就只报某个模型名字。
