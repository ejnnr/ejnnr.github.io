+++
title = "Trading off speed against the probability of success in the Karger-Stein Algorithm"
summary = """
  The Karger-Stein algorithm is an improvement over Karger's beautiful contraction
  algorithm for minimum graph cuts. In this post, I show how it finds the perfect
  tradeoff between finding a mincut with high probability and finding it quickly.
  In the course of doing so, we will also understand where the somewhat opaque
  factor of sqrt(2) comes from.
  """
date = 2020-12-06T18:00:00+01:00
tags = ["Graphs"]
draft = false
[image]
  preview_only = "true"
+++

_(Note: this is an analysis of one aspect of the Karger-Stein algorithm, it's not meant to be a beginner-friendly introduction)_

[Karger's algorithm](https://en.wikipedia.org/wiki/Karger%27s%5Falgorithm) randomly contracts a graph and surprisingly, this can be used
to find a minimum cut with probability \\(\mathcal{O}(n^{-2})\\), where \\(n\\) is
the number of vertices of the graph.  This is a much, much higher probability
than sampling a graph cut uniformly at random would give! But it still means we
need to run the algorithm \\(\mathcal{O}(n^2\log n)\\) times to get a high success
probability. Karger's algorithm can be implemented in \\(\mathcal{O}(n^2)\\)
time[^fn:1], which gives an overall runtime of \\(\mathcal{O}(n^4 \log n)\\) -- not great,
there are much faster deterministic algorithms.

To understand how the Karger-Stein algorithm improves upon that, we need
the following key result that forms the foundation for Karger's algorithm:

**Theorem**[^fn:2]:
When Karger's algorithm contracts a graph from \\(n\\) to \\(r\\) vertices,
any given mincut survives with probability \\(\geq {r \choose 2}/{n \choose 2} = \frac{r (r - 1)}{n (n - 1)}\\).

In particular, for \\(r = 2\\), we get the \\(\mathcal{O}(n^{-2})\\) probability mentioned above.

But note the following: if we make only a few contractions, \\(r \lesssim n\\), then
mincuts are almost guaranteed to survive! This is the key insight that allows us
to improve the runtime of Karger's algorithm, leading to the improved _Karger-Stein algorithm_.

The idea is the following: first we contract the graph down to roughly \\(\frac{n}{b}\\) vertices,
where \\(b\\) is small enough that mincuts are very likely to survive. Then we branch: we again
contract the graph down by a factor of \\(b\\), but we do so \\(a\\) times independently
from one another. \\(a\\) needs to be chosen high enough that mincuts are very likely
to survive _in at least one of the branches_. We repeat this process until we have contracted
the graph down to just 2 vertices[^fn:3].
If we chose \\(a\\) and \\(b\\) right, at least one of the final leaves of our computational
tree will likely contain a mincut. So we return the best cut we've found among all
the leaves.

The Karger-Stein algorithm as it was originally described and as it is usually presented
uses \\(a = 2\\) and \\(b = \sqrt{2}\\). So we always split the computation into two branches
and reduce the number of vertices by a factor of \\(\sqrt{2}\\) before branching again.
But in this post, I would like to motivate where these numbers come from, as well
as show that they're not the only ones that work. So in the following, we're going to
analyze the "generalized Karger-Stein algorithm" with arbitrary \\(a\\) and \\(b\\).


## Success probability {#success-probability}

As mentioned above, any minimum cut survives a contraction from \\(n\\)
to \\(r\\) vertices with probability \\(\geq {r \choose 2}/{n \choose 2} = \frac{r (r - 1)}{n (n - 1)}\\).
I said we first contract to "roughly" \\(\frac{n}{b}\\) vertices -- to be precise we contract
until \\(\lceil \frac{n}{b} + 1\rceil\\) vertices are left, this will give us a nice bound.
The probability that a mincut survives this contraction is[^fn:4]:

\begin{equation}
\begin{split}
p &\geq \frac{\lceil \frac{n}{b} + 1 \rceil \lceil \frac{n}{b} \rceil}{n (n - 1)}\\\\\\
&\geq \frac{(\frac{n}{b} + 1) \cdot \frac{n}{b}}{n (n - 1)}\\\\\\
&\geq \frac{1}{b^2}
\end{split}
\end{equation}

We can now apply this bound recursively: After we have contracted to \\(\lceil \frac{n}{b} + 1 \rceil\\)
vertices, we can forget that this is a partially contracted graph, and just treat
this number as the "new \\(n\\)".

We will write \\(p\_k\\) for the survival probability if there are \\(k\\) levels of recursion
left before we reach the leaves of the tree. So \\(p\_0\\) will be the probability in the
leaves of the recursion tree. Depending on when precisely we stop the recursion
and what method we use to finish the contraction, \\(p\_0\\) might take different values,
but all that matters for us is that it is some constant.

Using the bound we found above, we get the following recurrence:
\\[p\_{k + 1} \geq 1 - \left( 1 - \frac{p\_k}{b^2} \right)^a\\]
What's going on here? \\(\frac{p\_k}{b^2}\\) is a lower bound on the probability
that any given mincut survives in one particular branch. So \\(\left(1 - \frac{p\_k}{b^2}\right)^a\\)
is an upper bound on the probability that the mincut survives in none of the
\\(a\\) branches, and consequently \\(1 - \left( 1 - \frac{p\_k}{b^2} \right)^a\\) is a lower
bound on the probability that it survives in at least one.

This recurrence doesn't have an obious solution we can just read off but with
some rewriting, we can get something that's good enough for our purposes.
Substituting \\(z\_k := \frac{b^2}{p\_k} - 1\\), we get

\begin{equation}
\begin{split}
z\_{k + 1} &= \frac{b^2}{p\_{k + 1}} - 1 \\\\\\
&\leq \frac{b^2}{1 - \left(1 - \frac{1}{z\_k + 1}\right)^a} - 1\\\\\\
&= \frac{b^2 \left(z\_k + 1\right)^a}{\left(z\_k + 1\right)^a - z\_k^a} - 1\\\\\\
&\leq \frac{b^2 \left(z\_k + 1 \right)^a}{a z\_k^{a - 1}} - 1\\\\\\
&\leq \frac{b^2}{a} z\_k + \text{const}
\end{split}
\end{equation}

where we used \\(z\_k \geq 1\\) in the last step. The constant term may depend
on \\(a\\) and \\(b\\) but not on \\(z\_k\\).

If \\(a \geq b^2\\), then \\(z\_k \in \mathcal{O}(k)\\) which means that \\(p\_k \in \Omega\left(\frac{1}{k}\right)\\).
The depth of recursion for a graph with \\(n\\) vertices is \\(\Theta(\log n)\\),
so the overall success probability is \\(\Omega\left(\frac{1}{\log n}\right)\\).

What this means in words: if we create enough branches (at least \\(b^2\\)) compared
to how long we contract before branching again, then we get quite a high success
probability -- \\(\Omega\left(\frac{1}{\log n}\right)\\) means that \\(\log^2 n\\) runs are enough
to get an overall success probability that approaches 1 as \\(n \to \infty\\).

But what if \\(a < b^2\\), i.e. if we don't have enough branches at each stage?
Then the inequality derived above only yields
\\(z\_k \in \mathcal{O}\left(\left(\frac{b^2}{a}\right)^k\right)\\)
so the success probability \\(p\_k\\) can be exponentially low in \\(k\\).
This means we'd have to repeat the algorithm a potentially exponential
number of times, which would make it useless.

That still leaves the question: why does the Karger-Stein algorithm use \\(a = b^2\\)
in particular, when \\(a > b^2\\) would give a success probability at least as high?
For that we need to turn to the runtime complexity.


## Runtime {#runtime}

The runtime of the Karger-Stein algorithm can be described with the following
recurrence:
\\[T(n) = aT\left(\frac{n}{b}\right) + \mathcal{O}(n^2)\\]
The \\(\mathcal{O}(n^2)\\) term is for contracting down to roughly \\(\frac{n}{b}\\)
vertices. At that point, we solve \\(a\\) smaller version of the original problem,
each of size \\(\frac{n}{b}\\). That leads to the \\(aT\left(\frac{n}{b}\right)\\) term.

This kind of recurrence is exactly what the [Master theorem](https://en.wikipedia.org/wiki/Master%5Ftheorem%5F(analysis%5Fof%5Falgorithms)) is for. In this case, if we
choose \\(a = b^2\\), we get a runtime of \\(\Theta(n^2 \log n)\\) for a single run of
the Karger-Stein algorithm. We already saw that with \\(a < b^2\\), we get an exponentially
low success probability, so that choice isn't interesting anyway. Finally, if \\(a > b^2\\),
we get a high success probability, but the runtime becomes \\(\Theta(n^c)\\),
where \\(c := \frac{\log a}{\log b} > 2\\).

We can summarize all our results (and a few I didn't mention) in one table:

| Condition     | Time for single run                | Success probability                       | Total runtime                      | Comment                      |
|---------------|------------------------------------|-------------------------------------------|------------------------------------|------------------------------|
| \\(a < b^2\\) | \\(\Theta(n^2)\\)                  | exponentially low in \\(n\\)              | exponential in \\(n\\)             | Too little branching         |
| \\(a = b^2\\) | \\(\Theta(n^2 \log n)\\)           | \\(\Omega\left(\frac{1}{\log n}\right)\\) | \\(\mathcal{O}(n^2 \log^3 n)\\)    | Just right                   |
| \\(a > b^2\\) | \\(\Theta(n^c)\\) with \\(c > 2\\) | \\(\Omega(1)\\)                           | \\(\Theta(n^c)\\) with \\(c > 2\\) | Unnecessarily much branching |

The "total runtime" column contains the runtime that is needed to achieve a high success probability
by repeating the Karger-Stein algorithm often enough (at least if \\(n\\) is large enough). This is the complexity
that we want to minimize in practice.

We can now see that combining the analysis of the success probability with the runtime analysis
explains why the Karger-Stein algorithm uses \\(a = b^2\\): in the other cases, we are either very
unlikely to succeed and therefore need too many runs, or we are taking unnecessarily long for
a single run.

But also note that any choice of a "branching factor" \\(a\\) works, as long as we then choose
\\(b = \sqrt{a}\\). So splitting the computation up into just two subproblems is a reasonable
and simple choice, but from a purely asymptotic perspective it is arbitrary.

[^fn:1]: There is also an implementation in \\(\mathcal{O}(m)\\), where \\(m\\) is the number of edges, but for the Karger-Stein algorithm that won't make a difference and we'll ignore it.
[^fn:2]: David Karger: _Global min-cuts in RNC, and other ramifications of a simple min-cut algorithm_, SODA 1993
[^fn:3]: Usually we stop a bit before 2 vertices and just compute the mincut from there using other methods but that doesn't matter here
[^fn:4]: This and the following analysis is based on the paper by Karger and Stein: _A new approach to the minimum cut problem_, Journal of the ACM 1996. The difference is just that I consider arbitrary \\(a\\) and \\(b\\), rather than just \\(a = 2\\) and \\(b = \sqrt{2}\\).
