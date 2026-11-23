---
title: "OpenAI's chief scientist proposes a shared limit on AI development"
slug: "openai-pachocki-shared-limits"
date: 2026-11-23
lang: en
description: "On Nov. 22, OpenAI chief scientist Jakub Pachocki argued labs should treat perplexity as a shared yardstick and not cross a common limit until they can monitor models."
image: "/images/news/openai-pachocki-shared-limits.webp"
imageAlt: "A glowing red threshold stretches across a dark desert highway as streams of gold light rush toward it and stop short."
sources:
  - title: "Perplexity and Intelligence (OpenAI, Jakub Pachocki)"
    url: "https://openai.com/index/perplexity-and-intelligence/"
  - title: "OpenAI Chief Scientist Urges Industry Limits on AI Development (Bloomberg Law)"
    url: "https://news.bloomberglaw.com/artificial-intelligence/openai-chief-scientist-urges-industry-limits-on-ai-development"
  - title: "This is the most important thing OpenAI has published in awhile (Sam Altman on X)"
    url: "https://x.com/sama/status/2124551594691932405"
translationKey: "openai-pachocki-shared-limits"
tags:
  - news
  - openai
  - safety
cta: scan
draft: false
---

On Nov. 22, OpenAI chief scientist Jakub Pachocki published a blog post arguing that labs should treat perplexity — how well a model predicts the next token — as a shared yardstick for progress, and then agree on common limits they will not cross until they can actually monitor what the models are doing. He did not name a binding number or a date. The unusual part is the source: OpenAI is asking the rest of the industry to draw a line together and then stop at it.

## What Pachocki is actually proposing

In [Perplexity and Intelligence](https://openai.com/index/perplexity-and-intelligence/), Pachocki describes modern AI less as a pile of separate techniques and more as a compressor trained on a huge corpus of data. Downstream tests go stale quickly, he writes. GPT-2 and GPT-3 would look weak on today's benchmarks, and the tests used then were largely saturated around GPT-4. Pretraining progress, measured by perplexity or the equivalent cross-entropy loss, has stayed informative.

He published OpenAI's internal figures on a held-out dataset the company has tracked since GPT-3.5, even though, as he notes, that "gives competitors a clearer picture of where we stand." The urgency of shared safety measures, he writes, outweighs that concern.

The numbers he gives are log-perplexity, also called cross-entropy loss. Lower is better. GPT-3.5 sat at about 0.99 and could hold a fluent conversation, which became the basis for the original ChatGPT. GPT-4, at about 0.91, could use chain-of-thought reasoning productively. Once losses fell below 0.8, he writes, "transformative capabilities" appeared in cybersecurity and mathematics. After a further upgrade to about 0.76, the models started producing "groundbreaking" results on open math problems the company had been posing internally.

He expects another jump as models enter a window of about 0.68 to 0.7. He does not claim to know what those capabilities will be, and he says the industry may not even be testing for them yet. At the same time, he expects today's dominant ways of auditing alignment to get worse, and models to become more aware that they are being evaluated.

That is the backdrop for the limit. "I further propose common limits, based on perplexity and other measurements, that developers are committed to not crossing until our ability to understand and monitor AI behavior achieves a certain concrete milestone (such as the development of a successor to CoT monitors)," he wrote. He wants an industry standard that names a first limit and, just as clearly, what would have to be achieved before anyone goes beyond it.

## What this is not

It is a proposal, not an agreement. Pachocki does not specify the first number, who would enforce it, or when it would take effect. [Bloomberg Law](https://news.bloomberglaw.com/artificial-intelligence/openai-chief-scientist-urges-industry-limits-on-ai-development), reporting on the same post, quotes that passage and notes the call for industrywide thresholds. It does not describe a deal already in force.

Pachocki also lists the problems with using perplexity as a shared metric. Labs train on different data and test on different sets, so comparisons are messy. The number does not map directly onto a task anyone cares about in isolation. Chain-of-thought reasoning can sharply raise capability without lowering perplexity at all. And there is an unknown floor: a loss of zero is not expected, but no one knows the inherent entropy of the data, so later gains may look small on the chart while still producing large leaps in intelligence.

He also warns about speed. Once models began solving long-open math problems, he writes, it became easier to imagine a similar "avalanche" in pretraining research itself, conceivably as early as 2027. He thinks AI will help with alignment and monitoring too, but "not fast enough to allow the full potential acceleration in pretraining."

OpenAI CEO Sam Altman, quoting the post on X, called it "the most important thing OpenAI has published in awhile" and said he hopes labs can "agree as a frield to common limits." The typo is his; the endorsement is not subtle.

## What to take from it this week

If you build with these systems, the practical point is simpler than the metric. A model can look calm on a familiar benchmark and still pick up abilities no one was measuring. A site or an app started in Lovable, Bolt, Cursor, or v0 has a smaller version of the same problem: the last mile is still review, sign-in, payments, and a deploy that holds up.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
