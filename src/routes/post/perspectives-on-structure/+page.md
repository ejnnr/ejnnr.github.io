---
title: Ways to think about structure in mathematics
summary: "  \"Structure\" is a concept that keeps popping up when thinking about mathematics\n\
  \  but it's hard to pin down what it is exactly. I discuss several different perspectives\n\
  \  for thinking about it.\n  "
date: 2020-12-29 14:03:00+01:00
tags:
- Structure
- Math
draft: false
image:
  preview_only: 'true'
---

Most of the objects that appear in mathematics can be thought of as
sets with additional "structure". For example, a group is a set $G$ with
an operation $G \times G \to G$ fulfilling certain axioms. This operation
is what makes a group feel more "structured" than a simple set of elements.
A topological space is a set equipped with a topology
and there is a myriad of other examples (graphs, ordered sets, vector spaces,
metric spaces and measure spaces to name a few).

But "structure" in this sense is a somewhat elusive concept. We know it when we see it
but it's hard to describe explicitly -- which is why I just gave some examples and hoped
you knew what I meant.
_(Sidenote: there is also a more formal notion of structure in mathematical logic but that's not the topic of this post)_

The goal of this post is not to give a formal definition of structure -- I'm not sure
how helpful that would even be -- but rather to describe different perspectives
that may be useful when thinking about it.
To guide us, we will consider one particular question: what does it mean
to say that object A has "more structure" than object B? For example, a vector space
has more structure than a group, which has more structure than a simple set.
We will start with more formal (but also more boring) perspectives and then work
our way towards more speculative and fuzzy ones.


## Notation

We'll fix a set $X$ and consider the different possible structures that can be imposed
on $X$. Calligraphy letters like $\mathcal{A}$ and $\mathcal{B}$ refer to the set of all possible structures
of some type, for example the set of all groups on $X$. Particular instances
are written as $A \in \mathcal{A}$ (e.g. a particular group on $X$).

We will write $\mathcal{A} \prec \mathcal{B}$ for the informal notion that $\mathcal{A}$
has _more_ structure than $\mathcal{B}$, for example $\text{fields} \prec \text{groups}$.
An alternative way to think about this (which hopefully explains why the $\prec$ sign points the way
it does) is that fields are a special case of groups (each field is also a group),
which means that the set of fields is in some sense a subset of the set of groups.
This leads us right into the first perspective on structure.


## Structure can be canonically removed

If $\mathcal{A} \prec \mathcal{B}$ ($\mathcal{A}$ has more structure than $\mathcal{B}$),
then there is a canonical way to turn any instance
$A \in \mathcal{A}$ into an instance $B \in \mathcal{B}$.
As an example, a vector space can be canonically turned into a group by just using vector
addition as the group operation and ignoring scalar multiplication. Or any metric space
can be treated as just a topological space by using the topology induced by the metric
and ignoring the metric itself (category theory footnote[^1]).


## Structure leads to smaller symmetry groups

If $\mathcal{A} \prec \mathcal{B}$, then the automorphism group[^2] of $A \in \mathcal{A}$
is smaller than the group of the corresponding $B \in \mathcal{B}$ (where "corresponding"
means that $B$ is just $A$ with parts of the structure removed as described in the previous
section).

For example, we can treat the real numbers as a metric space or as a topological space.
For a metric space, the automorphism group consists of only isometries (i.e. maps that
don't change distances between points), which for the real numbers are only translations.
If we treat them as a topological space though (which has a lot less structure), then the
automorphisms are all the homeomorphisms of the real number line, which form a much larger
group.


## More structure leads to fewer structure-preserving maps

If we consider two sets $X$ and $Y$, there are $|Y|^{|X|}$ maps from $X$ to $Y$. If we now introduce
a group structure, most of those maps are typically not homomorphisms, i.e. not structure-preserving.
If we then turn the groups into rings, even fewer maps will additionally be compatible with
the ring multiplication. So adding structure reduces the number of maps which preserve
all of that structure (which is pretty obvious when put like that).

The previous perspective is a special case of this, where $Y = X$ and we only consider automorphisms
rather than any structure-preserving maps, so it shouldn't be surprising that we also got fewer automorphisms
if we had more structure. But I think it's a very important special case that deserves to be treated seperately
because the interpretation via symmetries makes it much more intuitive than this general
version.


## Structure allows more definitions and theorems

Now we start getting into slightly more hand-wavy territory. If $\mathcal{A} \prec \mathcal{B}$, then
there are more concepts we can define for objects with structure $\mathcal{A}$ than for
objects with structure $\mathcal{B}$. We can also prove more and stronger theorems
about objects with structure $\mathcal{A}$ then about objects with structure $\mathcal{B}$.
This is related to the previous observation that any object with structure $\mathcal{A}$
can be canonically turned into one with structure $\mathcal{B}$. The important observation
here is that this process "is compatible with definitions and theorems" (I told you it was getting hand-wavy).
What I mean by that is that if some property holds for $B$, then it also holds for any object
$A$ which can be turned into $B$ by forgetting parts of its structure.

Some examples:

-   On a Riemannian manifold, we can do things like measure the angle at which two curves intersect,
    which is simply not a concept that makes sense for a manifold without a metric
-   Rings allow us to talk about divisibility, which does not have an analogon if only a group structure
    is avaliable
-   All vector spaces have a basis but the same is not true for all modules (which have less structure
    than vector spaces)

While adding structure "preserves definitions and theorems", it can sometimes make definitions
trivial or collapse certain distinct concepts into one. For example, divisibility becomes very boring
on fields because every element is divisible by every other element (except 0).


## Algorithmic complexity

Now it's getting really hand-wavy, so activate your lack-of-rigor-deflectors.

Loosely speaking, algorithmic complexity (or Kolmogorov complexity) measures how long the shortest
possible description of some object is. This can be formally defined for bit sequences
but I will appeal to your intuition to also apply it to other things like mathematical
structures, without explicitly specifying how to encode those as bit sequences.

One connection between structure and complexity is quite obvious: if $\mathcal{A} \prec \mathcal{B}$,
then describing $\mathcal{A}$ is more complex. For example, describing what a field is
takes slightly longer than just describing what a group is because there are more axioms
that need to be specified. Similarly, defining a Riemannian manifold is more complex
than just defining what a topological space is. Note that I switched from talking about
a description of $\mathcal{A}$, e.g. the set of all groups, to talking about a definition of what a group is.
But in terms of descriptive complexity those are essentially the same since the shortest
description of the set of all groups on $X$ consists of a definition of what a group
is and then saying "all groups on $X$".

There are some cases where this complexity perspective becomes a bit of a stretch. For example,
it's not obvious that defining a metric space is more complex than defining a topological space
(unlike in the case of fields and groups, where the hierarchy is clear). I'd argue that it is in fact
more complex because you need concepts like the real numbers which are pretty complicated
compared to topological spaces. But there might be other examples where there really is a very
short description of something which nevertheless has a lot of structure in terms of the other
perspectives above. This is fine: our goal here is not to give a formal definition of structure
but rather to list some of the properties that are typically associated with it.

There is another, more interesting way in which complexity comes into play when talking about
structure: how long is an average description of a particular element $A \in \mathcal{A}$ (given
a description of $\mathcal{A}$)? Some examples to build intuition about this:

-   Specifying a topological space can be extremely complex. Because there is such a large number of
    possible topologies on a fixed set, most of them need to have very long desriptions.
    Also note that those topological spaces with very simple descriptions are often those that have
    a natural additional structure. For example, to define the Euclidean topology on $\mathbb{R}^n$,
    we usually first define its vector space structure, use that to define a metric and then use that
    to define a topology
-   Specifying a field on a finite set is very easy: there is at most one anyways (up to isomorphism)
-   If the cardinality of $X$ is prime, there is also only one group on $X$. Otherwise, there might be more
    but still far fewer than there are topologies<sup>[I think, citation needed]</sup>

This seems to point towards more structure making it easier to specify a particular instance. But this is
not always the case. For example, a Riemannian smooth manifold has more structure than just a smooth
manifold (according to all the previous perspectives). But since every smooth manifold can be equipped
with a Riemannian metric but that metric is not uniquely determined by the manifold, describing
a Riemannian manifold usually takes longer than just describing a smooth manifold without a metric,
because the choice of metric needs to be specified.

In general, adding structure means that there might be additional choices that need to be specified
(such as a Riemannian metric) but it can also impose restrictions (for example, many topological spaces
can't be turned into metric spaces). These two factors pull the descriptive complexity of individual
instances in opposite directions.


## Inherent structure of objects

This is _not_ a new perspective for thinking about structure. Instead, I will give an example for a possible "application" of the
complexity-based perspective. Hopefully that will illustrate how these perspectives can be useful
to have in your mental toolkit.

There are interesting connections between what we discussed in the previous section and [Kolmogorov sufficient statistics](https://en.wikipedia.org/wiki/Kolmogorov%5Fstructure%5Ffunction#The%5Falgorithmic%5Fsufficient%5Fstatistic). Intuitively speaking,
the Kolmogorov sufficient statistic of a bit string is the part of that string that has "structure" in the
sense of not being algorithmically random. Any bit string can be efficiently described by first describing
its Kolmogorov sufficient statistic (which is a list of bit strings with the same "structure") and then
specifying its algorithmically random component (by giving its index in that list).

This is exactly analogous to describing e.g. a group on $X$ by first defining what a group is (or rather
defining an enumeration of all groups on $X$) and then saying "the 14th object in that enumeration".
The important property of the Kolmogorov sufficient statistic is that this description in two parts is
efficient (there is no shorter description using some other scheme, up to an additive constant).
As an example where this is not the case, we could also specify a group by first defining an enumeration of monoids and then
saying "the 247th object in that enumeration". But because there are many more monoids than group,
this description would probably be inefficient in most cases: we save ourselves the specification
of a single axiom but we pay by needing to specify a much higher index.

Perhaps this idea can be used to define the "true inherent structure" on an object as its Kolmogorov
sufficient statistic. But fleshing that out is a topic for another post.


## Conclusion

In summary, here are all the perspectives we talked about:
If an object has more structure, ...

-   this structure can always be canonically removed
-   it has fewer symmetries
-   there are fewer maps between it and other objects that preserve all the structure
-   more concepts can be defined and more theorems proven
-   specifying the class of objects with that structure tends to be more complex
-   specifying that particular object is often easier because the structure
    restricts the space of options, but there are exceptions

[^1]: In category theory these are forgetful functors but I'm just interested in intuition here, not formalism. In this example, there is also a natural way to turn any abelian group into a $k$-vector space, for a given field $k$, by tensoring with $k$. But that vector space won't be over $X$ anymore and in many other cases there is no canonical way to add structure at all.
[^2]: The automorphism group is the set of all isomorphisms from an object to itself (which becomes a group via composition as the group operation)
