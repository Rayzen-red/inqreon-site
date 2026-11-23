---
title: "Opening old chats in the ChatGPT desktop app is now 80% faster"
slug: "chatgpt-desktop-faster"
date: 2026-11-23
lang: en
description: "On Nov. 22, OpenAI's Jimmy Lai said a week of work landed 500+ performance fixes: cold chats open 80% faster, switching is 30% faster, and the installer is smaller."
image: "/images/news/chatgpt-desktop-faster.webp"
imageAlt: "In a dark archive, a heavy oak drawer of files slides open in a sharp streak of amber light."
sources:
  - title: "If you've upgraded your ChatGPT app in the past few days... (Jimmy Lai on X)"
    url: "https://x.com/feedthejim/status/2124603578019086484"
  - title: "Some fun numbers first: 500+ perf-related PRs, cold threads 80% faster (Jimmy Lai on X)"
    url: "https://x.com/feedthejim/status/2124603771951157579"
translationKey: "chatgpt-desktop-faster"
tags:
  - news
  - openai
  - chatgpt
cta: scan
draft: false
---

On Nov. 22, Jimmy Lai, who leads ChatGPT and Codex web and desktop infrastructure at OpenAI, [wrote on X](https://x.com/feedthejim/status/2124603578019086484) that if you recently updated the ChatGPT desktop app, it may already feel faster. The team, he said, "challenged ourselves to land as many wins as possible in a week." In a [follow-up post](https://x.com/feedthejim/status/2124603771951157579) he shared the figures: more than 500 performance-related pull requests across the desktop app and the command-line tool, opening a "cold" thread 80% faster, switching between open threads 30% faster, a 10% quicker launch, and a smaller download — 35% on Mac and 25% on Windows.

## What the numbers cover, and what they do not

The percentages are Lai's own measurements, not an official product blog with before-and-after times in seconds. He did not say which devices were tested or how a "cold" thread was defined beyond the ordinary meaning: a conversation the app had not already loaded. He also added a useful caveat in the same thread: "most of the wins are not covered by any metrics (yet)." The five figures above are the ones he chose to publish. The rest, he wrote, you are more likely to notice if you are a heavy user with "many long-running parallel sessions."

A second caveat is the scope. The 500-plus pull requests cover both the desktop app and the CLI, not the desktop app alone. The speed numbers he listed — launch, opening a cold thread, and switching between open threads — describe the app. Several of the later posts in the thread walk through why navigation had gotten expensive: chats now run much longer, and a single turn can include a long series of tool calls. The app's virtualization, Lai wrote, had been turn-based rather than tool-based, so an agent that called many tools in the current turn still forced the interface to render and process each of those inputs and outputs.

The team rewrote that part, moving to viewport-based virtualization that accounts for tool calls. That, he wrote, "yielded a lot of the current speed-up for larger conversations." Other fixes were smaller and harder to see from the outside: reusing work already done when you return to a thread you had opened, deferring some UI cleanup, and chasing CSS patterns that forced the browser to recalculate layout too often. He said many of the pull requests started from feedback by the most active internal users.

## What to try this week

If you use the ChatGPT desktop app, the practical test is simple. Update it, then open a conversation you have not loaded today — a trip plan, a packing list, a thread you will need in a meeting — and switch between two chats you already have open. Lai's figures describe those actions, not a faster model and not a new answer quality. If the app still feels heavy, that is useful feedback too: he asked people to send specific complaints, and he noted that the work is not finished.

A snappier chat window does not finish a product for you. A site or an app started in Lovable, Bolt, Cursor, or v0 still has to be reviewed, signed in, paid for, and deployed in a way that holds up once real users arrive.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
