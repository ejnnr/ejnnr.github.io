+++
title = "Deep Implicit layers"
summary = """
  Several new architectures for neural networks, such as Neural ODEs and
  deep equlibirum models can be understood as replacing classical layers
  that explicitly specify how to compute the output with implicit layers.
  These layers describe which conditions the output should specify but
  leave the actual computation up to some solver that can be chosen arbitrarily.
  This post contains a brief introduction to the main ideas behind implicit layers.
  """
date = 2021-03-03T14:48:00+01:00
tags = ["Deep learning"]
draft = false
[image]
  preview_only = "true"
+++

## Implicit Layers {#implicit-layers}

Layers in neural networks are almost exclusively explicitly specified. That
just means that the output \\(y\\) is described as a (usually rather simple)
function of the input \\(x\\) and some parameters \\(\theta\\), i.e.
\\[y = f(x; \theta)\thinspace.\\]

The idea behind _implicit_ layers is the following:

<blockquote>

Instead of specifying how to compute the layer’s output from the input,
we specify the conditions that we want the layer’s output to satisfy.

</blockquote>

(that quote is from the [Implicit layers tutorial](http://implicit-layers-tutorial.org/) given by Zico Kolter, David Duvenaud
and Matt Johnson at NeurIPS 2020, on which this post is based.
I definitely recommend you check it out if you're interested in all the details that I'll skip over)

"Conditions that we want the output to satisfy" is a bit vague, what does
this look like concretely? Well, it's vague on purpose because implicit
layers are a very general framework. But one simple way to
specify a condition is with
\\[g(x, y; \theta) = 0\thinspace.\\]
Whereas a forward pass in a neural network classically means applying
the function \\(f\\) at each layer, we now need to solve this equation for \\(y\\)
-- that solution will be the output of our layer.

This may sound a bit insane. Isn't solving an equation like that much
more expensive than just applying an explicit function? Why would you
want to do this during each forward pass? There's some truth to that
of course but it's not as bad as it may sound. First, it turns out
that relatively few or even just one implicit layer are often enough, so
while each layer is more expensive to compute, you need fewer of them.
And secondly, it's sometimes possible to ensure that the equation describing
the layer can be solved reasonably easily. After all, we have control over the
class of equations that we need to solve by choosing the network architecture.

So it's not as bad as it could be, but still, what to we gain? One very general
answer is that implicit layers can be very expressive. Even using a very simple
function \\(g\\), for example, the implicit function \\(x \mapsto y\\) defined by
solving the equation may be quite complex (this ties into the
fact that one or a few implicit layers are often enough to do the job).
On an even more abstract level, implicit layers decouple _what_ properties
we want the output to have from _how_ to compute the output. The learned parameters
only need to describe some conditions that the output should satisfy and we can then
use any method we want to actually find such an output.

One detail I've quietly swept under the rug is whether a solution \\(y\\) even
exists and whether it is unique. And for the most part, I'm going
to continue ignoring this issue because this is meant to be a relatively
informal introduction. I'll just mention that in some cases, you actually
get existence and uniqueness guarantees, and in others, you can still hope
that it works out empirically.


## But what about my gradients? {#but-what-about-my-gradients}

So you've specified a model architecture (the function \\(g(x, y; \theta)\\))
and you have some method for doing a forward pass (i.e. finding a \\(y\\) such
that \\(g(x, y; \theta) = 0\\) for a given input \\(x\\)). Now you want to train
your model with gradient descent. But you don't have any explicit function
to take the gradient of, so how does that work?

You could backpropagate through your solver: after all, you computed the output
\\(y\\) _somehow_, in principle you could backpropagate through that calculation.
But that's inefficient, so let's try to find a better way.

To simplify the notation, we'll ignore the parameters \\(\theta\\). You can think
of them as being a part of the input \\(x\\) -- for our purposes there's really not
much difference between the input to the layer and the parameters, since we
need gradients with respect to both.

So for a given input \\(x\\), we now want to find the Jacobian \\(\frac{\partial y^\*}{\partial x}\\),
where \\(y^\*\\) is the output such that \\(g(x, y^\*) = 0\\). We can think of \\(y^\*\\)
as a function of \\(x\\): for each input \\(x\\), we have some solution \\(y^\*(x)\\).
To find the Jacobian of \\(y^\*\\), we can use _implicit differentiation_.
We know that \\(g(x, y^\*(x)) = 0\\) for all \\(x\\), so if we read the LHS as a function
of \\(x\\), it's just the constant zero function. The derivative of the zero function
is of course also 0, so \\(\frac{d}{dx} g(x, y^\*(x)) = 0\\). On the other hand, we
can apply the chain rule,
\\[\frac{d}{dx}g(x, y^\*(x)) = \frac{\partial g}{\partial x} + \frac{\partial g}{\partial y}\frac{d y^\*}{dx}\thinspace.\\]
Since this expression has to be zero, we can rearrange and get
\\[\frac{\partial g}{\partial y}\frac{d y^\*}{dx} = -\frac{\partial g}{\partial x}\thinspace,\\]
which we can further rewrite as[^fn:1]
\\[\frac{d y^\*}{dx} = -\left(\frac{\partial g}{\partial y}\right)^{-1}\frac{\partial g}{\partial x}\thinspace.\\]
So now we have the Jacobian of \\(y^\*\\) in terms of the Jacobian of \\(g\\), which
means we can calculate gradients without backpropagating through the solver.


## [Matrix inversion considered harmful](https://www.johndcook.com/blog/2010/01/19/dont-invert-that-matrix/) {#matrix-inversion-considered-harmful}

There's one remaining issue: while we now know how to calculate the Jacobian \\(\frac{d y^\*}{dx}\\),
doing so requires us to invert a matrix, which is expensive. Luckily, we don't actually
need to explicitly compute the Jacobian for gradient descent. What we ultimately care about
is the gradient of the loss, which is a scalar function. For example, if the implicit layer
described by \\(g\\) is the last one before the loss function \\(L\\), we want
\\[\frac{dL}{dx} = \frac{dL}{dy}\frac{dy^\*}{dx}\thinspace,\\]
where \\(\frac{dL}{dy}\\) is the gradient of \\(L\\) as a row vector. More generally, we only
need to be able to compute products of the form
\\[w^T \frac{dy^\*}{dx} = -w^T\left(\frac{\partial g}{\partial y}\right)^{-1}\frac{\partial g}{\partial x}\thinspace,\\]
not the Jacobian itself. We can do this by first solving
\\[u^T\frac{\partial g}{\partial y} = -w^T\\]
for \\(u\\), the so called _adjoint variable_. Crucially, this is possible without
explicitly computing and storing the inverse (for example using [iterative methods](https://en.wikipedia.org/wiki/Iterative%5Fmethod#Linear%5Fsystems)). Then we can calculate
\\[w^T \frac{dy^\*}{dx} = u^T\frac{\partial g}{\partial x}\thinspace.\\]


## What's next? {#what-s-next}

We've seen some of the basic ideas and themes surrounding implicit layers.
Instead of explicitly describing how to compute the output, they specify
a condition that the output should satisfy. Using implicit differentiation,
we can still effectively backpropagate through these layers, independent
of the solver we use in the forward pass.

But we haven't talked at all about concrete instantiations of implicit layers.
What would a network using these actually look like? And can we use contraints
other than those of the form \\(g(x, y; \theta) = 0\\)? All of that and more
is discussed in the [implicit layers tutorial](http://implicit-layers-tutorial.org/) that I already mentioned above.
It starts with Deep equilbrium models (which essentially use layers defined
by \\(g(x, y) = 0\\) as in this post, just framed differently) but then applies
the same ideas to constraints described by ODEs, leading to Neural ODEs.

[^fn:1]: This is assuming that the Jacobian \\(\frac{\partial g}{\partial y}\\) is invertible. This is exactly the condition under which the [implicit function theorem](https://en.wikipedia.org/wiki/Implicit%5Ffunction%5Ftheorem) holds. In that case, \\(y^\*\\) is indeed differentiable (so we can apply the chain rule as we did). And if we drop the assumption that \\(g(x, y) = 0\\) is uniquely solvable, then the implicit function theorem at least guarantees that a unique solution \\(y\*(x)\\) exists locally around a point \\((x\_0, y\_0)\\). So this theorem is sort of a theoretical backbone, which guarantees that what we do actually works. But if we assume that a solution function \\(y^\*\\) exists and is differentiable, then computing it's Jacobian doesn't require any heavy machinery: as you can see, we just apply the chain rule once and then rearrange a bit.
