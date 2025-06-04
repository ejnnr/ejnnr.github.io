---
title: Asymmetry between position and momentum in physics
summary: "  In both classical mechanics and QM, there are transformations between\
  \ position-based\n  and momentum-based representations that preserve the dynamical\
  \ laws. So from\n  a mathematical perspective, position and momentum seem to play\
  \ equivalent roles\n  in physics. But they don't play equivalent roles in our cognition,\
  \ which is part of\n  the physical universe -- seemingly a paradox.\n  "
date: 2021-01-19 10:52:00+01:00
tags:
- Physics
draft: false
image:
  preview_only: 'true'
---

_Epistemic status: thinking out loud, not an expert on physics_

In physics, there appears to be a deep duality between position and momentum,
in the sense that they are largely equivalent perspectives on viewing the same system.
In classical mechanics, $x \mapsto p$ and $p \mapsto -x$ is a canonical transformation,
which means that treating momentum as position and position as negative momentum
results in unchanged dynamics.
In quantum mechanics, the roles of position and momentum can be similarly switched
with a change of basis.

So mathematically speaking, it would appear that there is nothing special about either
position or momentum, both yield similar and equally good descriptions. And yet, human
cognition treats position and momentum very differently, they don't _feel_ like dual descriptions
of reality. To us, there is a big difference between a car that is close to us and moving with a
high relative velocity (distant in momentum space) and one that is far away and more or less
stationary with respect to us.

But human cognition runs on brains, which run on physics, which seems to treat
position and momentum equivalently. So how can this be? How does the
cognitive asymmetry arise from what seems to be symmetry on the fundamental physical
level?

The motivation for this post is mostly to point out the question. I'm not sure myself what the answer is
but I'll at least give my guesses below.


## False assumptions

I've said that human cognition "runs on brains", which "run on physics" and the argument
loses a lot of its punch if this assumption is false. Cognition not running
on physics could mean something like a fundamental Cartesian distinction between body and
mind. That doesn't answer why humans perceive two things differently that appear to be
equivalent in physics but at least that fact doesn't seem as paradoxical anymore.

There's also the possibility that cognition does run on physics but uses physics we don't
know of yet, and in which there is a fundamental difference between position and momentum
that our cognition exploits.

I think that neither of these cases is very likely. If we didn't find any other explanations
for the cognitive difference between position and momentum, then this difference
might be strong evidence for a Cartesian view or for new physics playing a role
in our cognition. But I think there are other, more promising explanations, based
on the observation that while the fundamental physical laws treat position and momentum
the same, the Hamiltonian that happens to govern our universe does not. That's what I'll get to
next.


## Hamiltonian part I: Locality

This explanation is specific for quantum mechanics. So if it turns out to be the
reason for the asymmetry between position and momentum, this would mean
that this feature of our cognition is inherently quantum mechanical and would not
appear in a classical universe.

The Schrödinger equation, which determines the time evolution of a system,
can be written in terms of position as follows:
$$
i\hbar \frac{\partial}{\partial t}\psi(x, t) = \left(-\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2} + V(x)\right)\psi(x, t)
$$
This time evolution is local in the following sense: to calculate $\frac{\partial}{\partial t} \psi(x, t)$,
we only need to know the wave function $\psi$ in an arbitrarily small neighborhood of $x$ (so that
we can calculate its second spatial derivative).

We can also write the Schrödinger equation in terms of momentum:
$$
i\hbar \frac{\partial}{\partial t}\psi(p, t) = \left(\frac{p^2}{2m} + V\left(i\hbar\frac{\partial}{\partial p}\right)\right)\psi(p, t)
$$
What does it mean to plug a derivative into the potential $V$? We'll assume that $V$ is analytic,
which means that it can locally be written as a power series. Then $V\left(i\hbar \frac{\partial}{\partial p}\right)$
is defined by plugging in $i \hbar \frac{\partial}{\partial p}$ into that power series.

