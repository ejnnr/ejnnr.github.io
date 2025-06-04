---
title: Too much structure
summary: "  Proving things for object that have a lot of structure can be harder\n\
  \  than for object with less structure, simply because the tree of possible\n  proofs\
  \ is much wider. This is probably why trying to prove a more general\n  case is\
  \ sometimes a helpful strategy.\n  "
date: 2021-01-27 08:53:00+01:00
tags:
- Structure
- Math
draft: false
image:
  preview_only: 'true'
---

When proving simple statements in point set topology, there is often only
one obvious next step that can be done given the objects and statements you
already have[^1]. You don't need to think about what you eventually want to prove
because there is only one step that will lead to a proof of _anything_.


## An example: continuous images of compact spaces are compact

As an example, let's go through the proof that the image of a compact space
under a continuous map is again compact: we start with a compact space $X$
and a map $f: X \to Y$. To make the notation less unwieldy, we'll assume that $f$ is surjective,
so we'll show that $Y$ is compact, but the proof works exactly the same without this assumption
(just replace every occurence of $Y$ with $f(X)$).
Because we want to show that $Y$ is compact,
i.e. that every open cover of $Y$ has a finite subcover, we also start with
a given open cover $Y = \bigcup_i U_i$.

With only these objects available, there isn't a lot we can do. For example,
if $X$ were a normed vector space, we would have access to its zero vector
and then could construct $f(0)$ from that. That wouldn't lead anywhere but it's a branch in the
tree of possible proofs that might distract us. Because $X$ and $Y$ have
so little structure, these kinds of options simply don't exist.

The only thing I can come up with is that we can look at the preimage of
each of the $U_i$ under $f$. This gives us a collection $f^{-1}(U_i), i \in I$
of subsets of $X$. Such a collection in itself still doesn't allow us to do anything
interesting, but because preimages preserve unions, we have
$$
\bigcup_i f^{-1}(U_i) = f^{-1}\left(\bigcup_i U_i\right) = f^{-1}(Y) = X
$$
so this collection is in fact a cover of $X$. Because $f$ is continuous, it is also
an _open_ cover.

Again, there isn't much we can do with this newly constructed open cover. We could
map it back to $Y$ with $f$ immediately but that just gives us back the open cover
of $Y$ we started with.
The other thing we can do with an open cover of $X$ is pick a finite subcover:
$X$ is compact, and we can think of that procedurally as a way of turning any
open cover into a finite subcover.

So now we have a new object: a finite open subcover $X = U_{i_1} \cup \ldots \cup U_{i_k}$.
Inside $X$, there isn't anything else we can do with a (finite) cover, so the only
option is to now apply $f$ again, which gives us sets $f(f^{-1}(U_{i_1})), \ldots, f(f^{-1}(U_{i_k})) \subset Y$.
Because $f\left(f^{-1}(U_i)\right) = U_i$, this is a finite subset of the open cover we
started with.

An then we're done because it is also a cover:
$$
\bigcup_{j = 1}^k f\left(U_{i_j}\right) = f\left(\bigcup_{j = 1}^k U_{i_j}\right) = f(X) = Y
$$

The thing that I hope you took away from this walkthrough is how few choices
there were at each step. Apart from some steps that obviously didn't add anything new,
there was always only one thing to do next.

We didn't even specifically aim to construct a finite subcover of $\bigcup_i U_i$
for most of the proof, we just "went with the flow".

This is a feeling that is much more rare in e.g. real analysis, even for proofs that
are similarly easy as the one above. With some experience, you might get enough
intuition to discard all the wrong options immediately but they'll still be there.
You typically have to keep in mind what you want to prove and deliberately
steer your proof in that direction, otherwise the number of possible paths you
could take just explodes and you never get anywhere.


## The importance of (lack of) structure

The decisive difference between the point set topology example and real analysis is,
I think, how much structure the spaces and objects
we are working with have. By "structure", I mean the same somewhat
elusive concept I've previously talked about [here](/post/perspectives-on-structure). In short, a group is
a set with some additional structure and a field adds even more structure.
The way I use the word, a manifold also has more structure than a topological
space (even though it doesn't require any new choices).

One of the aspects of structure I talked about in the post I just linked is
that objects with less structure admit fewer definitions and theorems.
Applying theorems to the objects we've already constructed is how we
make progress in our proofs. So having fewer theorems to work with
leads to a proof tree with a lower branching factor: at each step of
the proof, there are only a few things we can do. In an extreme case,
we have a branching factor of one and can do the proof on autopilot,
as in the topology example above.

If you are working on $\mathbb{R}^n$ on the other hand, you can use all the topological
properties you had before, but you can also view $\mathbb{R}^n$ as a vector space, you
can talk about lengths and angles and even about the Lebesgue measure of sets. This is possible
because $\mathbb{R}^n$ has a lot of canonical structure,
so you suddenly have many more tools at your disposal.

This explains why it can help to generalize a statement you are trying to prove:
afterwards, you have less structure to work with. Assuming the statement is still
true in its more general form, the tree of possible proofs has a much smaller
branching factor and becomes easier to explore.


## Propositions as types

One last thing to mention is that all of this is closely connected to the "propositions as types"
interpretation: mathematical propositions can be interpreted as types, with proving a proposition
corresponding to constructing a term of that type. I already talked about constructing new objects
using the available objects and theorems and this is exactly the same idea but the language of
type theory formalizes this. If you want to see an example like the topology proof I gave but explicitly
using the propositions as types view, check out section II. in [this post](https://www.lesswrong.com/posts/Xfw2d5horPunP2MSK/dependent-type-theory-and-zero-shot-reasoning). If you haven't seen
the correspondence between propositions and types before and want to learn more,
[this talk](https://www.youtube.com/watch?v=IOiZatlZtGU) is very fun to watch.

[^1]: Note the "simple" -- there are obviously really hard to prove statements in point set topology, as in any discipline
