---
title: "Google releases Gemini 4 Hydrogen for everyday coding and agents"
slug: "gemini-4-hydrogen"
date: 2026-11-15
lang: en
description: "On Nov 12 Google launched Gemini 4 Hydrogen, a faster model for daily coding and agent work. It is already in the Gemini API, Search, and Antigravity."
image: "/images/news/gemini-4-hydrogen.webp"
imageAlt: "A pale-blue particle of light arcing through floating UI wireframes and code blocks in a dark workspace."
sources:
  - title: "Introducing Gemini 4 Hydrogen"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/"
  - title: "Gemini 4 Hydrogen: everyday coding and agentic workflows for developers"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/"
  - title: "Gemini 4 Hydrogen and Orchestrator"
    url: "https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/"
  - title: "Google Search gets a major upgrade with Gemini 4 Hydrogen"
    url: "https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade/"
translationKey: "gemini-4-hydrogen"
tags:
  - news
  - google
  - gemini
cta: scan
draft: false
---

On November 12, 2026, Google released Gemini 4 Hydrogen, a faster model in the Gemini 4 family, and opened it to developers, businesses, and everyday users. The company presents it as a daily tool for coding and agent work: write a function, tweak a screen, call a tool, and get an answer while you still remember why you opened the chat. If you already prototype a site or an app with an AI coding tool, the practical test is simple. Can it iterate quickly without inventing methods or rewriting files you did not ask it to touch?

Google last updated the main blog post the next day. Hydrogen sits beside Gemini 4 Carbon and Gemini 4 Argon, which the company still reserves for deep, long-horizon problems. Hydrogen is meant to execute: write and debug code, iterate on an interface, and keep a multi-step task moving without waiting on a heavier model for every small edit.

## What Google says the model can do

According to Google, Hydrogen scores 51 on the Artificial Analysis Intelligence Index at its default "high" thinking level, one point above Argon, and 54 at a new "xhigh" setting. It has a 1-million-token context window, and the company also describes up to 1 million output tokens. Compared with Gemini 3.8 Flash, Google says Hydrogen finishes tasks 2.5 times faster at the default setting, more than triples its Terminal-Bench 4.1 score (57% versus 18.2%), and cuts fabricated claims by more than five times. The company also says the model adapts more cleanly when a tool call fails or a search comes back empty. Those figures are Google's. We did not re-run the benchmarks.

Developers get four thinking levels: low, medium, high (the default), and xhigh, so a quick UI tweak does not have to carry the latency of a hard reasoning pass. In a companion post, Google highlights repository work, debugging, and interactive web development, including more complete layouts in fewer prompts. It also says Hydrogen can batch file-read and search calls in parallel. In early partner tests on complex graphs, SQL, and data-heavy workflows, the company reports the model ran two to 2.8 times faster than 3.8 Flash and used 12% to 23% fewer tokens. That is a company report of partner tests, not a third-party audit.

Google's own examples lean toward the front end: live UI prototyping, design-to-code iteration, and interactive app building. That is close to the loop many people already run in Lovable, Bolt, Cursor, or v0: describe a screen, get a working layout, then refine it. A faster model helps that draft. It does not, by itself, guarantee that login, payments, and a production deploy will hold up once real users arrive.

## Orchestrator, and where you can use Hydrogen today

For people who already build with AI coding tools, the more interesting shift is how Google wants Hydrogen to work with its stronger models. In Google Antigravity, a new Orchestrator mode can switch between Carbon and Hydrogen in a single session. Google describes a typical path: Carbon first explores a codebase and writes a plan, Hydrogen carries out the edits and tests, and Carbon steps back in if the run hits friction. For work that needs parallel agents, Carbon can act as the coordinator while Hydrogen powers worker and verifier agents in isolated workspaces.

On the Orchestrator speed claim, Google's own posts disagree on the benchmark name. The main Hydrogen blog says that on Terminal-Bench 4.0, Orchestrator reached near-Carbon success rates while using 24% less quota and finishing 19% faster on average. The Antigravity blog uses the same percentages but cites Terminal-Bench 4.1. We are reporting both wordings, not choosing one. According to the Antigravity blog, Orchestrator is rolling out as Orchestrator (Carbon) and Orchestrator (Argon) for Google AI Ultra subscribers, and as Orchestrator (Argon) for paid Google AI Pro subscribers, with more models and plans later. Enterprises can reach both Hydrogen and Orchestrator in Gemini for business.

Hydrogen itself is arriving across the Gemini API and Google AI Studio at all tiers, Gemini for business, the Gemini app, Google Search, Android Studio, and Antigravity for paid Pro and Ultra subscribers. In the Gemini app, free users can get Hydrogen through automatic model selection when the product judges it the right fit. Eligible business subscriptions can use it in Gemini in Google Sheets. A separate Search post the same day says Hydrogen is now in Search for all users worldwide, with tighter understanding of messy or multi-part queries, more visual responses, and a broader set of links through an upgraded query fan-out.

If a project built in Lovable, Bolt, Cursor, or v0 is close but not quite live, the gap is usually the last mile: login, payments, and deploy. We fix and launch sites and apps built with those tools. You can start with a scan on our [services page](https://inqreon.com/en/).
