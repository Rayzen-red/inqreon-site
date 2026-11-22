---
title: "OpenAI launches MedChemBench, a test of AI for medicinal chemistry"
slug: "openai-medchembench"
date: 2026-11-22
lang: en
description: "On Nov. 20, OpenAI introduced MedChemBench: 99 problems from 117 papers and patents. Models must read molecules, explain experiments, and choose what to test next."
image: "/images/news/openai-medchembench.webp"
imageAlt: "A glowing green-and-gold molecule floats in a dark lab as scanning beams sweep across it, with flasks and capsules in the foreground."
sources:
  - title: "Can AI help scientists identify promising drug candidates? (OpenAI)"
    url: "https://openai.com/index/introducing-medchembench/"
translationKey: "openai-medchembench"
tags:
  - news
  - openai
  - science
cta: scan
draft: false
---

On Nov. 20, OpenAI introduced MedChemBench, a set of problems that test whether AI models can read molecular structures, interpret experimental results, and choose which compounds are worth testing next. The benchmark has 99 problems drawn from 117 scientific papers and patents, and it includes 761 distinct molecular structures. It is a test, not a new lab tool, and OpenAI is explicit about what the scores do not prove.

## What the benchmark actually grades

As OpenAI describes it, one of the hard parts of medicinal chemistry is that improving one property of a molecule often makes another worse. A compound may act strongly against a disease-related protein and still be poorly absorbed or break down too quickly in the body. Chemists work through those tradeoffs, then decide what to try next. For an AI model to help, it has to connect changes in structure with experimental evidence and reason about which compounds are worth pursuing.

For most problems, the model gets the context that would have been available at a chosen point in a research program: the biological target, the researchers' goals, the compounds studied so far, and some of the experimental findings. Later results are withheld and then used to grade the answer.

The benchmark scores four components. The first is molecular structures: whether atom connections and specified stereochemistry are assembled correctly from the drawings and chemical groups in the prompt. The second is scientific reasoning, such as an explanation, grounded in the supplied evidence, for choosing one compound over another. The third is ranking and selection that meets the stated requirements. The fourth is property prediction: how closely the model's numbers and categories match the measured or calculated values in the source material.

One example in the announcement comes from research on inhibitors of PRMT5, a protein studied in cancer drug discovery. The model receives structures and earlier experimental results and has to predict how three related compounds will behave: how strongly they block PRMT5 in cells, how readily they cross a cell barrier, and how quickly liver enzymes break them down in a laboratory assay. Later experiments, which the model did not see, showed a tradeoff. Compound 23 blocked PRMT5 in cells at a lower concentration, while compound 24 crossed the barrier more readily and broke down more slowly in the liver-enzyme assay. Predictions get partial credit based on closeness to the measured values. Figures already supplied in the prompt also have to be reproduced correctly.

## The scores OpenAI is reporting

These figures come from OpenAI's own evaluation, not from an independent run. At the xhigh reasoning setting, GPT-6.2 Astra earned 84.5% of the available credit, compared with 83.3% for GPT-6 Astra, 82.0% for GPT-6.1 Sol, and 58.2% for GPT-5.6 Sol. The company says it evaluated eleven GPT models at different reasoning-effort settings. At max effort, GPT-6 Astra reached 83.8%. Higher settings improved the scores, but large gaps between models remained.

OpenAI says GPT-6 Astra was strongest at reconstructing molecular structures and explaining experimental evidence, earning 95.4% of the available structure credit at xhigh. Selecting compounds and predicting their numerical properties was harder: in those categories the model earned only about half the available credit. In one spatial-reasoning problem, the model had to assemble a molecule from a central structure and two attached groups while preserving an 18-atom ring. At the xhigh setting shared by all eleven models, GPT-6 Astra reconstructed the compound correctly in all ten responses. GPT-5.6 Sol and GPT-5.6 Luna failed in all ten: one produced a 15-atom ring, and the other split the molecule into two disconnected fragments.

## What these numbers do not show

OpenAI ends the post with a clear limit. The results do not establish whether models can discover new drugs or improve laboratory decisions. Prior exposure to the published sources cannot be ruled out. Each response was a single attempt, without tools, feedback, or new experiments. The benchmark evaluates reasoning from historical evidence, not real-world drug discovery.

In plain terms, a model can be good at reading a known molecule and explaining why a paper chose one compound, and still be much weaker at deciding what to test next. That is a useful caveat for anyone building with AI. It is not a reason to treat a chat answer as a scientific conclusion.

A strong score on a benchmark will not finish a product. If you are building a site or an app in Lovable, Bolt, Cursor, or v0, the last mile is still sign-in, payments, and a deploy that holds up. Both of those need a human check, not just a confident first pass.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
