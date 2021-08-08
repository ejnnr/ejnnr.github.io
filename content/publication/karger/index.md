---
title: "Extensions of Karger's Algorithm: Why They Fail in Theory and How They Are Useful in Practice"

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here 
# and it will be replaced with their full name and linked to their profile.
authors:
- erik
- Enrique Fita Sanmartín
- Fred A. Hamprecht

date: "2021-08-01"
date_print: "forthcoming"
doi: ""

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: ICCV (Oral)

abstract: 
  The minimum graph cut and minimum $s$-$t$-cut problems are important primitives in
  the modeling of combinatorial problems in computer science, including in
  computer vision and machine learning. Some of the most efficient algorithms
  for finding global minimum cuts are randomized algorithms based on Karger’s
  groundbreaking contraction algorithm. Here, we study whether Karger’s
  algorithm can be successfully generalized to other cut problems. We first
  prove that a wide class of natural generalizations of Karger’s algorithm
  cannot efficiently solve the $s$-$t$-mincut or the normalized cut problem
  to optimality. Secondly, we present a new algorithm for seeded segmentation /
  graph-based semi-supervised learning with an asymptotic runtime linear in the
  number of edges of the graph. This extremely simple algorithm closely follows
  Karger’s original algorithm. It also yields a potential that can be
  interpreted as the posterior probability of a sample belonging to a given seed
  / class. We clarify the relation to the random walker algorithm / harmonic
  energy minimization in terms of distributions over spanning forests. On
  classical problems from seeded image segmentation and graph-based
  semi-supervised learning on image data, the method performs at least as well
  as the random walker / harmonic energy minimization / Gaussian
  processes.


# Summary. An optional shortened abstract.
summary: We prove impossibility results showing that Karger's contraction algorithm
  cannot be extended to $s$-$t$-mincuts or normalized cuts. However, we show how
  extensions of Karger's algorithm can still be useful for seeded segmentation.

tags: ['Graphs']

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: ''
url_code: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  placement: 1
  focal_point: "left"
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: [karger]

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---
