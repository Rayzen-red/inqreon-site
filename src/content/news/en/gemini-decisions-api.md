---
title: "Gemini Decisions API scores options instead of writing answers"
slug: "gemini-decisions-api"
date: 2026-11-15
lang: en
description: "On Nov 11 Google launched the Gemini Decisions API: Decision 1 scores up to 1,000 yes/no, choice, or rubric questions in one pass and returns probabilities, not prose."
image: "/images/news/gemini-decisions-api.png"
imageAlt: "An abstract decision tree of glowing branches and probability bars over a shared stack of documents, photos, and sound waves, with no logos or text."
sources:
  - title: "Gemini Decisions API: Fast, calibrated multimodal decisions"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/"
  - title: "Decisions API documentation"
    url: "https://aistudio.google.com/docs/decisions-api"
translationKey: "gemini-decisions-api"
tags:
  - news
  - google
  - api
cta: scan
draft: false
---

On November 11, 2026, Google introduced the Gemini Decisions API, a new endpoint for fast, closed-set decisions, powered by a model called Gemini Decision 1 (`gemini-decision-1`). It is available through the Gemini API in Google AI Studio. The API is built for the small judgments an application or agent has to make continuously: which tool to call, whether a request breaks a policy, which model should handle the next step, or how to grade a piece of context.

You send one shared multimodal input (text, images, audio, video, and PDFs) plus up to 1,000 independent questions. Google's announcement describes a context window of up to 256K tokens; the documentation records the same window as 262,144 tokens. Gemini Decision 1 does not write an answer token by token. It scores the options in a single forward pass and returns probabilities and a confidence score for each question, so your code can branch, sort, or escalate without parsing a paragraph of prose.

## Three kinds of questions, one shared input

Google describes three question types, which you can mix in the same request:

- Yes/no (the API type is called `noul`): the probability that a condition holds, with optional criteria for the true and false cases. The documentation says that probability always falls between 0.01 and 0.99.
- Choice: a selection from 2 to 255 options, with the winner and a normalized probability for every candidate.
- Score: a grade against an ordered rubric that starts at 0, returning a continuous weighted score and a probability for each level. The documentation allows 2 to 255 levels.

Every answer includes a confidence value from 0 to 1, so an application can send ambiguous cases to a fallback or a human reviewer. Google's example in the announcement checks a breakroom photo and a short text note in one request: is there a spill, which cleanup action fits, and how severe is the mess.

The company says the model can combine modalities in that shared input, for example a call recording with account notes, or a scanned PDF claim with photos of damage. On image and video inputs you can adjust resolution to control how much visual detail is sent. The `input` field uses the same `Content` block format as Google's Interactions API. Official snippets use the `google-genai` SDK with API version `v1beta` and `client.decisions.create(...)`. Google also points developers to Python, JavaScript, and REST guides, and to demo apps named Doorstep Parcels, Speed Sketch, and Find the Zoo Keeper.

On timing, Google reports 150–250 milliseconds end-to-end, with a median of 50–100 milliseconds of model compute, for multimodal inputs and contexts up to 16K tokens, and says latency stays nearly flat from 1 to 100 questions in a request. Those figures are the company's. This article does not independently re-time the API. Google also says Gemini Decision 1 leads a suite of internal benchmarks on agent routing, reasoning, ranking, and multimodal understanding, with the lowest calibration error on that suite. That, again, is a company claim, not a third-party leaderboard we re-ran.

## How Google says it is already using the API

Inside Google, the announcement says teams are already using the API as a low-latency control plane. Gemini Notebook uses it to route a query to a model tier and thinking level, which Google says can cut latency by up to 40% on everyday questions while keeping heavier reasoning for harder ones. A rapid-canvas experiment in Stitch uses it to produce playable wireframes and apply voice or tap edits quickly. CC, from Google Labs, uses it to pick an emoji from a palette of more than 200 options. Google Search, the post says, uses it as a safety layer for MCP tools, to flag adversarial behavior within a tight latency budget. Those are Google's own product examples, not a report from outside customers.

Integrations are rolling out across OpenRouter, LangChain, Vercel, LiteLLM, Pydantic AI, Pipecat, LiveKit, and OpenCode, alongside the official `google-genai` SDKs. Support in Gemini on Google Cloud is described as coming soon.

If you are assembling a site or app in Lovable, Bolt, Cursor, or v0, this is most useful as the quiet layer behind the interface: route a support request, decide whether a tool should run, or send a low-confidence case to a person instead of letting a chat model improvise. A generated app can look finished in preview and still fail here: a wrong branch, a missed policy check, or no human fallback when the confidence score is low. We fix and launch sites and apps built with those tools. If a project is close to production, start with a scan on our [services page](https://inqreon.com/en/).