If $V$ happens to be a polynomial, this is just a sum of normal differential operators and the time evolution
is local in exactly the same sense as for position. But in general, $V$ can be an infinite power series,
and we will take arbitrarily high derivatives of $\psi$. This means that locality can be violated -- this power
series of derivatives may depend on points that are far away in momentum space[^1]. The most famous example for a power series of differential operators being non-local
is probably the fact that $\exp\left(a \frac{\partial}{\partial x}\right) f(x) = f(x - a)$ (see e.g. [this stackexchange post](https://math.stackexchange.com/questions/1341495/exponential-of-powers-of-the-derivative-operator/1495596)). $f(x - a)$ depends
on the value of $f$ outside a small enough neighborhood (if $a \neq 0$), so in such cases, the time
evolution in terms of position is _not_ local in the sense described above.

This raises the question: where does the asymmetry between these two formulations of the Schrödinger
equation come from? The answer is that it's all the Hamiltonian's fault. The Schrödinger equation can
be written in basis independent form as
$$
i \hbar \frac{\partial}{\partial t} \psi = \hat{H}\psi
$$
where $\hat{H}$ is the Hamiltonian operator. This Hamiltonian usually has the form
$$
\hat{H} = \frac{\hat{p}^2}{2m} + V(\hat{x})
$$
So the asymmetry on the level of the Hamiltonian is that the momentum operator appears as
a second power, whereas the position operator is plugged into the potential, which may be
an infinite power series.

In the position basis, $\hat{p}$ turns into a derivative whereas in the momentum basis, $\hat{x}$
becomes a derivative. This leads our observation that time evolution is local in the position
formulation in a sense that does not hold for momentum.


## Hamiltonian part II: "Weak" locality

In the previous section, we considered only a single particle (though the same asymmetry
applies to multiple particles -- having only a single particle is the weaker assumption). If we have multiple
interacting particles, we get a different sense of locality that doesn't require QM anymore.

At the beginning I mentioned the difference in our cognition between a distant stationary
car and a nearby car that's moving fast. It's very reasonable that we think about these
situations differently: if a car is very far away, it can't interact with us, i.e. hit us.
The same is not true for momentum: if a car is moving very fast, it can still hit us,
even though it is far away in momentum space.

We might call the fact that spatially distant objects tend to interact less "weak locality".
"Weak" because they can still interact, just typically not as much. So position satisfies
weak locality while momentum apparently doesn't.

The reason for that can again be found in the Hamiltonian. For multiple particles $i = 1, \ldots, n$,
the Hamiltonian usually has the form
$$
H = \sum_{i = 1}^n H_i(x_i, p_i) + \sum_{i \neq j} V(|x_i - x_j|)
$$
Here, $x_i, p_i$ are the position and momentum of particle $i$. $H_i$ is the Hamiltonian for
a single particle, which only depends on the position and momentum of that particle. This includes
the kinetic energy and any potentials that are not caused by particle interactions.

The second sum in the Hamiltonian describes the interactions between particles. The way I wrote
it, it can model any pairwise interaction that depends only on the distance between particles.
It so happens that for the forces that actually occur in our universe, the interaction potential $V$
diminishes as the distance between the interacting particles increases. This is what leads to
the weak locality in position space. Since the interaction does not depend on the momenta
of the particles, there is no analogous weak locality for momentum.

As in the previous section, the asymmetry again boils down to the Hamiltonian being
asymmetric in position and momentum. This fits rather well with my own intuition.
For example, in a harmonic oscillator, both position and momentum appear as a second
power in the Hamiltonian, and they really do seem much "more equivalent" there
than in other systems.

But it raises the question why the Hamiltonian has such a form. Classical mechanics
or QM themselves don't have an answer; after all, symmetric Hamiltonians such
as the harmonic oscillator work completely fine in principle, it's just that our universe
isn't a harmonic oscillator. I'm not sure whether QFT can shed light onto this question,
otherwise maybe theories of quantum gravity can. This would likely mean a more
fundamental difference between position and momentum, which in turn leads to
the asymmetry in the Hamiltonian.

Another approach is to say that most possible Hamiltonians aren't symmetric in position and momentum,
so it's not surprising at all that ours isn't. This doesn't feel quite as satisfying and whether
you buy into that argument at all depends on how you think about the "probability" of
physical laws being a certain way. In a similar vein, one could appeal to the anthropic
principle: we can only observe Hamiltonians that permit observers to exist in the
universe they describe. A harmonic oscillator is presumably too simple for that and maybe
the same is true for any Hamiltonian which treats position and momentum exactly
equivalently.

[^1]: I saw this point made in [this comment](https://www.lesswrong.com/posts/XDkeuJTFjM9Y2x6v6/which-basis-is-more-fundamental?commentId=A5Pux22d5QKj58fXi)
