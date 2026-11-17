---
title: "Gemini 4 Argon API price doubles on Dec. 1 as the intro rate ends"
slug: "gemini-4-argon-price-increase"
date: 2026-11-17
lang: en
description: "From Dec. 1, Gemini 4 Argon costs $4 per 1M input tokens and $20 per 1M output, up from $2 and $10. What to check in your app before the new rate hits."
image: "/images/news/gemini-4-argon-price.webp"
imageAlt: "A stylized meter of glowing tokens with its needle moving from one mark to a mark twice as far, on a calm dark background, no logos."
sources:
  - title: "Gemini Developer API pricing"
    url: "https://aistudio.google.com/docs/pricing"
  - title: "What's new in Gemini 4 Argon"
    url: "https://aistudio.google.com/docs/whats-new-gemini-4-argon"
translationKey: "gemini-4-argon-price"
tags:
  - news
  - gemini
  - pricing
cta: scan
draft: false
---

On Dec. 1, 2026, Google's paid API rate for Gemini 4 Argon doubles. Input goes from $2 to $4 per million tokens, and output, which includes thinking tokens, goes from $10 to $20. Google always called the current price introductory, so this is the scheduled end of a launch discount rather than a surprise hike. The effect on your bill is the same: if Argon powers a feature in your app, that feature costs twice as much from December on.

## What changes, line by line

Google's pricing page lists two prices for `gemini-4-argon`: one valid through Nov. 30 and one starting Dec. 1. Standard input moves from $2.00 to $4.00 per million tokens. Output moves from $10.00 to $20.00. Cached input, which Argon handles only through implicit caching, goes from $0.10 to $0.20. Argon has no free tier, so there is no free fallback for the same model.

Gemini 4 Carbon, the deeper reasoning sibling, follows the same schedule with the same numbers. Google's own guide says the two models share per-token pricing, and that Argon usually spends fewer thinking tokens per turn. Moving from Argon to Carbon will not save money.

Some lines stay put. Grounding with Google Search still comes with 5,000 free requests a month, shared across Gemini 3 and newer models, then $14 per 1,000 requests, with a daily cap of 1,500 requests.

## Why thinking tokens matter more than the headline price

The output price includes thinking tokens, and Google says every token the model processes is billed, including internal tool instructions and function declarations when you use grounding. On a reasoning model, the thinking you never show the user can be the bigger part of the bill.

Google gives you three levers. The first is the thinking level: `low`, `medium` (the default), or `high`. Google's advice is to test your task at all three and pick the lowest one that still meets your quality bar. The second is `max_output_tokens`, which caps thinking and answer together, so it limits the damage when a hard prompt runs long. The third is caching. Implicit caching kicks in for prompts of at least 4,096 tokens and, per Google, discounts cached input by 95%. A stable system prompt at the start of every request helps it hit.

For jobs that do not need an instant answer, such as nightly summaries, tagging, or evals, the pricing page lists a Batch API with a 50% cost reduction.

A quick sketch of the math, using the listed rates: an app that sends 100 million input tokens and gets 20 million output tokens a month on Argon pays about $400 at today's rate and about $800 from Dec. 1, before any caching or batch discounts. Your numbers will differ. The ratio will not.

## Other December dates on the same page

Argon is not the only change worth a look. From Dec. 1, Google will automatically route API requests for the deprecated `gemini-2.5-pro` to Gemini 3.8 Flash and bill them at Flash rates, and requests for `gemini-2.5-flash` will go to Gemini 3.5 Flash-Lite. If an older app still names those models, it will keep answering, but with a different model behind it. Then on Jan. 1, 2027, Gemini 3.8 Flash and 3.6 Flash also double, from $0.75 and $3.75 to $1.50 and $7.50 per million tokens.

If Argon is more model than your task needs, Gemini 4 Hydrogen is listed at $1.50 for input and $7.50 for output, with a free tier, and no scheduled change on the page today. Google pitches it at everyday coding and agent work. Whether it is good enough for your feature is something only your own tests can answer.

## Your checklist before Nov. 30

Find every place your code or your no-code builder settings name a Gemini model. Pull last month's token usage and multiply the Argon part by two. Try a lower thinking level and a tighter output cap on real requests. Move anything that can wait into batch jobs. And set a billing alert in your Google Cloud project, so the first December invoice is not how you find out.

If your app was built with Lovable, Bolt, Cursor, or v0 and you are not sure which models it calls or what each feature costs to run, we can help sort that out and fix what needs fixing before launch. Start with a scan on our [services page](https://inqreon.com/en/).
