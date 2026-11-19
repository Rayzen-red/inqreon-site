---
title: "Anthropic prices its IPO at $83 a share, above the filed range"
slug: "anthropic-ipo-nasdaq"
date: 2026-11-19
lang: en
description: "Anthropic priced 980 million shares at $83, above the $70–$78 range, raising $81.3 billion. Trading starts Nov. 19 on Nasdaq as ANT."
image: "/images/news/anthropic-ipo.webp"
imageAlt: "A quiet trading floor at dawn with a blank ticker board starting to light up, abstract, no logos or people."
sources:
  - title: "Anthropic prices initial public offering"
    url: "https://www.anthropic.com/news/anthropic-prices-initial-public-offering"
  - title: "Anthropic IPO raises over $81 billion in largest offering on record (CNBC)"
    url: "https://www.cnbc.com/2026/11/18/anthropic-ipo-ai-offering-price.html"
  - title: "Anthropic launches roadshow for proposed initial public offering"
    url: "https://www.anthropic.com/news/roadshow-launch"
  - title: "Anthropic IPO: Claude maker to begin trading on Thursday, Nov. 19 (Yahoo Finance)"
    url: "https://finance.yahoo.com/technology/article/anthropic-sets-ipo-date-for-thursday-nov-19-173011206.html"
  - title: "Anthropic IPO guide: The price range, date and more (CNBC)"
    url: "https://www.cnbc.com/2026/11/16/anthropic-ipo-date-price-range.html"
  - title: "Anthropic sets IPO price range of $70 to $78 (CNBC)"
    url: "https://www.cnbc.com/2026/11/10/anthropic-sets-price-range-of-70-to-78-in-upcoming-ipo.html"
  - title: "Anthropic Prices Its IPO Wednesday (Investopedia)"
    url: "https://www.investopedia.com/anthropic-prices-its-ipo-wednesday-here-s-what-investors-need-to-know-12258058"
  - title: "Claude model deprecations"
    url: "https://platform.claude.com/docs/en/about-claude/model-deprecations"
translationKey: "anthropic-ipo"
tags:
  - news
  - anthropic
  - ipo
cta: scan
draft: false
---

Anthropic, the company behind Claude, priced its initial public offering at $83.00 a share on Wednesday, Nov. 18, and is set to start trading on the Nasdaq on Thursday, Nov. 19, under the ticker ANT. The price sits above the $70 to $78 range the company filed last week, and the deal was enlarged to 980 million shares. If you build products on Claude, nothing in the API changes on listing day. What changes is how much of the company's business you will be able to see.

## The price is now set

In its own announcement, Anthropic said the offering consists of 980 million Class A shares: 956,351,354 new shares sold by the company, and 23,648,646 from existing shareholders. Money from that second block goes to those shareholders, not to the company. Underwriters also get a 30-day option to buy up to 147 million more shares. The stock is set to list on the Nasdaq Global Select Market, and the company said the offering is expected to close on Nov. 20, subject to customary conditions.

CNBC, citing the company's release, puts the amount raised at $81.3 billion and the fully diluted market cap at around $1.5 trillion. That is larger than SpaceX's initial IPO proceeds of $75 billion earlier this year, the network notes, though SpaceX reached $85.7 billion after underwriters exercised their overallotment. Last week's range, at the top, would have brought in up to $64.35 billion and valued Anthropic at up to $1.405 trillion, according to CNBC's earlier calculation. Separately, AMD, Broadcom, Google, Micron, Microsoft, Nvidia, and TSMC have agreed to buy $26 billion of non-voting Class N stock at the IPO price, CNBC reported, citing the filing.

A week ago the plan was 825 million shares at $70 to $78. Demand was already strong: Investopedia, citing Bloomberg, reported orders of nearly seven times the shares then on offer, and the Financial Times reported that bankers were weighing a price above the range. Wednesday's $83 figure is the one that counts.

## Who gets to buy, and what the numbers show

Anthropic expects up to 20% of the offering to go to retail investors in the U.S. and other countries, according to CNBC. The network notes that a typical IPO sets aside 5% to 10% for retail. Investopedia adds that requests can go through several large brokerages, with no allocation guaranteed.

The financials explain the attention. Yahoo Finance, reading the amended S-1, reports revenue of $33.2 billion for the first nine months of 2026, against $4.6 billion for all of 2025. Operating losses for those nine months came to $1.3 billion, down from $5.2 billion a year earlier. The September quarter showed a $536 million operating loss after $974 million of operating income in the June quarter. Anthropic attributes the swing to a $5 billion charge for short-term compute commitments and $2 billion in non-cash charges tied to its donation matching program. The filing also lists $895.4 billion in committed spending, mostly on compute and infrastructure.

There is a cautionary data point too. Investopedia cites a Financial Times analysis showing that the 10 biggest U.S. IPOs of 2026 have fallen about 20% on average from their offer prices. Strong demand before a listing says little about where a stock trades a month later. This article is news, not investment advice.

## What it means if your product runs on Claude

For developers, a listing is mostly about visibility. A public company reports results every quarter, so spending on compute, pricing pressure, and growth by product line become things you can read instead of guess. That helps when you decide how much of your product to tie to one model vendor.

The date that actually matters for many apps this month comes from the API docs, not Wall Street. Anthropic's deprecation page lists Nov. 30, 2026 as the retirement date for `claude-sonnet-4-5-20250929`, with `claude-sonnet-5-5` as the recommended replacement. After retirement, requests to the old model fail. If you built a prototype a year ago and never touched the model string, check it now. The Claude Console lets you export usage by API key and model, which shows quickly what still calls the old version.

So the practical list for this week is short. The offer price is set; the first trades are due Thursday. Before Nov. 30, find every place your code names a Claude model and test the replacement on your real prompts. A new model can answer differently even when the request still works.

If your site or app was put together with Lovable, Bolt, Cursor, or v0 and you are not sure which models and keys it relies on, that is exactly the kind of check we do. We help fix and launch AI-built projects, from model calls to deploy. You can start with a scan on our [services page](https://inqreon.com/en/).
