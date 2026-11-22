---
title: "Claude's mobile app adds a Code tab for coding on the phone"
slug: "claude-mobile-code"
date: 2026-11-22
lang: en
description: "On Nov. 20, the Claude app began rolling out a new bottom bar with Chat, Projects, Code, and Artifacts. You can start and steer cloud coding sessions from your phone."
image: "/images/news/claude-mobile-code.webp"
imageAlt: "A night view from a train: a phone on the window ledge sends a cyan beam to a distant glowing tower in the city."
sources:
  - title: "Claude has a new mobile design, too (The Verge)"
    url: "https://www.theverge.com/ai-artificial-intelligence/1039188/claude-has-a-new-mobile-design-too"
  - title: "Claude Code on mobile (Anthropic docs)"
    url: "https://code.claude.com/docs/en/mobile"
  - title: "Feature availability (Anthropic docs)"
    url: "https://code.claude.com/docs/en/feature-availability"
translationKey: "claude-mobile-code"
tags:
  - news
  - claude
  - anthropic
cta: scan
draft: false
---

On Nov. 20, Anthropic began rolling out a new design for the Claude app on iOS and Android. The refresh adds a bottom bar with tabs for Chat, Projects, Code, and Artifacts, The Verge reported, citing a post by Anthropic's Daniel Destefanis. The change arrived a day after OpenAI announced a ChatGPT app redesign that also uses a bottom tab bar.

The useful part is the Code tab. From your phone you can start a cloud coding session, watch it, answer Claude's questions, and steer it in a new direction. The work can keep running after you put the phone down. That is a real shift if you already use Claude Code at a desk and want to check a long task from the couch or a train.

## The phone is a remote, not a computer

Anthropic's documentation is clear about what the app is not. Claude Code does not have a separate mobile app, and the phone is not where the code runs. The Claude app is a client. It can reach a cloud session, a project in the cloud, a session running on your own computer through Remote Control, or, in some cases, the Desktop app through Dispatch.

Cloud sessions run on Anthropic-managed infrastructure by default, so they continue with your laptop closed. From the Code tab you pick a repository and branch, describe the task, and send it. Sessions persist across devices: something you start on a laptop is ready to review on the phone, and the other way around. You can also ask Claude to watch a pull request and fix CI failures or review comments as they arrive.

Remote Control is different. You start a Claude Code session on your computer with `claude remote-control` or `/remote-control`, then pick it up in the app. Execution and file access stay on your machine, so the computer needs to stay on. If it sleeps, the docs say Claude Code reconnects when it wakes. Dispatch, which you message as a task in the app, also drives your own computer and is not available to new users.

Push notifications can land when a long task finishes or Claude needs a decision. Some terminal-only commands, such as `/plugin` and `/resume`, do not work from the app. You also cannot select Bypass permissions on mobile.

## Who can use it today

You need the Claude app and the same claude.ai account you use for Claude Code. Cloud sessions and Remote Control are not reachable with an Anthropic Console API key or from a third-party provider such as Amazon Bedrock. If the Code tab is missing, the docs say your plan or organization may not include these features.

According to Anthropic's availability table, cloud sessions work on Pro, Max, Ultra, and Team, and on Enterprise with a premium seat or a Chat + Claude Code seat. Remote Control is available on Pro, Max, and Ultra, and is admin-enabled on Team and Enterprise. Dispatch requires a Pro, Max, or Ultra plan, is not available to new users, and is not offered on Team or Enterprise.

If you already have a qualifying plan and a GitHub repo hooked up, a good first test is a task you can review later: fix a failing test, draft a small patch, or watch CI. Do not ship from the phone without reading the diff. A session you can steer from a train is still only a draft until someone checks sign-in, payments, and a deploy that holds up, whether you started it in Claude, Cursor, Lovable, Bolt, or v0.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
