+++
title = "Boring numbers, complexity and Chaitin's incompleteness theorem"
summary = """
  There is a "complexity barrier": a number such that we can't prove
  the Kolmogorov complexity of any specific string to be larger than
  that. The proof of this astonishing fact is closely related to some
  famous paradoxa and we'll use this connection to get a better intuition
  for why the complexity barrier exists.
  """
date = 2021-02-10T16:27:00+01:00
draft = false
[image]
  preview_only = "true"
+++

Informally, Chaitin's incompleteness theorem states that there is a constant \\(L\\),
such that we can't prove the Kolmogorov complexity of any specific bit string to
be larger than \\(L\\).
We _can_ of course prove that there are infinitely many bit strings with higher complexity
than \\(L\\) -- but we can't name a single one!

John Baez calls this constant \\(L\\) the [complexity barrier](https://math.ucr.edu/home/baez/surprises.html). And surprisingly,
he argues that it is probably very low (on the order of a few thousand bits for reasonable
encoding schemes)!

At least to me, this is a pretty amazing fact. Consider all the material available on the
internet for instance: everything ever written online, all the videos and images,
and binaries for every computer program out there. "Obviously" we can't just write
a Python program of a few kilobytes that outputs all of this, ... right?
Well, I'm pretty sure we can't, but somewhat incredibly, there's no proof of that!

Take a moment to be properly astonished by this result because the aim of this post
is to make it as obvious as possible. We'll get there soon enough, but first let's
look at some fun paradoxa.


## There are no boring numbers ... {#there-are-no-boring-numbers-dot-dot-dot}

The follwing "paradox" is quite famous:

<blockquote>

Assume there was an uninteresting natural number. Then the smallest such number
would be interesting -- because it's the smallest uninteresting number,
that's quite an interesting property!
This is a contradiction, so there can be no uninteresting natural numbers.

</blockquote>

We can formalize it as follows: we have some boolean "boringness" property, call it \\(P\\), defined over
natural numbers. So \\(P(n)\\) just means "\\(n\\) is boring".
Being the lowest boring number is itself interesting:
\\[P\left(\min\_{P(n)} n\right)\quad \text{is false}\\]
This is self-contradictory if there are any \\(n\\) such that \\(P(n)\\),
so no natural numbers can have property \\(P\\).


## ... and every number can be described in 13 words or less {#dot-dot-dot-and-every-number-can-be-described-in-13-words-or-less}

There's a arguably more interesting variation of this paradox: let \\(P\_k(n)\\) mean
"\\(n\\) cannot be described in fewer than \\(k\\) words". Consider then the description
"the smallest natural number which cannot be described in fewer than 14 words".
In our notation, this would be
\\[\min\_{P\_{14}(n)} n\\]
However, this description is only 13 words long, so
\\[P\_{14}\left(\min\_{P\_{14}(n)} n\right)\quad \text{is false}\\]
which is a contradiction if such a number exists. Therefore, every number can be described
in at most 13 words.

This seems suspicious: while there are many 13-word phrases, there's still only
a finite number of them[^fn:1]. So there aren't enough short
descriptions to go around for each natural number to get one.


## There are arbitrarily complex strings ... {#there-are-arbitrarily-complex-strings-dot-dot-dot}

Of course the problem is that "cannot be described in fewer than \\(k\\) words" is
not a well-defined property because there is no unambiguous mapping from English
descriptions to numbers.

But what if we replace English by a formal language to circumvent this issue? For example,
a Turing machine without any input either halts and outputs a number (in the form
of a bit string), or it runs forever. If we fix an encoding for Turing machines,
any Turing machine has a length, so we can define
\\(P\_k(n)\\) as "\\(n\\) is not the output of any halting Turing machine with length less than \\(k\\)". Or more briefly:
"the [Kolmogorov complexity](https://en.wikipedia.org/wiki/Kolmogorov%5Fcomplexity) of \\(n\\) is at least \\(k\\)".

So let's repeat our argument with Turing machines instead of natural language.
We need to define a program that outputs \\(\min\_{P\_k(n)} n\\) while being itself
shorter than \\(k\\). Given a subroutine that checks whether \\(P\_k(n)\\) for arbitrary \\(n\\),
we could simply iterate over \\(n = 1, 2, \ldots\\) until we find one such that
\\(P\_k(n)\\) and then output that. If such an \\(n\\) existed, this program would
output \\(\min\_{P\_k(n)} n\\), so by the same argument as before, there can't
be any \\(n\\) with complexity higher than \\(k\\) ...

... which can't be right, because just as with natural language descriptions,
there are only finitely many programs of length \\(\leq k\\), but infinitely many
bit strings.

This time, the issue is the phrase "Given a subroutine ...": \\(P\_k\\) is
undecidable, so this subroutine unfortunately doesn't exist[^fn:2]. Or fortunately, if you value the consistency of mathematics.

In essense, the problem is this: in English, the smallest number with a simple property
can be described in few words because you only need to describe the property and a few
additional words. But the same is not true for Kolmogorov complexity _if the property isn't decidable_.

For any decidable property, the argument works: the smallest number with that property
will have low Kolmogorov complexity (where "low" means "not much larger than the
complexity of the property"). Let's see what we can get by applying that insight.


## ... but not provably complex ones! {#dot-dot-dot-but-not-provably-complex-ones}

This post is supposed to be about Chaitin's incompleteness theorem, so we'd better
connect all of this talk about paradoxa and complexity to that.
The only missing ingredient is to consider _provably_ large
complexities, rather than just large complexities as before.

This means \\(P\_k(n)\\) will now be "\\(n\\) encodes a proof that some specific bit
string has Kolmogorov complexity higher than \\(k\\)". We need some system of
logic to make "proof" well-defined and an encoding scheme of proofs as natural
numbers but we'll ignore that since our goal is just to gain intuition.

This new \\(P\_k\\) is clearly decidable: we just need to check whether \\(n\\) is a valid encoding
of a proof and whether that proof shows that some specific number has Kolmogorov
complexity higher than \\(k\\).

This program has length \\(\log k\\) (to encode \\(k\\))
plus some constant. As we saw, this means that \\(\min\_{P\_k(n)} n\\) also has Kolmogorov
complexity at most \\(\log k\\) (up to a constant): we can iterate over \\(n\\) and return
the first one for which \\(P\_k(n)\\) holds.

So far there's no contradiction: \\(n\\) proves that the Kolmogorov complexity of
_some specific number_, call if \\(M(n)\\), is larger than \\(k\\). And we've only seen
that the Kolmogorov complexity of \\(\min\_{P\_k(n)} n\\) is low. But of course
\\(M\\) is itself computable and in fact by a pretty short program
(which just looks at what \\(n\\) proves). So \\(M\_k := M\left(\min\_{P\_k(n)} n\right)\\)
also has a small complexity, more precisely:
\\[K(M\_k) \leq \log k + \text{const}\\]

But by construction, \\(K(M\_k) > k\\) (that's what \\(\min\_{P\_k(n)} n\\) encodes a proof of). So we get
\\[k < K(M\_k) < \log k + \text{const}\\]
which obviously can't hold if \\(k\\) is sufficiently large. So for \\(k\\) greater than
some constant \\(L\\), we run into a paradox ... if any \\(n\\) encoding such a proof exists.
If there is no \\(n\\) encoding a proof that some specific bit string has complexity higher than
\\(k\\), then there is no smallest such \\(n\\), and we can't define \\(M\_k\\). This proves
Chaitin's Incompleteness Theorem:

<blockquote>

There is some constant \\(L\\) such that for any given bit string, we can't prove
it has Kolmogorov complexity higher than \\(L\\).

</blockquote>


## Further reading {#further-reading}

-   The "fact" that every number can be described in at most 13 words is known as the [Berry paradox](https://en.wikipedia.org/wiki/Berry%5Fparadox)
-   You might like [John Baez's post](https://math.ucr.edu/home/baez/surprises.html) that I already linked above. In addition to a discussion
    of Chaitin's incompleteness theorem, he talks about how another famous paradox -- the surprise examination
    paradox -- motivates a proof of Gödel's second incompleteness theorem! Or you could read the
    [paper by Kritchman and Raz](http://www.ams.org/notices/201011/rtx101101454p.pdf) that introduced that proof.
-   Chaitin himself briefly points out the similarity of his impossibility result to Berry's paradoxon in
    _Gödel's Theorem and Information_ (1982)

[^fn:1]: At least in languages where you can't just create an arbitrary number of new words by composing existing ones. If you can, then one word is enough to "describe" any number
[^fn:2]: It might seem like we've in fact proven that \\(P\_k\\) is undecidable, because if it was decidable, we'd get a contradiction. But actuallly, we've only shown that \\(P\_k\\) can't be computed by any program of length less than \\(k\\). A longer program doesn't immediately lead to a contradiction.
