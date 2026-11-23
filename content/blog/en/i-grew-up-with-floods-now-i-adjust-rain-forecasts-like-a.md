---
title: "I grew up with floods; now I adjust forecasts like a survey surface"
description: "A surveyor from a flood town treats ECMWF's open rain forecasts as a model surface to adjust to control points. The first out-of-sample results are mixed."
date: "2026-11-23"
slug: "i-grew-up-with-floods-now-i-adjust-rain-forecasts-like-a"
coverImage: "/blog/i-grew-up-with-floods-now-i-adjust-rain-forecasts-like-a/cover.svg"
author: "victor-marotta"
tags:
  - "rain calibration"
  - "ecmwf"
  - "gridded data"
  - "survey adjustment"
  - "open data"
---

## Guidoval

I'm from Guidoval and Ubá, in the Zona da Mata of Minas Gerais, and I have lived with the fear of floods all my life. In Guidoval I went through many of them, 2008 and 2012 among them, and I saw how they broke the town. What I remember most clearly is waking in the middle of the night to help neighbours lift their things off the floor so they wouldn't lose everything. Then we lost everything anyway, because the rain was far beyond anything anyone could have expected. In 2012 the river rose more than 11 metres, the bridge into town was destroyed and about 6,000 people were cut off ([Estado de Minas](https://www.em.com.br/app/noticia/gerais/2012/06/21/interna_gerais,301631/ponte-de-guidoval-e-inaugurada-seis-meses-apos-cidade-ser-arrasada-pela-chuva.shtml)).

I don't live there any more. On 23–24 February this year the Zona da Mata flooded again. 73 people died, 8 of them in Ubá, where 174 mm fell in three and a half hours ([Wikipedia](https://pt.wikipedia.org/wiki/Enchentes_e_deslizamentos_na_Zona_da_Mata_Mineira_em_2026)). The news reached me through family and friends, and I was worried sick that the rain would come back.

## What changed in October

From the 20 October 2026 06Z run onwards, ECMWF began publishing its IFS forecasts at 0.1°, about 9 km, free under CC BY 4.0 ([ECMWF forum](https://forum.ecmwf.int/t/ecmwfs-9km-data-is-free-and-open-from-tuesday-20th-october/15459)). That is what set me going. I had spent the previous two years working on meteorology systems. My question was whether the things I know best (remote sensing, geoprocessing and self-hosted infrastructure) could give my region a better forecast, cheaply. The specification for Ara, the platform I built to find out, is dated 19 October.

Two resolutions are in play here, and they must not be confused. The forecasts in Ara's history are the files ECMWF published before October, at a native resolution of 0.25°. Ara regrids them onto its 0.1° analysis grid, which sits on MERGE's lattice, so forecast and observation share the same cells. Regridding puts them on the same cells; it adds no detail. A 0.25° field on a 0.1° grid still carries 0.25° information. Every number in this post comes from that history. The 9 km files start with the 20 October run, so they aren't in it yet.

Ara costs $0 beyond my electricity bill. It runs on my local dev box and Cloudflare's free tier, engineered to stay almost free for at least its first hundreds of users. That cost me one lesson: object storage bills by operation, and a Zarr history is a huge number of small objects. 852k of them moved off R2 to a self-hosted store, and R2 now keeps only what is served.

## A model surface and its control points

This is the frame I used, and any surveyor will know it. ECMWF's forecast on the 0.1° grid is the model surface. My control points are:

- MERGE's daily rain grid (rain gauges blended with satellite)
- SAMeT gridded temperature
- INMET and CEMADEN stations, read at their native cells with no interpolation

Every adjustment has to answer the same question: does the adjusted surface beat the unadjusted one on points it never saw?

Before you adjust anything to control, you check the control. SAMeT's day labels cover different 24-hour windows. The maximum temperature labelled day D is the 12Z day that ends on D+1. I measured that before building a single pair. Pair on the label and you compare the forecast with the wrong afternoon.

I tested MERGE against 4,126 INMET and CEMADEN gauges over 1.46 million station-days. It reads 10–15% under the gauges, near its own gauges and away from them alike, and it shows only half to two thirds of their 50 mm days. That is the limit of this control, and it bites exactly where I care most. MERGE can be trusted to say whether a day was wet. For heavy rain it is a low reference: every heavy-day number below is measured against MERGE, so it describes the model against a truth that already misses part of the tail. The heavy tail has to be checked against the stations.

## Where the raw surface is wrong

I compared the forecast with MERGE cell by cell over Brazil, from February 2024 to October 2025. By count, the largest error is too many light-rain days. On day 1, ECMWF wets 47% of cell-days, against 33% in MERGE.

The miss that matters most is the heavy day. On wet days, the 99th percentile of rain is 39 mm in the model against 60 mm in MERGE, and MERGE's own tail is already short of the gauges. The model forecasts 50 mm days a quarter as often as they happen, and on day 1 it catches 6% of them. The night in Guidoval sits in the part of the distribution the raw surface doesn't hold. A grid box kilometres wide cannot see a storm on one side of a hill.

## Adjusting by region, scoring on months the fit never saw

I adjust rain by region, not per cell and not for the whole country. I ran k-means on the MERGE climatology (seasonal shape, wet-day frequency and intensity). It gives 12 rain regimes, which split into 15 connected regions covering 72,086 cells. The pooling has to follow the climate: in a Brazil-wide fit, the Northeast's drizzle and the Southeast's heavy days would cancel each other out. It's the same reason you don't force one transformation across blocks that behave differently.

The method is quantile mapping inside each region. I scored it leave-one-month-out over May–October 2025, day 1:

- rain ratio: 1.30 → 1.01
- wet-day frequency bias: 1.47 → 0.99
- 50 mm frequency bias: 0.49 → 1.08
- MAE: down 6%, at every lead day
- RMSE: up 10%

The number of heavy days is now about right, against MERGE. The MAE drop needs a careful reading. For a single-valued forecast, CRPS reduces to absolute error, so MAE is the CRPS of a single forecast, the same score the shipping gate reads. A 6% drop is a first beat of raw ECMWF on the gate's own measure. It is not the gate: these are training-period months scored leave-one-month-out, not the held-out year, and the Brier score isn't in it yet.

The RMSE rise is the honest part. When a heavy day lands in the wrong place, RMSE punishes it twice: once where the rain fell and once where it was forecast. Threat scores barely move. That is the limit to keep in mind: the adjustment corrects frequency and volume, how often it rains and how much, but not where. Quantile mapping changes each value in place; it cannot move a storm from one cell to the next. A heavy day forecast over the wrong valley is still over the wrong valley, now with the right amount of rain. Placing the heavy days is the next stage's job, through the ensemble's probabilities.

The caveats matter. This is one mostly dry season and one model cycle, and it isn't the final method yet.

Temperature behaves differently, and I correct it per cell. Day-1 daily-maximum MAE goes from 1.35 to 1.05 °C, with the same gain at station cells (1.41 → 1.11). Pooling with neighbours made it worse, because pooling smooths away the terrain that makes a cell different. Rain wants regions; temperature wants the cell.

## The yardstick comes before the answer

Climatology is the floor: a forecast has to beat MERGE's median for that cell and that day of the year. The bar that decides shipping is higher. The adjusted product has to beat raw ECMWF on CRPS and the Brier score over a held-out year, 1 November 2025 to 31 October 2026, on which no setting was chosen. It also has to be worse in no lead band, judged against a block bootstrap over whole days. I fixed that rule before running any experiment, the way you set your tolerances before the adjustment, not after you see the residuals. The verdict gets its own post.

So far the answer is honest and mixed. Fitting the forecast to observations inside 15 rain regions beats raw ECMWF on MAE and gets the number of heavy days about right, out of sample. It doesn't yet put those days in the right place, and the right place is what a flood town needs.

## What I actually want

My goal for Ara is nowcasting. CEMADEN does great work giving Defesa Civil its short-range warnings. But as a citizen I need more: to be told earlier and more accurately, with time to prepare, without relying only on Defesa Civil alerts.

Over the next weeks I'll write more about Ara. In December I'll write about TempoFirme, the weather app I'm building on top of it.
