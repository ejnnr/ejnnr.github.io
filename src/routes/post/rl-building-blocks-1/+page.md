---
title: 'Building Blocks of RL Part I: Value-based methods'
summary: "  Reinforcement Learning consists of a few key building blocks that can\
  \ be combined to create\n  many of the well-known algorithms. Framing RL in terms\
  \ of these building blocks\n  can give a good overview and better understanding\
  \ of these algorithms. This is part 1\n  of a series with such an overview, covering\
  \ value-based methods (mainly in a tabular\n  setting).\n  "
date: 2021-01-13 16:58:00+01:00
tags:
- Reinforcement learning
draft: false
image:
  preview_only: 'true'
---

Reinforcement Learning consists of atomic building blocks that can be combined to create
many of the well-known algorithms. This is not a secret but it can sometimes be
obscured when learning about different methods one after another, never getting
the big picture view. So this is my attempt at the kind of overview I would have like
when I first got into RL. How helpful it is to you probably depends a lot on how similar
your learning style is to mine.

This is part 1 of of a planned three-part series. [Part 2](/post/rl-building-blocks-2) will be about policy optimization and
[part 3](/post/rl-building-blocks-3) about model-based RL.


## Motivation

Why consider the building blocks of RL individually at all? There are at least two good
reasons:

1.  It makes RL methods easier to memorize. This is for two reasons: first, memorization
    becomes easier when the material is split into small chunks. Second, many of the building
    blocks are shared by several methods, so we can avoid duplicate effort more effectively
    by explicitly considering these building blocks.
2.  More importantly, it gives a better understanding of the landscape of RL methods. A very naive view of
    RL methods would just consider them as a very long list of possibilities. But in reality,
    they are more of a very high-dimensional table, with different options to choose from
    for different aspects of the algorithm.


## Target audience and what this is not

On its own, this is not an introduction to Reinforcement Learning; I assume that you already
know most of the definitions and algorithms and mainly describe how they fit into one common framework.
That said, it might be helpful to read this series in parallel to learning about the algorithms
it covers. Or you can use it as a review, or to deepen your big picture of RL. If you're already
very familiar with RL theory, you probably won't find anything new.

This is also not a guide on which method to choose for which problem. It might
_help_ with that but I don't focus on the various advantages and disadvantages.

Finally, this overview is far from exhaustive. My main goal is to present the framework
and give enough examples to provide intuition for how concrete algorithms fit in.
In particular, I focus on a tabular setting
(for Part 1) and cover Deep RL only briefly towards the end. All of the things I discuss
for a tabular setting are still relevant for Deep RL, so it should still be useful even
if you're not interested in tabular RL for its own sake. But if you're looking for an overview
of the parts that are specific to Deep RL, this is not it.


## Notation

-   $A_t$ is the action taken at time $t$ while the agent is in state $S_t$. Afterwards,
    the environment returns a reward $R_{t + 1}$ and a new state $S_{t + 1}$
-   The return $G_t$ is the discounted sum of rewards from time $t$ onwards
    $$
    G_t = \sum_{k = 1}^\infty \gamma^{k - 1} R_{t + k}
    $$


## Value functions

This post is about value-based methods, which means the model explicitly learns and represents
a value function and uses that value function to compute the policy (I will cover actor-critic methods
when we talk about policy optimization in part 2).

There are two types of value functions: state-value functions or V-functions assign a value to
every state $s$. We write $v_\pi(s)$ for such a value function. Q-functions assign a value
to every state-action pair $(s, a)$, i.e. to taking action $a$ in state $s$, and we write them
as $q_\pi(s, a)$. Many algorithms work essentially the same for both kinds of functions but there will be
a few cases where we need to make a distinction.

Finding these value functions $v_\pi$ or $q_\pi$ for a given policy $\pi$ is called _policy evaluation_.
Of course just evaluating a policy is not that useful by itself. After all, the goal of reinforcement
learning is to find a good policy. We do this using generalized policy iteration (GPI), which we will talk about more
later. For now you only need to know that GPI is a method (or rather collection of methods) for finding an optimal policy,
which needs to evaluate a policy as one of its substeps. So we will start by only discussing policy
evaluation, keeping in mind that this will later help us with finding good policies as well.


## General shape of the update

