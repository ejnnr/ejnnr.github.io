---
title: "Preprocessing Reward Functions for Interpretability"

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here 
# and it will be replaced with their full name and linked to their profile.
authors:
- erik
- Adam Gleave

date: "2021-09-25"
doi: ""

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["0"]

# Publication name and optional abbreviated publication name.
publication: NeurIPS Cooperative AI workshop

abstract: 
  In many real-world applications, the reward function is too complex to be
  manually specified. In such cases, reward functions must instead be learned
  from human feedback. Since the learned reward may fail to represent user
  preferences, it is important to be able to validate the learned reward
  function prior to deployment. One promising approach is to apply
  interpretability tools to the reward function to spot potential deviations
  from the user's intention. Existing work has applied general-purpose
  interpretability tools to understand learned reward functions. We propose
  exploiting the intrinsic structure of reward functions by first
  *preprocessing* them into simpler but equivalent reward functions, which
  are then visualized. We introduce a general framework for such reward
  preprocessing and propose concrete preprocessing algorithms. Our empirical
  evaluation shows that preprocessed rewards are often significantly easier to
  understand than the original reward.

# Summary. An optional shortened abstract.
summary: We present a method for simplifying a learned reward model before visualizing
  it and show that this can make the reward more interpretable.

tags: ['Reinforcement learning']

# Display this page in the Featured widget?
featured: true

links:
- name: Code
  icon: github
  icon_pack: fab
  url: https://github.com/HumanCompatibleAI/reward-preprocessing

url_pdf: https://arxiv.org/pdf/2203.13553

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  placement: 1
  focal_point: "left"
  preview_only: false


# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---