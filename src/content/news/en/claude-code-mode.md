---
title: "Claude Code adds experimental Code Mode for batched tool calls"
slug: "claude-code-mode"
date: 2026-11-18
lang: en
description: "On Nov. 12, Claude Code added experimental Code Mode: Claude writes JavaScript that can run several tool calls in one step. It is off by default and terminal-only."
image: "/images/news/claude-code-mode.webp"
imageAlt: "A calm editorial illustration of a single abstract script card launching several small tool marks in one motion, no logos or readable text."
sources:
  - title: "Run tool calls from code with Code Mode (Claude Code docs)"
    url: "https://code.claude.com/docs/en/code-mode"
  - title: "Claude Code changelog"
    url: "https://code.claude.com/docs/en/changelog"
translationKey: "claude-code-mode"
tags:
  - news
  - anthropic
  - claude
cta: scan
draft: false
---

On Nov. 12, Claude Code gained an experimental feature called Code Mode, in version 2.1.323. Instead of asking for each tool call, such as Bash, Read, or Edit, and reading the result before it decides what to do next, Claude writes a piece of JavaScript that makes those calls, and Claude Code runs the script in your session. One script can run commands in parallel, feed one result into the next call, and return only the output Claude needs to read.

The mode is off by default. Anthropic's docs say it may change or be removed in any release. You turn it on by setting the environment variable `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` to `1`, then confirming the first time Claude Code asks. After a restart, the session should show that Code Mode (experimental) is on. In the conversation you still see the tool calls, such as a diff; the JavaScript itself is behind Ctrl+O, in a collapsed Code row.

## Who can use it, and who cannot

The requirements are tighter than a usual Claude Code update. You need v2.1.323 or later, the native build, and an interactive `claude` session in a terminal. It works with Claude Opus 5.5, Sonnet 5.5, Haiku 5.5, or Fable 5.2, on a Claude subscription or Console account. It does not work with `-p`, the Agent SDK, the VS Code panel, the Desktop app, or cloud sessions. You also cannot use it through a gateway, Amazon Bedrock, Claude on AWS, Google Cloud, or Microsoft Foundry, or if your organization uses the HIPAA configuration or zero data retention. On Windows, Git for Windows has to be installed. Some settings, including an API key helper or telemetry turned off, also block it from starting.

Anthropic suggests trying it on work that takes many related tool calls: the same change across many files, a search you want to filter before Claude reads the hits, or several independent commands that can run at once. A script that cannot run in the background stops after ten minutes, and you wait while it runs. You can resume a Code Mode session only in the terminal, with Code Mode still on. Remote Control, Claude in Chrome, and computer use are unavailable in this mode, and you cannot move the session to the Desktop app or into the background.

## A useful experiment, if you accept the limits

If you already live in the Claude Code terminal and your account qualifies, a bounded test is enough: pick a repository you know and ask Claude to do something with many small steps, then open the transcript and read the script it wrote. Leave it off for everyday chat in VS Code. Organizations that do not want the experiment can set the same variable to `0` in managed settings.

Faster tool calls do not replace a review of the diff, and they do not ship sign-in or payments. If the project started in Cursor, Claude Code, Lovable, Bolt, or v0, that last mile is still yours.

If you want help getting an AI-built site or app through that last stretch, you can start on our [services page](https://inqreon.com/en/).
