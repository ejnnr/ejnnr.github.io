+++
title = "Einsum is easy and useful"
summary = """`einsum` is one of the most useful functions in Numpy/Pytorch/Tensorflow and yet many people don't use it. It seems to have a reputation as being difficult to understand and use, which is completely backwards in my view: the reason `einsum` is great is precisely because it is *easier* to use and reason about than the alternatives. So this post tries to set the record straight and show how simple `einsum` really is.
  """
date = 2022-11-05T00:00:00+00:00
tags = [""]
draft = false
[image]
  preview_only = "true"
+++

`einsum` is one of the most useful functions in Numpy/Pytorch/Tensorflow and yet many people don't use it. It seems to have a reputation as being difficult to understand and use, which is completely backwards in my view: the reason `einsum` is great is precisely because it is *easier* to use and reason about than the alternatives. So this post tries to set the record straight and show how simple `einsum` really is.

The general syntax for `einsum` is
```python
einsum("some string describing an operation", tensor_1, tensor_2, ...)
```
with an arbitrary number of tensors after the string. (I'll be saying "tensors" but they could just as well be Numpy arrays.)

Let's look at an example. Say we have two matrices, `A` and `B`, with shapes such that we can multiply them as `A @ B`. Using `einsum`, we can write this matrix product as
```python
einsum("ij,jk->ik", A, B)
```
The interesting part is the string, `"ij,jk->ik"`. These `einsum` strings always follow the same structure:
```python
"<input indices> -> <output indices>"
```
In this example, the input indices are `"ij,jk"`. These *define* letters for indices into each input tensor. Different tensors are comma-separated, so `ij` refers to `A` and `jk` refers to `B`. `ij` means we call the first axis of `A` `i` and the second axis `j`, and similarly, `jk` defines names for the axes of `B`. The specific letters we use are arbitrary here, we could just as well write `"ga,aw->gw"`. There has to be one index per axis of the input tensor—in our case, both `A` and `B` have two axes (they're matrices), so both get two indices.

What's important is that we're using the same letter, `j`, both for the second axis of `A` and for the first axis of `B`. That's *not* just an arbitrary definition, it has an effect on the result! Think of it this way: the entire left-hand side, `"ij,jk"` defines a three-dimensional tensor, indexed by `i`, `j`, and `k`. We get its elements by *multiplying* the corresponding elements of `A` and `B`:
```python
product[i, j, k] = A[i, j] * B[j, k]
```
So it matters that `j` appears twice—a string like `"ij,lk"` would define a four-dimensional tensor:
```python
product[i, j, l, k] = A[i, j] * B[l, k]
```
(Don't worry about the order of these indices into `product`—as we'll see in a moment, the right-hand side of our string will explicitly specify the order we want).

The right side of the `->` arrow describes how to get our final output from this `product` tensor. It's very simple: any index that appears on the left (i.e. in the `product` tensor) but doesn't appear on the right is summed over. So in our matrix multiplication example, since our output indices are `ik`, we sum over `j`. So the final result is
```python
out[i, k] = sum_j A[i, j] * B[j, k]
```
Precisely a matrix multiply, as promised!

All of this generalizes in very nice and intuitive ways. On the left side of the `->` arrow, we can have arbitrary patterns, and they'll always describe a scheme for indexing into a product of the inputs. For example, the string `"iij,kji,l"` would define a four-dimensional tensor, given by
```python
product[i, j, k, l] = A[i, i, j] * B[k, j, i] * C[l]
```
(for input tensors `A`, `B`, `C`).
Note how much easier this is compared to a version without `einsum`:
```python
n = A.shape[0]
product = A[t.arange(n), t.arange(n), :, None, None] \
        * B.permute(2, 1, 0)[:, :, :, None] \
        * C[None, None, None, :]
```
Our output can now be any permutation of any subset of `ijkl`. For example, `"iij,kji,l->ki"` would implicitly compute the product tensor above, then sum over `j` and `l`, and finally permute the result so the order of axes was `ki`. Contrast with how messy this would be without `einsum`:
```python
# With broadcasting and array indexing:
n = A.shape[0]
out = (
    A[t.arange(n), t.arange(n), :, None, None]
  * B.permute(2, 1, 0)[:, :, :, None]
  * C[None, None, None, :]
).sum(1,3).T

# With einsum:
out = t.einsum("iij,kji,l->ki", A, B, C)
```
The main point is not that the `einsum` version is shorter—the point is that the other version took me 10 minutes to write and I'm still not sure it's correct.

That concludes the description of `einsum`, but let's look at some more examples to get a better intuition:
- Say you want to compute the *transpose* of the matrix product, `(A @ B).T`. What that means is just that you want the indices in the output flipped, so the string now becomes `"ij,jk->ki"`.
- Sometimes you want to sum over *all* axes; in that case, you can just leave the right hand side empty. For example, `"i,i->"` will compute the inner product of two input vectors.
- Just like you can have repeated indices in different input tensors, you can repeat indices within the same tensor. For example, `"ii->"` computes the trace of a matrix. Or you could do `"ii->i"` to get the diagonal as a vector.
- You can trivially add batch dimensions to any operation. For example, a batched inner product would be `"bi,bi->b"`. A batched matrix multiply would be `"bij,bjk->bik"`. If for some reason, your batch dimension is in the last position for the second batch of matrices, that's no problem: `"bij,jkb->bik"`.
- Batching also lets you take arbitrary diagonals of a tensor easily. For example, `"ibi->bi"` will give you the diagonal along the first and third axis, batched over the middle axis.
- A neat trick is that you can have a *variable* number of batch dimensions using a `...` syntax: `"...ij,...jk->...ik"` is a batched matrix multiply that works for any number of batch dimensions. The `...` can be anywhere, not just at the front. For example, `"...ij,j...k->ik..."` will work just fine, for any number of dimensions as the `...`

# Einops
The main problem with `einsum` is that it doesn't support enough operations. For example, say you have an image tensor `x` with shape `(batch, channels, height, width)`. If all you want to do is move the channel axis, you can just do
```python
einsum("bchw->bhwc", x)
```
But what if you also want to flatten the height and width dimension into a single axis? That's where the [`einops`](http://einops.rocks) library comes into play:
```python
rearrange(x, "b c h w -> b (h w) c")
```
The `rearrange` function takes a tensor followed by a string similar to `einsum` strings. The only new aspect are the parentheses—here, they tell `einops` to combine the height and width dimension into one axis. Just like `einsum`, `rearrange` is extremely flexible, so you can for example transpose these axes before flattening them just by doing
```python
rearrange(x, "b c h w -> b (w h) c")
```

You can also have parentheses on the left side, to split one axis into multiple. So for example, we can invert the operation above using
```python
rearrange(x, "b (w h) c -> b c h w", h=32)
```
The `h=32` tells `einops` that the `h` axis should have length 32 (without this information, it would be unclear how to split up the single input axis).

Note how *obvious* it is that `"b (w h) c -> b c h w"` is the inverse of `"b c h w -> b (w h) c"`. We just switched the left and right-hand side! In general, you can *compose* `rearrange` operations: doing `"string_1 -> string_2"` followed by `"string_2 -> string_3"` is the same as doing `"string_1 -> string_3"`.

There's more to say about `rearrange`, and its cousin `repeat`, but the `einops` documentation does a good job explaining them, so I'll leave it at that.

# A more complex example
As a final example, let's consider a multi-head attention mechanism. Say we have our `Q`, `K` and `V` tensors,
each of shape `(batch, seq_length, n_heads * head_dim)` (the `n_heads` and `head_dim` dimensions are flattened into one because we did a single matrix multiply for all heads to obtain these tensors). We want to compute the attention pattern `A` of shape `(batch, n_heads, seq_length, seq_length)`. We can use `einops` and `einsum`:
```python
Q = rearrange(Q, "b q (h d) -> b q h d", h=n_heads)
K = rearrange(K, "b k (h d) -> b k h d", h=n_heads)
A = einsum("b q h d, b k h d -> b h q k", Q, K)
```
Note how simple this is: the output of our rearranged tensors, `bqhd` and `bkhd`, already tell us what the inputs for the `einsum` have to be. The output indices for the `einsum` are almost determined by the desired output shape. Implicitly, this is a batched matrix multiply over the `d` dimensions (batched over all other axes), but we don't have to think about that to write down the `einsum`.

Contrast with this alternative, where we have to carefully think about the position of each axis:
```python
batch, seq_length, _ = Q.shape
Q = Q.view(batch, seq_length, 1, n_heads, -1)
K = K.view(batch, 1, seq_length, n_heads, -1)
A = (Q @ K.transpose(-2, -1)).moveaxis(-1, 1)
```

`einsum` isn't just easier to read and write, it's also easier to refactor. Imagine we suddenly have to deal with multiple batch dimensions. In the `einsum` version, we just replace the `b` with `...` and everything works, whereas the second version becomes even messier. Or imagine the format of our tensors changes so that the `h` and `d` axes are now swapped. In the `einsum` version, we just swap all occurrences of `h` and `d`. The other version requires us to carefully check all the magic numbers to see which ones need to be changed.

# `einsum` could be even better
I'd love to see an `einsum` wrapper that combines the capabilities of `einsum` and `rearrange`. For example, we could write the attention mechanism above as a simple one-liner:
```python
A = einsum("b q (h d), b k (h d) -> b h q k", Q, K, h=n_heads)
```
If anyone ends up implementing this, please [let me know](mailto:erik@ejenner.com)!