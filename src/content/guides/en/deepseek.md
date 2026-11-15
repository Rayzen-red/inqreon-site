---
title: "DeepSeek review: cheap, open models and a privacy question"
slug: "deepseek"
date: 2026-11-15
lang: en
description: "DeepSeek offers a free chat app, open-weight models and some of the lowest API prices around. What it is good for, and why US users should read the privacy policy."
image: "/images/ai-tools/deepseek.webp"
imageAlt: "A server rack with glowing blue lights and an open padlock resting on top"
sources:
  - title: "DeepSeek API Docs: Models and pricing"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
  - title: "DeepSeek Privacy Policy"
    url: "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html"
  - title: "Hugging Face: deepseek-ai/DeepSeek-V4-Pro-0813"
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813"
  - title: "DeepSeek: official site"
    url: "https://www.deepseek.com/en"
  - title: "Momentic: Top AI chatbots by market share, November 2026 (Similarweb data)"
    url: "https://momenticmarketing.com/blog/top-ai-chatbots"
translationKey: "deepseek"
tags:
  - deepseek
  - open-weights
  - ai-tools
cta: scan
draft: false
---

DeepSeek is the fourth most visited AI chatbot in the world. Similarweb counted about 372.8 million web visits in October 2026, behind only ChatGPT, Gemini and Claude, according to [Momentic's roundup](https://momenticmarketing.com/blog/top-ai-chatbots). Its draw is simple: a capable assistant you can use without a subscription, models you can download, and an API priced far below most rivals.

There is a catch, and it is spelled out in DeepSeek's own privacy policy. This review covers both sides.

## What DeepSeek is

DeepSeek is a Chinese AI company based in Hangzhou. It offers three things:

- **A chat assistant** on the web at chat.deepseek.com and in mobile apps. You sign in with email, phone, Google or Apple.
- **An API** for developers, with two current models: deepseek-flash (version V4.1-Flash-1017) and deepseek-v4-pro (V4-Pro-0813).
- **Open weights.** DeepSeek publishes its models on Hugging Face. The [V4-Pro-0813 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) lists the MIT license, which lets companies run the model on their own servers.

The [official site](https://www.deepseek.com/en) says the latest Flash update improved project development work and that the API now supports web search and fetch.

## Where it is strong

**Price.** On the [API pricing page](https://api-docs.deepseek.com/quick_start/pricing), the Flash model costs $0.30 per million input tokens and $1.20 per million output tokens at peak hours, and half that off-peak. For apps that send a lot of text through a model, that changes the math.

**Open weights.** You can run DeepSeek models yourself. That matters for teams that can't send data to an outside service, and for researchers who want to inspect and fine-tune a model.

**Long context.** The API docs list a 1 million token context length and up to 384K tokens of output.

**Developer friendliness.** The API accepts requests in both OpenAI and Anthropic formats. If your code already talks to one of those, switching is mostly a matter of changing the base URL and key.

## Where it falls short

**Where your data goes.** The [privacy policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html) says the service is controlled by Hangzhou DeepSeek Artificial Intelligence Co., Ltd., and that DeepSeek collects, processes and stores personal data in the People's Republic of China. It also says inputs can be used to train and improve its models, and lists a right to opt out of that. For anything confidential, such as client files, health or financial details, this is the main reason to think twice. Running the open weights on your own hardware avoids the issue, but takes technical work.

**Fewer extras in the app.** Compared with ChatGPT or Gemini, the chat app is plain. The site doesn't advertise image or video generation for consumers, and vision support in the API is listed for the Flash model only.

**Peak-hour pricing.** API rates double during peak hours: 01:00–04:00 and 06:00–10:00 UTC, Monday through Friday. For US users that falls in the evening and early morning on the East Coast. Batch jobs are cheaper if you schedule them outside those windows.

**Accuracy disclaimer.** DeepSeek itself writes that you should not rely on the factual accuracy of its model output. That's true of every chatbot, but it is worth taking literally.

## What it is for

- Everyday questions, writing help and reasoning tasks without paying for a subscription.
- Coding help and building apps on a tight API budget.
- Running a strong model on your own servers through the open weights.
- Processing large volumes of text, where per-token price matters most.

## Who it suits

DeepSeek is a good fit for developers and startups watching their API bill, for teams that need a model they can host themselves, and for curious users who want a second opinion next to their main assistant.

It is a poor fit for anyone handling confidential client data in the hosted app, or for companies whose policies bar sending data to servers in China.

## Pricing and plans (as of November 2026)

The DeepSeek website doesn't list a paid consumer subscription. The chat app asks you to create an account. Check the [official site](https://www.deepseek.com/en) for the current terms of the app.

The API is pay-as-you-go. Prices per million tokens from the [API pricing page](https://api-docs.deepseek.com/quick_start/pricing), checked on November 15, 2026:

| Item | deepseek-flash, peak | deepseek-flash, off-peak | deepseek-v4-pro, peak | deepseek-v4-pro, off-peak |
| --- | --- | --- | --- | --- |
| Input, cache hit | $0.006 | $0.003 | $0.044 | $0.022 |
| Input, cache miss | $0.30 | $0.15 | $1.32 | $0.66 |
| Output | $1.20 | $0.60 | $3.96 | $1.98 |

Web search and web fetch cost $0.75 per 1,000 uses each. File parsing and OCR cost $0.225 per 1,000 pages. You top up a balance in advance, and DeepSeek says prices can change.

## Pros and cons

**Pros**

- Usable chat app with no subscription required
- Open weights under the MIT license
- Very low API prices, with off-peak discounts
- 1M token context and OpenAI- and Anthropic-compatible API

**Cons**

- Personal data is stored in China, per the privacy policy
- Inputs may be used for training unless you opt out
- Fewer creative and productivity extras than the big US assistants
- Peak hours double API prices

## The short verdict

For developers, DeepSeek is one of the cheapest ways to put a capable model behind an app, and the open weights give you an exit if you'd rather host it yourself. For personal use, it is a solid free assistant for non-sensitive tasks. Keep client data and private details out of the hosted app.

If you built an app on top of an AI API and want to know whether it is safe to ship, start with a scan on [our services page](https://inqreon.com/en/services/).
