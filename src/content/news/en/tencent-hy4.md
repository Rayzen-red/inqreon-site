---
title: "Tencent releases Hy4, a 770B model under the Tencent Hy License"
slug: "tencent-hy4"
date: 2026-11-21
lang: en
description: "On Nov. 4, Tencent released Hy4: 770B parameters, 49B active, a 1M-token context. The weights are public, but the license is no longer Apache 2.0."
image: "/images/news/tencent-hy4.webp"
imageAlt: "A calm editorial illustration of a dense constellation with only a small cluster of nodes lit, and a long ribbon of light, no logos and no readable text."
sources:
  - title: "Hy4 (Tencent Hy)"
    url: "https://hy.tencent.ai/research/hy4"
  - title: "tencent/Hy4 (Hugging Face)"
    url: "https://huggingface.co/tencent/Hy4"
  - title: "Tencent Hy License, Version 1.0"
    url: "https://huggingface.co/tencent/Hy4/blob/main/LICENSE"
translationKey: "tencent-hy4"
tags:
  - news
  - tencent
  - models
cta: scan
draft: false
---

On Nov. 4, Tencent released Hy4, the full successor to the Hy4 preview it open-sourced in August. The language backbone is a mixture-of-experts model with 770 billion parameters in total, of which 49 billion are active for each token, and a context window of one million tokens. The weights are public, on Hugging Face, GitHub, ModelScope, and AtomGit. The license, though, is no longer Apache 2.0.

## What changed after the preview

Tencent's [announcement](https://hy.tencent.ai/research/hy4) says Hy4 scales up both pre-training and post-training compared with the preview, and that it adds vision and computer use for the first time. The model card on [Hugging Face](https://huggingface.co/tencent/Hy4) describes support for text, image, and video understanding. Computer use, in Tencent's wording, covers both command-line and graphical interfaces, with extra training on tools such as Blender and CAD and on workflows that run across more than one application.

The company also talks up frontend work and game development, including Unreal Engine, Unity, and Godot, and it reports gains over the preview on its own GameDev and GameLogic tests: 19.1% and 9.8%. Those scores are Tencent's. We have not run the tests ourselves.

Hy4 is available on Tencent Cloud and OpenRouter, and in Tencent products including CodeBuddy, WorkBuddy, Yuanbao, and ima. The company lists API prices of $0.834 per million input tokens, $2.501 per million output tokens, and $0.042 for cached input, and says the new model is stronger than the preview at the same API price. Day-one serving support is described with the vLLM and SGLang communities.

Tencent is unusually direct about the remaining gap. It writes that Hy4 is still behind the top proprietary models, especially on its own hard benchmarks for research-level mathematics, long-horizon coding, model self-improvement, and advanced visual question answering.

## The license is the part that is easy to get wrong

The August preview was released under Apache License 2.0. The full Hy4 model is released under the Tencent Hy License, Version 1.0. The text itself says the license is derived from Apache 2.0, "with modifications, mainly the additional commercial terms for large Model-as-a-Service (MaaS) businesses in Section 10," and then states plainly: this is not the Apache License 2.0, and it is not affiliated with the Apache Software Foundation.

Most teams can still download the weights, run them, fine-tune them, and use them in a product. The extra rule is aimed at large services that give other people general-purpose remote access to the model, for example through an API. If you operate that kind of service, you need a separate written license from Tencent in either of two cases: your worldwide gross revenue exceeds $50 million in any consecutive 12-month period, whether or not that revenue comes from Hy4, or you want to use the model in a product or service with more than 100 million monthly active users. Internal use is exempt, as long as the model, derivatives, and their outputs are not made available to third parties.

In short: this is not a blanket "use it anywhere, no questions asked" license, and it is not a ban on commercial use either. If you are building an ordinary product, read Section 10 once. If you are planning to sell general access to the model at scale, you will need a conversation with Tencent.

## What to try, if you try it at all

If you already serve open-weight models, Hy4 is worth a narrow trial on the kind of work Tencent is emphasizing: long-context documents, frontend tasks, or an internal assistant that has to look at a screenshot. Compare quality and the actual token bill with whatever you use now, and keep the license next to the model card. Do not treat the August preview and this release as the same legal object.

A strong open-weight model will not finish a site for you. If you are wiring it into an app built with Lovable, Bolt, Cursor, or v0, the last mile is still yours: sign-in, payments, and a deploy that holds up.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
