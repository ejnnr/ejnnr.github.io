+++
title = "Distributions Part I: the Delta distribution"
summary = """
  Did you always want to know kind of object this weird Dirac delta "function"
  actually is? Well, it's a Schwartz distribution. If that doesn't help much,
  then keep reading.
  """
date = 2021-07-06T14:15:00+02:00
tags = ["Math"]
draft = false
[image]
  preview_only = "true"
+++

Schwartz distributions are a generalization of functions from \\(\mathbb{R}^n\\) to \\(\mathbb{R}\\):
strictly speaking, they aren't such functions themselves, but you can do a lot of the same
stuff with them that you can do with normal functions, such as taking derivatives, computing convolutions,
and even Fourier transforms (at least in certain cases).
And in some ways, they even make life easier compared to functions. For example, every distribution
is infinitely differentiable! But of course, we do have to give up some things: distributions
can't be evaluated at a single point and it's in general impossible to multiply two distributions.

In this series, we'll try to understand all of these properties of distributions and more.
I will focus on intuition but still [give formal definitions](/post/state-formally-reason-informally) of all the concepts we look at.
As a secondary purpose, studying distributions will also be an excellent opportunity to
practice finding good definitions. We will introduce many different operations on distributions
and in each case, we will try to understand how one could come up with the definition
in a natural way.


## Motivation {#motivation}

In electrostatics, _charge densities_ are used to model the amount
of electric charge in different places. Such a charge density is a function
\\(\rho: \mathbb{R}^3 \to \mathbb{R}\\) that assigns an amount of charge per volume
to every point \\(x \in \mathbb{R}^3\\). From an experimental standpoint,
these densities are only useful abstractions; what we can measure is at best
the _total charge in some volume_. This charge \\(Q\\) is given by the integral
of the density over the volume:
\\[Q(V) = \int\_V \rho(x) dx\\]
for any subset \\(V \subseteq \mathbb{R}^3\\). You can even think of this as
the _definition_ of the density \\(\rho\\): the only thing we care about is that
when we measure the charge \\(Q(V)\\) in any volume \\(V\\), we get \\(\int\_V \rho(x) dx\\).

Now assume we observe the following: \\(Q(V) = 1\\) for any volume \\(V\\) that contains
the origin but \\(Q(V) = 0\\) if \\(V\\) does not contain the origin. Intuitively, we
conclude that there is a point charge with value 1 in the origin and no charge anywhere else.
But how can we model this using a density \\(\rho\\)? If \\(\rho\\) is any (integrable)
function, as we originally assumed, then we must have \\(\rho(x) = 0\\) for \\(x \neq 0\\).[^fn:1]
But in that case, \\(\int\_V \rho(x) dx = 0\\) for all volumes \\(V\\), which contradicts
our first observation.

For now, let's just "define this problem away": we'll say that \\(\rho(x) = \delta(x)\\),
where \\(\delta(x)\\) is an object such that
\\[\int\_V \delta(x) dx := 1 \text{ if } 0 \in V, \text{ otherwise } 0.\\]
The word "object" here is code for "we're pretty confused and don't know what this thing
is but we'd like to have something that behaves this way".

We'll develop a formal definition of \\(\delta\\) soon. But first, let's extend
the original example a bit: suppose instead of being interested only in the charge inside
some volume, we now introduce a charged test particle and want to know the potential
energy it has due to the charge density \\(\rho\\). This potential is given by
\\[\Phi \propto \int\_{\mathbb{R}^3} \frac{1}{|x\_0 - x|} \rho(x) dx\\]
for a test particle at position \\(x\_0\\). So what is the potential energy if we have the point charge from
before, \\(\rho(x) = \delta(x)\\)? So far, we have only defined \\(\int\_V \delta(x) dx\\),
and if \\(\delta(x)\\) appears anywhere else, we don't really know what to
do with it. Remember, \\(\int\_V \delta(x) dx\\) is just a notation we introduced to mean
"1 if \\(0 \in V\\) and 0 otherwise", it's not actually an integral in any usual sense.

