---
# An instance of the Experience widget.
# Documentation: https://wowchemy.com/docs/page-builder/
widget: experience

active: false

# This file represents a page section.
headless: true

# Order that this section appears on the page.
weight: 40

title: Research Experience
subtitle:

# Date format for experience
#   Refer to https://wowchemy.com/docs/customization/#date-format
date_format: Jan 2006

# Experiences.
#   Add/remove as many `experience` items below as you like.
#   Required fields are `title`, `company`, and `date_start`.
#   Leave `date_end` empty if it's your current employer.
#   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
experience:
  - title: Master's thesis
    company: University of Amsterdam / UC Berkeley
    company_url: 'https://www.uva.nl'
    company_logo: uva
    location: Amsterdam
    date_start: '2021-11-01'
    date_end: '2021-07-15'
    description: |2-
      Worked on the theory of potential shaping and
      on distance measures between reward functions
      with Adam Gleave (UC Berkeley) and Prof. Herke van Hoof (UvA)

  - title: Research Intern
    company: Center for Human-Compatible AI
    company_url: 'https://humancompatible.ai/'
    company_logo: chai
    location: UC Berkeley (virtual)
    date_start: '2021-07-01'
    date_end: '2021-09-30'
    description: |2-
      - Worked on interpretability of reward models together with Adam Gleave
      - Developed a method to simplify a given reward model while keeping it equivalent
        to the original
      - [Published](/publication/reward-preprocessing) results at the NeurIPS Cooperative AI workshop
      - Implemented preference comparisons for the [`imitation` library](https://github.com/HumanCompatibleAI/imitation)
  - title: Research Intern
    company: QUVA Lab
    company_url: 'https://ivi.fnwi.uva.nl/quva/'
    company_logo: quva
    location: Amsterdam
    date_start: '2021-02-01'
    date_end: '2021-06-30'
    description: |2-
      - Worked with Maurice Weiler (PhD student in Max Welling's group)
      - Developed the theory of equivariant partial differential operators
      - Published a [paper](/publication/steerable-pdos) with my results at ICLR 2022
  - title: Bachelor thesis
    company: Heidelberg Collaboratory for Image Processing
    company_url: 'https://hci.iwr.uni-heidelberg.de/'
    company_logo: hci
    location: Heidelberg
    date_start: '2020-04-01'
    date_end: '2020-07-01'
    description: |2-
      - Supervised by Prof. Fred Hamprecht
      - Analyzed the extensibility of Karger's contraction algorithm
      - [Paper](/publication/karger) based on my thesis was accepted as an Oral at ICCV 2021

design:
  columns: '2'
---
