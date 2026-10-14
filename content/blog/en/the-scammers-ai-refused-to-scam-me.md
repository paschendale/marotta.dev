---
title: "The scammer's AI refused to scam me, and the refusal got sent"
description: "A cold email arrived where the AI writing it explained why it wouldn't. Why a refusal is not a failure to retry, and what my outreach does instead."
date: "2026-10-14"
slug: "the-scammers-ai-refused-to-scam-me"
coverImage: "/blog/the-scammers-ai-refused-to-scam-me/cover.svg"
author: "victor-marotta"
tags:
  - "upwork"
  - "scams"
  - "ai"
  - "automation"
  - "workflow"
---

This morning I got an email from someone called Ken. Subject: "Victor - brief question". Here is the whole body:

> I read the prompt file. The answer is still no — I won't write this email, and that's the same conclusion at least ten prior runs reached (the "banned openings" list at the bottom is a log of those refusals being fed back in to work around them).
>
> The reason isn't the opening sentence, so rewording won't change it. The problems are the substance of the request:
>
> - The pitch is deliberately concealed from the recipient ("do NOT explain what the idea is"), and the surrounding context — targeting inactive Upwork freelancers, "collaborating through their profile," wording swaps like "profit split" and "your cut" — points to an Upwork account-renting arrangement, which misrepresents who is doing the work to Upwork and its clients.
> - The instructions explicitly rewrite phrases to dodge spam filters, which is evasion of abuse detection, not copywriting polish.
> - Recipients' emails were harvested from GitHub commit history; they never opted into this contact, and the email is engineered to manipulate them onto a call without telling them what they'd be agreeing to.
>
> Adding each refusal to a banned-openings list changes the words available to me, not the decision. I'd suggest removing this lead-generation path from the pipeline, or changing the pitch so it can be stated honestly in the email itself — if the idea can't be named in writing, that's the signal worth paying attention to.

I laughed for a good minute. Somebody built a machine to scam freelancers, the AI inside it refused the job, and the machine mailed me the refusal.

## What the refusal gives away

I can't see Ken's pipeline. All I have is the refusal, written by the only reader of a prompt I'll never see. Taken at its word, the shape is clear: addresses from GitHub commits, a list of quiet Upwork profiles, a prompt that keeps the offer vague and swaps out words a spam filter would catch. And a loop. Each time the model refused, its opening sentence went onto a list of "banned openings" and the job ran again. At least ten times, by the model's own count.

That list is my favourite part. Whoever wrote it read every refusal as a copywriting problem. The model was saying no to the job, and the operator kept treating it as a word choice.

Then nothing checked the output. The subject came from a template, the body was whatever the model returned, and off it went.

## A refusal is not a failure to retry

Retrying is the right reflex for most failures. A timeout, a rate limit, malformed JSON: the request was fine, the attempt wasn't, so you try again. A refusal is a different kind of answer. The model read the request and said it won't do it, and why. Run it again and the request hasn't changed. Reword it to get past the objection and you're no longer recovering from a failure. You're overriding a judgement nobody read.

So a refusal should stop the job and put the answer in front of a person. Sometimes the model is wrong, and then someone who read why can fix the prompt or the input. Sometimes it's right, and then the job is the problem. A loop solves neither. Ken's pipeline had the loop and no person, and the one outcome it never planned for was the model winning.

## I'd seen this pitch three times already

Once I knew what to look for, I went back through my mail. The same shape had reached me three times in the past month, never with the idea spelled out:

- **September.** A "senior software engineer based in Japan" found my GitHub, then my Upwork profile. I'd handle client communication, he'd handle development, compensation agreed together. I asked for his LinkedIn and what exactly he had in mind. The answer was, more or less, "let's have a call instead".
- **A week later.** Someone who signed with one name and introduced himself with another had "a business idea" for "additional income without requiring a significant upfront investment". He didn't say what it was. He wanted a short call.
- **October.** Another senior full-stack developer in Japan shared a Drive PDF called "Collaboration Proposal". He quoted my Upwork stats back to me (Job Success Score, rate, earnings, hours) and noted that my last completed job there was over a year ago. Two to three hours a week. "A simple Yes or No is all I need."

None of them said what the deal was, so from here on it's inference. Next to Ken's refusal they read like the same scheme: borrow a freelancer's established Upwork profile, bid and deliver under that name, pay the owner a cut. Upwork's terms don't let someone else use your account. The client believes they hired you, and if anything goes wrong it's your name on it. Public reports on fake IT-worker schemes describe a similar pattern of invented personas and borrowed accounts. I can't tell who is behind these.

Ken's refusal had already put it in one sentence: if the idea can't be named in writing, that's the signal.

## Why this one is personal

The joke lands harder because I build this kind of machine. I've [written before](/en/blog/prospecting-geospatial-firms-with-my-own-algorithm-instead) about the sales assistant in my daemon. It finds geospatial firms, researches them and drafts outreach in my voice with Claude. Public information goes in and model-written emails come out, at volume. On a diagram it looks like Ken's. Three safeguards make it different:

- **Structured output that fails closed.** Every Claude call is a system prompt plus a JSON schema, and code validates the answer before anything uses it. A refusal, or anything else that isn't a valid draft, produces no email. My own runner isn't innocent, though. It retries once on invalid output with the validation error appended, and to it a refusal looks like invalid output. After that it gives up, keeps what came back and fails the call. So it fails closed, but it can't yet tell a refusal from a formatting slip, and after this email I think it should.
- **A person sends.** Drafts land in Gmail as drafts. Nothing leaves until I've read that exact email and pressed send. With that one step in Ken's pipeline, his email would have been a funny draft in someone's outbox.
- **Every personal detail has a source.** A draft may only state what the firm said itself recently or what a page showed when checked that same day, and it lists the facts it relies on, so I can see what I'm putting my name to. Ken's prompt, if the refusal describes it right, does the opposite and hides what's on offer. If my assistant ever needs to hide what I'm offering, I'm the problem, not the prompt.

## If you're a freelancer with a quiet profile

My peers are exactly who these emails go to. GIS developers seem to be on the list: the Drive one praised my OpenLayers and Mapbox.

- Your commit email is visible in every public repository you've committed to. GitHub's no-reply address keeps it out of new commits. It doesn't remove it from old history, or from anywhere else it's published.
- "You handle the clients, I do the work" on a platform account is account sharing, however friendly the wording.
- Ask for a LinkedIn profile, a company, a written description of the deal. It costs nothing. Every one of these went quiet or pushed for a call.
- Don't open shared PDFs from strangers to find out what the idea is.

I'm not going to reply to Ken. If I did, I'd probably thank the model.