So we will apply a powerful technique -- wishful thinking. We just assume that
\\(\delta(x)\\) behaves the way we would intuitively like it to, and then worry later
about constructing something that actually does behave that way. Since for \\(\rho(x) = \delta(x)\\),
there is no charge outside the origin, all parts of the integral above except for \\(x = 0\\)
ought to vanish. So let's just write
\\[\int\_{\mathbb{R}^3} \frac{1}{|x\_0 - x|}\delta(x) dx = \int\_{\\{0\\}}\frac{1}{|x\_0 - x|}\delta(x)dx.\\]
Since we're only integrating over \\(\\{0\\}\\) now, we can set \\(x = 0\\) in \\(|x\_0 - x|\\). Then
this part doesn't depend on \\(x\\) anymore and we get
\\[\int\_{\\{0\\}}\frac{1}{|x\_0 - x|}\delta(x)dx = \frac{1}{|x\_0|}\int\_{\\{0\\}}\delta(x)dx.\\]
But we know what to do with that last part, its' 1! So the potential should be \\(\Phi \propto \frac{1}{|x\_0|}\\).

We can apply the same argument more generally to \\(\int \varphi(x) \delta(x)dx\\) for other functions \\(\varphi\\).
So let's "wish" that
\\[\int\_{\mathbb{R}^3} \varphi(x) \delta(x) dx := \varphi(0)\\]
hold for all functions \\(\varphi\\). This contains our original definition of \\(\delta(x)\\) as a special
case, namely for the indicator function \\(\varphi = 1\_V\\).


## Schwartz distributions {#schwartz-distributions}

The defining property of \\(\delta(x)\\) that we would like to have is
\\[\int\_{\mathbb{R}^3} \delta(x) \varphi(x) dx := \varphi(0)\\]
for arbitrary functions \\(\varphi\\). We have already noted that this cannot
be an actual (Lebesgue) integral, so it makes sense to get rid of that
notation. Instead, we will write
\\[\langle \delta, \varphi\rangle := \varphi(0).\\]
This hightlights the important part: \\(\delta\\) lets us take
any function \\(\varphi\\) and maps it to its value \\(\varphi(0)\\) at the origin. So \\(\delta\\)
is a function after all; just not from \\(\mathbb{R}^3\\) to \\(\mathbb{R}\\) but from
the space of _functions on_ \\(\mathbb{R}^3\\) to \\(\mathbb{R}\\)!

\\(\delta\\) is one example of _Schwartz distributions_ or _distributions_ for short,
which are all maps from a space of functions to the real numbers. Let's make this
more precise:

