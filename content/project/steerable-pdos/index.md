---
title: Steerable PDOs
summary: Using differential operators for equivariant NNs.
tags:
- Equivariance
- Deep Learning
date: "2020-07-01"
show_date: false

# Optional external URL for project (replaces project detail page).
external_link: ""

links:
- name: Code
  icon: github
  icon_pack: fab
  url: https://github.com/ejnnr/steerable_pdos

url_pdf: https://arxiv.org/pdf/2106.10163.pdf

image:
  placement: 1
  focal_point: "left"
  preview_only: false

# Slides (optional).
#   Associate this project with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides = "example-slides"` references `content/slides/example-slides.md`.
#   Otherwise, set `slides = ""`.
slides: ""
---

Equivariant deep learning has many similarities to theoretical physics,
which have already lead to ideas from physics being applied to the field.
But they typically use convolutions, whereas physics uses differential
operators. In an internship at [QUVA Lab](https://ivi.fnwi.uva.nl/quva/),
I developed the theory of equivariant differential operators -- *Steerable PDOs*
-- in order to close this gap. I also implemented steerable PDOs as
an extension of the [*e2cnn* library](https://github.com/QUVA-Lab/e2cnn)
to allow others to easily apply them in their own work.
