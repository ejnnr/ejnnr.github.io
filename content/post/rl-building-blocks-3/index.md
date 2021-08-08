+++
title = "Building Blocks of RL Part III: Model-based RL"
summary = """
  Reinforcement Learning consists of a few key building blocks that can be combined to create
  many of the well-known algorithms. Framing RL in terms of these building blocks
  can give a good overview and better understanding of these algorithms. This is
  the conclusion of a series with such an overview, covering model-based RL.
  """
date = 2021-02-24T10:41:00+01:00
tags = ["Reinforcement learning"]
draft = false
[image]
  preview_only = "true"
+++

In [Part 1](/post/rl-building-blocks-1) and [Part 2](/post/rl-building-blocks-2), we've seen different methods for learning
good policies. One thing that all of them had in common was that
they only used trajectories sampled from the environment to do so.
This is what's called _model-free_ RL. In this final post, we will
generalize to _model-based_ RL, where we make use of a learned
model of the environment to improve the training process.


## The 10,000-mile satellite's-eye view on RL {#the-10-000-mile-satellite-s-eye-view-on-rl}

From very far away, we can treat all the methods we've previously seen as
functions that map a trajectory and a current parameter to an update for that
parameter. The parameter could describe a value function or a policy.
Training an agent means repeatedly sampling a trajectory, calculating
that update, and updating the parameter.

It will be useful to think about this from the lense of types: an
update method is a function that takes in an object of type "trajectory"
and one of type "parameters" and returns an update of type
\\(\Delta\text{parameters}\\)[^fn:1]:
\\[\text{trajectory} \times \text{parameters} \to \Delta\text{parameters}\\]
Often, we can decompose this function. For example, a 1-step method
such as Sarsa calculates update based on individual \\((s, a, r, s, a)\\)
tuples, which we'll call "experience". So Sarsa really defines a function
with signature
\\[\text{experience} \times \text{parameters} \to \Delta\text{parameters}\\]
We then get the function signature from above by splitting up a trajectory
into its underlying experience tuples, applying the Sarsa update to each
one, and summing the results. This is a simple example but it illustrates the main idea of this post:
to compose small functions in different ways in order to get complete
RL algorithms.

As a slightly more complex example, consider Actor-Critic methods.
We use a policy optimization method (the _actor_) with a signature such as
\\[A: \text{trajectory} \times \text{actor-param} \times \text{V-function} \to \Delta\text{actor-param}\\]
At the same time, we use some method for learning value functions,
which has the signature
\\[C: \text{trajectory} \times \text{critic-param} \to \Delta\text{critic-param}\\]
And finally the model for the critic, which can be written as
\\[V: \text{critic-param} \to \text{V-function}\\]
We can combine these functions using some pretty simple boilerplate code,
to get a function with the
\\(\text{trajectory} \times \text{params} \to \Delta\text{params}\\)
signature that we want, where \\(\text{params} := \text{actor-param} \times \text{critic-param}\\)
is the type of the complete collection of parameters.
In Python, this might look as follows:

```python
def train(trajectory, params):
    actor_param, critic_param = params
    v_function = V(critic_param)
    actor_update = A(trajectory, actor_param, v_function)
    critic_update = C(trajectory, critic_param)
    return (actor_update, critic_update)
```

```text
None
```

You should read this more as pseudo-code: the point is not that we would
actually implement an agent exactly like this, but just to show how these
individual functions come together to define an update for the entire
agent.

The code above is completely agnostic to the choice of \\(A, C\\) and \\(V\\),
which is an important point throughout this post: we only care about the function
signatures of the methods we use as building blocks, not about how they
work internally.


## A complete training loop {#a-complete-training-loop}

Our ultimate goal is not to compute updates but to find a good policy. For that
we need two more components. First, a function
\\[\text{parameters} \to \text{policy}\\]
In the case of policy optimization methods, this is simply the parameterization
of the policy, i.e. the model of the actor. If we use value-based methods,
this can instead be decomposed into the value model
\\[\text{parameters} \to \text{Q-function}\\]
and a function that determines the policy based on the Q-estimate, e.g. an \\(\varepsilon\\)-greedy
policy,
\\[\text{Q-function} \to \text{policy}\\]

The second thing we need is a function that samples trajectories -- this is
the role of the environment:
\\[\text{policy} \to \text{trajectory}\\]
Then we can combine all of these into one function with the signature[^fn:2]
\\[\text{parameters} \to \text{policy}\\]
which takes initial parameter values and then trains a policy (until convergence
or some stopping criterion).


## Modeling the environment {#modeling-the-environment}

The only role played by the environment in our training algorithm is
to provide a function
\\[\text{policy} \to \text{trajectory}\\]
for sampling trajectories. But remember our motto: we only care about
function signatures, not the internals of the functions themselves.
So if we can define a function like that in some other way, we can plug
it into our training algorithm without changing anything else.