We will start in a tabular setting meaning there are only finitely many states and the value function
is a simple lookup table. All the value-based methods in this setting have the same general shape:
we have some observations $S_t, A_t, R_{t + 1}, S_{t + 1}, A_{t + 1}, \ldots$, which we got from
running policy $\pi$ on the environment (or on an environment model, more on that in part 3).
We keep an estimate $V$ of the true value function $v_\pi$, which is
updated for each observed state $S_t$ as follows:
$$
V(S_t) \gets V(S_t) + \alpha(\text{target} - V(S_t))
$$
or analogously
$$
Q(S_t, A_t) \gets Q(S_t, A_t) + \alpha(\text{target} - Q(S_t, A_t))
$$
for an estimate $Q$ of $q_\pi$.
$\alpha$ is a learning rate which may or may not be constant. $\text{target}$
is the key piece that distinguishes all the algorithms we'll look at from one another.
It should be something that is, in expectation, a better value estimate than the old $V(S_t)$.
In some cases it will depend on $V$, those are called _bootstrapping_.


## Targets for policy evaluation

Now that we have described the general shape of the update, we can define all the most
popular methods in the tabular setting by just giving the target:

Monte Carlo
: the target is simply the return $G_t$. The way we described the general method
    in the previous section, we get every-visit MC. There is also first-visit MC, which updates the estimate
    for each state only once per episode (the first time it occurs).

TD(0)
: the target is $R_{t + 1} + \gamma V(S_t)$ or $R_{t + 1} + \gamma Q(S_t, A_t)$
    This is also the 1-step return $G_{t:t+1}$. If we're learning the Q-function,
    this is called _Sarsa_.

Expected Sarsa
: Like Sarsa, but with an expectation over the next action, rather than
    the actually sampled action: $R_{t + 1} + \gamma \mathbb{E}_{a \sim \pi} Q(S_t, a)$
    This only works for Q-functions, since for V-functions, we would need to know the environment dynamics
    to calculate the expected value.

n-step TD
: The target is the $n$-step return $G_{t:t+n}$.
    This generalizes MC and TD(0): with $n = 1$, we get TD(0) and with $n = \infty$, we get MC.

n-step expected Sarsa
: Uses a variation of the n-step return as the target, where the value of the $n$-th
    state is estimated not by the value function but by an expected value over actions:
    $$
    G_{t:t+n} - \gamma^n Q(S_{t + n}, A_{t + n}) + \gamma^n \mathbb{E}_{a \sim \pi} Q(S_{t + n}, a)
    $$
    This generalizes expected Sarsa and again only works for Q-functions.