**Definition:** Let \\(U \subseteq \mathbb{R}^n\\) be an open subset. A _test function_ on \\(U\\)
is a smooth, compactly supported function \\(\varphi: U \to \mathbb{R}\\) and we write
\\(\mathcal{D}(U)\\) for the space of all such test functions. A _Schwartz distribution_
on \\(U\\) is then a _continuous linear function_ \\(T: \mathcal{D}(U) \to \mathbb{R}\\).
We write \\(\mathcal{D}'(U)\\) for the space of all such distributions on \\(U\\).

This definition requires some clarifications. First, Schwartz distributions are not
at all the same thing as probability distributions, and when I say "distribution"
in this series, I will always mean a Schwartz distribution. Second, if we want to
talk about continuity, we of course need to define a topology on the space \\(\mathcal{D}(U)\\)
of test functions. The topology we use here is called the _canonical LF topology_ but
we won't discuss that any further in this post.

The name _test function_ comes from the fact that these are the functions on which
we can "test", i.e. evaluate distributions. In our first example about the total
charge in some volume, we used indicator functions \\(1\_V\\) as test functions.
The \\(\delta\\) distribution would in principle work on _any_ space of test functions.
But it turns out that a good choice for the general definition are smooth
compactly supported functions because this makes a lot of the theory very nice.

We will write \\(\langle T, \varphi \rangle\\) for the distribution \\(T\\) applied to
the test function \\(\varphi\\). But why did we write \\(\int \delta(x) \varphi(x) dx\\) before?
What does all of this have to do with integrals? The reason is the following:
let \\(f : U \to \mathbb{R}\\) be any locally integrable (read "somewhat reasonable") function. Then the map
\\[\varphi \mapsto \int\_U f(x) \varphi(x) dx\\]
defines a distribution on \\(U\\), which we denote by \\(T\_f\\). This is the sense in which
distributions are _generalized_ functions; each classical function induces a distribution.
So when we write \\(\int \delta(x) \varphi(x) dx\\), we are essentially pretending that
the delta distribution is induced by a function \\(\delta(x)\\). There is no such function,
but the notation is used very often anyway; probably in part for historical reasons
and in part because it turns out to work surprisingly well, as we'll see next.

We will revisit distributions in general in the next post but for now, we focus on the
\\(\delta\\) distribution again.


## Variations of the \\(\delta\\) distribution {#variations-of-the--delta--distribution}

We now have a formal understanding of terms of the form \\(\int \delta(x) \varphi(x)dx\\).
But in practice, the \\(\delta\\) distribution often appears in modified versions,
such as in terms like
\\[\int \delta(x - x\_0)\varphi(x) dx\\]
or
\\[\int \delta(ax)\varphi(x)dx.\\]
So far, we haven't formally defined these terms. That means it's time to apply
the Power of Wishful Thinking again, in order to find good definitions for them.

It's pretty clear what \\(\delta(x - x\_0)\\) should mean: it's just a shifted version
of \\(\delta(x)\\), with its "peak" at \\(x\_0\\) instead of \\(0\\). More explicitly, it
makes sense to demand that
\\[\int \delta(x - x\_0)\varphi(x) dx = \int \delta(x) \varphi(x + x\_0) dx\\]
as would be the case if \\(\delta\\) was a regular function (all integrations are assumed
to be over all of \\(\mathbb{R}^n\\)). Then we can see that
\\[\int \delta(x - x\_0)\varphi(x) dx = \varphi(x\_0).\\]

Let's consider \\(\int \delta(ax)\varphi(x)dx\\) instead. You might argue as follows:
"\\(\delta(ax) = 0\\) for \\(x \neq 0\\), so we only need to consider \\(x = 0\\). In that case,
\\(ax = 0 = x\\), so \\(\delta(ax)\\) should be the same as \\(\delta(x)\\)".
But this is a misunderstanding caused by the (admittedly very confusing) notation
often used for the \\(\delta\\) distribution: \\(\delta(x)\\) doesn't mean that anything
is actually being evaluated at \\(x\\), it's just a notational convention _that only makes sense inside integrals_.
We don't want to demand that \\(\delta(\cdot)\\) behaves like functions when we plug in different things because
we never have \\(\delta(x)\\) appearing on its own anyway.

What we do want is that \\(\delta(x)\\) behaves like functions _inside an integral_.
In particular, for functions \\(f\\) and \\(\varphi\\) and a scalar \\(a \neq 0\\), we have
\\[\int f(ax)\varphi(x)dx = \frac{1}{|a|^n}\int f(x)\varphi\left(\frac{x}{a}\right)dx.\\]
So since we want \\(\delta(x)\\) to behave the way that functions behave inside integrals,
we define
\\[\int \delta(ax)\varphi(x)dx := \frac{1}{|a|^n}\int\delta(x)\varphi\left(\frac{x}{a}\right)dx = \frac{1}{|a|^n}\varphi(0).\\]

In fact, we can generalize this argument: for any diffeomorphism \\(g\\) of \\(\mathbb{R}^n\\), we have
\\[\int f(g(x))\varphi(x)dx = \int |\operatorname{det} Dg(x)|^{-1} f(x)\varphi(g^{-1}(x))dx\\]
where \\(Dg\\) is the derivative (Jacobian) of \\(g\\).
So in analogy, we can define \\(\delta(g(x))\\) for any diffeomorphism \\(g\\) by
\\[\int \delta(g(x))\varphi(x)dx := \int |\operatorname{det} Dg(x)|^{-1} \delta(x)\varphi(g^{-1}(x))dx
= |\operatorname{det} Dg(0)|^{-1}\varphi(g^{-1}(0)).\\]

I want to stress again that none of these arguments are "proofs" or "derivations" -- in the end, we have
to choose how to define all of these terms. But clearly some definitions make more sense than others
and in the examples here there is clearly one "right" way to define what \\(\delta(g(x))\\) etc. should
mean. This will become even more clear in the next post: we will continue the theme of finding
good definitions via "wishful thinking", only this time for arbitrary distributions and for many
more types of operations.

[^fn:1]: Actually, only for almost all \\(x\\) but that doesn't change anything.
