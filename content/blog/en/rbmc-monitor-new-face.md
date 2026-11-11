---
title: "The RBMC monitor has a new face"
description: "The RBMC station map at rbmc.marotta.dev was rebuilt: clearer states, a station panel, light and dark, and no more alarms for a five-minute blip."
date: "2026-11-30"
slug: "rbmc-monitor-new-face"
coverImage: "/blog/rbmc-monitor-new-face/cover.png"
author: "victor-marotta"
tags:
  - "rbmc"
  - "gnss"
  - "surveying"
  - "ntrip"
  - "open-source"
---

In September I wrote about [monitoring RBMC](/en/blog/rbmc-status-map-for-surveyors): Sentinel watching all 157 stations of IBGE's continuous GNSS network through the RBMC-IP NTRIP caster, with a map anyone can open. Since then, the map has found its people. Surveyors loved it. They open it before going to the field to see whether the NTRIP session they planned is going to work, and when their station is down they get in touch with IBGE to get it back on. On the IBGE side, adoption has been slower; it is still early there.

The monitor now has a new face. Same address, [rbmc.marotta.dev](https://rbmc.marotta.dev), same stations, rebuilt from the ground up.

![The RBMC station map: 157 stations colored and shaped by state](/blog/rbmc-monitor-new-face/rbmc-map-dark.png)

## The map comes first

Open the address and the map is the first thing you see, with the full list of stations below it. Each station is drawn with a shape and a color:

- a **green disc** is a station that is Operational;
- a **yellow triangle** is Degraded: it has been failing for less than an hour, or it has just come back and is still proving itself;
- a **red square** is in Outage;
- a hollow ring means no data yet, and a short bar means the station is paused.

The shapes are there so nobody has to tell red from green to read the map: it works for color-blind surveyors and on a phone in full sun. Under the map, a line counts the stations in each state. The day I am writing this, 11 November 2026, it reads 157 stations: 112 Operational, 43 in Outage, 2 Degraded.

## Click a station

Clicking a station opens a panel with what a surveyor needs before going out: its state, its uptime over the last 30 days, the mountpoints the caster is listing for it right now (for example `VICO0`, RTCM 3.2), and a link to its full history.

![A station clicked on the map: state, 30-day uptime, live mountpoints and a link to its history](/blog/rbmc-monitor-new-face/rbmc-panel.png)

The history is the part I find most useful. It shows the station over the last 24 hours, 7 days or 30 days, so you can tell a station that dropped once last night from one that has been down since last week. That second kind is the one worth an e-mail to IBGE, and now you can attach the evidence.

The page follows your phone or computer's light or dark setting, has a switch for times in UTC or in your local time, and refreshes itself every minute.

![The RBMC map on a phone, in light mode](/blog/rbmc-monitor-new-face/rbmc-mobile-light.png)

## A blip is not an outage

This is the change I care about most, and it was my own call. Stations fail in blips. The partner's internet drops for ten minutes, the power flickers, a router restarts. That is not a problem for anyone planning a survey, and it should not paint the map red.

So the monitor now uses a one-hour window. A station is only in Outage after it has been failing for a full hour. When it comes back, it stays Degraded until it has been streaming for a full hour, and only then turns green again. In between, a yellow triangle says "worth a look", not "don't count on it". A red square now means something: this station has been down long enough to matter for your session.

## Under the hood

The monitor is still [Sentinel](https://github.com/territorial-dev/sentinel), the open-source tool I built at Territorial, and it was rebranded and rebuilt this month. The RBMC part used to live in a branch that was falling behind; it is now a proper fork, [github.com/paschendale/sentinel-rbmc](https://github.com/paschendale/sentinel-rbmc), that takes every new Sentinel release with a click.

What stayed the same:

- The station list still comes from the shapefile exported from IBGE's geodetic database (BDG). A new station gets a check of its own; one that leaves the list gets its check paused, never deleted, so its history is there if it comes back.
- Each station is checked every 15 minutes against the caster's sourcetable, and the sourcetable is cached for 60 seconds, so watching 157 stations still costs IBGE's server one request a minute.
- Everything shown is public data: what the caster lists and how long each station has been listing.

## What it's for

For surveyors, it is a way to plan with your eyes open: check the base you will rely on before you drive out, and see whether it is the kind of station that drops for a few minutes or the kind that has been off for days. When it is the second kind, the history is the conversation starter with IBGE.

For IBGE, it is the same thing from the other side: a picture of the network that does not wait for anyone to process the data weeks later. That use is still growing, and I hope the new face helps.

If you use it, tell me what is missing. The map is at [rbmc.marotta.dev](https://rbmc.marotta.dev).