TD($\lambda$)
: uses $\lambda$-returns as the target (an exponentially weighted average for $n$-step returns for all values
    of $n$

For a complete algorithm, we also need to specify a learning rate. If we decay the learning rate at the
right pace, all these methods are guaranteed to converge to the true $v_\pi$ (and this decay schedule
is the same for all methods). But of course a constant learning rate can also work well.

There is also dynamic programming, though it is a bit of a degenerate case: if we know the true
environment transition probabilities, there is no need to sample episodes. Instead, we can use
$$
\text{target} = \mathbb{E}_{A_t \sim \pi, S_{t + 1}, R_{t + 1} \sim \text{env}} \left[R_{t + 1} + \gamma V(S_{t + 1})\right]
$$


## GPI, control and Q-learning

All the methods from the previous section are policy evaluation methods:
if the policy $\pi$ from which we sample trajectories is fixed, they converge
to $v_\pi$ or $q_\pi$, not to the optimal value functions.

As promised, we can use a policy evaluation inside a larger algorithm to
find optimal policies. This works as follows:

1.  Start with a random policy $\pi$ and value function $V$ or $Q$
2.  Iterate until convergence:
    1.  Run one of the policy evaluation algorithms above for one or several steps
        to make the value estimate closer to the true $v_\pi$ or $q_\pi$
    2.  Improve the policy $\pi$, for example by making it $\varepsilon$-greedy
        with respect to the current value estimate

This is called generalized policy iteration or GPI.

The second step in the loop, where we improve the policy, is easy for
Q-functions. The greedy policy is then simply given by
$$
\pi'(s) = \operatorname*{argmax}_a Q(s, a)
$$
and the $\varepsilon$-greedy policy just means following $\pi'$ with probability
$1 - \varepsilon$ and choosing randomly with probability $\varepsilon$.

With V-functions on the other hand, we would need access to the environment dynamics
to compute the greedy policy. Because we usually don't have that,
we use Q-functions if we want to do value-based control. Nevertheless,
V-functions have other important uses (we'll see them again for Actor-Critic methods
in Part 2).

We now add one more target to our growing collection:
$$
\text{target} = R_{t + 1} + \gamma \max_{a} Q(S_t, a)
$$
This results in Q-learning, which in contrast to all the previous targets learns the optimal
policy directly. So it solves a different problem than policy evaluation and doesn't need
to be combined with GPI.

However, we can also fit Q-learning into the GPI framework: it is equivalent to using
Sarsa[^1]
and making the policy greedy after each Q-update. Combining this into a single
target that directly learns the optimal Q-function just simplifies things.


## Off-policy learning

_(Here and in the next section, I will write the equations only for V-functions
to make it more readable but they all work exactly the same for Q-functions)_

So far, we have used policy evaluation only to learn the policy $\pi$ that was used to
sample actions. Off-policy learning means that actions are sampled by the behavior policy
$b$ but we still want to learn the value function for some other specified policy $\pi$.

Consider our general update rule:
$$
V(S_t) \gets V(S_t) + \alpha(\text{target} - V(S_t))
$$
The _expected update_ at each step is
$$
\mathbb{E}_{A_t \sim \pi} \left[\alpha(\text{target} - V(S_t))\right]
$$
i.e. the amount by which $V(S_t)$ changes on average on one update.
We want to tweak the update rule in such a way that we get this expected update
even though we are using samples from $b$ rather than $\pi$.

There is a general method for estimating an expected value with respect to
one probability distribution $p$ using samples from a different distribution $q$.
It's called importance sampling and is simply the observation that
$$
\mathbb{E}_{x \sim p} f(x) = \mathbb{E}_{x \sim q} \frac{p(x)}{q(x)} f(x)
$$
So when we can only sample from $q$, we multiply each outcome by the importance
sampling ratio $\frac{p(x)}{q(x)}$ to adjust. This has nothing to do with reinforcement
learning, it's a much more general method.

So we can use importance sampling for off-policy learning. For a 1-step method such as
TD(0), our new update rule becomes
$$
V(S_t) \gets V(S_t) + \alpha\frac{\pi(A_t|S_t)}{b(A_t|S_t)}(\text{target} - V(S_t))
$$
Note that this is a strict generalization: if $b = \pi$, which is the on-policy case we had before,
the importance sampling ratio is one. Also note that we didn't have to modify the target,
so this can be applied the same way to all 1-step methods.

Why did I say "for a 1-step method"? If the target (even implicitly) depends on more future
actions, i.e. $A_{t + 1}, A_{t + 2}, \ldots$, then these need to be included in the importance
sampling ratio. So in general, we can define
$$
\rho_{t:t+n} := \prod_{\tau = t}^{t + n} \frac{\pi(A_\tau|S_\tau)}{b(A_\tau|S_\tau)}
$$
and then use the update rule
$$
V(S_t) \gets V(S_t) + \alpha\rho_{t:t+n}{b(A_t|S_t)}(\text{target} - V(S_t))
$$
where $k$ is the number of future actions the target depends on. For example, Monte Carlo
has $n = \infty$ (meaning until the end of the episode) and Sarsa has $n = 1$.

This means that there is a slight dependency between the target and the importance
sampling ratio, namely the number $n$ of future steps that are considered. But other than
that, importance sampling works the same for all of our targets.

Now you may have heard that some methods like expected Sarsa are "off-policy
methods" while others are on-policy. This seems to clash with our observation that
importance sampling has almost nothing to do with the update target, so what's going on?

First, we can _always_ use importance sampling and get a method that works in an off-policy
setting. So when we say that Sarsa is on-policy, that just means that we need importance
sampling to use it for off-policy learning.

Second, some methods are off-policy methods in the sense that they already work in
an off-policy setting without importance sampling. This is typically the case because
the target doesn't depend on the sampled action at all. For example in the target for
expected Sarsa, we already take an expectation over the action, so the target itself
is independent of the sampled action. Therefore, it doesn't matter which policy we use for sampling,
only which one we use for taking the expectation inside the target.

For such off-policy methods, the expected update is the correct one no matter which
behavior policy we use. If we use importance sampling, we still get the same expected
value, since the importance sampling ratio has an expected value of one. But for those
methods, there is no reason to use it, and since it increases the variance, it would even hurt.

As a final note, what I described is more specifically called _ordinary_ importance sampling.
There is also _weighted_ importance sampling which lowers the variance at the cost of introducing
some bias. Which of those you use is in principle an orthogonal choice to your update
target.


## What about function approximation?

So far, we only considered a tabular setting, meaning that the value function estimate
is a lookup table that assigns a value to each state. Our update equation reflects this:
the $\gets$ in
$$
V(S_t) \gets V(S_t) + \alpha(\text{target} - V(S_t))
$$
only makes sense if we can assign any value to any state.

If the state space is too large or even infinite, this won't work. Instead, we need to
limit ourselves to some family of functions and want to pick one among those that approximates the
true $v_\pi$ as well as possible. We can then write the value estimate as a function
$\hat{v}(s, w)$ of the state $s$ and a parameter $w$. We can't set $\hat{v}$ itself anymore, only $w$.
I'm switching from $V$ to $\hat{v}$ only to avoid confusion between tabular and non-tabular
value functions, there's no other difference.

I won't cover many of the theoretical aspects that arise in this setting, such as convergence
guarantees, because that's a big topic in itself. But as long as we focus on just describing
the various methods, rather than on their theoretical properties, function approximation
doesn't require many changes to our framework.

The ideal update would still be
$$
\hat{v}(s, w) \gets \hat{v}(s, w) + \alpha(\text{target} - \hat{v}(s, w))
$$
but that doesn't work anymore because we can only choose $w$ directly.
Instead, we introduce a new update rule that works on $w$ instead of
on the value function itself:
$$
w \gets w + \alpha(\text{target} - \hat{v}(s, w))\nabla_w \hat{v}(s, w)
$$
It contains the gradient of the value function, which we can think of
as being needed for converting between the thing we want to change
($\hat{v}$) and the thing we can directly change ($w$). But other than
that, the update is very similar. In particular, we have the same choices
to make: a learning rate (and how it changes) and the update target.
If we want to use importance sampling, we simply multiply the update
by $\rho_{t:t+n}$ just as before.
So we only need to change the update rule and can then plug in all the same targets as before.
For example, if we use the Q-learning target with this update rule,
we get the basic algorithm underlying DQN.

That isn't to say that there aren't any other choices that need to be made
when using function approximation. To name just a few important ones:

-   We need to choose the parameterized family of functions that we use
    for $\hat{v}$. In Deep RL, this is a neural network, which means that
    there are many, many options to choose from.
-   The update rule for $w$ above isn't the only one we can use. Chapter 11
    of Sutton's and Barto's [book on RL](http://incompleteideas.net/book/the-book.html) contains details on the various choices
    and the issues associated with them but that's beyond the scope of this post.
    Besides what's listed there, we can also choose more complex optimizers.
    Our update rule can be interpreted as SGD on the squared value error,
    so you could instead use SGD with momentum, Adam, or whatever your
    favorite optimizer is.
-   We haven't really talked about where the samples that we're using to update
    are coming from. The theoretically simplest case is to always
    sample new actions after the policy is updated. But in practice, you might
    for example want to use a replay buffer instead.

These are the kinds of things that get us from an update rule plus a target
to a full practical method such as DQN. We could try to incorporate as many
of them as possible into our framework but I'm not sure how useful that
would be. In any case, they are arguably not really building blocks of
reinforcement learning in particular; most of them are more generally
about designing and optimizing deep neural networks.

So when we go from tabular RL to function approximation, we get many new choices
on top of the ones we already need to make in a tabular setting. But the building
blocks we've seen for tabular methods, such as update targets or importance
sampling, persist essentially unchanged.


## Summary: building blocks for value-based methods

To summarize, these are the main building blocks for (tabular) value-based methods:

-   The target for the update: this is something that should be a better estimate
    of the true value function $v_\pi$ than the current estimate. Examples include TD(0)
    (including Sarsa), Monte Carlo, expected Sarsa, Q-learning and n-step TD targets
-   Importance sampling: there isn't too much choice here. If the target depends on the taken action(s)
    and the behavior policy differs from the target policy, you need importance sampling. Otherwise
    there's no reason to use it. But as mentioned, you can at least choose between ordinary
    and weighted importance sampling.
-   The learning rate: could just be a fixed learning rate but might also decay over time
-   How to improve the policy: remember that GPI consists of a policy evaluation step where we
    try to find $q_\pi$, and a policy improvement step where we use our estimate of the value
    function to update the policy. This improved policy might for example be $\varepsilon$-greedy
    with respect to our estimate but there are other options

All of these are in principle independent choices: some combinations might work together
better than others but choosing one option in each of these dimensions does give a valid
RL algorithm.

In a function approximation setting, and in Deep RL in particular, we also need to make
many "engineering choices". These are certainly important and can determine whether
an algorithm works really well or doesn't even converge. But what I have hopefully convinced
you of is that all the core building blocks from tabular RL appear in essentially the same
way in deep RL and really are fundamental "building blocks".

Next up: [Part 2](/post/rl-building-blocks-2), where we will apply a similar breakdown to policy optimization methods.

[^1]: or expected Sarsa, they are the same for a deterministic policy
