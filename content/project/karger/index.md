---
title: Extensions of Karger's algorithm
summary: Can Karger's algorithm be extended to different kinds of cut problems?
tags:
- Graphs
date: "2020-07-01"
show_date: false

# Optional external URL for project (replaces project detail page).
external_link: ""

url_code: ""
url_pdf: ""
url_slides: ""
url_video: ""

# Slides (optional).
#   Associate this project with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides = "example-slides"` references `content/slides/example-slides.md`.
#   Otherwise, set `slides = ""`.
slides: ""
---

Karger's algorithm is a randomized algorithm for finding global mincuts
in graphs. For my Bachelor's thesis, I aimed to find out if and how
Karger's algorithm can be generalized to other types of problems,
for example $s$-$t$-mincuts or normalized cuts. It turns out that this
is *provably* impossible in a formal sense. But in addition to this
impossibility result, my research also led me to a new algorithm
for seeded segmentation that uses Karger's algorithm to sample many
different cuts and then takes their "average". A paper with these findings
was accepted as an Oral at ICCV 2021.
