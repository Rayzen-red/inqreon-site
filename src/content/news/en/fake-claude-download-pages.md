---
title: "Fake 'Download Claude' pages on claude.ai are spreading malware"
slug: "fake-claude-download-pages"
date: 2026-11-21
lang: en
description: "A Gen Digital report from Oct. 26 describes fake Claude download pages hosted on claude.ai. The real installer is at claude.com/download; type that address yourself."
image: "/images/news/fake-claude-download-pages.webp"
imageAlt: "A calm editorial still life of a closed laptop and a small warning card on a desk, soft light, no logos, no people, and no readable text."
sources:
  - title: "How Criminals Abuse Claude's Own Website to Spread Malware (Gen Digital)"
    url: "https://www.gendigital.com/blog/insights/research/claude-content-sharing-malware"
translationKey: "fake-claude-download-pages"
tags:
  - news
  - security
  - claude
cta: scan
draft: false
---

In a report published on Oct. 26, researchers at Gen Digital described fake "Download Claude" pages hosted on Anthropic's own domain, claude.ai. The address looks genuine because it is genuine: the attackers used ordinary sharing features, public Artifacts and Shared Chats, and paid for search ads to send people there. Those pages were not published by Anthropic. The real download page is [claude.com/download](https://claude.com/download), and you should type that address yourself or use a bookmark.

We did not find a public statement from Anthropic about this October write-up.

## Why a real address is no longer enough

Most scams depend on a detail you are supposed to miss: a look-alike domain, an odd web address, a missing padlock. This one removes that test. Gen Digital says the lure was served as a Shared Chat or as a public Artifact on claude.ai, which are normal ways to share content. The platform marked the pages as user-generated and unverified. On an Artifact, the researchers write, that warning was a thin banner. Everything else, the domain, the padlock, the branding, looked official, and that was the point.

You were not meant to stumble on these pages. The links Gen Digital analysed carried tracking parameters from paid search ads, which means the attackers bought their way toward the top of the results. In the same cluster, the researchers found several different Artifacts tied to two ad campaigns, so this was not a one-off page.

The Mac lure, as they describe it, did not actually offer an installer. It walked visitors through a short "quick install" and asked them to copy a command and paste it into Terminal. That family of tricks is known as ClickFix: nothing obvious is downloaded as an app, and the operating system sees a command you appeared to run yourself. Gen Digital says everyone who followed those steps installed Atomic macOS Stealer, or AMOS, malware written to take passwords, browser sessions, cryptocurrency wallets, and other sensitive data.

The same report says the malware can replace the legitimate Ledger and Trezor desktop apps with modified copies. Later, those copies ask the user to type a wallet recovery phrase. Anyone who has that phrase can empty the wallets that come from it. A separate campaign used the same front door against Windows users: a page on claude.ai that asked people to paste a command into the Run dialog. The final payload, the researchers write, behaved like a remote-access tool and also looked for cryptocurrency wallets.

None of this required a break-in at Anthropic. Ordinary sharing tools on a trusted domain were enough.

## How to stay clear of it

The habit that cuts this whole family of attacks off is simple. Never paste into Terminal, PowerShell, or the Run dialog a command you did not write yourself. No legitimate app, Claude included, needs you to run a cryptic one-liner in order to install it.

Download software from the vendor's own site, and get there by typing the address or using a bookmark. For Claude, that page is claude.com/download. A search result, especially a sponsored one, is not a sign of safety. If a "download" or "install" page lives on a share or artifact address, and not on the company's own product site, leave. Treat a "user-generated" or "unverified" label as a stop sign, not as small print.

Never type a wallet recovery phrase into software that asks for it out of the blue. That entry belongs on the hardware device. A sudden "restore or validate your phrase" prompt inside an app is a theft attempt.

If you think you already ran something like this, Gen Digital's advice is to treat the machine as fully compromised. From a different, clean device, change important passwords, starting with email, banking, and crypto exchanges, sign out of open sessions, and turn on multi-factor authentication. For crypto, move funds to a wallet created from a completely new recovery phrase, and reinstall wallet apps only from the official vendor.

A trusted web address tells you where a page is hosted. It does not tell you who wrote it, or whether you should run anything it suggests. That is just as true if you are shipping a public demo or a site assembled in Lovable, Bolt, Cursor, or v0: people may trust the domain, even when the page itself should not be trusted.

If you need help tightening that last mile before a launch, we fix and ship sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
