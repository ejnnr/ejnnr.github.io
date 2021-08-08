+++
title = "Building Blocks of RL Part II: Policy Optimization"
summary = """
  Reinforcement Learning consists of a few key building blocks that can be combined to create
  many of the well-known algorithms. Framing RL in terms of these building blocks
  can give a good overview and better understanding of these algorithms. This is part 2
  of a series with such an overview, covering some policy optimization methods.
  """
date = 2021-02-03T07:39:00+01:00
tags = ["Reinforcement learning"]
draft = false
[image]
  preview_only = "true"
+++

_This is part 2 of a three-part series. [Part 1](/post/rl-building-blocks-1) covered value-based methods and
also gave some introduction and defined some notation. [Part 3](/post/rl-building-blocks-3) will cover model-based RL._

So far, we have looked at the building blocks necessary to learn value functions
for a given policy, called policy evaluation. We have also seen that with GPI, we can use policy evaluation
for control, i.e. to find optimal value functions. The policy was always derived
from the value function, by picking actions (\\(\varepsilon\\)-)greedily.

In this post, we take a more direct approach to control: what we really
want to learn is a good policy, so why not optimize the policy directly, without
the detour of learning a value function?


## Policy optimization and policy gradient methods {#policy-optimization-and-policy-gradient-methods}

Policy optimization in general means that we have a parameterized
family of policies \\(\pi\_\theta(a|s)\\) and want to maximize the expected
return with respect to the parameters \\(\theta\\):
\\[\operatorname\*{argmax}\_{\theta} J(\theta)\\]
where \\(J\\) is the expected return:
\\[J(\theta) := \mathbb{E}\_{\tau \sim \pi\_\theta, \mu} R(\tau)\\]
Here \\(\tau\\) is a trajectory which is sampled using the initial state distribution
\\(\mu\\) and policy \\(\pi\_\theta\\). \\(R(\tau)\\) is the return of that trajectory.

In principle, there are many ways we could solve this optimization problem.
For example, we could perform a grid search over parameters \\(\theta\\) and evaluate
the expected return for each parameter by sampling lots of episodes. But this
wouldn't scale well (\\(\theta\\) might very well be a vector with millions of dimensions
if we use Deep RL). In practice, most methods instead use stochastic gradient
ascent or variations thereof and that is all we will cover in this post.

One sidenote before we dive in: why do we use a parameterized policy at
all? For value-based methods, we started in a tabular setting, where we
could directly assign values to each state. The difference is that even
in a tabular setting, the policy is not an arbitrary function
-- it has to be normalized over actions. So we can't just update a single
probability \\(\pi(a|s)\\) without also adjusting others.


## Some theory: the policy gradient theorem {#some-theory-the-policy-gradient-theorem}

If you're only interested in a description of some policy optimization methods, you can
skip this and the next section. But it sheds some light onto why these methods are designed
the way they are and why they work.

We want to optimize the expected return \\(J(\theta)\\). To see what that entails, we can
write it out explicitly as
\\[J(\theta) := \sum\_{s \in \mathcal{S}} \mu^{\pi\_\theta}(s) \sum\_{a \in \mathcal{A}} q^{\pi\_\theta}(s, a) \pi\_\theta(a|s)\\]
where \\(\mu^\pi\\) is the on-policy state distribution of \\(\pi\\). To optimize
this function using gradient ascent, we need to find \\(\nabla\_\theta J(\theta)\\).
But finding the gradient of \\(\mu^{\pi\_\theta}\\) with respect to \\(\theta\\) is not really possible
if we don't know the dynamics of the environment.

