+++
title = "Topological perspective on Buridan's principle"
draft = true
[image]
  preview_only = "true"
+++

Buridan's ass is an old and famous conundrum: image a hungry donkey somewhere between
two equally appealing stacks of hay. Naturally, it will choose to go to the stack
that is closest. But what if it is precisely in the middle between the two stacks?
Since there is no reason to prefer one stack over the other, the argument goes,
the donkey will never move and starve because it can't decide.

The conclusion sounds a bit ridiculous but in 1984, Leslie Lamport showed that
under certain assumptions, this really is what must happen. He states [Buridan's principle](https://lamport.azurewebsites.net/pubs/buridan.pdf),
which goes as follows:

<blockquote>

A discrete decision based upon an input having a continuous range of values
cannot be made within a bounded length of time.

</blockquote>

In the case of Buridan's ass, the donkey must make the discrete decision of which
pile to go to. The possible inputs are the initial positions of the donkey, which form
a continuous range. Buridan's principle states that there is some initial position (or "input")
for which the donkey can't make a decision and starves to death[^fn:1].

Why should this be true? To model the situation mathematically, write \\(x\\) for the initial position of the donkey
at time \\(t = 0\\). Given such an initial position, the position at later times is determined by a time
evolution function \\(A\_t(x)\\), which describes the position of the donkey at time \\(t\\) if it started at
position \\(x\\). The stacks of hay are at positions 0 and 1.

There are two important assumptions that Lamport makes to prove that the ass starves for some initial
position:

1.  For any fixed time \\(t\\), the time evolution function \\(A\_t: \mathbb{R} \to \mathbb{R}\\) is a continuous
    function
2.  If the donkey starts at one of the stacks, it stays there: \\(A\_t(0) = 0\\) and \\(A\_t(1) = 1\\) for all \\(t\\)

Then for any time \\(t\\), there must be some \\(x \in (0, 1)\\) for which \\(A\_t(x) \in (0, 1)\\) (by the intermediate
value theorem).

Even after hearing that argument, the conclusion might seem very unintuitive. Lamport spends quite
some time defending the argument against various potential objections and arguing that it holds
in the real world, I recommend reading the [paper](https://lamport.azurewebsites.net/pubs/buridan.pdf) if you're interested in that.


## Moving around obstacles {#moving-around-obstacles}

Consider a related situation that Lamport discusses: a driver wants to move around some obstacle,
such as a tree. She needs to make the decision of whether to go around the tree to the left or to the right.

Mathematically, we can describe the scenario as follows: the driver moves on the euclidean plane,
and her initial position at time \\(t = 0\\) is \\(x, -1\\), where \\(x \in \mathbb{R}\\) is the input mentioned
in Buridan's principle. Her goal is to get to the upper half plane, say to a position \\(x', 1\\). But there
is an obstacle at the origin, so she really can only move on \\(\mathbb{R}\setminus\\{0\\}\\).

We again assume a continuous time evolution function \\(A\_t: \mathbb{R} \to \mathbb{R}^2\setminus\\{0\\}\\).
But this time, we also need to assume that \\(A\_t(x)\\) is continuous in \\(t\\), i.e. that the driver can't teleport.

Furthermore, we assume that if the driver is already far to the right of the tree, it crosses to the right,
and vice versa. Formally: there is some \\(\xi > 0 \\) such that \\(A\_t(\xi)\_1 > 0\\) for all \\(t\\) and \\(A\_t(-\xi)\_1 < 0\\)
(here the subscript denotes the first component of \\(A\_t(\xi)\\), i.e. the \\(x\\)-position).

**Claim:** For any time \\(t\\), there is some initial position \\(x\\), such that \\(A\_t(x)\\) is in the lower half plane.
In other words, the driver can't move around the obstacle in a bounded time.

**Proof:** ?
\\(A: \mathbb{R} \times I \to \mathbb{R}^2 \setminus\\{0\\}\\)


## Flying asses {#flying-asses}


## Homotopy version of Buridan's principle {#homotopy-version-of-buridan-s-principle}

Let \\(X\\) be some state space (any topological space), and \\(A\\) a space of inputs
(another topological space). Let further \\(\iota: A \to X\\) be an embedding that specified for
each input which initial condition it corresponds to. Let \\(H: A \times \mathbb{R} \to X\\)
be a continuous function which describes the time evolution of any initial state, with
\\(H(a, 0) = \iota(a)\\) for all \\(a \in A\\). Finally, let \\(S \subset X\\) be a set of goal states
and let \\(B \subset X\\) be a set of "boundary condition points", meaning that once the system
once the system is in \\(B\\) it doesn't leave it: \\(A\_t(x) \in B \implies \\(A\_{t + \tau}(x) \in B \forall \tau \geq 0\\).

[^fn:1]: The quote above is from Lamport's paper and makes it sound as though a discrete decision might always be possible, just not with a uniform bound on the decision time over all inputs. I think that a stronger principle holds: there is at least one input for which _no_ decision is possible, i.e. for which it would take an "infinite" time
