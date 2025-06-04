---
title: VAEs from a generative perspective
summary: "  Variational autoencoders are usually introduced as a probabilistic extension\
  \ of autoencoders\n  with regularization. An alternative view is that the encoder\
  \ arises naturally as a tool\n  for efficiently training the decoder. This is the\
  \ perspective I take in this post, deriving\n  VAEs without assuming an autoencoder\
  \ architecture a priori.\n  "
date: 2021-01-06 14:45:00+01:00
tags:
- Deep learning
draft: false
image:
  preview_only: 'true'
---

\\(
\DeclareMathOperator\*{\argmax}{argmax}
\DeclareMathOperator\*{\argmin}{argmin}
\DeclareMathOperator\*{\E}{\mathbb{E}} % expected value
\newcommand{\R}{\mathbb{R}}
\\)
This is my attempt to tell a story[^1]
about how you might invent variational autoencoders (VAEs).
There are already [great introductory posts](https://towardsdatascience.com/understanding-variational-autoencoders-vaes-f70510919f73) doing this and if you haven't seen VAEs before, I would
strongly recommend you start with one of those. These introductions often start with
autoencoders and then extend them to VAEs. In contrast, we will start by asking ourselves
how to generate new data that matches a training distribution and then motivate VAEs
from there. We won't assume an autoencoder-like architecture a priori, instead it will arise naturally
from this motivation.

Of course just this motivation of generating new samples given a training distribution won't uniquely lead to VAEs
-- after all, there are other good options for generative models. So at some points we will
need to make design decisions but hopefully they won't come out of the blue.

One pedagogical note before we start: if this derivation of VAEs seems unnecessarily
long and convoluted, that's because it is. The goal is not to arrive at the VAE framework
as quickly as possible, but rather to make each step seem natural and to avoid any unmotivated
"magical" jumps. It's probably best if you forget for a moment what you know about VAEs,
in particular that they consist of an encoder and a decoder. We will get there at the very end
but initially this preconception might just be confusing.


## Generative models

The goal in generative modeling is the following: we have some family of probability
distributions $\mathcal{P}$. Given a set of training examples $\mathcal{D}$ (assumed to be i.i.d.), we now want
to pick the distribution $p \in \mathcal{P}$ from our family that maximizes the likelihood $\prod_{x \in \mathcal{D}} p(x)$.
Equivalently, we can maximize the log-likelihood:
$$
\argmax_{p \in \mathcal{P}} \sum_{x \in \mathcal{D}} \log p(x)
$$
For now, we will consider the simper special case where we only have a single datapoint $x$ and want
to maximize $\log p(x)$ (we will get back to the general case at the end).

Optimizing over a family of probability distributions is very abstract. To turn this into a problem
we can actually solve numerically, we will use a parameterized family $p_\theta(x)$ and optimize over the
parameter $\theta \in \R^p$. $p_\theta(x)$ should
be differentiable with respect to $\theta$, then we can at least find a local optimum for our
problem using gradient ascent.

This still leaves the question which parameterized family we should use. This is the largest
crossroads we'll face in this post: there are many good options to choose from. The challenge we
face is to find a good trade-off between having a flexible family of distributions and
keeping the number of parameters manageable. For example, if $x$ takes on discrete values,
we could in principle use the full categorical distribution over all possible values of $x$.
This would be as flexible as possible but the number of parameters might be huge. If $x$
describes a $28\times 28$ binary image, there are already $2^{28 \cdot 28} = 2^{784} \approx 10^{236}$
possible values that $x$ can take, meaning we'd need about that many parameters.

The way we will deal with this problem is to use a continuous mixture of simple distributions.
We will introduce a new latent variable $z \in \mathbb{R}^k$ on which we _define_ a very simple distribution $p(z)$, for
example a unit normal, $z \sim \mathcal{N}(0; I)$. Then we parameterize a distribution
$p_\theta(x|z)$, which gives us
$$
p_\theta(x) = \int p(z) p_\theta(x|z) dz
$$
The important point is that for a fixed $z$, $p_\theta(\cdot|z)$ may be an extremely simple distribution.
In the example above, we could use an independent Bernoulli for each of the 784 pixels, which
requires only 784 parameters. But because we additionally have a dependency on $z$, the marginal
distribution $p_\theta$ can be much more complex (in particular, the pixels are typically not independent).
Of course the dependency on $z$ will require some additional parameters but this could just be a reasonably
sized neural network, which gives us far fewer parameters than the $2^{784}$ that a full categorical
distribution would require.

This already describes our model. Sampling from this model is easy: we sample $z \sim p(z)$ and
then for this $z$ sample $x \sim p_\theta(x|z)$. By assumption, both of those distributions are
very simple (and we can also choose them to be easy to sample from).

But evaluating the likelihood $p_\theta(x)$ of a datapoint is intractable for most models $p_\theta(x|z)$
and $p(z)$ because it requires calculating a complicated integral. Even if we only care about generating
samples, this is a problem: to train the model, we want to maximize $\log p_\theta(x)$, but we can't even
evaluate it (nor its gradient, for the same reason).

The cleverness of VAEs lies in using the right approximations to make this optimization problem
tractable, and that is what the remainder of this post is about.


## Variational inference

First, we expand the log-likelihood a bit. For any value of $z$, we have
$$
\log p(x) = \log p(z) p(x|z) - \log p(z|x)
$$
(not writing our the dependency on $\theta$ for now).
The first term is easy to evaluate. So if we could evaluate the second term, our problem
would be solved (sidenote on motivation[^2]).

This is where variational inference comes into play ([here](https://ermongroup.github.io/cs228-notes/inference/variational/) is a tutorial if you want to dive a bit deeper
but that's not necessary for this post). The idea of variational inference is that
you have some distribution $p$ that you care about, but which is intractable to work with.
So you define a family $\mathcal{Q}$ of simpler distributions and then find
$$
q^\* := \argmin_{q \in \mathcal{Q}} D(q\Vert p)
$$
where $D(\cdot \Vert \cdot)$ is the Kullback-Leibler divergence (which measures "distances"
between probability distributions, though it is not a metric in the mathematical sense[^3]). We
can then use $q^\*$ in place of $p$ whenever we need to evaluate it.

This may sound like an enourmous amount of computational overhead: to just evaluate
our objective, we will have to solve an entire optimization problem each time! We will later
find a way to alleviate this issue but for now, let's just ignore it and understand
how we would solve the problem naively.

To apply this to our problem, we will approximate $p(z|x)$ with a simpler distribution $q_\lambda(z)$,
parameterized by a new parameter $\lambda$. For example, $q_\lambda$ could be a Gaussian
and $\lambda$ would be its mean and covariance matrix. Note that while $q_\lambda(z)$ does not
explicitly depend on $x$, the optimal parameter
$\lambda^\*$ does depend on $x$ because we minimize the Kullback-Leibler divergence between
$q_\lambda$ and $p(\cdot | x)$.

The variational inference problem is now minimizing
$$
D(q_\lambda\Vert p(\cdot | x)) = \mathbb{E}_{z \sim q_\lambda}\left[\log q_\lambda(z) - \log p(z|x)\right]
$$
This still contains the $p(z|x)$ term that we can't evaluate. But we can get rid of that by writing
$$
\mathbb{E}_{z \sim q_\lambda}\left[\log q_\lambda(z) - \log p(z|x)\right]
= \mathbb{E}_{z \sim q_\lambda}\left[\log q_\lambda(z) - \log p(x, z)\right] + \log p(x)
$$
We have reintroduced $\log p(x)$, which is intractable, but crucially,
it doesn't depend on $\lambda$. So to solve the minimization problem above, we can
also minimize the expected value on the right. Usually, we instead maximize the
negative of that:
$$
\argmax_\lambda \E_{z \sim q_\lambda}\left[\log p(x, z) - \log q_\lambda(z)\right]
$$
The objective
$$
\E_{z \sim q_\lambda}\left[\log p(x, z) - \log q_\lambda(z)\right]
$$
is called the _evidence lower bound_ (ELBO) because it is a lower bound on the log evidence $\log p(x)$:
$$
\E_{z \sim q_\lambda}\left[\log p(x, z) - \log q_\lambda(z)\right] = \log p(x) - D(q_\lambda\Vert p(\cdot|x)) \leq \log p(x)
$$
For now this fact isn't really interesting, but it will become relevant later.

Maximizing the ELBO is finally a tractable problem: we can write
$$
\log p(x, z) = \log p(z) + \log p_\theta(x|z)
$$
which is something we can easily evaluate. The expectation is over $q_\lambda$ which
also doesn't pose a problem[^4].


## Combining the optimization problems

Let's briefly recap our progress so far. We originally wanted to find
$$
\argmax_\theta \log p_\theta(x)
$$
which we rewrote as
$$
\argmax_\theta \log p_\theta(x, z) - \log p_\theta(z|x)
$$
for an arbitrarily chosen $z$.
We then used variational inference to approximate the intractable term as
$$
\log p_\theta(z|x) \approx \log q_{\lambda^\*}(z)
$$
where $\lambda^\*$ is the solution to the variational problem:
$$
\lambda^\*(\theta) = \argmax_\lambda \E_{z \sim q_\lambda}\left[\log p_\theta(x, z) - \log q_\lambda(z)\right]
$$

So we could now in principle plug in this approximation and solve
$$
\argmax_\theta \log p_\theta(x) \approx \log p_\theta(x, z) - \log q_{\lambda^\*}(z)
$$
but there are problems with this.
First, note that $\lambda^\*$ depends on $\theta$. If we for example use gradient
ascent to optimize over $\theta$, we would need to find the new
optimal $\lambda$ after each gradient step.
Second, using an arbitrarily chosen $z$ is kind of silly: we optimized
$q_\lambda$ such that the entire distribution approximates $p(z|x)$ well,
we should make use of this entire distribution.

So let's go back. We know that the solution to
$$
\argmax_\theta \log p_\theta(x) = \argmax_\theta \log p_\theta(x, z) - \log p_\theta(z|x)
$$
is the same for any $z$. So we can also maximize
$$
\E_{z \sim q}\left[\log p_\theta(x, z) - \log p_\theta(z|x)\right]
$$
instead, for an arbitrary distribution $q$.
Plugging in our approximation, we get
$$
\E_{z \sim q}\left[\log p_\theta(x, z) - \log q_{\lambda^\*}(z)\right]
$$

The question now is which distribution $q$ to use. But note that by using $q = q_{\lambda^\*}$,
we again get the ELBO, this time as the objective for our original optimization problem.
This is a good choice for two reasons:

1.  The ELBO is a lower bound on the evidence, $\text{ELBO} \leq \log p(x)$. If we used another
    distribution $q$, we wouldn't have any guarantee that we're optimizing for the right thing
    if the approximation $p(z|x) \approx q_{\lambda^\*}(z)$ became bad enough. This way, we're
    at least optimizing a lower bound on what we really care about.
2.  We saw above that we need to find the new $\lambda^\*(\theta)$ after each update to $\theta$,
    which is very inefficient. But the ELBO is already our objective for $\lambda$, so now we have
    the same optimization objective for both parameters and can optimize them jointly.

With this choice of $q = q_{\lambda^\*}$, the joint optimization problem becomes
$$
\argmax_{\theta, \lambda} \E_{z \sim q_\lambda}\left[\log p_\theta(x, z) - \log q_\lambda(z)\right]
$$
We can use the reparameterization trick / pathwise gradients to optimize this
efficiently with gradient ascent.


## Using an encoder

For a single datapoint $x$, we now have an efficiently solvable problem. But now we get
back to the more interesting setting of an entire dataset $\mathcal{D}$. We then want to
optimize the likelihood of the entire dataset:
$$
\sum_{x \in \mathcal{D}} \log p_\theta(x)
$$
The problem is that $q_\lambda(z)$ is supposed to
approximate $p(z|x)$, so the optimal $\lambda$ is different for each datapoint $x$.
Full variational inference would mean using a separate parameter
$\lambda$ for each datapoint. The optimization would then be over $\theta, \lambda_1, \ldots, \lambda_n$,
where $\lambda_i$ is the parameter for the $i$-th datapoint. This again gets us into the realm
of a huge number of parameters and computational infeasibility.

So instead, we use _[amortized variational inference](https://gordonjo.github.io/post/amortized%5Fvi/)_. This means that instead of optimizing parameters for
$q_\lambda$ for each $x$, we learn a function $x \mapsto \lambda$. This function is trained to approximate the optimal solution
$\lambda^\*(x)$. The downside is that we're introducing yet another approximation, which can only
worsen how well we maximize the likelihood $p(x)$. But the big advantage is that evaluating it is
much cheaper than solving an entire optimization problem.

In practice, this means we train a neural
network $f_\varphi(x)$ to find the best $\lambda$ (in terms of the objective above) for a given $x$. We then
use $q_{f_\varphi(x)}(z)$ in place of $q_{\lambda^\*}(z)$. To make the notation a bit nicer,
we write this as
$$
q_\varphi(z|x) := q_{f_\varphi(x)}(z)
$$

Then we finally get the VAE objective:
$$
\argmax_{\theta, \varphi} \E_{z \sim q_\varphi}\left[\log p(z)p_\theta(x|z) - \log q_\varphi(z|x)\right]
$$


## Connection to VAEs in practice

As you've probably guessed by now, $p_\theta(x|z)$ is the decoder of a VAE
and $q_\varphi(z|x)$ is the encoder. The ELBO can be rewritten as
$$
\begin{aligned}\E_{z \sim q(\cdot | x)} \left[\log p(z)p(x|z) - \log q(z|x)\right]
&= \E_{z \sim q(\cdot | x)} \log p(x|z) - \E_{z \sim q(\cdot | x)} \log \frac{q(z|x)}{p(z)}\\\\\\
&= \E_{z \sim q(\cdot | x)}\log p(x | z) - D(q(\cdot|x)\Vert p)\end{aligned}
$$
which gives us the interpretation as "reconstruction + regularization loss"
that you may have encountered elsewhere (to treat this as a loss that is minimized,
you would multiply everything by $-1$).

$q_\varphi$ is typically chosen as a normal distribution, because that makes the KL divergence
in the ELBO easy to calculate if $p(z)$ is chosen as a unit normal. The choice of $p_\theta$
depends on the type of data. As mentioned, for binary images we might use independent
Bernoulli distributions for each pixel. For continuous output, a normal distribution is a common
choice.


## Conclusion

We saw how to arrive at VAEs starting from a purely generative motivation, without
assuming an autoencoder architecture a priori. Interestingly, this gives a very different
impression than the "autoencoder perspective": what we really care about is the
decoder, whereas the encoder is just a useful trick to be able to train the decoder efficiently.

This doesn't mean that the autoencoder perspective is wrong of course. Having an encoder
can be intrinsically useful for some applications, and this is something which is missing
in this post. But I think the perspective we took here demonstrates that the VAE architecture
is far less arbitrary than it may seem when starting from autoencoders.


## Further reading

-   The [CS 228 lecture notes on VAEs](https://ermongroup.github.io/cs228-notes/extras/vae/) take a somewhat similar approach to this post in terms of emphasizing
    the variational inference perspective. They Also contain details on some points that I basically ignored, for example on the reparameterization
    trick
-   [Carl Doersch's tutorial on VAEs](https://arxiv.org/abs/1606.05908) contains much more detail and also has a different motivation for why
    we want to approximate $p(z|x)$ (namely to use that to estimate the integral by sampling values of $z$
    that contribute the most)
-   There is also a [tutorial by Kingma and Welling](https://arxiv.org/abs/1906.02691), the authors who introduced VAEs. You could also look
    at their [original paper](https://arxiv.org/abs/1312.6114) but that's a lot terser

[^1]: Michael Nielsen calls this "discovery fiction", mentioned for example [here](http://cognitivemedium.com/srs-mathematics)
[^2]: If you intrinsically care about $p(z|x)$, for example because you hope the latent variables will have an interesting meaning, this and parts of the remaining post are unnecessary, you'll get to VAEs more directly. But my point is that you don't _need_ that motivation -- VAEs arise pretty naturally even if you only care about finding a good model $p_\theta(x)$ of the training data.
[^3]: In particular, the Kullback-Leibler divergence is not symmetric, which raises the question why we use $D(q\Vert p)$ and not $D(p\Vert q)$. The reason is that the latter would itself lead to an intractable optimization problem and so we wouldn't have made any progress.
[^4]: If you've read the previous footnote: this is the point where using the other KL divergence would mean we're stuck because we have an expectation with respect to $p(z|x)$