Before we discuss how to define such a function, let's first take a step
back and consider how this signature is actually implemented by the
environment. An environment is defined by its transition probabilities
\\[p(s', r|s, a)\\]
i.e. the probability that the next state will be \\(s'\\) and the reward \\(r\\)
if action \\(a\\) is taken in state \\(s\\). So this defines a function
\\[\text{state} \times \text{action} \to D(\text{state} \times \text{reward})\\]
where \\(D(\cdot)\\) denotes distributions with values of a given type.
We can call this the _distributional_ function defined by the environment.

We can sample from distributions, meaning we have a function \\(D(x) \to x\\)
for any type \\(x\\). By composing this with the environment function, we get
the signature
\\[\text{state} \times \text{action} \to \text{state} \times \text{reward}\\]
which we'll call the _sample_ function induced by the distributional function
from above.

The policy type is not an atomic type, it can itself be written as
\\[\text{state} \to D(\text{action})\\]
and by composing with the sampling map, defines a function \\(\text{state} \to \text{action}\\).
That makes it clear how we can get the desired signature \\(\text{policy} \to \text{trajectory}\\)
from the sample function. We start with some initial state (perhaps also
sampled from a distribution), then apply the policy to get an action, then
apply the environment function to get a reward and a new state. Repeat until
the episode ends.

So an environment defines three different functions:

-   Distributional function: \\(\text{state} \times \text{action} \to D(\text{state} \times \text{reward})\\)
-   Sample function: \\(\text{state} \times \text{action} \to \text{state} \times \text{reward}\\)
-   Trajectory function: \\(\text{policy} \to \text{trajectory}\\)

where each one is induced by the one above it in a natural way.

This gives us three different levels on which our environment model
could work: we could model any of these three functions and will at
the end get out a trajectory model \\(\text{policy} \to \text{trajectory}\\)
to plug into our training algorithm. That said, if we have a distributional
or sample model, we can do somewhat more clever things
with that, which we'll talk about in a moment.


## Where do models come from? {#where-do-models-come-from}

We've seen how we can plug in models into the training loop to replace
the role of the environment. This will always give us a valid method (in the
sense that it doesn't have type errors) but that method will only be useful
to the extent to which the model matches the environment.

So how do we get a good model? In some cases it might be feasible to
hard-code one. More generally, we can treat this as a supervised learning
problem. In that case, we use the real environment to gather trajectories
and then use those trajectories to train our model. We can then either
use only the model to train the agent, or use both real and simulated
trajectories for that.

This means we need to extend the training loop, which now also
has to train the model. This is where we make choices such as how
many trajectories to simulate per real trajectory that trains the model
etc.


## What else can we do with models? {#what-else-can-we-do-with-models}

As hinted before, using a model to replace the environment
(by simulating trajectories) is only one of many applications.

First, let's consider sample models (i.e. models that can
generate \\((s', r)\\) tuples for any state-action input). As we saw
at the beginning of this post, many RL methods don't need entire
trajectories to learn, they instead work on smaller sequences of
experience tuples. For example, 1-step methods compute
updates based on single \\((s, a, r, s, a)\\) tuples. One immediate consequence
is that we don't need to simulate an entire trajectory before updating
the policy or value function, we can do so after however many
experience tuples we want.

A more interesting advantage of such methods is that we can
use _prioritized sweeping_. We saw that a sample model can create
trajectories by using its output state as the next input.
But no one is forcing us to use that state
as the input! Instead of sampling cohesive trajectories,
we can at each step sample experience tuples for those states or state-action
pairs where we're most uncertain (e.g. as measured by the size
of the last update for those states).

Distributional models allow us to do even more. In particular, we
can apply dynamic programming techniques (value or policy iteration),
which we briefly mentioned in Part 1. You may also recall that for
control, we usually need to learn Q-functions, because a V-function
on its own doesn't tell us which actions are good. But if we have
a distributional model of the environment, then we can turn
a V-function into a Q-function by taking the expectation over next
states and rewards for any given action. So this is one of the rare
cases where learning a V-function is enough to find a good policy.
And of course since a distributional
model induces a sample model, the ideas we saw above still work.

Finally, we can use models during decision time. That means we don't
(just) use a model to _learn_ the policy -- instead, the policy itself
makes use of the model. Concretely, we can do a search over possible
actions, use the model to predict what would happen in each case, and
then use that to improve our estimate of how good an action is.
Monte Carlo Tree Search is one instance of that and works with any
sample model.


## Conclusion {#conclusion}

We've seen three different types of environment models: distributional
models, sample models and trajectory models. Each of those can
create trajectories for a given policy and thus replace the role of the environment
in any RL algorithm. But distributional and sample models allow
us to do additional things that are not possible otherwise.

This post also marks the end of the _Building Blocks_ series. The framework
of composing functions based on their signatures hopefully sheds
some light onto how all of these building blocks fit together.
It also demonstrates that the perspective of atomic building blocks
can be applied on multiple levels: the previous posts showed how
building blocks such as certain update targets can be combined
to define different functions for mapping experience or trajectories
to updates for value functions or policies. This post showed
that these functions are themselves building blocks for complete
training loops and can be composed in different ways with models
and sampling procedures.

[^fn:1]: Since parameters in deep learning are usually vectors, there isn't any formal difference between a parameter and a change of a parameter. But we'll still distinguish them because there is a big _conceptual_ difference and because it's more general that way.
[^fn:2]: Usually, the type \\(A \to B\\) refers to _pure_ functions that map objects with type \\(A\\) to type \\(B\\). I use it slightly differently to also include stochastic functions, which have a random output of type \\(B\\). For example, the sampled trajectory is not a deterministic function of the policy, it will instead be different each time the sampling function is applied.
