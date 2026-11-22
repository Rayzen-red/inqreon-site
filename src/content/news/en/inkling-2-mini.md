---
title: "Thinking Machines releases Inkling 2 Mini, a laptop-size open model"
slug: "inkling-2-mini"
date: 2026-11-22
lang: en
description: "On Nov. 20, Thinking Machines Lab released Inkling 2 Mini: 26.4B parameters, a 1M-token context, Apache 2.0, and a file of about 20GB that can run on a laptop."
image: "/images/news/inkling-2-mini.webp"
imageAlt: "A night airplane cabin: a fiery ring of light circles a laptop on the tray table, with stars outside the window."
sources:
  - title: "Introducing Inkling 2 Mini (Thinking Machines Lab)"
    url: "https://thinkingmachines.ai/news/inkling-2-mini/"
  - title: "Inkling 2 Mini (Hugging Face)"
    url: "https://huggingface.co/thinkingmachines/Inkling-2-Mini"
  - title: "Thinking Machines wows with Inkling 2 Mini looped transformer model that runs locally on laptops (VentureBeat)"
    url: "https://venturebeat.com/technology/thinking-machines-wows-with-inkling-2-mini-looped-transformer-model-that-runs-locally-on-laptops"
translationKey: "inkling-2-mini"
tags:
  - news
  - models
  - open-source
cta: scan
draft: false
---

On Nov. 20, Thinking Machines Lab, the company founded by former OpenAI CTO Mira Murati, released Inkling 2 Mini, an open-weights model small enough, the lab says, to run on a laptop. It is a mixture-of-experts model with 26.4 billion parameters in total and 3.4 billion active on a standard pass. The context window is up to one million tokens, the license is Apache 2.0, and the checkpoint is about 20GB.

The model accepts text and images and writes text back. The [model card on Hugging Face](https://huggingface.co/thinkingmachines/Inkling-2-Mini) recommends Apple silicon with 32GB of memory or more, or another GPU with at least 32GB of VRAM. Weights are on Hugging Face, and the lab also offers inference and fine-tuning on its Tinker platform, plus local runtimes including vLLM, SGLang, and Ollama.

## What "looped" means here

Inkling 2 Mini is a looped transformer. In the company's description, it has 24 layers, and the middle 12 run three times with shared weights. That gives 48 layer applications per token from 24 layers of weights, and about 5.4 billion effective active parameters once the extra passes are counted. The pitch is that the model can spend more compute thinking without writing a long chain of thought first, which also matters if you want to watch that chain of thought as a monitor.

Those are the lab's claims, and so are the benchmark numbers. Thinking Machines says Inkling 2 Mini leads every open-weights model with fewer than 100 billion total parameters on DeepSWE v1.1, at 48.2%, and on Vals Index v2.2, at 46.5%. We have not run those tests ourselves.

In a demo on the announcement page, researchers took the model on a flight, ran it offline on a MacBook Pro, and, the company says, built a playable flight simulator in a few minutes. The clip is labeled as a MacBook Pro with an M5 Pro chip and 48GB of memory, in airplane mode. Treat that as the lab's illustration, not a test we repeated.

## What to expect if you run it locally

The interesting part is practical: a capable coding and tool-use model you can keep on your own machine, without a subscription and without sending the repo to someone else's cloud. That is the promise. The limits sit right next to it.

The model card is unusually direct. Inkling 2 Mini is weaker than the larger Inkling 2 Small on most of the lab's evaluations, especially factual recall, and it is more likely than larger models to state incorrect information with confidence. In internal testing it sometimes got stuck in long reasoning loops, or kept re-checking its work without making progress, particularly when debugging code. When it uses tools, it is less reliable than larger models at following detailed instructions and project conventions. It may take destructive actions, such as deleting or overwriting files, without confirmation, and it may not report the outcome accurately.

Thinking Machines recommends limits on output tokens and agent turns, a sandbox for agentic work, and a confirmation step before anything irreversible. Output quality can be lower outside English. Support for looped models in local runtimes is still new, so speed will vary by setup.

If you try it this week, start with a copy of a repo you can afford to break, not with production. A local model can draft, refactor, and even run for a stretch without the internet. It will not, on its own, give you sign-in, payments, or a deploy that holds up. That last mile is the same whether you are in Cursor, on v0, or talking to a model that never leaves your laptop.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