Fortunately, the policy gradient theorem comes to the rescue. It states
that
\\[\nabla\_\theta J(\theta) \propto \sum\_{s \in \mathcal{S}} \mu^{\pi\_\theta}(s) \sum\_{a \in \mathcal{A}} q^{\pi\_\theta}(s, a) \nabla\_\theta \pi\_\theta(a|s) \\]
i.e. we can just apply the gradient to the policy itself and don't need to know
how the state distribution depends on the policy. Section 13.2 of
[Sutton and Barto's textbook](http://incompleteideas.net/book/the-book.html) contains more details and a proof.

Another very useful fact is that we can subtract a baseline from the state value:
\\[\nabla\_\theta J(\theta) \propto \sum\_{s \in \mathcal{S}} \mu^{\pi\_\theta}(s) \sum\_{a \in \mathcal{A}} \left(q^{\pi\_\theta}(s, a) - b(s)\right) \nabla\_\theta \pi\_\theta(a|s) \\]
(the only difference to the previous equation is the \\(- b(s)\\) term).
This fact is also sometimes called the policy gradient theorem. \\(b(s)\\) may be any function
or random variable, as long as it doesn't depend on \\(a\\).


## More theory: score function estimators {#more-theory-score-function-estimators}

Typically, we will still be unable to evaluate the gradient
\\[\nabla\_\theta J(\theta) \propto \sum\_{s \in \mathcal{S}} \mu^{\pi\_\theta}(s) \sum\_{a \in \mathcal{A}} q^{\pi\_\theta}(s, a) \nabla\_\theta \pi\_\theta(a|s) \\]
analytically. Some types of gradients of an expected value
can be estimated by sampling:
\\[\nabla\_x \mathbb{E}\_{x \sim p} f(x) = \mathbb{E}\_{x \sim p} \nabla\_x f(x)\\]
so if we can sample from \\(p\\) and can calculate \\(\nabla f(x)\\), we can
estimate this gradient. But our case is different: ignoring the expectation
over states (which doesn't pose a problem), we want to evaluate a gradient
of the form
\\[\nabla\_\theta \mathbb{E}\_{a \sim \pi\_\theta(a)} f(a)\\]
The variable \\(\theta\\), with respect to which we differentiate, appears in the
distribution, so we can't just approximate this gradient by sampling as
we did in the other case.

Gradients of this form (called _stochastic gradients_) appear often in machine
learning, not just in RL. One method to calculate them is the reparameterization
trick, which you might know from variational autoencoders, but that requires
assumptions that often aren't met in RL. What we will use instead is
the REINFORCE method or _score function estimation_.
We can use the fact that \\(\nabla g(x) = g(x) \nabla \log g(x)\\) for any \\(g\\) and write
\\[\nabla\_\theta \mathbb{E}\_{a \sim \pi\_\theta} f(a) = \int\_a f(a)\nabla \pi\_\theta(a) da
= \int\_a \pi\_\theta(a) f(a) \nabla \log \pi\_\theta(a) da = \mathbb{E}\_{a \sim \pi\_\theta} \left[f(a)\nabla \log \pi\_\theta(a)\right]\\]
The right hand side has the form we can deal with: an expectation over
some term, with a probability distribution we can sample from.
As long as we can evaluate \\(\nabla \log \pi\_\theta\\), we can now estimate
the gradient we need.

Recall that \\(f(s, a) = q^{\pi\_\theta}(s, a) - b(s)\\) where \\(b\\) is an arbitrary
baseline. But more generally, we can use any function \\(f(s, a)\\) which has
\\(q^{\pi\_\theta}(s, a) - b(s)\\) as its expected value, and we will get an unbiased
estimator for the gradient \\(\nabla J(\theta)\\). Keep this in mind and the various
update targets we will soon see should make sense.


## The general formula {#the-general-formula}

Similar to value-based methods, we can generate many algorithms
for policy optimization using a single update equation.

Using the estimator for the gradient \\(\nabla J\\), we can learn
the parameter \\(\theta\\) of the policy with stochastic gradient ascent.
We will use samples \\(s\_1, a\_1, r\_2, s\_2, a\_2, \ldots\\) and then
update according to
\\[\theta \gets \theta + \alpha \sum\_t \Psi\_t \nabla \log p\_\theta(a\_t|s\_t)\\]
where \\(\Psi\_t\\) is some estimate of \\(q^{\pi\_\theta}(s\_t, a\_t)\\) and \\(\alpha\\) is a learning rate.

Later, we will generalize this to
\\[\theta \gets \theta + \alpha \sum\_t \Psi\_t g\_t\\]
where the gradient \\(\nabla \log \pi\_\theta\\) is replaced by a more
general vector \\(g\_t\\) that determines the direction of the update.

In the next section, we cover possible choices for \\(\Psi\_t\\), and in the
section after that we will look at choices for \\(g\_t\\).


## Targets {#targets}

Recall from the section on score function estimators that \\(\Psi\_t\\)
should be an estimate of \\(q^{\pi\_\theta}(s\_t, a\_t)\\).
This means that we can use many of the targets we've already seen in part 1.
In addition, we can subtract a _baseline_ \\(b(s\_t)\\) without changing
the expected value of the update. In principle, \\(b(s\_t\\)) can be any function
of the state, but to reduce variance as much as possible, we usually use a learned
state-value function, leading to so-called Actor-Critic methods. The baseline
can be learned using any of the methods for learning \\(v\_\pi\\) from part 1 (or other policy evaluation
methods).

Here then are typical targets we can use:

Monte Carlo
: \\(\Psi\_t = G\_0\\) or \\(\Psi\_t = G\_t\\) i.e. total or future return

MC with baseline
: \\(\Psi\_t = G\_0 - V(s\_t)\\) or \\(\Psi\_t = G\_t - V(s\_t)\\)

n-step TD with baseline
: \\(\Psi\_t = G\_{t:t+n} - V(s\_t)\\) (of course the baseline is optional)

Generalized Advantage Estimation
: \\(\Psi\_t = G\_t^{\lambda} - V(s\_t)\\) where
    \\[G\_t^{\lambda} := (1 - \lambda) \sum\_{n = 1}^\infty \lambda^{n - 1} G\_{t:t + n}\\]
    is the \\(\lambda\\)-return. This is the TD(\\(\lambda\\)) target with a baseline (which again
    is in principle optional but helps to reduce variance)

This is where the "building blocks" perspective really starts paying off: value-based
methods and policy optimization are very different approaches in terms of their
large-scale design, but on a smaller level, they are composed of some of the same
parts.


## Updating methods: VPG, NPG, TRPO {#updating-methods-vpg-npg-trpo}

As promised, we can not only choose the target \\(\Psi\_t\\) but also
have some freedom when it comes to the vector \\(g\_t\\) in whose
direction we update the parameter \\(\theta\\).

The simplest option is Vanilla policy gradient (VPG), which uses
\\(g\_t = \nabla \log \pi\_\theta(a\_t|s\_t)\\). This is what we've already seen,
it corresponds to stochastic gradient ascent on \\(J(\theta)\\).

But this simple method has its drawbacks: gradient descent leads
to small changes in the parameter \\(\theta\\), but it doesn't make
any guarantees about the changes in the policy \\(\pi\\) itself. If the
policy is very sensitive to the parameter around some value \\(\theta\_0\\),
then taking a gradient step from there might change the policy a lot
and actually make it worse. To avoid that, we'll need to use a small
learning rate, which slows down convergence.

The solution is to use the Natural Policy Gradient (NPG[^fn:1]) instead of
the usual gradient. Instead of limiting the size of the step in parameter
space, it directly limits the change of the policy at each step (well, not
really[^fn:2]
but that's the intuition).
Natural gradients are a general method for finding optimal probability distributions,
not specific to Reinforcement Learning,
but NPG is probably their most well-known application.

Computationally, the natural gradient is just the normal gradient multiplied by
the inverse Fisher matrix \\(F^{-1}\\) of the policy. If you want to know
more, [the Scholarpedia article](http://www.scholarpedia.org/article/Policy%5Fgradient%5Fmethods#Natural%5FPolicy%5FGradients) has some details.

For both of these methods, we use a constant learning rate \\(\alpha\\)
(or one that is adapted using a fixed schedule, \\(\alpha = \alpha(t)\\)).
The update vector \\(g\_t\\) is given by:

VPG
: \\(g\_t = \nabla \log \pi\_\theta(a\_t|s\_t)\\)

NPG
: \\(g\_t = F^{-1} \nabla \log \pi\_\theta(a\_t|s\_t)\\)
    where \\(F\\) is the Fisher matrix of the policy

A third option is Trust-Region Policy Optimization (TRPO)[^fn:3].
The motivation is similar to that of NPG: limit how much the policy changes (in terms of the
KL divergence). But it takes that idea further and actually guarantees
an upper bound on how much the policy will change.

We can fit TRPO into our framework by using the same update vector as NPG
with a learning rate that adapts at each step:

TRPO
: \\(g\_t = F^{-1} \nabla \log \pi\_\theta(a\_t|s\_t)\\) and the adaptive learning rate
    \\(\alpha = \beta^j \sqrt{\frac{2\delta}{\tilde{g} F^{-1} \tilde{g}}}\\)
    where \\(\tilde{g} := \Psi\_t g\_t\\)

    \\(\beta \in (0, 1)\\) and \\(\delta\\) are hyperparameters and \\(j \in \mathbb{N}\_0\\)
    is chosen minimally such that a constraint on the KL divergence between old and
    new policy is satisfied

Each of these updating methods can be combined with any of the targets,
yielding a 2D grid of algorithms. In practice, some combinations are of course
preferred, for example TRPO is typically used together with GAE. But these
two aren't connected in a fundamental way, it's simply a choice that works
well.


## Conclusion {#conclusion}

We've seen that just like for value-based methods, we can get many different
policy optimization methods by plugging in different terms into a single
update equation. Moreover, the targets we can plug in aren't new: we've
used them for value-based methods too.

On the other hand, we've of course only scratched the surface when it comes
to policy optimization methods. For example, we didn't look at deterministic policy
gradients or at PPO. And admittedly these methods don't fit into the framework
presented here as neatly as the ones we did consider. Furthermore, as I already discussed
in Part 1, there are many details that determine whether a method will actually
work in practice that we didn't consider at all.

So I don't want to create the false impression that all of policy optimization can
be reduced to picking a target and an update vector. My goal is rather to convince
you that thinking of RL methods as a combination of several composable building
blocks is a better mental model than thinking about each method individually.
The methods presented here simply fit this mental model especially well: you can combine
any of the targets with any of the updating methods, so the building blocks are
in some sense independent pieces.

Next up: [Part 3](/post/rl-building-blocks-3) which discusses model-based RL and concludes this series.


## Resources {#resources}

-   [Spinning Up](https://spinningup.openai.com/en/latest/index.html) by OpenAI has explanations and implementations for several policy optimization
    algorithms. If you'd like a more practical perspective, this is a good place to start
-   Lilian Weng has a long [list of many policy gradient methods](https://lilianweng.github.io/lil-log/2018/04/08/policy-gradient-algorithms.html) that might serve as an overview
    or as a quick reference for how a given method works
-   More on score function estimators: <http://stillbreeze.github.io/REINFORCE-vs-Reparameterization-trick/>
    and <http://blog.shakirm.com/2015/11/machine-learning-trick-of-the-day-5-log-derivative-trick/>

[^fn:1]: Sham Kakade, 2001. [(pdf link)](https://proceedings.neurips.cc/paper/2001/file/4b86abe48d358ecf194c56c69108433e-Paper.pdf)
[^fn:2]: Vanilla gradient descent can be interpreted as follows: we want to find \\(\Delta \theta\\) such that \\(J(\theta + \Delta \theta)\\) is maximized, but under the constraint that the update isn't too large, \\(\Vert\Delta \theta\Vert\_2 \leq c\\). As \\(c\\) gets smaller, the optimal update \\(\Delta \theta\\) aligns more and more with the gradient \\(\nabla J(\theta)\\). NPG does the same using the Kullback-Leibler divergence between \\(\pi\_\theta\\) and \\(\pi\_{\theta + \Delta \theta}\\) instead of the \\(L^2\\) distance between the parameters. So _infinitesimally_ (i.e. as the learning rate approaches zero), it limits the change in the policy, but it doesn't actually give any guarantees in the finite regime.
[^fn:3]: John Schulman et al., 2015. [(arxiv link)](https://arxiv.org/abs/1502.05477)
