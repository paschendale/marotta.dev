---
title: "The scammer's AI refused to scam me, and the refusal got sent"
description: "A cold email arrived where the AI writing it explained why it wouldn't. What it says about the Upwork scam, and about building outreach machines."
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

I laughed for a good minute. Somebody built a machine to scam freelancers, the AI inside it refused the job, and the machine mailed me the refusal. The scam explained itself to its target.

## What the machine looks like from the inside

Read it like an incident report and the whole pipeline is there.

Someone scrapes GitHub for commit emails, matches the names to Upwork profiles and keeps the freelancers whose profiles have gone quiet. A prompt file asks a model to write a friendly, vague email that ends in a call. The prompt is careful never to say what the deal is, and it swaps the words that would trip a spam filter. When the model refuses, a script takes the refusal's first sentence and adds it to a list of "banned openings", then runs it again. At least ten times, by the model's own count.

That last part is my favourite. Whoever wrote it read every refusal as a copywriting problem. If the model starts with "I can't help with this", ban that sentence and try again. The model was saying no to the job, and the operator kept treating it as a word choice.

Then nothing checked the output before it went out. The subject came from a template, the body was whatever the model returned, and off it went.

## I'd seen this scam three times already

Once I knew what to look for, I went back through my mail. The same pitch had reached me three times in the past month, never with the idea spelled out.

- In September, a "senior software engineer based in Japan" found my GitHub profile, "and later also looked at your Upwork profile". He was good at the technical side but found overseas clients hard. His proposal: I handle client communication, he handles development, compensation agreed together. I replied asking for his LinkedIn, how he found me and what exactly he had in mind. The answer was, more or less, "let's have a call instead".
- A week later, someone who signed off with one name and introduced himself with another had "a business idea" that could "generate additional income without requiring a significant upfront investment". He didn't say what it was. He wanted a short call.
- In October, another senior full-stack developer in Japan shared a Drive PDF called "Collaboration Proposal". The message quoted my Upwork stats back to me (Job Success Score, rate, earnings, hours) and noted that my last completed job there was over a year ago. Two to three hours a week. "A simple Yes or No is all I need."

Read them next to Ken's refusal and they fit together. They want freelancers with good Upwork profiles that have gone quiet. You lend them your name and the account's history, they bid and deliver as you, and you get a cut. Upwork calls that account sharing and bans for it. The client thinks they hired you, and if anything goes wrong it's your name on it. Public reports on fake IT-worker schemes describe exactly this pattern, with invented personas and borrowed real accounts. I can't tell who is behind these ones, but the pattern matches.

What gives all three away is what the AI put in one sentence: if the idea can't be named in writing, that's the signal.

## Why this one is personal

What made me laugh even more is that I build this kind of machine myself.

I've [written before](/en/blog/prospecting-geospatial-firms-with-my-own-algorithm-instead) about the sales assistant in my daemon. It finds geospatial firms, researches them and drafts outreach in my voice with Claude. So it scrapes public information, a model writes the emails, and they go out at scale. On paper it's the same architecture as Ken's. The difference is three rules I had already written down for other reasons, and Ken's pipeline breaks all three.

- **The model's answer is data, and code checks it.** Every Claude call in my daemon is a system prompt plus a JSON schema. A draft comes back as structured fields, and the code validates it before anything else happens. A refusal doesn't fit the schema, so it never becomes an email. Ken's pipeline took whatever text came back and used it as the body.
- **A person sends.** My drafts land in Gmail as drafts. Nothing goes out until I read that exact email and press send. With that step, the email that told me the scam would have been a funny draft in someone's outbox.
- **Every claim has a source.** My drafts may only state what the firm said itself recently or what a page shows when checked live that day, and each draft lists the facts it relies on. Ken's prompt goes the other way: it tells the model to hide what's actually being offered. If my assistant ever needs to hide what I'm offering, I'm the problem, not the prompt.

There's a quieter lesson in the "banned openings" list too. When a model keeps refusing, the useful question is whether it's right. Ken's operator asked how to get around it instead, and this time the answer arrived in my inbox.

## If you're a freelancer with a quiet profile

Some practical notes, since my peers are exactly who these emails go to. GIS developers seem to be on the list: the Drive one praised my OpenLayers and Mapbox.

- Your commit email is public. If it's your main address, expect this kind of mail. GitHub's no-reply address stops it for new commits.
- "You handle the clients, I do the work" on a platform account is account sharing, however friendly the wording.
- Asking for a LinkedIn profile, a company or a written description of the deal costs you nothing. Every one of these went quiet or pushed for a call.
- Don't open shared PDFs from strangers to find out what the idea is.

I'm not going to reply to Ken. If I did, I'd probably thank the model.
