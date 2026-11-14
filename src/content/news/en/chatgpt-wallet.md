---
title: "ChatGPT Wallet lets agents check out, with you still in the loop"
slug: "chatgpt-wallet"
date: 2026-11-15
lang: en
description: "OpenAI’s ChatGPT Wallet, launched Nov 13, lets U.S. Pro users approve agent purchases with a security check and a payment token, not the real card."
image: "/images/news/chatgpt-wallet.webp"
imageAlt: "An abstract payment token of light hovering over a clean checkout counter and a phone confirmation check, with no card numbers or brand marks."
sources:
  - title: "Introducing ChatGPT Wallet"
    url: "https://openai.com/index/introducing-chatgpt-wallet"
  - title: "ChatGPT’s new Wallet lets AI agents shop and check out for you"
    url: "https://techcrunch.com/2026/11/13/chatgpts-new-wallet-lets-ai-agents-shop-and-check-out-for-you/"
translationKey: "chatgpt-wallet"
tags:
  - news
  - openai
  - agents
cta: scan
draft: false
---

On November 13, 2026, OpenAI launched ChatGPT Wallet, a way for its agents, called dots, to complete a purchase on your behalf without ever seeing the real card number. The launch is narrow, but it matters if your site or app will soon meet an AI agent at checkout. A storefront that looks fine in a preview can still fail here. The agent never reaches the cart, or the payment is declined because the risk system does not recognize a legitimate agent-led order.

The wallet was built with American Express, Mastercard, and Visa. OpenAI describes it as the first wallet that lets agents pay without access to a user's actual card details and that requires a security check for every purchase, while still preserving the card's rewards and eligible dispute protections. In the same post, the company says 1.2 billion people use ChatGPT each week, and that many already use it to research products, compare options, and decide what to buy. Wallet is the attempt to finish that path without handing the raw card to the agent or the merchant.

## How a purchase works, and who can use it today

The flow is cautious on purpose. You add an eligible card once. When a dot is ready to buy, you review the items, the total, and the selected card, then approve the purchase with a check such as Face ID or a fingerprint. OpenAI says that approval creates a clear record of what you authorized.

Only after that approval does the payment network issue a payment token: a stand-in card number, security code, and expiration date. The charge goes to the real card, but neither the agent nor the merchant receives the actual card details. You still transact directly with the business, which keeps control of the catalog, fulfillment, returns, and customer service. OpenAI also says eligible card rewards remain in place, as do protections for eligible disputes, for example when an item is defective. Banks and networks still evaluate the transaction in the usual way.

Availability is limited on purpose. ChatGPT Wallet is rolling out first through dots to ChatGPT Pro subscribers in the United States who are 18 or older and have an eligible U.S.-issued card. TechCrunch, reporting the same day, described the start as limited among those Pro users and specified a U.S.-issued Visa, Mastercard, or American Express. OpenAI says it wants to learn from real-world use with businesses, banks, and networks before widening access, including work on compatibility and reliability. Over time, the company expects people to set parameters such as spending limits, purchase categories, or time windows and pre-approve some buys, with biometric checks and a record of authorization still in place. That future mode is a plan, not what ships on day one. Today, every purchase still needs a fresh security check.

## Will your site let the agent through?

For merchants, the practical question is not only whether an agent can pay, but whether the site will let the agent through. OpenAI is explicit: websites need to avoid blocking agents by accident, and payment and risk systems need to recognize legitimate agent-led purchases. Some sites, the company says, may unintentionally block ChatGPT Wallet or similar products. Browser access does not require a plugin or a product feed, but a CDN or firewall that treats the agent as unwanted traffic can still stop the session.

Alongside the wallet, OpenAI published a Commerce Partner Playbook. It covers claiming and verifying a business in ChatGPT, uploading a product feed so agents see current catalog data, signing requests with Web Bot Auth, and working with payment and fraud providers so valid agent purchases are not cancelled. Businesses can also build a plugin so agents can check stock or manage a cart through existing systems, or add WebMCP tools. Named partners include the fraud-prevention firms Forter, Riskified, Sardine, and Signifyd, and the payment service providers Adyen, Checkout.com, and Stripe.

If you have an AI-built storefront, including one assembled in Lovable, Bolt, Cursor, or v0, this is a useful test of whether the project is actually ready for production. The generated checkout may look complete while a bot rule, an unverified webhook, or a missing allow-list still blocks a real order. We help fix and launch sites and apps built with those tools, including the unglamorous layers around payments and deploy. If you want a project checked before real customers, or their agents, show up, start with a scan on our [services page](https://inqreon.com/en/).
