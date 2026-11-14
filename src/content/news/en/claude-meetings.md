---
title: "Claude Meetings is in beta: it can join your Google Meet"
slug: "claude-meetings"
date: 2026-11-15
lang: en
description: "Anthropic’s Claude Meetings beta lets Team and Enterprise users add Claude to a Google Meet call as a visible participant that takes notes and starts the work live."
image: "/images/news/claude-meetings.png"
imageAlt: "A calm video-call grid of abstract faceless avatars around a shared whiteboard, with one distinct luminous non-human participant."
sources:
  - title: "Introducing Claude Meetings, now in beta"
    url: "https://claude.com/resources/articles/claude-meetings"
  - title: "Claude release notes, November 12, 2026"
    url: "https://support.claude.com/en/articles/12138966-release-notes"
  - title: "Anthropic launches Claude Meetings to turn workplace discussions into plans and tasks"
    url: "https://techcrunch.com/2026/11/10/anthropic-launches-claude-meetings-to-turn-workplace-discussions-into-plans-and-tasks/"
translationKey: "claude-meetings"
tags:
  - news
  - anthropic
  - claude
cta: scan
draft: false
---

Anthropic is rolling out Claude Meetings in beta: Claude can join a video call as a visible participant, follow the conversation, and start the work while people are still talking. For teams that already brief an AI tool after a call, the change is the timing. Notes, action items, and first drafts can appear during the meeting, not only once everyone has hung up.

The dates should not be collapsed into one. TechCrunch reported Anthropic's announcement of Claude Meetings, along with other workplace features, on November 10, 2026. Anthropic's own official article does not show a clear date on the page. The company's release notes list the beta rollout as November 12, 2026, in Claude and Claude Desktop, on Team and Enterprise plans. This article treats November 10 as the press announcement and November 12 as the date Anthropic gives for the rollout.

## What Claude can do on the call, and what it cannot yet

According to Anthropic, teammates can ask Claude questions out loud or in the meeting chat. By default, Claude answers in writing. It can use a person's connected tools, but only with that person's permission: it asks the first time, and a yes applies going forward. For now, when someone asks out loud, Claude asks each time to confirm who is speaking. An answer posted in the call chat is visible to everyone on the call.

Claude can also work live on documents, whiteboards, or other artifacts while people on the invite edit them. The November 12 release notes add slides to that list of artifacts. Claude writes the notes and action items, so no one on the call has to be the designated note-taker. Anthropic's own example is a team planning a customer event: someone asks Claude to start a doc, later to look up last year's figures (after approval), then to put a timeline on a whiteboard. Before the call ends, someone can ask for a recap. After the meeting, the notes, action items, and anything Claude built sit on a dedicated meeting page in claude.ai. People from the organization who were on the invite can see and edit that page, and it can be shared with others in the organization. You can later ask Claude about meetings you were part of, or add Claude to a future call from the calendar in claude.ai.

Two limits matter if you hoped to use this tomorrow. First, it is a beta on Team and Enterprise plans only. On Team plans, inviting Claude is on by default, and an admin can turn it off. On Enterprise plans, an admin turns it on for all or part of the organization. During the beta it is not available to some organizations, including those with zero data retention (ZDR), a HIPAA-ready configuration, or customer-managed encryption keys (CMEK). Second, support is currently available for Google Meet only. Anthropic says other video conferencing platforms are coming soon. Claude joins when someone adds it or has auto-join turned on.

During the beta, Anthropic says notes and transcripts are free on Team and Enterprise plans. So are Claude's answers in the call, unless an answer uses one of your connected tools, which then counts toward your plan's usage. The docs, whiteboards, and other artifacts Claude makes in a call are free through February 10, 2027.

## Who gets transcribed, and what remains after the call

When Claude joins, it appears as a participant and posts a notice in the call chat. It saves a transcript, a summary, and screen descriptions, not audio. Anthropic asks teams to make sure everyone on the call is comfortable being transcribed before they add Claude or turn on auto-join.

By default, Claude stays out of calls when someone from outside the organization is invited, and it leaves if an outsider joins partway through. An admin can allow Claude on calls with outside guests. On those calls, Claude still posts its notice in the chat but does not reply there; what guests say is included in the notes and transcript. Anthropic also says it is working with partners including Gong, Attention, Granola, Fireflies.ai, Otter, and Plaud so teams will soon be able to send a meeting transcript to tools they already use. That is a plan, not something the announcement describes as available today.

A live brief, a whiteboard, and a first doc can shorten the path from conversation to the next task. They do not, by themselves, get a product into production. Login, payments, and deploy still have to hold up for real users. If after the call you still have a nearly finished site or app built in Lovable, Bolt, Cursor, or v0, we fix and launch projects like that. You can start with a scan on our [services page](https://inqreon.com/en/).
