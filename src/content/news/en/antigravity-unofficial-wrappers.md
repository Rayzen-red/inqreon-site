---
title: "Google is suspending Antigravity accounts over unofficial wrappers"
slug: "antigravity-unofficial-wrappers"
date: 2026-11-23
lang: en
description: "Developers report Antigravity bans after unofficial proxies. Google says the official agent is allowed; wrappers, reused logins, and unattended automation are not."
image: "/images/news/antigravity-unofficial-wrappers.webp"
imageAlt: "A sealed official hangar door stands under a hard spotlight, while a narrow side tunnel beside it has just been welded shut."
sources:
  - title: "Google Antigravity Additional Terms of Service"
    url: "https://antigravity.google/terms/"
  - title: "Google Antigravity FAQ"
    url: "https://antigravity.google/docs/faq/"
  - title: "Conflicting guidance on using T3 Code with personal Google AI subscriptions (Google AI Developers Forum)"
    url: "https://discuss.ai.google.dev/t/conflicting-guidance-on-using-t3-code-with-personal-google-ai-subscriptions/197131"
  - title: "Antigravity account suspended during T3 delegation (T3 Code issue 40713)"
    url: "https://github.com/pingdotgg/t3code/issues/40713"
translationKey: "antigravity-unofficial-wrappers"
tags:
  - news
  - google
  - antigravity
cta: scan
draft: false
---

Over the past few days, some developers have reported that Google suspended their Antigravity accounts for a Terms of Service violation after they connected the coding tool to third-party programs. Google's own terms and a later forum clarification draw a sharper line than a casual reading of those complaints suggests: the official Antigravity agent, used in a supported way, is allowed; unofficial proxies, reused logins, and unattended wrappers are not. The difference matters, because a ban can take away a paid coding setup overnight.

## What Google has said in writing

Section 6 of the [Google Antigravity Additional Terms of Service](https://antigravity.google/terms/) is blunt. Users "must not abuse, harm, interfere with, or disrupt the Service," and that "includes, but is not limited to, using the Service in connection with products not provided by us." The same clause gives an example: "Using third party software, tools, or services to access the Service (e.g. using OpenClaw with Antigravity OAuth) is a breach of this Agreement." The stated penalty is "suspension or termination of your Antigravity and/or Gemini CLI accounts."

The [Antigravity FAQ](https://antigravity.google/docs/faq/) repeats the point and names Claude Code, OpenClaw, and OpenCode as examples of third-party software that should not be used with an Antigravity login. "Such actions can result in suspension or termination of your account," it says. To use a third-party coding agent with Gemini, Google recommends a Gemini Enterprise or Google AI Studio API key. A separate FAQ answer adds that wrapping the Antigravity CLI's headless mode (`agy -p`) inside third-party coding agents, or automating account rotation, "is not supported under consumer plans."

That still left a practical question: what about a client that does not scrape a login, but launches Google's own agent? On the official Antigravity forum, a thread about conflicting advice on [T3 Code](https://discuss.ai.google.dev/t/conflicting-guidance-on-using-t3-code-with-personal-google-ai-subscriptions/197131) was later marked solved. A staff reply, quoted there, says that launching Google's official, unmodified `antigravity-acp` binary inside an ACP-compatible client, including T3 Code or Zed, and signing in through its native `oauth-personal` flow, "for single-user interactive development is supported and permitted under our Terms of Service" and "will not cause a suspension." The same reply says the opposite for custom wrappers: extracting or reusing Antigravity OAuth credentials, wrapping CLI headless mode inside third-party agents on consumer plans, or automating account rotation is prohibited. If a violation is found, the reply adds, enforcement applies to Antigravity and/or Gemini CLI access, not to the entire Google Account.

## What users have been reporting

The public case that circulated this week is more mixed than "T3 Code got me banned." In a [T3 Code GitHub issue](https://github.com/pingdotgg/t3code/issues/40713) opened on Nov. 22, a user wrote that a paid Antigravity Pro account was disabled with Google's Terms of Service message after a task was delegated to Antigravity from T3. The same user also reported that, minutes earlier, an agent had sent a burst of requests through a local proxy that held the Antigravity login, partly via OpenCode, including retries after rate limits. The report itself said this was not a claim that T3 caused the suspension.

A T3 maintainer replied that T3 does not call Antigravity's backend itself or reuse the login token. It runs Google's own Antigravity CLI in ACP mode, installed from Google's release channel, with sign-in through the CLI's own browser flow. The user later agreed that the proxy was the most likely trigger, not T3, and said they had removed it and submitted Google's appeal. Other forum threads describe similar locks, including cases that official replies have tied to rotating accounts or leaving unattended jobs running overnight in third-party harnesses. Those are user reports and staff comments on individual threads, not a public log of every ban.

Google has also said, in forum replies, that it will not inspect individual violation records on the forum, and that an official appeal is the route back in: one appeal per account, with an automated review that the company has described as taking 48 to 72 hours.

## What to check before you reconnect a tool

If you use Antigravity, the safe reading of Google's own documents is narrow. Official first-party surfaces, and an unmodified official `antigravity-acp` binary with native sign-in for your own interactive work, are the path Google says is allowed. A proxy that holds your login, a wrapper around headless CLI, or a second account swapped in when the quota runs out, is the path it says can cost you the account. If you need a third-party agent to talk to Gemini, Google's documented alternative is an API key or Gemini Enterprise, not a borrowed Antigravity session.

This is also a reminder that "it ran once in my editor" is not the same as a setup you can rely on. A site or an app started in Lovable, Bolt, Cursor, or v0 still has to be reviewed, signed in, paid for, and deployed in a way that holds up — and it should not depend on an unofficial side door that can close overnight.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
