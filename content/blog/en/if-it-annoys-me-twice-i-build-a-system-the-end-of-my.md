---
title: "If it annoys me twice, I build a system: the end of my timesheets"
description: "My timesheets took almost 30 minutes a day in Excel. Now ActivityWatch, my Claude Code conversations and Discord write them in seconds."
date: "2026-10-05"
slug: "if-it-annoys-me-twice-i-build-a-system-the-end-of-my"
coverImage: "/blog/if-it-annoys-me-twice-i-build-a-system-the-end-of-my/cover.svg"
author: "victor-marotta"
tags:
  - "automation"
  - "activitywatch"
  - "claude-code"
  - "timesheets"
  - "workflow"
---

Until last month my timesheets lived in good old Excel. Every day I spent almost 30 minutes making sure the descriptions lined up with what I had actually done. Some weeks I fell behind and spent Friday rebuilding the whole week. It was awful.

Now it takes a few seconds, and the result is better than what I used to produce by hand. The descriptions describe the work, and the invoices are more transparent. No client has ever questioned a line, but I always worried one would. What if someone asks what that Tuesday afternoon was? Clearer lines are prevention, and I sleep better.

What got me here is a habit more than a tool: if something annoys me twice, I'll probably build a system around it. Timesheets annoyed me far more than twice before I gave in, which says something about my patience and nothing good about my judgement.

## A parts list nobody designed to fit

The system is a daemon on my Mac, built from things that were never meant to meet:

- **ActivityWatch**, an open-source time tracker that records every window I focus and for how long.
- **The transcripts of my Claude Code sessions**, which pile up on disk because I code, prototype and argue about implementations with it all day.
- **Claude, run from the command line** (`claude -p`) under my own subscription with structured output, as a component rather than a chat.
- **A Discord server**, which turns out to be an excellent review desk.
- **Territorial Invoices**, our own billing system, at the end of the line.

None of these knows the others exist. The daemon is the glue.

## How the chain runs

This is the direction, not a recipe.

Activity comes in from ActivityWatch and gets compacted into blocks. Rules and a cache settle whatever they can without asking anyone: this repository belongs to that client, that site is internal. The Claude Code conversations go next to the blocks and say what was being built, prototyped or decided. Whatever is still unclear goes to Claude. It sees the whole day at once and returns the threads of work in it: what each one was, which repositories and windows belong to it, and what was done when.

Claude has one job there, and it doesn't get the last word. It never creates time. Code checks its answer against the activity, and my rules win over its guesses. Then the day is grouped by client, written as lines a person can read, and posted to a Discord thread. I read it and correct anything that's off in plain words ("that afternoon was the internal tool, not client work"). Then I approve. Only what I approve reaches invoicing.

It runs on a subscription rather than a metered API, so the hard part of the scheduling wasn't the timesheets. It was sharing capacity with myself. The daemon reads my usage, waits for moments when I'm not using Claude myself, and stays inside the limits so it never eats into what I need for real work. Later I added a burst mode for the end of the week, when there's capacity left that would otherwise go unused. The sales assistant spends it finding leads.

## The conversations are the clever bit

A window title is a poor witness. It says "editor", "terminal", "browser", "localhost". Eight hours of that proves I was at the computer, which my chair already knew.

A conversation says what was being solved and why. Take "the reprojection step drops features near the antimeridian, find out where" (an invented example, but the shape is right). Put that next to two hours of editor and terminal, and the block stops being time and becomes work: *investigated features lost near the antimeridian during reprojection and fixed the clipping step*. A client can read that line without having to ask me anything.

Most people haven't built this part, and it's what made the descriptions better than mine. When I wrote them by hand at the end of the day, I remembered the last thing I'd done and a vague shape of the morning. The transcripts remember everything, dead ends included.

## What it took to trust it

Getting it to work was the fun part. Getting it to be right took longer. The bugs are supporting characters here, so they get a sentence or two each.

- **Corrections go back to the raw record.** Early on, when I fixed an attribution in Discord, the fix stayed on the summary and never flowed back to the activity underneath, so the same stretch of work could show up twice. Now an edit is written onto the activity blocks and the day is rebuilt from them. That's the surveyor in me: you adjust the observations, you never hand-edit the product.
- **It attributes by repository, not by site.** It had learned that one code-hosting site meant one particular client, but every client I have lives on that same platform. Now the cache is keyed by repository, account or project.
- **It approves exactly what I saw.** If a day changes after it was posted, the new version is posted and nothing is registered until I approve that one.
- **The raw record is the safety net.** When my Mac sat on the wrong network for four days, the daemon went quiet. Once it reconnected, it rebuilt those days from the raw activity.

And it keeps getting smarter as I fix mistakes. My favourite detail is what happens when I correct the same attribution on a second day: the review offers to turn it into a rule. The system picked up my habit. If it annoys me twice, it becomes a rule.

## The record becomes a source

Once you have a clean day-by-day record of what you actually did, using it only for invoices is a waste.

The same record now feeds a knowledge base and an editor that reads my work, keeps track of its lines and interviews me about what came of them. This post came out of one of those interviews. I've written before about doing the same with prospecting. That runs on the same daemon too, along with an assistant that scans Upwork jobs and a doctor that ships its own fixes when something breaks.

The core pieces (the Claude runner, the usage gate and the Discord bot) were also reused to stand up a completely different assistant in a single day: a Discord bot that turns course PDFs into study questions. When the plumbing is boring and solid, a new idea costs a day instead of a month.

## The habit, not the tool

None of this is a product, and I wouldn't tell anyone to copy it piece by piece. What I'd pass on is the habit. When something annoys you twice, look at what's lying around. A time tracker, a pile of transcripts, a chat app and a billing system don't look like a pipeline until you need them to be one.

My timesheets used to cost me almost 30 minutes a day and the occasional ruined Friday. Now they take a few seconds, the lines say what I did, and I no longer wonder what a client would think if they asked about one.
