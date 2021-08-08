+++
title = "State formally, reason informally"
summary = """
  There's a style of teaching mathematics that I really like: stating definitions
  and theorems as formally as in any textbook, but focusing on informal arguments
  for why they should be true.
  """
date = 2021-03-24T11:00:00+01:00
tags = ["Math"]
draft = false
[image]
  preview_only = "true"
+++

Evan Chen's [Infinitely Large Napkin](https://web.evanchen.cc/napkin.html) is my go-to resource when I want to learn
about some new area of mathematics (or at least it used to be; I'm increasingly
often running into the issue that it doesn't have a chapter about what I want
to learn -- at barely over 900 pages it's just way too short). I recently asked
myself what it is about the Napkin that I like so much, and this post is part
of my answer.

Note that I'm describing the way _I_ like to learn math, not the objectively
best way. If you happen to like learning that way too, maybe this post can give
you a more explicit idea of what "that way" is. Otherwise, it will at least
give you some insight into the brain of someone who learns differently
than you do, and maybe that will help if you want to teach math to other
people.

One way of teaching mathematical concepts is the approach typically employed
by textbooks: give some definitions, probably a few examples, state a few theorems,
prove them. In some cases, you might also get an intuitive explanation of what
these definitions are all about or why a theorem is interesting or how the proof
roughly works. But often, these explanations are sparse and confined to the beginning
of a section, so as not to dilute the mathematical purity of the remaining text.

Another style of explanation is the one that consists almost entirely of hand-waving. Evan Chen
describes it as follows:

<blockquote>

Someone tells you about the hairy ball theorem in the form “you can’t comb the
hair on a spherical cat”, then doesn’t tell you anything about why it should be true,
what it means to actually “comb the hair”, or any of the underlying theory, leaving
you with just some vague notion in your head.

</blockquote>

We could think of these two approaches as opposite ends of a "rigor"-spectrum.
Somewhere in the middle, you might have the way that theoretical physics is often taught:
few things are formally defined, but concepts are at least made
explicit enough that you are able to use them in calculations, and equations
are usually derived (though less rigorously than in math).

Where does the Napkin fit in on this axis? Is it more or less rigorous than
theoretical physics courses? I think that's the wrong question to ask because
the one-dimensional model of approaches to teaching math is too simplistic.
The space of all the ways you could explain mathematical concepts is very large
and treating it as one-dimensional isn't such a great approximation (though I think
that the "rigor"-axis might be the best one can do with only one dimension).

So what's a better model? I want to suggest thinking about mathematical explanations
using a two-dimensional approximation. On one axis, we have the rigor used when _stating_
definitions or results, while the other axis is the rigor of the _derivations_ of these results.
Textbooks have both formal statements and formal derivations, casual hand-wavy explanations
have neither. Physics is somewhere in between, though to me the derivations often
seem more rigorous than the statements[^fn:1].
Finally, the Napkin takes the opposite approach:
it states things with essentially the same rigor as textbooks but then places emphasis
on very informal derivations or explanations of why these statements are true.

{{< figure src="rigor.svg" caption="Figure 1: Various styles for teaching mathematics. Yes, it would look better as a TikZ figure, but it was either this or nothing." >}}

I find that this approach -- stating things formally but reasoning about them informally --
works extremely well for me when I first learn about a subject. I'm happy to take someone's
word that a statement is true, at least initially and if the statement seems like it _should_
be true. But if I don't know precisely what the statement is, I find it much harder to get
to grips with the subject.

As a caveat, note that I said "when I first learn about a subject". This approach doesn't teach
how to write formal proofs, and it's by design not as comprehensive as a textbook.
But sometimes an intuitive understanding is enough for my purposes, and even if I know I'll
later want to learn a subject in more depth, I find it helpful to build this intuitive
understanding _before_ going through all the details.

[^fn:1]: This sounded a bit absurd to me when writing it down -- how can you rigorously derive something you haven't even really stated? But I think there's some truth to it, and what I mean is roughly this: the calculations done in physics courses are often essentially the same that you'd do for a formal proof. But the objects used in those calculations aren't formally defined, it's just taken for granted that everyone has a sense of what they are and how they behave (or maybe it's explicitly stated how they behave, but not whether they are uniquely characterized by that behavior).
