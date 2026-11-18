---
title: "Anthropic adds a text watermark to four older Claude models"
slug: "claude-text-watermark"
date: 2026-11-18
lang: en
description: "As of Nov. 16, text from Claude Opus 4.6, Opus 4.5, Sonnet 4.5, and Haiku 4.5 carries Anthropic's watermark. Custom temperature, top_p, or top_k can leave the mark off."
image: "/images/news/claude-text-watermark.webp"
imageAlt: "A calm editorial illustration of an abstract page with a faint woven pattern in the paper, no logos, no people, and no readable letters."
sources:
  - title: "Claude Platform release notes"
    url: "https://platform.claude.com/docs/en/release-notes/overview"
  - title: "Text watermark (Claude Platform docs)"
    url: "https://platform.claude.com/docs/en/build-with-claude/text-watermark"
  - title: "How Claude marks AI-generated content (Claude Help Center)"
    url: "https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content"
translationKey: "claude-text-watermark"
tags:
  - news
  - anthropic
  - claude
cta: scan
draft: false
---

On Nov. 16, Anthropic extended its text watermark to four older Claude models: Opus 4.6, Opus 4.5, Sonnet 4.5, and Haiku 4.5. Text those models generate now carries the mark on supported platforms, with one important limit: if a request sets `temperature`, `top_p`, or `top_k` to a non-default value, the text might not be watermarked. For teams that still call these models, that detail matters more than the headline.

This is not the first wave. Newer models have been marking text already, and on Nov. 3 Anthropic added the watermark to Claude Mythos 5, Claude Opus 4.7, and Claude Sonnet 4.6. The November 16 change is a retrofit. Anthropic has signed the EU AI Act's transparency code of practice and has been bringing older models into the same system during the law's transition period for systems launched before Aug. 2, 2026.

## What the mark is, and what it is not

The watermark is woven into the text itself. Anthropic says you will not see it, and that it does not change the meaning, quality, or readability of the output. It adds no tokens and no hidden characters, and it carries no information about you or your organization. You do not need to change how you send requests or handle responses for the mark to be there, unless you rely on it and also set sampling parameters.

Because the mark is part of the text, it travels when someone copies and pastes the output, and it may survive some editing. Anthropic applies it at the model level, so it is meant to be present wherever a supported model is used: the Claude API, the Claude apps, Claude Code, Claude Cowork, Claude Tag, and, for text watermarks, cloud partners including AWS, Google Cloud, and Microsoft Foundry. The company notes that the rollout on Amazon Bedrock may take a few extra days, and that some platforms or features may not support every type of mark.

A second, separate system, Content Credentials (C2PA), can be attached when Claude generates a supported file such as a PNG or JPEG. That is about files, not the text watermark in this update.

## The sampling catch, and who can check the mark

If you need the watermark on Opus 4.6, Opus 4.5, Sonnet 4.5, or Haiku 4.5, Anthropic's docs say to leave `temperature`, `top_p`, and `top_k` out of the request. The same advice applies to Sonnet 4.6 and to Claude Opus 3, which is available on request and carries the text watermark only on Anthropic's own surfaces. A framework or client library may set those parameters for you, so the request body that actually reaches the API is what counts.

Checking the mark is another story. Watermark detection is in private preview. Anthropic says it is available to eligible organizations under the EU code, such as regulators, law enforcement, media, fact-checkers, independent researchers, educational organizations, and EU civil society groups, and to select enterprises that need to verify their own Claude outputs. There is a form to request access. There is no public detector for ordinary users or typical app teams today.

The company also lists the limits. A detected mark is a signal that content may have been generated or processed by Claude, not proof of full provenance: people use Claude to proofread, translate, or summarize other people's work. The absence of a mark does not mean the text is human. Heavy editing, a very short passage, or a non-default sampling setting can leave no reliable signal.

## What to do if you still use these models

If your product depends on the watermark, open the code or the no-code settings that call Claude and look at the actual request. Remove `temperature`, `top_p`, and `top_k` if any of them are set, including by a client library. If you are on Bedrock, give the rollout a few days and then check again. If you only need to know whether a paragraph came from Claude, do not expect to paste it into a public checker this week.

The rest of your stack does not get a free pass from a watermark. A site that publishes model output still needs pages, login, and payments that work.

If that site or app was built with Lovable, Bolt, Cursor, or v0 and you want help reviewing the integration or finishing the launch, we fix and launch AI-built projects. Start with a scan on our [services page](https://inqreon.com/en/).
