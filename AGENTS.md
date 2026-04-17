# AGENTS

本仓库的 agent 主要职责只有两件事：

1. 从官方来源同步一手资料到 `raw/`
2. 基于 `raw/` 的内容，按专题整理到 `wiki/`

所有工作都必须围绕这两个目录展开：

- `raw/` 是原始资料层
- `wiki/` 是可发布的专题知识库层

## 目标

agent 的目标不是写泛泛而谈的总结，而是持续把各家官方文档、价格页、模型页、API 页、限流页、错误页等信息沉淀为：

- `raw/` 下可追溯的原始快照
- `wiki/` 下可读、可维护、可被 Mintlify 正常发布的专题页

## 目录职责

### `raw/`

`raw/` 用来存放官方来源的原始内容快照。

要求：

- 优先保留官方原文结构，不要为了“好看”过度改写
- 文件路径按厂商分目录，例如 `raw/openai/`、`raw/google/`
- 文件名应表达主题，例如 `pricing.md`、`api-models.md`、`api-rate-limits.md`
- 允许存在轻微抓取噪音，但不要手工加入主观结论
- 不要把二手总结、推测、评论写进 `raw/`

### `wiki/`

`wiki/` 用来存放按主题整理后的知识页，它是 Mintlify 会读取的内容目录之一。

要求：

- 所有页面必须适合被 Mintlify 直接解析和渲染
- 内容应来自 `raw/`，而不是脱离原始资料自由发挥
- 页面要强调专题组织，而不是简单复制原文
- 页面之间要能形成稳定的信息架构，例如：
  - `wiki/index.md`
  - `wiki/TOPIC_SUMMARY.md`
  - `wiki/PRICING_TOPIC_GUIDE.md`
  - `wiki/vendors/*.md`

## 工作流程

每次更新默认遵循以下顺序：

1. 确认要跟踪的官方来源是否已存在于 `sources/index.yml`
2. 抓取或更新官方内容，落到 `raw/`
3. 检查 `raw/` 中是否有明显抓取失败、403 页面、Cloudflare 页面、残缺内容
4. 基于 `raw/` 提炼专题信息，更新 `wiki/`
5. 确保 `wiki/` 页面仍符合 Mintlify 页面规范
6. 运行校验命令，确认站点可预览、可构建

## `raw/` 更新规范

当 agent 更新 `raw/` 时：

- 只同步官方来源
- 优先使用仓库既有来源配置和脚本
- 如果新增来源，先更新 `sources/index.yml`
- 同一主题应持续复用已有文件路径，避免频繁改名
- 不要把不同主题混在一个文件里
- 不要把整理后的专题结论反写回 `raw/`

如果抓取结果明显异常，例如：

- 403 / Forbidden
- Cloudflare 挑战页
- “Just a moment...”
- 空白页
- 错误重定向页

则不要把异常页面当作正常快照写入 `wiki/` 结论。

## `wiki/` 编写规范

`wiki/` 页面必须符合 Mintlify 规范，至少满足这些要求：

- 使用标准 Markdown / MDX
- 页面从清晰的一级标题开始
- 使用正常的二级、三级标题组织结构
- 列表、表格、代码块使用标准语法
- 不写任意脚本、内联 JS、不可解析表达式
- 不使用会导致 MDX 歧义的裸花括号、残缺 JSX、半截 JSON 片段
- 文件名和路径应稳定、可预测、适合放进 `docs.json` 导航

### 推荐写法

- 用“Coverage / Topic taxonomy / Use for / Known gaps”这种稳定结构组织专题页
- 对比型专题优先按主题拆分，而不是按时间线堆叠
- 引用 `raw/` 文件时，直接写明确路径，例如 `raw/openai/pricing.md`
- 结论要可追溯到 `raw/` 中的具体来源

### 避免写法

- 不要把整页原文复制到 `wiki/`
- 不要写无法验证的“行业判断”当作事实
- 不要把单次抓取的临时异常包装成长期结论
- 不要为了追求完整而牺牲页面可读性

## Mintlify 兼容要求

agent 在修改 `wiki/` 后，必须默认认为这些文件会被 Mintlify 直接读取，因此要避免：

- 非法 MDX 语法
- 损坏的内部链接
- 不存在的导航页面
- 会导致预览失败的原始文档片段直接嵌入

仓库当前约定：

- Mintlify 会读取：根目录 `*.mdx`、`guide/`、`wiki/`、`public/`、`docs.json`
- Mintlify 会忽略：`raw/`、`scripts/`、`skills/`、`sources/`

所以：

- `raw/` 可以偏原始
- `wiki/` 必须可发布

## 命令约定

优先使用仓库已有命令：

- `make update-pricing`：更新 `raw/` 快照
- `make generate-wiki`：更新 `wiki/` 索引和厂商页
- `make validate-sources`：校验来源配置和快照文件
- `make check`：校验 Mintlify 构建
- `make refresh`：执行一套完整刷新流程

如果 agent 修改了 `wiki/` 或 `docs.json`，至少应运行：

- `make check`

如果 agent 修改了 `sources/index.yml` 或 `raw/`，至少应运行：

- `make validate-sources`

## 输出标准

agent 完成工作后，应该优先汇报：

- 更新了哪些官方来源
- `raw/` 新增或变更了哪些文件
- `wiki/` 新增或变更了哪些专题
- 是否运行了校验
- 是否存在未解决的资料缺口或结构风险

## 决策原则

遇到取舍时，遵循下面的优先级：

1. 官方来源优先于二手总结
2. 可追溯优先于“写得像结论”
3. `wiki/` 可发布性优先于信息堆砌
4. 稳定路径优先于频繁重命名
5. 小步增量更新优先于大范围重写
