+++
title = "Extensions of Karger's algorithm"
draft = true
[image]
  preview_only = "true"
+++

This post is about [our new paper](/publication/karger) which discusses extending Karger's contraction
algorithm to problems such as \\(s\\)-\\(t\\)-mincuts. But before we can get
into that, let's first talk about what \\(s\\)-\\(t\\)-mincuts even are and why
you'd want to find them.


## \\(s\\)-\\(t\\)-mincuts {#s----t--mincuts}

Say you have an image that you want to segment into fore- and background.
You might have a neural network that can tell you how likely each pixel
is to belong to the foreground and how likely to the background. But in the
end, you don't want all these numbers, you want a single "buest guess"
segmentation.

You could of course just assign each pixel to the more likely class: make a pixel
part of the foreground whenever the network says it's more likely to be foreground
than background. But this would ignore dependencies between pixels: if there is
a region where the network is uncertain classifies most pixels as slightly more likely
to be background but there are a few exceptions, then you probably don't want
these exceptions to be part of the foreground. We know that fore- and background
are at least somewhat contiguous and we want to make use of this prior knowledge.

One approach to this is shown in the following figure:[^fn:1]

{{< figure src="st_cut.png" caption="Figure 1: Example application of \\(s\\)-\\(t\\)-mincuts: we want to segment the top left image into foreground and background and have some degree of belief about the correct choice for each pixel. We combine all these degrees of belief into a graph (bottom left) and then find its \\(s\\)-\\(t\\)-mincut (bottom right), which corresponds to a segmentation of the original image (top right)" width="500px" >}}

We turn our image into a graph; each pixel becomes one of the gray nodes in the graph.
Then we add two more nodes, \\(s\\) and \\(t\\) (in red and blue). They are "helper nodes"
that represent the foreground and background. We add edges from each pixel node to both
\\(s\\) and \\(t\\) and use the probabilities from our neural network to determine
positive weights for those edges (for example, a probability of 0.5 would mean that the
edge connecting that pixel to \\(s\\) has the same weight as the edge to \\(t\\)).

We also add edges between neighboring pixel nodes (the yellow edges in the figure).
Their weights describe how similar two pixels are; they could just be calculated
from brightness differences or they could come from an edge detector network.

The goal is now to _cut_ this entire graph into two halves, one containing \\(s\\)
and the other containing \\(t\\). And we want to do this in such a way that the total
weight of all edges that are cut is as small as possible -- strongly connected nodes
should remain on the same side of the cut.
For each pixel, we will have to cut either its edge to \\(s\\) or to \\(t\\); this is
where the probabilities predicted by the neural network come in. But we will also
have to cut edges between pixels themselves, and this is what biases the segmentation
towards one that doesn't split up homogeneous areas of the image.

[^fn:1]: Image from _Xiao, Pengfeng et al. (2017): Cosegmentation for Object-Based Building Change Detection From High-Resolution Remotely Sensed Images. IEEE Transactions on Geoscience and Remote Sensing_. In turn adapted from _Boykov, Yuri and Funka-Lea, Gareth (2006): Graph cuts and efﬁcient N-D imagesegmentation. International Journal of Computer Vision._
