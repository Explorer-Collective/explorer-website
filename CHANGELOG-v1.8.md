# 探索者品牌站 v1.8 — 首屏功能化重写

**日期**：2026-07-24

---

## 一、首屏功能化重写

首屏从「品牌叙事」转为「功能说明」，让访客三秒内理解网站做什么。

| 元素 | v1.7 | v1.8 |
|------|------|------|
| eyebrow | 探索者交流平台 | **探索者｜产品、研究与协作实践** |
| h1 | 从信息过载中，找到能开始的下一步 | **把复杂的信息和项目问题，整理成可以验证的下一步。** |
| 副文案 | 面向一人公司（OPC）与创业者——把你遇到的情况拆清楚、找方向。 | **面向个人、一人公司和小团队。我们围绕项目审计、资料与知识库整理、信息追踪和自动化工作流持续实践，帮助把问题拆清楚，把下一步真正做出来。** |
| 能力清单 | （无） | **当前可协助：AI 项目审计 · 本地知识库 / RAG · 定制信息追踪与日报** |
| CTA 1 | 查看信息雷达 ↓ | **查看当前实践 ↓** |
| CTA 2 | 加入交流 → | **提交一个问题 →** |

**涉及文件**：`index.html`（hero section）、`framework.css`（新增 `.hero-capability`）

---

## 二、导航与产品板块标签统一

| 位置 | v1.7 | v1.8 |
|------|------|------|
| site-header nav | 产品介绍 | **当前实践** |
| 01 section-label | 产品介绍 | **当前实践** |

---

## 三、01 板块 closing slogan 字体统一

`.practice-closing-slogan h2` 从独立标题降为正文结尾句：

| 属性 | v1.7 | v1.8 |
|------|------|------|
| font-size | clamp(1.12rem, 1.55vw, 1.35rem) | **1rem** |
| color | #3f3f3b | **#474743**（=正文） |
| font-weight | 500 | **400** |
| letter-spacing | .005em | **normal** |
| line-height | 1.65 | **1.78**（=body） |

---

## 四、全局 meta 文案同步

品牌称谓从「探索者交流平台」统一为「探索者」。

**涉及字段**：
- `<title>` — 探索者｜产品、研究与协作实践 —— 把问题拆清楚，找到能验证的下一步
- `<meta description>` — 面向个人、一人公司和小团队，围绕项目审计、资料与知识库整理、信息追踪和自动化工作流持续实践
- `<meta keywords>` — 探索者, Explorer, 项目审计, AI审计, 知识库, RAG, 信息追踪, 自动化工作流, 一人公司, OPC
- OG / Twitter 卡片 — 同步更新
- JSON-LD — Website / Organization / WebPage name + description 全部更新
- dateModified: 2026-07-24

---

## 五、友链申请 CTA（新增）

在 OPEN SOURCE 三列卡片下方增加 `.friendlink-row`：
- 绿色 OS 图标 + 标题「友链申请」+ 说明 + 链接 → 跳转 `#participate`
- 桌面端水平排列，移动端堆叠

在一起参与表单中增加「申请类型」下拉选择：
- 提交问题或想法 / 友链申请

**涉及文件**：`index.html`、`framework.css`（`.friendlink-row` 系列 + `.participate select`）

---

## 六、OPEN SOURCE 板块与布局调整

- OPEN SOURCE 标题从「我们也把过程和资料放在公开的地方」→ **「以下是探索者开源仓库与协作社区/知识库」**
- `.opensource-row` 三列卡片结构：GitHub / Gitee / 一起共建（飞书群）
- 导航 `开源社区` 链接指向 `#team`（而非弹窗），与团队板块自然融合
- `layout.css` 全局排版宽度上限约束
- `modal.css` 从框架中独立拆分

---

## 七、团队成员展示重构

- 从等高三行时间线格式 → 单列轮播格式（`member-controls` 上/下翻页）
- 移动端适配：全宽卡片、堆叠信息

---

## 八、板块叙事连续性修复

调整后板块顺序：
```
01 当前实践 → 02 信息雷达如何工作 → 03 探索者怎么工作
→ 04 核心成员与协作（含 OPEN SOURCE + 友链 CTA）
→ 05 我们相信 → 06 一起参与 → 07 常见问题 → 08 我们希望
```

三级叙事弧完整：认知与产品 → 人与价值观 → 转化与收尾。

---

## 涉及文件清单

```
index.html          — 首屏、导航、OPEN SOURCE、友链 CTA、表单、JSON-LD
framework.css       — hero-capability、friendlink-row、participate select
practice.css        — closing-slogan 字体统一
layout.css          — 全局宽度约束（v1.7+新增）
modal.css           — 弹窗独立样式（v1.7+拆分）
app.js              — 成员轮播逻辑（v1.7+重构）
landing.css         — 落地页样式优化
styles.css          — 无变更（仅为兼容保留）
```
