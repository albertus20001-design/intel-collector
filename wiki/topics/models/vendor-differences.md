# 厂商差异

这一页不重复定义，只强调模型选择上的差异点。

## 先看共性结论

- **Anthropic**：更适合强调 agent 工作流、可靠性、cache 与长提示语境
- **OpenAI**：更适合强调 Responses、工具、多模态和平台生态
- **Google Gemini**：更适合强调长上下文、多模态和模型层级
- **DeepSeek**：更适合强调成本敏感场景与基础 API 可比性
- **OpenRouter**：更适合强调平台抽象、provider 路由和可接入性

## 分厂商看

### Anthropic

更适合回答：
- agent / 工具工作流里谁更稳
- cache 与长提示如何搭配

参考：
- `raw/anthropic/api-models.md`
- `raw/anthropic/api-models-api.md`

### OpenAI

更适合回答：
- 多模态、Responses、工具能力如何组合
- 哪些工作流更适合平台化接入

参考：
- `raw/openai/api-models.md`
- `raw/openai/api-responses.md`

### Google Gemini

更适合回答：
- 长上下文、多模态、结构化输出如何组合
- 大窗口场景下的能力边界

参考：
- `raw/google/api-models.md`
- `raw/google/api-structured-output.md`
- `raw/google/api-function-calling.md`

### DeepSeek

更适合回答：
- 成本敏感情况下的基础模型选型
- 在不追求最强 benchmark 时的性价比比较

参考：
- `raw/deepseek/api-models.md`
- `raw/deepseek/pricing.md`

### OpenRouter

更适合回答：
- 同一模型在不同 provider 下为什么体验不同
- 平台可接入性与真实能力之间的落差

参考：
- `raw/openrouter/api-models.md`
- `raw/openrouter/routing-provider-selection.md`
- `raw/openrouter/faq.md`

## 回答模板

如果用户问“哪家模型最好”，建议按这个顺序：

1. 先按任务类型分类
2. 再按成本 / 上下文 / 工具需求筛
3. 再给候选模型
4. 最后讲 trade-off，而不是只报一个冠军
