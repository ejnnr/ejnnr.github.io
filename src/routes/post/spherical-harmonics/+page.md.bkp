+++
title = "Perspectives on spherical harmonics"
summary = """
  Spherical harmonics are ubiquitous in math and physics, in part because
  they naturally appear as solutions to several problems; in particular they
  are the eigenfunctions of the spherical Laplacian and the irreducible
  representations of SO(3). But why should the solutions to these problems
  be the same? And why are they called spherical harmonics?
  """
date = 2021-03-10T17:07:00+01:00
tags = ["Math"]
draft = false
[image]
  preview_only = "true"
+++

[Spherical harmonics](https://en.wikipedia.org/wiki/Spherical%5Fharmonics) appear in lots of different places and have different
interpretations that at first sight don't seem to have anything to do
with one another. In this post, I'll try to connect three very common ones
(namely as harmonic polynomials, as eigenfunctions of the Laplacian
and as irreps of \\(\operatorname{SO}(3)\\)).

We're going to define spherical harmonics as homogeneous harmonic polynomials
\\(\mathbb{R}^3 \to \mathbb{C}\\). Let's break this down:

-   A polynomial of three variables is a finite sum of the form
    \\[\sum\_{\alpha} a\_\alpha x^{\alpha\_x}y^{\alpha\_y}z^{\alpha\_z}\\]
    over multi-indices \\(\alpha \in \mathbb{N}\_0^3\\). Some examples are
    \\(x^2y + 2z\\) or \\(xyz + y^2\\).
-   The coefficients \\(a\_\alpha\\) can be complex numbers, but we will only plug
    in real numbers for \\(x\\), \\(y\\) and \\(z\\). That's why we interpret polynomials
    as functions \\(\mathbb{R}^3 \to \mathbb{C}\\).
-   _Homogeneous_ mean that \\(\alpha\_x + \alpha\_y + \alpha\_z\\) is the same for
    all the \\(\alpha\\) we sum over, so all the terms in the sum have the same
    degree. For example, \\(x^2 + 2yz + xz\\) is homogeneous, while \\(xy + z\\) is not.
-   _Harmonic_ means that the Laplacian of the polynomial vanishes: \\(p\\) is harmonic if
    \\(\Delta p = 0\\). Here, \\(\Delta = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} +
          \frac{\partial^2}{\partial z^2}\\).

We will write \\(\mathcal{H}\_l\\) for the space of all homogeneous harmonic polymonials
of degree \\(l\\) (meaning \\(\alpha\_x + \alpha\_y + \alpha\_z = l\\) for all summands).

If you've seen spherical harmonics before (and you presumably have, if you're
reading this post), it's probably been in the form of functions \\(Y\_l^m(\theta,
\varphi)\\) defined on the sphere. So why are we talking about these polynomials
on \\(\mathbb{R}^3\\) instead?

The answer is that every polynomial \\(p \in \mathcal{H}\_l\\) can be written
in spherical coordinates as
\\[p(x, y, z) = r^l Y(\theta, \varphi)\\]
for some function \\(Y: S^2 \to \mathbb{C}\\). To see why, write \\(x\\), \\(y\\) and \\(z\\)
in spherical coordinates and plug them into the polynomial. They each have
a factor of \\(r\\) and then some factors depending on \\(\theta\\) and \\(\varphi\\).
So because \\(p\\) is homogeneous, each summand consists of a factor \\(r^l\\) times
something that depends only on \\(\theta\\) and \\(\varphi\\). So we can think of
homogeneous polynomials as polynomials defined on the sphere -- their continuation
to \\(\mathbb{R}^3\\) is automatically determined by their degree \\(l\\). Therefore,
we won't really distinguish between homogeneous harmonic polynomials defined
on \\(\mathbb{R}^3\\) and their restrictions to \\(S^2\\), we will refer to both as
spherical harmonics.

This should also explain the name: spherical harmonics are _harmonic_ polynomials
living on the _sphere_.

The functions \\(Y\_l^m\\) that you may have seen are just a particular choice of
basis for the vector space of spherical harmonics. If you multiply them by
\\(r^l\\), you get polynomials in \\(\mathcal{H}\_l\\), and
\\[\\{r^l Y\_l^m| -l \leq m \leq l\\}\\]
is a basis for \\(\mathcal{H}\_l\\).


## Eigenfunctions of the Laplacian {#eigenfunctions-of-the-laplacian}

