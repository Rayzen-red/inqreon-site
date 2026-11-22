---
title: "Signal now blocks screenshots so AI agents cannot read your chats"
slug: "signal-blocks-ai-screenshots"
date: 2026-11-22
lang: en
description: "On Nov. 20, Signal began blocking screenshots so Siri AI and Gemini cannot scan chats on screen. On iPhone this is on by default; on Android it turns on at first access."
image: "/images/news/signal-blocks-ai-screenshots.webp"
imageAlt: "A phone whose screen has become a vault door behind a blue shield, as pink cursor-arrows from every side bounce off it."
sources:
  - title: "Signal is Serious About Protecting Your Privacy (Signal blog)"
    url: "https://signal.org/blog/protecting-your-privacy/"
  - title: "Screen security: blocking Google Gemini and Siri AI (Signal Support)"
    url: "https://support.signal.org/hc/en-us/articles/11338514641306-Screen-security-blocking-Siri-AI"
  - title: "Signal is blocking Gemini and Siri AI from reading your screen (The Verge)"
    url: "https://www.theverge.com/ai-artificial-intelligence/1038390/signal-blocking-ai-agent-screenshots-mobile-app"
translationKey: "signal-blocks-ai-screenshots"
tags:
  - news
  - signal
  - privacy
cta: scan
draft: false
---

On Nov. 20, Signal president Meredith Whittaker wrote that the messenger is restricting built-in mobile AI agents from capturing and storing Signal data. On iOS 27, the app blocks screenshots. On Android, Screen security turns on when an assistant tries to read Signal's screen. The point is straightforward: if an agent can see what is on your display, the chat is no longer only yours, and it is not only your messages at stake.

## How the protection works

In a [Signal blog post](https://signal.org/blog/protecting-your-privacy/), Whittaker describes the problem this way. Google is folding agentic features such as Gemini Intelligence into Android. Apple is doing the same with Onscreen Awareness in Siri AI. To answer questions and carry out requests, those agents "scan" whatever is visible on the screen. Once that happens, Signal data can sit in a local database or on a remote server used by the agent, outside Signal's control. That, she writes, undermines Signal's ability to independently guarantee privacy, even though the app's encryption rests on open-source code and a formally verified protocol. The privacy of everyone in the conversation is at risk.

Signal already took a similar step last year on Windows, blocking screenshots by default so Microsoft's Recall could not capture Signal messages, including disappearing ones, and store them in its searchable database.

According to [Signal's support article](https://support.signal.org/hc/en-us/articles/11338514641306-Screen-security-blocking-Siri-AI), while the protection is on, you cannot take screenshots or screen recordings inside the app, Signal's content should not appear in Android's recent-apps list or the iPhone App Switcher, and on-device assistants should not be able to read the screen. Encryption itself does not change, and neither does who can see your messages.

The version requirements are specific. Android needs Signal 8.35.1 or later. iPhone needs Signal 8.37 or later, and only on iOS 27 or later. On iPhone, Block Siri AI is on by default. On Android, Screen security turns on the first time an assistant tries to read Signal's screen, and the app explains what happened; you can also turn it on immediately in Settings. The paths are Settings → Privacy → App security → Screen security on Android, and Settings → Privacy → Block Siri AI on iPhone.

The blog adds a practical limit on Android: there are many vendor versions of the system, and Signal often cannot reliably detect a screenshot attempt once screenshots are already disabled. So the team watches for an AI assistant trying to access the screen, then turns the setting on automatically.

## If you still need a screenshot

You can turn the protection off in Settings. Whittaker warns that doing so may expose your Signal content, and your contacts' content, to these agents and break Signal's privacy guarantees. The app asks you to confirm first.

On iPhone, Block Siri AI has three options: On (the default), Off, and Off for 10 Minutes, which is meant for a quick screenshot. If you try to capture the screen while the lock is on, iOS tells you the screenshot was prevented and offers those same choices. On Android, the phone simply will not take the screenshot. If you turn the setting off from the on-screen prompt, Signal will turn it back on after 90 days. If you switch it off yourself in Settings, Signal will not remind you.

## What this does not cover

Signal itself calls the remedy incomplete. Blocking screenshots does not stop other ways an agent might reach app data, including through the device filesystem.

The company is not shipping these protections on macOS. Whittaker writes that developers still lack a simple, well-documented way to restrict AI-agent access without breaking ordinary app behavior, and that Signal cannot reliably block screenshots on the Mac. For now, the advice for macOS 27 users is to add Signal to the Excluded Apps list under System Settings → Siri, so Siri AI does not pull in message content on its own.

Signal also says documentation of how these agents actually work is thin, and that the team has spent months investigating Android and iOS. It is asking Apple, Google, and Microsoft for a straightforward way for an app to opt out of AI data access, including screen reading, filesystem access, and notifications, and for clearer technical specifications.

## What to check this week

If you use Signal, update the app and leave the protection on. If you truly need a screenshot on iPhone, use the ten-minute off switch instead of disabling the setting for good. On a Mac, add Signal to Siri's excluded apps. And remember that this is not only about your own messages: turning the protection off can affect the people who write to you.

Signal's move will not finish a product for you. It does show how quickly an agent can reach a screen if the operating system allows it. If you are building a site or an app in Lovable, Bolt, Cursor, or v0, the last mile is still sign-in, payments, and a deploy that holds up, plus a clear sense of what an agent on the user's device can see.

If that last mile is where you are stuck, we help fix and launch sites and apps built with AI. You can start on our [services page](https://inqreon.com/en/).
