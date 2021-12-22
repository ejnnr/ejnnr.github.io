+++
title = "Potential shaping and discounted calculus on graphs in reinforcement learning"
summary = """
  """
date = 2021-12-11
draft = true
tags = ["Reinforcement learning"]
[image]
  preview_only = "true"
+++

In reinforcement learning, the reward function, together with the transition dynamics
of the MDP, determines what the optimal policies are. The converse is not
true: for any given policy, there are many reward functions that would make this policy
optimal. More interestingly, even if we know the optimal policy for
*all possible transition dynamics*, there is still some ambiguity about the underlying
reward function.

Most notably, we can add any *potential shaping* to a reward function without changing
the set of optimal policies (no matter what the transition dynamics are). For all intents
and purposes, reward functions that differ only by potential shaping are equivalent.

So what is this "potential shaping" thing? It's really quite simple: say we have an
MDP with state space $\mathcal{S}$. We call any function $\Phi: \mathcal{S} \to \mathbb{R}$
on this state space a *potential*. Given any potential $\Phi$, we can then shape a reward
function as follows:
$$r'(s, a, s') := r(s, a, s') + \gamma \Phi(s') - \Phi(s).$$
Here, $r$ is the original reward function and $r'$ is the shaped reward function.
$(s, a, s')$ represents any triple of a state, an action taken in that state,
and the resulting next state. $\gamma$ is the discount factor.

Of course the interesting question is: why does this work? I.e. why should adding
this $\gamma\Phi(s') - \Phi(s)$ term in particular leave optimal policies unchanged?
There's a pretty straightforward calculation showing that this is the case (and we'll
get to that later). But the point of this post is to get a deeper understanding of
what's going on here. And for that, I want to draw a connection to another case where
"potentials" play a big role: in vector calculus.

So let's first review why potentials are important for vector fields and for physics---then
we'll see that potential shaping in reinforcement learning is a very natural generalization
of that!

# Conservative vector fields
Given a vector field $v: \mathbb{R}^2 \to \mathbb{R}^2$, we can define the path integral
of the field along a curve, written
$$\int_L v \cdot \text{ds},$$
where I'm using $L: [0, 1] \to \mathbb{R}^2$ to denote a curve in $\mathbb{R}^2$
(since the usual symbol $\gamma$ will be a discount factor throughout this post).

I suggest you think of $v$ as a force field. In that case, the path integral describes
the total potential energy that is gained or lost when moving along the curve $L$
through this force field.

Vector fields can be *conservative*. This means that the path integral from above only
depends on the endpoints of the curve, i.e. $L(0)$ and $L(1)$, not on any of the intermediate
values. In conservative vector fields, it doesn't matter which path we take,
only where we start and where we end up.

This is a remarkable property! If you just write down a random vector field,
it probably won't be conservative. But there is an easy way to create conservative
vector fields: the gradient field of any scalar field is conservative. In other words,
take any function $\Phi: \mathbb{R}^2 \to \mathbb{R}$. Then the gradient $\nabla \Phi$
is a vector field on $\mathbb{R}^2$, and this vector field is conservative.[^1]

We can be even more precise and say how the integral depends on the end points:
$$\int_L \nabla \Phi \cdot \text{ds} = \Phi(L(1)) - \Phi(L(0)).$$
This is sometimes called the *gradient theorem*, and it's one of the higher-dimensional
generalizations of the fundamental theorem of calculus.

$\Phi$ is called---you guessed it---a *potential* for the vector field $\nabla\Phi$.
So the gradient of a potential has this nice property: its path integrals don't depend
on the precise path we take. We're beginning to see some vague similarity to potential
shaping in RL. But to turn this into a tight analogy, we need to say goodbye to $\mathbb{R}^2$,
and use a different setting: graphs.

# Calculus on graphs
I'll tell you part of where we're going with this: the curve $L$ is going to
correspond to an episode in the reinforcement learning setup (sorry for the
spoiler). But an episode consists of discrete time steps, rather than being
continuous in "time" like a curve. That is why we need a discrete setting, and
it turns out that graphs are perfect because they allow us to adapt all the
familiar concepts from vector calculus.

I'll write $\mathcal{S}$ for the set of nodes of a graph (rather than the more common $V$),
simply because later on, these nodes are going to be states of an MDP. A potential
on a graph is a function $\Phi: \mathcal{S} \to \mathbb{R}$, i.e. exactly the same as
in the reinforcement learning context from the introduction.

Instead of vector fields, we will use functions defined on the edges of the graph.
We will assume a directed graph, where we have a set $E$ of edges, each edge being
a tuple $(s, s')$ of two nodes. A "vector field" on the graph is then a function
$f: E \to \mathbb{R}$. We'll call such functions *edge functions* since they're defined
on edges.

You may be raising your arms in protest at this point:
why should this function map into $\mathbb{R}$, rather than $\mathbb{R}^2$? Where are
the "vectors" supposed to be? The short answer is that this is the concept that we
need to make all analogies fit. The longer answer is in the box below, but feel
free to skip it if you're happy to take my word that this definition will make
everything work out nicely.

{{< spoiler text="Why redefine vector fields this way?" >}}
So first of all: of course these aren't *really* vector fields, but I am claiming
that they are a sensible analog to what vector fields are in a continuum. We'll see some
things that work out nicely in a moment, but here's the basic pitch: in addition
to vector fields, there are also the closely related *covector* fields (or 1-forms).
I claim that functions defined on the edges of a graph are a good analogy for *co*vector
fields (but didn't mention this complication in the main post---on $\mathbb{R}^n$, there's
no real need to distinguish between vector and covector fields anyway).

If we stay with $\mathbb{R}^2$ as our running example, a covector is a linear map
from $\mathbb{R}^2$ to $\mathbb{R}$. In this context, we can simply write it as a
row vector (where "normal" vectors used in vector fields are column vectors).
A covector field is thus just a field of row vectors, i.e. a covector at each point.
Such a covector field lets us turn a vector at any point in $\mathbb{R}^2$ into a real
number.

Now, edges are sort of like vectors situated at a base point. A (directed) edge starts
at some vertex and connects it to another vertex, just like a vector can be placed
at one point and then connects it to a different one. Even more importantly for us,
the neighborhood of a vertex is defined by all the edges it is connected to.
Similarly, all the vectors (up to a certain length) starting at a point define a neighborhood
of that point.

So a function defined on edge space is analogous to a function defined on the space
of vectors situated at base points, in other words, a covector field.
Granted, there are significant differences (for example the missing concept of linearity
in the graph setting). But hopefully using scalar functions on edges for vector fields
makes a bit more sense now.

{{< /spoiler >}}

Just like we can integrate vector fields along curves in the continuum, we can
"integrate" edge functions along discrete paths in graphs. "Integrate" really just
means "sum" here: we define
$$\int_L f := \sum_{i = 1}^T f(L_i),$$
where $L$ is now a directed path in the graph (i.e. a finite sequence of
edges $L_1, \ldots, L_T$, such that the end node of each edge equals the start node of the next).

Finally, we need the gradient. The gradient of a function defines on the vertices
(i.e. a potential) will be an edge function (i.e. a "vector field"):
$$(\nabla \Phi)(s, s') := \Phi(s') - \Phi(s),$$
where the two vertices $(s, s')$ define the edge.
This is tantalizingly close to a potential shaping! There's only a $\gamma$ missing.
So for a moment, let's set $\gamma = 1$ and see where this gets us.

Note that the gradient theorem also holds on graphs:
$$\int_L \nabla \Phi = \sum_{i = 1}^T (\nabla \Phi)(s_i, s_i') = \sum_{i = 1}^T (\Phi(s_i') - \Phi(s_i)).$$
Here, $(s_i, s_i')$ is the $i$-th edge in the path $L$. Because $L$ is a contiguous path,
$s_i' = s_{i + 1}$. This means we get a telescoping sum, and thus all terms but the first and
last one cancel:
$$\int_L \nabla \Phi = \Phi(s_T) - \Phi(s_0).$$

## Potential shaping
Ok, we've assembled enough machinery, let's interpret all of this in the context of
reinforcement learning. As the notation suggests, the vertices of the graph represent
states of an MDP. The edges represent possible transition (so an edge from $s$ to $s'$ means
that we can take some action in $s$ to get to $s'$). We've assumed the reward function
can be written as $r(s, s')$---that's an edge function, aka "vector field" on the graph.
Finally, the thing we want to maximize in RL are returns, i.e.
$$G = \sum_{i = 1}^T r(s_i, s_{i + 1}),$$
where $T$ is the length of the episode. This is just the path integral of the reward function
$r$ along the path defined by an episode.

So what happens when we add a potential shaping to the reward?
Well, since we set $\gamma = 1$, the shaped reward function will be
$$
\begin{aligned}
r'(s, s') &= r(s, s') + \gamma\Phi(s') - \Phi(s)\\\\
          &= r(s, s') + \Phi(s') - \Phi(s)\\\\
          &= r(s, s') + (\nabla\Phi)(s, s').
\end{aligned}
$$
More succinctly, $r' = r + \nabla\Phi$. This means the returns after shaping are
$$G' = \int_L r' = \int_L r + \int_L \nabla\Phi = G + \Phi(s_T) - \Phi(s_0).$$
Because the reward function changed by only a gradient, the returns of any episode
change only by the potential of the first and last state. They don't depend on anything
else happening during the episode.

Now remember what we said at the very beginning: adding a potential shaping
to the reward function doesn't change the optimal policy. To make this true we
need one small assumption: that we have a single final state that all episodes
end in. This is not very restrictive: for any MDP, we can simply add an additional
state that is visited after the episode would otherwise end. Then $s_T$ will always
be this state, so $\Phi(s_T)$ doesn't depend on the policy. Similarly,
the policy has no influence on the initial state $s_0$. In other words, the difference
$\Phi(s_T) - \Phi(s_0)$ between the original and shaped returns has the same
expectation for all policies. In other words, a policy maximizes expected returns
according to the original reward function if and only if it does so for the shaped
one.

Note that the crucial step in all of this was the gradient theorem. The fact that
potential shaping doesn't change optimal policies essentially follows from the
fundamental theorem of line integrals!

But recall that we assumed $\gamma = 1$. To drop this assumption, we'll need to
generalize calculus itself. Up next: calculus with discounting.

## Introducing the discount factor
With general $\gamma$, the potential shaping is given by $\gamma\Phi(s') - \Phi(s)$.
So let's just define this as a new differential operator, the "discounted gradient":
$$(\nabla \Phi)(s', s) := \gamma \Phi(s') - \Phi(s).$$
Yes, it would be cleaner to write something like $\nabla_\gamma$, but no, I'm not going
to do that. Unless otherwise specified, $\nabla$ will now always refer to this discounted
version, and we'll just assume one globally fixed value of $\gamma$.

So now we can still write potential shaping as $r' = r + \nabla \Phi$. We can similarly
redefine integrals:
$$\int_\tau r := \sum_{i = 1}^T \gamma^i r(s_i, s_{i + 1}).$$
These are the discounted returns, so we again have $G = \int_\tau r$.

Finally, the crucial ingredient is again the gradient theorem. We need to generalize
it slightly but then it still holds:

**Gradient theorem (discounted version):**
$$\int_\tau \nabla \Phi = \gamma^T \Phi(s_T) - \Phi(s_0).$$
**Proof:**
$$
\begin{aligned}
\int_\tau \nabla \Phi &= \sum_{i = 0}^{T - 1} (\nabla \Phi)(s_i, s_{i + 1})\\\\
&= \sum_{i = 0}^{T - 1} \gamma^i (\gamma\Phi(s_{i + 1}) - \Phi(s_i))\\\\
&= \sum_{i = 0}^{T - 1} \gamma^{i + 1}\Phi(s_{i + 1}) - \sum_{i = 0}^{T - 1}\gamma^i\Phi(s_i)\\\\
&= \sum_{i = 1}^T \gamma^i\Phi(s_i) - \sum_{i = 0}^{T - 1}\gamma^i\Phi(s_i)\\\\
&= \gamma^T\Phi(s_T) - \Phi(s_0).
\end{aligned}
$$

From the gradient theorem, it follows again that potential shaping doesn't change
the optimal policy, along the same lines as before. There is one additional
complication---if episodes can have variable lengths, then $\gamma^T$ may be influenced
by the policy. The easiest way to deal with this is to just assume that
episodes are infinite, i.e. $T = \infty$ (which we can always achieve by introducing
an absorbing state).

That concludes our discussion of potential shaping. We've seen that potential shaping
works essentially because it is a "conservative vector field"---we only need to change
the setting from the continuum to graphs and then generalize calculus by introducing
discounting.

## Time derivatives and potential shaping as a gauge transformation
*(This section requires some knowledge of classical physics, which I won't review here.
If nothing makes sense, skip to the next section.)*

Our interpretation of the returns as a path integral suggests another analogy:
if we think of the reward function as a Lagrangian of a physical system, then
the returns become the action of that system. By Hamilton's principle, a physical
system will follow a trajectory for which the action is stationary.
Similarly, an optimal policy will follow a trajectory for which
the returns are maximal (and in particular stationary).

{{< spoiler text="Proof of stationarity of returns" >}}
TODO: write this (and check whether it's correct)
Goal is
$$\frac{\partial G}{\partial \pi}\Bigg|_{\pi^*} = 0$$
Here, the policy is understood as a probability distribution so that the derivative
makes (at least intuitive) sense.

Actually, this is just false I think (the issue is that the policy is already
deterministic, so at the edge, which is why the derivative doesn't have to
be zero (and typically won't be)).

Also, to make the analogy tighter, we should take the derivative with respect to the
trajectory. Not sure if/how that works.

{{< /spoiler >}}

What is potential shaping under this analogy? Well, in physics, we can apply a gauge
transformation to the Lagrangian, which changes the action only by a constant and thus
doesn't affect the system's trajectory. That's the same as potential shaping!

So to summarize, here's our analogy:
- **Reward function = Lagrangian**
- **Returns = Action**
- **Optimal policy = Physical trajectory**
- **Potential shaping = Gauge transformation**

But there's one slight hitch: we've seen that potential shaping consists of adding
a gradient to the reward function. In contrast, gauge transformations of the Lagrangian
add a *total time derivative* of any function. What's going on here?

Let's begin by defining discounted time derivatives. We don't need graphs for this;
we just have a discrete function $f: \{0, \ldots, T\} \to \mathbb{R}$. Then we define
$$\frac{df}{dt}(t) = \gamma f(t + 1) - f(t).$$

This works well together with our definitions so far: We can define integrals as
$$\int_0^T f(t)dt = \sum_{t = 0}^{T - 1} \gamma^t f(t).$$
It's easy to check that this satisfies a discounted fundamental theorem of calculus,
i.e.
$$\int_0^T \frac{df}{dt}(t) dt = \gamma{T}f(T) - f(0).$$
So this is a natural definition of the integral given our definition of time
derivatives. The point now is that this integral is compatible with our path
integral. More precisely, we can write the path integral as
$$\int_\tau f = \int_0^T f(s_t) dt.$$

This fundamental theorem for time integrals implies that we may add a total time derivative
of any function $\Phi(s_t, t)$ to the reward function, and will only change the
returns by a constant. Just like gauge transformations and Lagrangians!

This total time derivative is, by our definition,
$$\frac{d\Phi(s_t, t)}{dt} = \gamma\Phi(s_{t + 1}, t + 1) - \Phi(s_t, t).$$
First, note that we can choose a time-independent function $\Phi$. Then
the total time derivative is simply the gradient of $\Phi$, and we recover
potential shaping. So potential shaping is a special case of adding a total
time derivative to the reward function!

Also note that we've just generalized potential shaping to time-dependent potentials.
The reason this transformation isn't usually discussed in reinforcement learning
is that it only makes sense if we allow reward functions $r(s, s', t)$ with explicit
time dependency.

With that, we'll end our excursion into Lagrangian mechanics.

# Open questions
## Discounted calculus in the continuum
We can define the path integral as
$$\int_L v \cdot \text{ds} := \int_0^1 \gamma^t v(L(t)) \cdot \dot{L}(t)dt$$
(note the additional $\gamma^t$ factor). Similarly, we can define directional derivatives
as
$$D_v f(x) := \lim_{\varepsilon \to 0} \frac{\gamma^\varepsilon f(x + \varepsilon v) - f(x)}{\varepsilon}.$$
Does the gradient theorem still hold then?

## Weighted edges
These could for example be transition probabilities. Do we get anything interesting
that way?

## Discounted divergence and Laplacian
Do they have any interesting meaning? For example, the Laplacian matrix of a graph
has interesting properties. Is it also interesting from an RL perspective?

## Other notes
- EPIC uses a form of "gauge fixing" to get a canonically shaped reward (similar to Lorenz gauge
  etc. in physics)

[^1]: As an aside, the converse is also true: *only* gradient fields are conservative.
This gives some justification to the claim that "most" vector fields are not conservative,
since the space of functions $\mathbb{R}^2 \to \mathbb{R}^2$ is much "larger" than if we map
only into $\mathbb{R}$.