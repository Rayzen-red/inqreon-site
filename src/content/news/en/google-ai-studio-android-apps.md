---
title: "Google AI Studio now builds full-stack Android apps from a prompt"
slug: "google-ai-studio-android-apps"
date: 2026-11-18
lang: en
description: "As of Nov. 17, a prompt in Google AI Studio can produce a Kotlin Android app with a database, Google sign-in, and Gemini, then put it in your personal Play library."
image: "/images/news/google-ai-studio-android.webp"
imageAlt: "A calm editorial illustration of an abstract phone shell standing beside a small stacked database and a signed-in profile token, no logos or readable text."
sources:
  - title: "Build full-stack Android apps with Gemini in Google AI Studio (Google Developers Blog)"
    url: "https://developers.googleblog.com/build-full-stack-android-apps-with-gemini-in-google-ai-studio/"
translationKey: "google-ai-studio-android"
tags:
  - news
  - google
  - android
cta: scan
draft: false
---

On Nov. 17, Google said Google AI Studio can now turn a single prompt into a full-stack Android app. The Build agent, running on Gemini 4 Carbon and Hydrogen, writes a Kotlin app with a database, Google sign-in, and Gemini features, then can put the build in your personal Google Play library so you can install it on your phone. Google writes that you can test on your own device from Play at no cost.

This is aimed at people who already sketch products in a chat and want a phone app, not only a website. It sits in the same neighborhood as Lovable and Bolt, only the output is Android.

## What the agent now sets up for you

Until now, Android apps generated in AI Studio were limited to local session storage. Google says the agent now notices when a prompt needs data that survives a restart, a signed-in user, or a Gemini call. After you confirm, it provisions the backend and wires the Kotlin project automatically.

That backend is Firebase. For data, the agent sets up a Cloud Firestore database, adds the Android SDKs, and writes Security Rules for your data model. Google says users can start on a tablet and continue on a phone, with offline caching that syncs when the network returns. For identity, it configures Firebase Authentication with Google Sign-In and per-user rules so people can read and write only their own documents.

The Gemini calls are the part that used to leak keys. Google says the agent uses Firebase AI Logic and Firebase App Check so API keys are not baked into the APK, and so requests have to come from your real, untampered app, both in the browser emulator and on Play.

## A faster emulator, and a path to your phone

The in-browser emulator is also getting an update: lower startup latency, an HD toggle at 1200p, live audio in the browser, and a one-click screenshot that you can attach to a prompt when you want a visual change. You can ask for custom fonts, and under the hood the agent now uses the official Android CLI to scaffold the project and run Gradle builds.

When you want the app on a physical phone, Google AI Studio can set up a Play account from the publish panel and send the app to your personal Google Play library. The studio builds and signs the Android App Bundle for you. That is a private library on your account, not a public listing on the Play Store. If you later want other people to find the app, the usual store review and listing work still sit ahead of you.

Google says the features are rolling out in AI Studio today. To try them, you open AI Studio Build, choose the Android chip, and describe the app.

## What to check before you call it production-ready

Google uses the phrase "production-ready," but the checklist is still yours. Read the Security Rules the agent wrote. Confirm that sign-in really isolates user data. If the app will take payments or send email, that path is not what this launch is about. A personal Play library is a convenient way to test on a phone; it is not the same as a release.

If you are assembling the app with AI tools and the last mile is sign-in, data access, or a store build that you can actually ship, we help fix and launch products like that. You can start on our [services page](https://inqreon.com/en/).
