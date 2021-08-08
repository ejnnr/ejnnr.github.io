+++
title = "Discounting in a relativistic universe"
summary = """
  For people who want to discount the future, special relativity creates
  some challenges. There are different ways to handle those but none
  seem completely satisfactory which may be yet another argument against
  discounting pure utilities.
  """
date = 2020-06-20T12:25:00+02:00
tags = ["Physics"]
draft = false
[image]
  preview_only = "true"
+++

I've heard that when starting a new sketchbook, you should begin by
drawing some silly doodles on the first page to break the paralysis
that a fresh book full of beautiful blank pages can induce.
So for my first blog post I chose the silliest
topic that came to mind, namely the intersection of ethics, economics
and special relativity.

Discounting is the idea that obtaining value \\(V\\) some time \\(\Delta t\\) into the future
is worth only \\(f(\Delta t)V\\) now where \\(f(\Delta t) < 1\\) is the discount factor.
What exactly "value" means depends on the context. For now we will talk about money
as an example but we will get back to this point later.

This definition of discounting raises an obvious problem: the distance in time to future events is not
invariant under Lorentz boosts, so by discounting like this, your value assignments
become dependent on your frame of reference. Now, as long as you never accelerate,
your frame of reference will stay the same and this isn't a practical problem
(though you may still have objections on aesthetic grounds). But as soon as you change your
state of motion, you'll run into problems.

Imagine that you're about to leave for your vacation in the Alpha Centauri system,
taking the new _Starline 90C_ moving at 90% the speed of light.
Suddenly, Omega comes along and offers you a deal: it will pay you $90 right now
but in return you will have to pay $100 once you arrive on Alpha Centauri in
`(format "%0.2f" (/ 4.34 0.9))` 4.82 years (as seen from your current
frame of reference on earth). This sounds like a great deal to you: you discount
at 3% per year, so the $100 you'll have to pay are only worth
`(format "$%0.2f" (* (expt 0.97 4.82) 100))` $86.35 to you now.

So you accept the deal, board your spaceship and begin accelerating towards
Alpha Centauri. But as you do, you feel your value assignments shifting
-- or rather you realize that you will be on Alpha Centauri in only
`(format "%0.2f" (* 4.82 (sqrt (- 1 0.81))))` 2.10 years
in your new reference frame because of time dilation.
This means that you suddenly value the $100 you will have to pay on arrival
at `(format "$%0.2f" (* (expt 0.97 2.1) 100))` $93.80,
just because you stepped into a spaceship and took off.

So clearly, improper discounting is an important financial hazard for
space tourists. But what should you do instead, if you want to keep
your normal discounting procedures while on earth?

Now we need to get back to what we meant by "value". If value refers to money,
then discounting is closely related to the fact that you can invest money you
already have now, so getting money at a later point in time is less valuable.
The amount of time used for discounting calculations should then be the proper time
of the money, so it depends on whether you were going to leave most of your
money invested on earth (in which case you should discount with the 4.82 years
in earth's frame of reference) or whether you were going to invest it aboard
the _Starline 90C_ (in which case you should discount with the travel time
of 2.10 years).

But what if you want to discount pure utilities? In that case the question
is no longer one of economics but of ethics. We are looking for a discount
function \\(f\\) that satisfies the following criteria:

1.  \\(f\\) assigns some discount factor to each point in your future light cone
    -- all of those are events that you might be able to influence and
    therefore need to take into account for utility calculations.
2.  On the world line of your current frame of reference, these factors coincide
    with the old discounting factor \\(f(t)\\) -- "It all adds up
    to normality".
3.  \\(f\\) is invariant under Lorentz boosts in the sense that if your
    velocity suddenly changed and you recalculated all discount factors,
    they would remain the same. Essentially, your ethical judgements
    don't change just because you take a flight to Alpha Centauri at
    relativistic speeds.

I think there is only one way of discountig that satisfies all of these
desiderata[^fn:1]:
use the spacetime interval instead of the time as measured in your current
reference frame.

The spacetime interval between two points is

\begin{equation}\label{eq:spacetime\_interval}
\Delta s = \sqrt{\left(c\Delta t\right)^2 - \left(\Delta x\right)^2 -
\left(\Delta y\right)^2 - \left(\Delta z\right)^2}
\end{equation}

where \\(\Delta t\\) is their time difference (what we used for discounting before)
and \\(\Delta x, \Delta y, \Delta z\\) are the spatial distances. The nice
thing about \\(\Delta s\\) is that it is invariant under Lorentz transformations,
so if instead of discounting with \\(f(\Delta t)\\), you discount with \\(f(\Delta s)\\),
then your value assignments won't change when you change frames of reference.

What consequences does this have? For small spatial distances, not much changes.
The \\(c\\) in equation \eqref{eq:spacetime\_interval} means that as long as you could reach
an event while travelling much slower than the speed of light, \\(\Delta s \approx \Delta t\\).
On the other hand, events that are close to the edges of your future light cone
have \\(\Delta s\\) close to 0, meaning they are discounted only very weakly.
So you'd care about things that happen in 4.3 years (earth frame) on Alpha Centauri
almost as much as about what happens on earth right now -- and much more than
about things that happen on on earth 4.3 years into the future.

If you think this is absurd, I completely agree. One way to get around this is
to give up desideratum 3 above. Maybe if your velocity changes very suddenly,
it's justified for your value judgements to also change very suddenly?
But there is of course another way to avoid these consequences: if \\(f(\Delta s)\\)
is independent of \\(\Delta s\\), then there is no weird bias towards things that
happen close to the edge of your light cone either. In other words: don't discount
pure utilities at all.

For me, the second option is much more appealing. There are already good
reasons against discounting utilities, this simply adds yet another one.
It's by no means an argument showing that you _can't_ consistently discount
events in the far future in a relativistic universe. But if you do, there will
be _some_ consequences that I find rather unintuitive. Either you care a lot
about what happens on faraway star systems in the far future, or how much
you value different things changes whenever you change your velocity.
Take your pick.

[^fn:1]: because every point in your future light cone lies on the world line of some reference frame that you can reach by a Lorentz boost
