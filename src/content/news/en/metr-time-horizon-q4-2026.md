---
title: "METR: AI agent task length is still doubling about every 3.6 months"
slug: "metr-time-horizon-q4-2026"
date: 2026-11-22
lang: en
description: "On Nov. 20, METR reported that on its combined task suites, the length of work AI agents can finish is still doubling roughly every 3.6 months."
image: "/images/news/metr-time-horizon-q4-2026.webp"
imageAlt: "An aerial view of a desert highway at sunset that suddenly doubles in width and shoots toward the horizon as a glowing beam."
sources:
  - title: "AI R&D-relevant model capabilities are improving rapidly and are getting harder to measure (METR)"
    url: "https://metr.org/blog/2026-11-20-q4-2026-capability-update/"
  - title: "The most misunderstood graph in AI just got a major update (MIT Technology Review)"
    url: "https://www.technologyreview.com/2026/11/20/1149399/the-most-misunderstood-graph-in-ai-just-got-a-major-update/"
translationKey: "metr-time-horizon-q4-2026"
tags:
  - news
  - agents
  - metr
cta: scan
draft: false
---

On Nov. 20, the independent evaluation lab METR published a new capability update. On its combined suites of tasks, the time horizon of AI agents, meaning the length of work they can finish on their own, is still doubling roughly every 3.6 months. The precise figure in the report is 3.61 months, or 110 days, with a 95% confidence interval of 2.08 to 4.94 months. That is close to the earlier trend of 105 days on the older suite alone.

The measurement is simple to state and easy to misread. METR scores a task by how long a skilled human would take, then asks how long a task an agent can complete at a given success rate, usually 50%. The famous plot of that number going up is what MIT Technology Review calls one of the most misunderstood graphs in AI. The new report keeps the same idea and adds harder tasks, including some that are open-ended and judged by people rather than by an automatic check.

## What is getting easier, and what is not

On coding and optimization tasks, METR writes that models usually match or outperform the skilled humans the lab can recruit. When the researchers hired their own human baseliners, they typically failed to find people who beat the current frontier models. In a couple of cases with many specialists already on record, the models placed at a very high percentile, but not at the absolute top.

Judgment is a different story. On tasks that require a choice without clear empirical feedback, METR says AI agents appear to have worse judgment than human experts. MIT Technology Review describes one of those tasks: models were asked to design new evaluations that METR could use in its own research, and human staff scored the results. Not one of the AI-designed evaluations was good enough to be useful. Some of the newest models, such as Opus 5.5, reached what METR calls "borderline above the bar," which is still short of usable, after a year in which every model was "clearly below the bar."

The lab is also running into the cost of measurement itself. The original plot used real human completion times. In the new report, many of those times are estimates, because paying people for tasks that might take hundreds of hours, or that only a few experts can do, is expensive. The new TH2 suite is harder, so any given model has a lower 50% time horizon on the combined set than on the older suite alone. A subset of easier-to-check TH2 tasks shows a faster doubling time of 1.65 months, but METR treats that as noisy and lists several other explanations, including a less diverse set of tasks.

## What to do with a number like this

METR's own summary is cautious. The authors say they remain uncertain about what capabilities would be needed for drastic acceleration of AI research, and how quickly the relevant skills are improving. They also write that current public evidence is not enough to rule out that kind of acceleration in the next couple of years. A naive straight-line reading of the combined trend, they note, would reach a 50% time horizon of 200 hours, the longest threshold in their set, in July 2027. That is an extrapolation, not a forecast they are standing behind.

For someone building a product, the practical reading is narrower. Agents are taking on longer stretches of coding and similar work, and they will keep getting longer. They are still weaker where the test is fuzzy: taste, review, and a decision that cannot be scored with a unit test. If you are working in Cursor, Claude Code, Lovable, Bolt, or v0, the useful habit is to give the agent a task you can check, then keep the last mile, sign-in, payments, and a deploy that holds up, in human hands.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
