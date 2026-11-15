---
title: "Cursor review: the AI code editor after the SpaceX deal"
slug: "cursor"
date: 2026-11-15
lang: en
description: "Cursor is now part of SpaceX and sold inside The X Subscription. What it does well for developers, what changed in pricing, and the trade-offs as of November 2026."
image: "/images/ai-tools/cursor.webp"
imageAlt: "A dark code editor on a wide monitor with a blinking cursor and small task cards floating beside it"
sources:
  - title: "Cursor: Pricing"
    url: "https://cursor.com/pricing"
  - title: "Cursor blog: Cursor is now a part of SpaceX"
    url: "https://cursor.com/blog/joining-spacex"
  - title: "SpaceXSI Docs: The X Subscription pricing"
    url: "https://docs.x.ai/x-subscription/pricing"
  - title: "SpaceXSI: Introducing The X Subscription"
    url: "https://x.ai/news/x-subscription"
  - title: "AlphaMoat: Cursor vs Lovable traffic, October 2026"
    url: "https://www.alphamoat.ai/en/ai/compare/cursor-com-vs-lovable-dev"
translationKey: "cursor"
tags:
  - cursor
  - ai-coding
  - ai-tools
cta: fix
draft: false
---

Cursor is an AI code editor that went from a developer favorite to part of SpaceX in one year. The company [announced on August 14, 2026](https://cursor.com/blog/joining-spacex) that SpaceX had completed its acquisition. Since October, Cursor has been sold inside [The X Subscription](https://x.ai/news/x-subscription), together with Grok and X Premium. On the web it draws about 23.3 million visits a month, according to October estimates from [AlphaMoat](https://www.alphamoat.ai/en/ai/compare/cursor-com-vs-lovable-dev), second only to Lovable among AI coding tools.

If you write code for a living, or you're learning to, here is what Cursor does well, what changed with the new plans and where the costs hide.

## What Cursor is

Cursor is a code editor with AI agents built in. You open your project, describe a change in plain English, and the agent reads the relevant files, edits them and shows you the diff to accept or reject. It also handles questions about the codebase, refactors and debugging.

In its acquisition post, Cursor says it has gone from completing the next few lines of code to building AI teammates you can give real work to. On the [pricing page](https://cursor.com/pricing) that shows up as:

- **Agent**, available on every plan, including Free.
- **Cloud agents and automations**, which run tasks without your laptop, from Premium up.
- **Code hosting via Origin** and **AI code reviews via Bugbot**, from Premium up.
- **Third-party models** at API list price, from Premium up.
- **A team marketplace** for internal rules, skills and plugins, on Teams and Enterprise.

## Where it is strong

**It works on your real project.** Unlike a chat window, Cursor sees the whole codebase. That makes multi-file changes, renames and "find where this bug starts" far more practical.

**You stay in control.** Changes come as diffs. You can review each one, roll it back and keep your normal Git workflow.

**Agents that keep going.** Cloud agents can work on a task in the background, and automations can run on a schedule. For routine work such as dependency updates or test fixes, that can free up time.

**Privacy mode.** Cursor says that when Privacy mode is on, code data is not used for training by Cursor or its model providers. Teams can enforce it for everyone.

## Where it falls short

**The pricing is now a bundle.** Cursor plans are X Subscription plans. You get Grok and X Premium perks whether you want them or not, and the old Cursor-only pricing isn't offered to new customers. Existing Cursor plans continue unless you switch.

**Other companies' models cost extra.** The included usage pool covers Grok models. Models from other labs are available on Premium and above, but they're billed separately at API list prices through top-ups, from the first request. If your team prefers a non-Grok model for coding, budget for that on top of the subscription.

**Plus is Grok-only.** The $8 plan includes Cursor but only with Grok models, and without cloud agents or code reviews.

**Agents still make mistakes.** A confident agent can change ten files and break one thing you didn't notice. Tests and code review matter more, not less.

## What it is for

- Writing and changing code across a real project.
- Refactoring, renaming and cleaning up legacy code.
- Fixing bugs with an agent that reads the surrounding files.
- Automated code reviews before merge, with Bugbot.
- Background tasks with cloud agents and automations.

## Who it suits

**Professional developers** who want AI help inside the editor and across the whole repo.

**Teams** that want shared rules, skills and admin controls.

**Founders who code**, including people who started a project in Lovable, Bolt or v0 and now need to take the code further.

It suits less well people who don't want to read code at all. Cursor shows you diffs; you still need to judge them.

## Pricing and plans (as of November 2026)

From the official [pricing page](https://cursor.com/pricing) and [X Subscription docs](https://docs.x.ai/x-subscription/pricing), checked on November 15, 2026. Prices exclude tax.

| Plan | Monthly | Annual | Cursor features |
| --- | --- | --- | --- |
| Free | $0 | $0 | Limited agent and chat requests |
| Plus | $8 | $80/year | Agent with Grok models only |
| Premium | $30 | $300/year | 4x Plus usage, cloud agents and automations, Origin code hosting, Bugbot reviews, third-party models at API price |
| Super | $100 | $1,000/year | 15x Plus usage, priority model access at peak times |
| Ultra | $200 | $2,000/year | 50x Plus usage, earliest access to new products and models |
| Teams | From $30 per user | | Centralized billing, SSO, usage analytics, privacy controls, mix and match seat tiers |
| Enterprise | Custom | | Pooled usage, SCIM, audit logs, granular spend and access controls |

Every plan also includes Grok and X features. The usage pool is shared between Cursor and Grok and refreshes weekly. Third-party model usage is not included in these prices. Cursor says subscriptions are sold only directly, not through resellers.

## Pros and cons

**Pros**

- Agents that work across your whole codebase
- Changes shown as reviewable diffs
- Cloud agents, automations and code reviews on Premium
- Privacy mode to keep code out of training

**Cons**

- Bundled with Grok and X, whether you need them or not
- Non-Grok models are billed on top
- Plus is Grok-only and lacks cloud agents
- Agents still need tests and human review

## The short verdict

For developers who already like Grok models, Premium is a strong deal: the editor, cloud agents and code reviews for one price. If your team depends on other labs' models, add the API cost to your estimate before you switch. Either way, keep tests in place. Faster changes mean faster mistakes too.

If you started an app in Cursor, Lovable, Bolt or v0 and it's stuck before launch, we fix and ship projects like that. You can start with a scan or a fix on [our services page](https://inqreon.com/en/services/).