One of the reasons that spherical harmonics are so ubiquitous is that they
are the eigenfunctions of the spherical Laplacian \\(\Delta\_{S^2}\\). They key
to that is the following fact (which is just a brief calculation):
for a function \\(Y: S^2 \to \mathbb{C}\\),
\\[\Delta (r^l Y) = r^{l - 2}\left(l(l + 1)Y + \Delta\_{S^2}Y\right)\thinspace.\\]
So \\(r^l Y(\theta, \varphi)\\) is harmonic if and only if
\\[\Delta\_{S^2}Y = -l(l + 1)Y\thinspace.\\]
This already proves that spherical harmonics are eigenfunctions of the spherical
Laplacian.

But we can say more than that: if we take any eigenfunction \\(f: S^2 \to
\mathbb{C}\\) of the spherical Laplacian and multiply by \\(r^l\\) (with \\(l\\) such
that \\(-l(l + 1)\\) gives the eigenvalue[^fn:1]), then \\(r^l f(\theta, \varphi)\\) must be
harmonic. So the eigenfunctions of the spherical Laplacian are in fact in 1-to-1
correspondence with harmonic homogeneous functions on \\(\mathbb{R}^3\\). It then turns
out -- and this part is far from obvious -- that all such functions are
polynomials[^fn:2]! So the
spherical harmonics aren't just eigenfunctions of the spherical Laplacian, they
make up _all_ of its eigenfunctions.


## Irreducible representations of \\(\operatorname{SO}(3)\\) {#irreducible-representations-of--operatorname-so-3}

Another famous role that spherical harmonics play is as the irreducible
representations of \\(\operatorname{SO}(3)\\) (more precisely: the (complex)
irreducible representations of \\(\operatorname{SO}(3)\\) are exactly the spaces
\\(\mathcal{H}\_l\\)). This is connected to the fact that they are the
eigenfunctions of the spherical Laplacian.

That the eigenspaces of the spherical Laplacian are representations of \\(\operatorname{SO}(3)\\)
follows directly from the fact that the Laplacian commutes with rotations: we have
a representation \\(G \curvearrowright L^2(S^2, \mathbb{C})\\) via
\\[(r \cdot f)(x) := f(r^{-1}x)\\]
for any rotation \\(r\\) and \\(f \in L^2(S^2, \mathbb{C})\\). For an eigenfunction
of the Laplacian, we get
\\[\Delta\_{S^2}(r \cdot f) = r \cdot \Delta\_{S^2} f = r \cdot \lambda f = \lambda (r \cdot f)\thinspace,\\]
so each eigenspace is invariant under the action of \\(\operatorname{SO}(3)\\).
Therefore, the representation on \\(L^2(S^2)\\) can be restricted to each eigenspace,
so each \\(\mathcal{H}\_l\\) gives a representation of \\(\operatorname{SO}(3)\\).

Showing that these representations are in fact irreducible is much more
difficult (there's a proof [here](https://www.cis.upenn.edu/~cis610/sharmonics.pdf) for example, if you really want to dive into
that). But if we just take that for granted, it's again easy to show that
_every_ irreducible subrepresentation of \\(L^2(S^2)\\) is a space of spherical
harmonics: because the Laplacian
is an equivariant map on each such representation, Schur's Lemma implies that
it must be either the zero map (which it isn't) or multipication by a constant
\\(\lambda \in \mathbb{C}\\). Therefore, each irreducible representation is
contained in an eigenspace of the Laplacian. But these eigenspaces are themselves
irreducible, so the representation in question must already be equal to the
eigenspace.

Finally, it's possible to show that all irreducible representations of \\(\operatorname{SO}(3)\\)
are subrepresentations of \\(L^2(S^2)\\). This is again much more difficult and
is also a very special fact about \\(\operatorname{SO}(3)\\) (for example,
the Laplacian's eigenspaces are still irreducible representations in higher dimensions,
but they are not the only ones anymore). But combining this with our results
from above, the spherical harmonics make up all the irreducible representations
of \\(\operatorname{SO}(3)\\).

[^fn:1]: I'm skipping over some details here, see for example Claim 4.0.1 [here](http://www-users.math.umn.edu/~garrett/m/mfms/notes%5Fc/spheres%5FI.pdf)
[^fn:2]: See Corollary 4.0.6 [in the same document](http://www-users.math.umn.edu/~garrett/m/mfms/notes%5Fc/spheres%5FI.pdf) for a proof
