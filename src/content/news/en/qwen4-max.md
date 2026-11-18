---
title: "Alibaba releases Qwen4-Max, a 2.4-trillion-parameter flagship model"
slug: "qwen4-max"
date: 2026-11-18
lang: en
description: "Qwen4-Max launched Nov. 16: a 2.4T model with a 1M-token context. Alibaba says a task on it costs about 60% less than on Qwen3.8-Max."
image: "/images/news/qwen4-max.webp"
imageAlt: "An abstract sparse network with only some nodes lit, and a long ribbon of light suggesting a wide context window, no logos or readable text."
sources:
  - title: "Alibaba Unveils Qwen4-Max (Alibaba Cloud)"
    url: "https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen4-max"
  - title: "Qwen4-Max on QwenCloud"
    url: "https://www.qwencloud.com/models/qwen4-max"
  - title: "QwenCloud pricing"
    url: "https://docs.qwencloud.com/developer-guides/getting-started/pricing"
translationKey: "qwen4-max"
tags:
  - news
  - qwen
  - models
cta: scan
draft: false
---

On Nov. 16, Alibaba released Qwen4-Max, which it calls the most capable model in the Qwen family so far. It is a mixture-of-experts model with 2.4 trillion parameters in total, of which 71 billion are active for each token. It has a one-million-token context window and can take in images and video as well as text. If you have been waiting for a cheaper flagship to try on coding or long-document work, this is one to put on a short test list, with the usual caveat: the impressive numbers come from Alibaba's own announcement.

## What you can use today

Qwen4-Max is available now on QwenCloud, through a Token Plan and the API, and on Alibaba's QwenWork and QwenStudio products. The model page lists it as multimodal: text, image, and video in, text out. It supports tool use, structured outputs, batch jobs, and web search, and it can be called with OpenAI- and Anthropic-compatible APIs.

The context window is one million tokens. The same page caps a single request at 991,000 input tokens and 131,000 output tokens, or 983,000 and 262,000 in thinking mode.

On price, the press release highlights one number: $0.075 per million tokens for an implicit cache hit. That is the discounted rate for repeated prefixes, not the regular input price. On QwenCloud's international pricing, input is $1.50 per million tokens and output is $4.50. The previous flagship, Qwen3.8-Max, is listed at $2 and $6. Thinking and non-thinking modes share the same rates, with no input-length tiers.

Alibaba says it will soon release smaller, open-weight models in the Qwen4 series. Qwen4-Max itself ships as a closed model.

## The numbers Alibaba is citing

Alibaba says Qwen4-Max ranked 6th on Code Arena, a real-world coding leaderboard, and posted strong scores on several specialized benchmarks, including Agents' Last Exam, Vals Index, JobBench, and Chartography. We have not run those tests ourselves.

The cost claim that circulated with the launch needs the same label. According to Work360, a proprietary benchmark Alibaba uses to score hard industry tasks across 721 fields, Qwen4-Max beats Qwen3.8-Max overall, uses 35% fewer tokens in High effort reasoning mode, and cuts the average cost per task by around 60%. The company ties those gains to the new Qwen4 architecture, which, it says, activates 25% fewer parameters than Qwen3.8-Max at the same 2.4-trillion scale.

Those figures are Alibaba's. A 60% drop in cost per task is not the same thing as a 60% drop in the list price, and a sixth-place coding rank is not a guarantee that the model will handle your codebase. If the price is the reason you are switching, run the same prompts you already use and compare both quality and the actual token bill.

## What to try this week

If you already call a Qwen model, the practical test is narrow. Point a non-critical coding or document job at `qwen4-max`, keep a log of tokens and quality, and see whether the new rate and the longer context actually help. If you cache long system prompts, the $0.075 cache-hit rate is the line that can move the bill. If you do not, you are paying $1.50 and $4.50, which is lower than Qwen3.8-Max but not the headline number from the press release.

A cheaper, longer-context model will not fix a site that fails at sign-in or checkout. If you are wiring this into an app built with Lovable, Bolt, Cursor, or v0, the last mile is still yours: payments, deploy, and the pages the model is supposed to work with.

If that last mile is what is stuck, we help fix and launch AI-built sites and apps. Start with a scan on our [services page](https://inqreon.com/en/).
