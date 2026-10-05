---
title: "Prospecting geospatial firms with my own algorithm, not LinkedIn's"
description: "How I replaced a day of LinkedIn searching with a search I control: the fit questions I ask of a geospatial firm, and the rules that keep outreach honest."
date: "2026-10-05"
slug: "prospecting-geospatial-firms-with-my-own-algorithm-instead"
coverImage: "/blog/prospecting-geospatial-firms-with-my-own-algorithm-instead/cover.svg"
author: "victor-marotta"
tags:
  - "geospatial industry"
  - "open source gis"
  - "prospecting"
  - "workflow"
  - "automation"
---

For years, prospecting meant a day on LinkedIn. I scrolled through shared connections, followed whatever LinkedIn's algorithm put in front of me, opened company pages and tried to guess who might need a geospatial software house. When I sat down and committed to it, it took a whole day.

In a small firm a lot of work happens, and that day was rarely there to spare. So prospecting happened when I could fit it in, not every week. I suspect most people who run a small survey, mapping or GIS firm and do their own selling know this pattern.

There's a second problem besides the time. LinkedIn's algorithm works for LinkedIn. It shows me people near people I already know, which is a strange way to find a mapping company in a country I've never worked in that could actually hire us.

So I built my own. It is the sales module of the assistant daemon that already runs my timesheets. I've been running it for two weeks and doing real outreach with it for one. This post is a note on how it works and what I've learned, not a success story yet.

## My own algorithm

The search is set by country and by the kind of firm. Countries are weighted by World Bank income tier, because some markets can pay a software house's rates and others mostly can't. It's a soft weight, not a filter: a firm that fits well still comes through from anywhere. Before, the rubric gave a flat bonus to anything outside Brazil, so a firm in Kenya and a firm in Sweden scored the same. That was a nice gesture towards diversity and useless for paying the bills.

Each firm found is then enriched: its site, its people and its work get researched. That runs against a weekly budget on my Claude subscription rather than a fixed daily count. When the week is nearly over and capacity is left unused, a burst mode spends it on finding more firms. When I want more suggestions right away, there's a button for it.

The result, in the only words I trust on this: practically every company it has found is one I wouldn't have found myself. I can tell it to favour certain kinds of firm and certain countries, which LinkedIn will never do for me. It's like having your own algorithm working in your favour.

## Fitting the firm to Territorial

Finding geospatial firms is the easy part. The real work is deciding whether a firm could actually hire us, and the questions that decide it only exist in this market:

- **Do they have an in-house software team, and how big is it?** A survey or mapping firm with no developers needs something different from one with an engineering department.
- **What would we be doing for them: product development or consultancy?** Building their product is one conversation. Working alongside a team that already builds it is another.
- **Do they already run something in our stack?** A firm that already runs PostGIS, GeoServer, MapLibre or point-cloud tooling has already made choices we can work with.
- **Do they work with Esri products or open source?** In geospatial this is often the line that decides the whole conversation. A pitch that ignores it is a pitch to the wrong firm.

The answers don't just filter firms. They shape the pitch. The assistant doesn't only find the company. It fits the company to Territorial, drives the pitch and picks who to write to: the CTO first, then the CEO, then the cartography or technical director. A firm only reaches my list once that person has both an email and a LinkedIn profile, because a contact I can't reach is just trivia.

The other side of the fit is what Territorial can actually do, and that isn't a static list either. The assistant learns it from my own activity: timesheets, repositories, what I write. If I start doing Kubernetes work, Kubernetes becomes part of the fit. That learning deserves its own post, and it'll get one.

## Geospatial websites are nearly always stale

This was the lesson that cost the most. Geospatial firms' websites are nearly always out of date. Services pages, project lists, the software they say they use. My first drafts were anchored on whatever the enrichment had scraped, so they risked opening with a claim that stopped being true years ago. They also read like nobody in particular had written them.

A stale site doesn't make the pitch fail. It just means being more careful. So there is now a facts rule: a draft may only state what comes from the firm's or the contact's own words in the last twelve months, or from a page checked live that same day. Each draft lists the facts it uses and whether each one was checked live, so I can see what I'm about to put my name to.

## A minute per outreach

This is what changed my week. One outreach now takes me about a minute: I read the briefing on the company, then review a draft that is already in Gmail, written in my own voice. I keep two tabs open, review, send.

Most drafts need small adjustments. I do those mostly by teaching the assistant my voice. Every email I send is compared with the draft it came from, and the differences become rules about how I write. First emails follow the shape mine already had: the situation, the problem as a question, the outcome, one question at the end, 150 to 220 words, plus a LinkedIn note sent the same day. It's still a work in progress, but it's been giving good things back.

Two more things keep it honest, and I learned both by getting them wrong:

- **Conversations are tracked by Gmail thread, not by address.** People write back from a different address than the one you wrote to. Track by sender and the reply ends up under nobody. Attaching emails by hand isn't safe either. I once had to check a day's attachments against the real mailbox after putting several emails on the wrong companies.
- **A reply shows up on Today the moment it arrives.** At first, replies only appeared once the reminder to answer them was due, two business days later. So the one email that most needed a fast answer was the one the system hid from me. Now a reply appears at once, with a draft answer ready.

## Where it stands

Two weeks of running, one week of real outreach. So far there have been a lot of replies and a few meetings. I have no numbers yet on how many of those turn into real business, and I won't pretend otherwise. I'll check again in six months.

If you run a small geospatial firm and do your own selling, the machinery is the least portable part of this. What's portable are the questions: does this firm have a software team, would we build or advise, are they on our stack, Esri or open source. Then a rule that every claim you make about a firm comes from its own recent words or a page you checked today. Asking those questions is what I already did by instinct on a good LinkedIn day. Now I have them asked every week, about firms I'd never have reached, and the day I couldn't spare has become a minute I can.
