---
title: "Mathematicians confirm a Claude-aided Riemann hypothesis proof"
slug: "claude-riemann-hypothesis"
date: 2026-11-22
lang: en
description: "On Nov. 20, Anthropic mathematician Levent Alpöge said Claude helped prove the Riemann hypothesis. On Nov. 21, the Lean and Mathlib communities certified the proof."
image: "/images/news/claude-riemann-hypothesis.webp"
imageAlt: "A colossal stone gate in a dark canyon splits open as a shaft of gold light pours through."
sources:
  - title: "The AI Riemann hypothesis proof is true, independent mathematicians confirm (Scientific American)"
    url: "https://www.scientificamerican.com/article/the-ai-riemann-hypothesis-proof-is-almost-certainly-true-independent-mathematicians-attest/"
  - title: "Lean verification of the Riemann Hypothesis (Lean and Mathlib communities)"
    url: "https://leanprover-community.github.io/blog/posts/riemann-hypothesis/"
  - title: "Two groups verify mathematician’s claim that Claude helped prove mathematics problem (The Guardian)"
    url: "https://www.theguardian.com/technology/2026/nov/21/anthropic-riemann-hypothesis-solved-claude-ai"
  - title: "Anthropic worker says AI helped him find proof of the Riemann Hypothesis (AP News)"
    url: "https://apnews.com/article/anthropic-claude-math-solution-ai-4fe8b69a891f160f9e7f0c85af8c55c8"
translationKey: "claude-riemann-hypothesis"
tags:
  - news
  - anthropic
  - claude
cta: scan
draft: false
---

On Nov. 20, Anthropic mathematician Levent Alpöge said he had used the company's Claude model to help prove the Riemann hypothesis, one of the most famous problems in mathematics and, until this week, still open after more than 160 years. The next day, the Lean and Mathlib communities, which maintain the proof-checking language he used, issued a joint statement certifying both the statement and the proof.

The hypothesis was first posed in 1859 by Bernhard Riemann. In plain terms, it claims that there is a hidden pattern in how prime numbers, which are divisible only by themselves and 1, are distributed. Alpöge posted a note on his personal website on Friday, a day after Anthropic went public, and said the work with Claude took about six weeks. "Claude and I have had a great time together with such breadth in recent months, but this time Claude far outpaced me near the finish line," he wrote, according to The Guardian. He also called the timing "horrible" and said that if he could have, he would have finished earlier.

## How the proof was checked

Alpöge recorded the argument in Lean, a programming language used to check that each step of a proof is valid. If Lean code compiles without errors, that is usually taken as a sign that the logic holds. Scientific American notes that this still leaves two questions: whether the code proves the actual Riemann hypothesis, and not a slightly different statement, and whether other mathematicians can compile the same code.

Those checks have now been done. In a statement dated Nov. 21, endorsed by the Lean FRO and the Mathlib Initiative, the Lean and Mathlib communities wrote: "We have full confidence that Alpöge's proof of the Riemann Hypothesis is correct, and we congratulate him on this achievement." They added: "We hereby certify that both the statement and the proof of the Riemann Hypothesis are correct."

According to that statement, the library is 17 million lines of Lean and depends directly only on Mathlib. Dozens of people reported that it compiled and produced the same proof export. A separate file was added so the official Mathlib statement of the hypothesis could be compared with the theorem Alpöge proved, using two independent tools. The exported proof was then checked by Lean's official kernel and by several independent checkers, including ones written in different programming languages.

Andrew Sutherland, a mathematician at the Massachusetts Institute of Technology, independently compiled the result. "The Lean proof has been compiled and independently rechecked by the Lean kernel with only the three standard axioms," he told Scientific American. "Honestly the chance that anything is fishy here is approximately zero." A "comparator run," which checks that the code does not quietly redefine symbols or exploit a bug in Lean's kernel, has also been completed, the magazine reported after a Nov. 21 update. An earlier editor's note had still described the story as developing.

Kevin Buzzard of Imperial College London had earlier spelled out why a PDF plus Lean code is not enough on its own: you have to ask whether the theorem in the code is the same as the theorem everyone means. That is the question the communities say they have now closed.

## What this does, and does not, settle

This is a formal verification of a claimed proof, not a company announcement from Anthropic. Alpöge presented the work as a collaboration with Claude, not as a model that simply emitted a finished paper. The Lean communities say they look forward to the mathematical work of explaining the new ideas in the proof. That part, reading and teaching the argument in human language, is still ahead.

For anyone who builds with AI, the useful lesson is a familiar one. A model can do a startling amount of the hard work, and the result still has to be checked in a form other people can rerun. A site or an app started in Lovable, Bolt, Cursor, or v0 is a smaller version of the same problem: the last mile is review, sign-in, payments, and a deploy that holds up.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
