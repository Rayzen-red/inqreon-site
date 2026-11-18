---
title: "Lovable drafts now copy your database, so tests stay off live data"
slug: "lovable-drafts-database"
date: 2026-11-18
lang: en
description: "As of Nov. 16, a Lovable draft on the built-in backend usually gets its own database with example data. Accepting still changes the live schema before you publish."
image: "/images/news/lovable-drafts.webp"
imageAlt: "Two abstract app copies side by side, one filled with example records and one left untouched, on a calm background, no logos or readable text."
sources:
  - title: "Now you can explore any idea in parallel without touching what's live (Lovable)"
    url: "https://lovable.dev/blog/introducing-drafts"
  - title: "Lovable changelog"
    url: "https://docs.lovable.dev/changelog"
  - title: "Explore changes with drafts (Lovable docs)"
    url: "https://docs.lovable.dev/features/drafts"
translationKey: "lovable-drafts"
tags:
  - news
  - lovable
  - database
cta: scan
draft: false
---

On Nov. 16, Lovable gave drafts their own database. If your project uses the built-in backend, a new draft usually comes with a full copy of the app, including a backend filled with example data. You can add a field to a sign-up form, try a members-only page, or invent a booking flow, and the test records stay in the draft. The live app and its real customer rows stay put until you decide otherwise.

Drafts themselves are not new. Lovable added them in September as a way to try interface and copy changes in a separate chat and preview. The catch was the data: early drafts shared the live database, so a fake booking typed during a test landed next to real ones. The November update is the part that was missing.

## How a draft works now

Open a project, click its name at the top of the editor, and choose New draft. Lovable makes a copy and opens it with its own chat and preview. You can keep several drafts at once and switch between them. They are available on every plan if you have edit access. Messages in a draft cost the same as in the main project; creating, accepting, or deleting a draft does not use credits.

When you like what you see, you hit Accept, then Publish. That order matters more than the blog post makes it sound. Accepting adds the new pages to your unpublished changes, so visitors still see the old screens until you publish. But changes to the database structure, file storage settings, and backend functions take effect in the live app as soon as the accept finishes. Until you publish, people are looking at the previous interface, which is already talking to the new tables, columns, and server functions.

The test data does not come along. Lovable's docs are clear: accepting never copies rows, test accounts, or files from a draft that has its own backend. Those records are deleted with the draft. That is the safety the November update actually buys you.

## Check the banner before you type anything

Not every draft gets its own backend. Lovable says the new behavior is rolling out gradually, so some drafts may still share the live database for now. A draft also shares the live backend if the project is connected to your own Supabase project, or if Lovable cannot copy the database structure.

The preview tells you which kind you have. If a banner says you are viewing example data, changes to records stay in the draft. If there is no banner, anything you add, edit, or delete changes the live app, and deleting the draft does not undo it.

Two other limits are easy to miss. Secrets and connected services always use their live values, even in a draft with its own backend. An API call you trigger from the draft is a real call, and an email your app sends through a connected service is a real email. Replies, such as a payment confirmation, go to the live app, not the draft, so a checkout tested in a draft never completes there. Built-in payments in a draft run in test mode and charge nothing. If you use your own Stripe account with a live key, the charge is real.

You also cannot turn on the built-in backend, payments, or email from inside a draft. Set those up in the main version first.

## Accept is the moment that counts

Lovable does not take a database backup when you accept a draft. Version history can restore your code and backend functions, but it does not restore the database. If a draft renames or removes a column the current live screens still use, the published app can break in the gap before you publish. The docs' advice is simple: export a copy of the database before you accept, and publish from the main version right after. If you need to undo a structure change later, you restore a daily backup, which also removes data added since that backup.

A shared preview link always shows the main version, never a draft. To let a client try a draft, you invite them to the project with edit access, which also lets them accept drafts. Agree on that before you send the invite.

If you have been putting off a schema change because you did not want test rows in production, try it in a draft this week, after you have checked for the example-data banner. If the banner is missing, do not type test data.

If your app was built with Lovable and you want help checking a draft or finishing payments and deploy before launch, we fix and launch AI-built sites. Start with a scan on our [services page](https://inqreon.com/en/).
