---
title: "Hello. I'm Victor, and this is what I do."
description: "A surveying engineer who ended up writing software: how I got from field surveys to orchestration control planes, and what this blog is for."
date: "2026-09-14"
tags: [about, surveying, gis, software]
---

I trained as a surveying and cartographic engineer. For the first years of my career I did what that implies: topographic surveys, GNSS processing, cadastral field campaigns in small Brazilian municipalities, the occasional subdivision project. I liked it. I still like it. But every project ended the same way, with a pile of data that somebody needed to see on a map, and that somebody never had the software to open it.

So I started building the software.

## From cadastre to code

The first real system I wrote was a framework for publishing multipurpose cadastre data on the web, during my research years at the Universidade Federal de Viçosa. It was ugly and it worked, and municipalities that had never had a map of their own parcels suddenly had one in a browser. That experience set the pattern for everything since: the interesting problem is rarely the algorithm. It is getting spatial data from wherever it was produced to whoever needs it, reliably, without a GIS specialist standing in between.

I went on to lead cadastral projects at engineering companies, then to lead GIS product development at Topocart, where I was the technical lead behind Geo360 LADM, the first land administration system in Brazil built on the ISO 19152 standard. Along the way I finished a master's in civil engineering focused on spatial databases and GIS, and published on cadastral data modelling and PostGIS-based land registries.

## Territorial

In 2024 I founded [Territorial](https://territorial.dev), a small engineering consultancy. The idea is simple: companies whose work depends on spatial data usually need software that off-the-shelf tools do not provide, and they need someone who understands both the geodesy and the deployment. That is the gap I fill.

Through Territorial I lead a team of developers, and the role in each engagement runs from architecture and development to DevOps, consulting and technical leadership. Our clients include a Swedish forestry-tech company, a hydrographic survey firm and an Australian weather-data platform. In parallel, I work at IBGE, Brazil's national statistics and mapping institute, as a Geographic Information Technologist.

## The tools I ended up writing

A recurring theme: I keep needing infrastructure that does not exist yet, so I write it.

- [Ordo](/en/projects/ordo) is an orchestration control plane that sits above n8n and gives multi-step processing jobs the guarantees workflow automation alone cannot: validated contracts between steps, artifacts as first-class state, a clear answer to "what happened to job 412".
- [Sentinel](/en/projects/sentinel) is a synthetic-monitoring platform where tests are JavaScript functions instead of YAML. It watches every platform I run and, publicly, IBGE's national GNSS network.
- Smaller things too: the [billing system](/en/projects/territorial-invoices) that runs Territorial, a [Discord assistant](/en/projects/territorial-assistant) that turns my git history into timesheets, a [personal ledger](/en/projects/finances) on nothing but PostgreSQL and PostgREST.

## What this blog is for

I intend to write about the intersection I live in: surveying and geodesy on one side, spatial databases and software engineering on the other. Expect notes on point-cloud pipelines, PostGIS, orchestration, monitoring, cadastral data models, and the mistakes I made getting them into production. Some posts will be short lessons; some will be longer stories with a beginning, an investigation and an ending.

If any of it is useful, or if you have a problem that sounds like the ones above, [get in touch](mailto:victor@marotta.dev).
