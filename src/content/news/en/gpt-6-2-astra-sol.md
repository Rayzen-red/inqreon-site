---
title: "OpenAI launches GPT-6.2 Astra and Sol, and cuts Astra's API price 20%"
slug: "gpt-6-2-astra-sol"
date: 2026-11-18
lang: en
description: "On Nov. 17, OpenAI released GPT-6.2 Astra for hard projects and Sol for everyday work. Both are in ChatGPT Work, Codex, and the API, not regular Chat."
image: "/images/news/gpt-6-2-astra-sol.webp"
imageAlt: "A calm editorial still life of two abstract workstations side by side, one dense with documents and code blocks, the other spare and quick, no logos or readable text."
sources:
  - title: "Introducing GPT-6.2 Astra and Sol (OpenAI)"
    url: "https://openai.com/index/introducing-gpt-6-2-astra-sol/"
  - title: "GPT-6.2 (ChatGPT Learn)"
    url: "https://learn.chatgpt.com/docs/whats-new/gpt-62-astra-sol"
translationKey: "gpt-6-2-astra-sol"
tags:
  - news
  - openai
  - chatgpt
cta: scan
draft: false
---

On Nov. 17, OpenAI released GPT-6.2 Astra and GPT-6.2 Sol. Astra is the model for the hardest projects: code, science, slides, spreadsheets, and long documents. Sol is the everyday model, meant to get more done on the same paid plan. Both are already in ChatGPT Work, Codex, and the API. They are not in regular Chat.

That last point is easy to miss if you only read the headline. To use either model in ChatGPT, you open Work. Plus, Pro, Business, Enterprise, and Edu plans can do that on the web, desktop, or mobile, but Enterprise and Edu admins have to turn the models on in workspace settings first. On supported consumer plans, new Work chats default to Sol at Light reasoning effort.

## What OpenAI says the models are for

In its announcement, OpenAI describes Astra as a step up on professional work. It says the model's slides, spreadsheets, and documents follow the templates you give it more closely, and that the writing has less filler. It also says Astra writes cleaner code and builds frontends that look and work better, especially for websites, games, and 3D design.

Sol, in OpenAI's words, is smarter and more efficient than GPT-6.1 Sol and is better at multistep work. The company says many of its own employees use it as their default model. In Cognition's FrontierCode 2.0, which checks whether changes to real codebases meet maintainers' standards for merging, OpenAI reports that Sol at max comes within 0.5 points of Astra at about one-fifth the cost.

Those figures are OpenAI's. We have not run the tests ourselves.

## Price in the API, and a few of the scores

In the API, Astra's input and output token prices are 20% lower than GPT-6 Astra's, with a 60% discount on cached input: $8 per million input tokens, $0.40 for cached input, and $40 per million output tokens. Sol keeps GPT-6.1 Sol's API prices. The model IDs are `gpt-6.2-astra` and `gpt-6.2-sol` in the Responses API. Both support Ultrafast at launch. In Codex and Work, Pro $200 subscribers can use Ultrafast with Sol; Pro $500 subscribers, and eligible Enterprise and Edu workspaces once an owner turns it on, can use it with either model.

OpenAI also published a long list of benchmark claims. A few that are easier to place: on Agents' Last Exam, which tests long, multistep professional work, it says Astra scores 5.2 points higher than GPT-6 Astra at less than a third of the cost. On Terminal-Bench-Science 0.1, which tests scientific work in a terminal, it says Astra is 9 percentage points ahead of GPT-6 Astra, again at less than a third of the cost. On the company's own GDPval v2, which measures long workflows from real projects, it says Astra leads the models it tested, up 6.2 points from GPT-6 Astra while using 22% fewer output tokens, and that Sol improves 5.3 points from GPT-6.1 Sol.

Treat those as the company's own results, including the cost comparisons.

## What to try this week

If you already work in ChatGPT Work or Codex, the practical test is narrow. Put a real task on Sol first: a pull request, a revision after review, or a brief from meeting notes. Move to Astra if the job needs a template followed closely, a bug traced across services, or a document that has to match a house style. In the API, the 20% cut applies to Astra; Sol's token prices did not change.

A stronger model still will not finish a site for you. If you are building in Lovable, Bolt, Cursor, or v0, the last mile is the same as last week: sign-in, payments, and a deploy that holds up.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
