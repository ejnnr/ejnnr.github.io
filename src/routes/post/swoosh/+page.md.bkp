+++
title = "Swoosh: Rethinking Activation Functions"
summary = """Introducing the new Swoosh activation function. Perfect test set generalization
guaranteed.
  """
date = 2023-04-01T00:00:00+00:00
tags = [""]
draft = false
[image]
  preview_only = "true"
+++
Improvements to the activation function in neural networks have hit diminishing returns over recent years. Whereas the choice between Sigmoids and ReLUs can make or break your training, the same cannot be said for the difference between Swish, Mish, GLish, and Phish. (I made up one of these, but I bet you don't know which.)

In our recent paper "Swoosh: Rethinking Activation Functions"[^1], we argue that the problem is an overly narrow conception of what an activation function can be. Our key idea is the following observation:

> Different activation functions work best for different problems. A good activation function should thus have *many hyperparameters*.

Activation functions with learnable parameters have been proposed before, but they suffer from two flaws:
1. The number of parameters is usually quite small. For example, Swish uses only a single parameter. That's about 175 billion fewer parameters than even a tiny model like GPT-3! And [it's well known that more parameters = more powerful](https://twitter.com/AndrewSteinwold/status/1594889562526027777).
2. They use *parameters*. As we will argue, using *hyperparameters* instead offers countless advantages.

# Introducing Swoosh
The simplest version of the Swoosh activation function is
$$\operatorname{Swoosh}_{f}(x) := f(Wf(x) + b),$$
where $f$ is some simple non-linear function (such as $f(x) := \max(x, 0)$), $W$ is a matrix and $b$ is a vector. The entries of $W$ and $b$ are hyperparameters of the Swoosh activation function.

For even better results, we recommend using $f = \operatorname{Swoosh}_{g}$
for a simple non-linear function $g$, or even

$$f = \operatorname{Swoosh}_{\operatorname{Swoosh}_g}$$

and so on.
Note that in this case, the hyperparameters for each instance of Swoosh should be tuned independently.

Astonishingly, our experiments show that just a single hidden layer is enough for most tasks when using the Swoosh activation function. In slogan form: 2-layer networks are all you need![^2] The full network is then simply
$$\operatorname{net}(x) = U \operatorname{Swoosh}(Vx + a) + b.$$
# Why hyperparameters?
One of our key contributions is that we treat the entries of $W$ and $b$ in Swoosh as *hyperparameters*. This is a much better choice than using them as learnable parameters, like existing activation functions typically do. We'll briefly sketch a few of the advantages:
- "Hyper" is greek for "above", so the name should already tell us that hyperparameters are above (i.e. better than) parameters.
- Specifically for Swoosh, the network output is differentiable in these hyperparameters, which means you can still use SGD! All common opitimizers and backpropagation implementations work out of the box for optimizing Swoosh hyperparameters.
- Neural networks with higher parameter count tend to have higher memory requirements, longer training and inference times, higher compute costs, and a bigger environmental footprint. By using hyperparameters instead of parameters, we can keep the parameter count low.
- Models sometimes perform worse on the test dataset than on the training data.[^3] Using the well-known technique of choosing hyperparameters based on test performance, this is an issue of the past with Swoosh.

# Conclusion and future work
We have shown how expanding our conception of what an activation function can be solves several key problems in deep learning, such as test set generalization and high compute requirements. We believe that this insight will not only revitalize the field of activation functions, but that it in fact heralds the end of the AI Winter we currently find ourselves in.

To make it as easy as possible for practitioners to adopt Swoosh, we have worked closely with the PyTorch team. We are excited to announce that Swoosh is [available now in the PyTorch library](https://pytorch.org/vision/main/generated/torchvision.ops.MLP.html)! Tensorflow and JAX users can easily implement it in a few lines of code.

In the future, we are planning to improve the design of Swoosh in various ways. For example, we believe it could be promising to replace the matrix multiplication $Wx$ with a convolution, especially on inputs with translational symmetry such as images. There is a vast unexplored space of possible Swoosh architectures to discover, and we invite other researchers to join us in this exciting journey!

[^1]: We will release the full paper upon acceptance of this blog post.
[^2]: In fact, in an upcoming paper we will show that for Swoosh activation functions, there are universal approximation theorems with bounded width and depth 1, improving on a result by [Maiorov et al.](https://www.semanticscholar.org/paper/Lower-bounds-for-approximation-by-MLP-neural-Maiorov-Pinkus/4bdd1f845d26e488d67c0e4549cff17407b980ad)
[^3]: Or so I've heard, this has never happened to me personally.