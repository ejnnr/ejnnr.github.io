+++
title = "Scripting for personal productivity"
summary = """
  If you can program, you can use that to support your habits and automate
  some routines. This post gives a few examples.
  """
date = 2021-04-14T19:42:00+02:00
tags = ["Productivity"]
draft = false
[image]
  preview_only = "true"
+++

This is just a short PSA: if you can code, you can write small scripts
to support your habits and productivity routines. I'm not talking about
automating long, tedious tasks. Rather, I mean automating tasks that
take about five or ten seconds but that you do every day, or at least
very often.

The point is not actually that you'll save five seconds. Instead, such scripts
can give you the right nudges at the right time, make your life slightly less
annoying, or automate stuff so you can't accidentially forget doing it.
The philosophy is that [even very small inconveniences matter](https://www.lesswrong.com/posts/reitXJgJXFzKpdKyd/beware-trivial-inconveniences), and if you can
spend a few minutes to make every day that follows even a tiny bit more convenient,
it's probably worth doing.

This is best illustrated by some examples, so that's what the rest of this
post consists of. But I'm sure this is only scratching the surface, so take
these as inspiration and not as a comprehensive list of possibilities.


## Checklists {#checklists}

One of my most important routines is a "daily checklist" that I go through
at the end of each day, where I reflect a bit but mainly plan the next day.
I used to just have a list of all the steps in a text file and went through
those, but as the checklist grew, this became ever so slightly annoying,
and I was liable to skip steps sometimes. So I wrote a small script (inside
Emacs), which takes me through the checklist. I press a keyboard shortcut
to start the checklist and I'm prompted with the first item, then I press the
same shortcut again and I'm prompted with the next item and so on. For me,
this alone is already an improvement over a list in a textfile, because
I'm less likely to press the shortcut without actually doing the current item
than I was to just skip to the next one when reading a checklist. But even
better, for many items my script can give me additional nudges to make
the checklist less annoying. For example, I have several items where I look
at my weekly goals, my scheduled TODO items for the next day etc. Instead
of opening the right files by hand, the script does that automatically once
the corresponding prompt comes up. It doesn't sound like much, but it adds
up and makes going through the checklist much less annoying, which means
I'm more likely to do it diligently. Using a script for this checklist
has other advantages, which I'll talk about below.

Of course, this is not specific about a daily checklist you go through
every evening, it applies to any checklist you use regularly and which
has a reasonably large nummber of items.


## Automatically close distracting programs {#automatically-close-distracting-programs}

Cal Newport recommends ending the work day with a [shutdown ritual](https://www.calnewport.com/blog/2009/06/08/drastically-reduce-stress-with-a-work-shutdown-ritual/) and
truly relaxing afterwards. This doesn't really work if you still have
programs such as Slack open that distract you with work-related notifications,
so my daily checklist script closes distracting programs automatically
at the end of the checklist.

One thing I haven't yet looked into but that would be nice is to also close
individual browser tabs automatically. For example, you could close
distracting websites whenever you suspend your PC, or
whenever they were idle for a specific time, or when you start
a Pomodoro, etc. A website blocker can of course serve a similar function,
but unless you _always_ block those website, the slight nudge from closing
tabs automatically could be useful on top of a blocker.


## Welcome screen {#welcome-screen}

When I start my computer in the morning, I'm greeted by a fullscreen wallpaper,
with a nice quote and my top priority for the day. For example, it might look
like this[^fn:1]:
![](welcome.png)
The top priority is another thing where my daily checklist script comes
in handy: it prompts me to enter one for the next day and stores it; the welcome
screen can then later read it from disk and display it.


## Use APIs for the apps you use {#use-apis-for-the-apps-you-use}

This is of course very specific to the apps you use, but I'll give an example.
I use [Complice](https://complice.co/) to plan my day and [Beeminder](https://www.beeminder.com/) for accountability for my goals.
Yet another thing my daily checklist script does is to fetch all goals from
Beeminder for which some progress is due the next day, using the Beeminder API.
It then adds corresponding TODOs to Complice, using the Complice API. So before
I add TODOs manually, the list on Complice is already pre-populated with
what I need to do to stay on track with my Beeminder goals.

Of course this is only possible when the services you want to automate stuff
for expose an API, but it's worth checking whether that's the case. If it is,
it's often surprisingly easy to use, as long as you only want to do a few simple
things. What I just described as an example can be implemented as a bash script
with just a few lines, using `curl` to access the API and [`jq`](https://stedolan.github.io/jq/) to parse JSON.


## Final notes {#final-notes}

In case you're interested, [here](https://github.com/ejnnr/dotfiles/blob/main/bin/welcome%5Fscreen.sh) is the script that displays the welcome screen and [here](https://github.com/ejnnr/dotfiles/blob/main/bin/complice.sh) is the one for the Complice/Beeminder API.
That repository also contains the other things I mentioned in this post.

I'm interested to apply this idea of automating parts of my routines
even more. If you have ideas in that direction, I would appreaciate [a message](mailto:erik@ejenner.com).
Also feel free to shoot me an email if you are trying to set up any of the things
I've described here and want more details on how to do that.

[^fn:1]: [Wallpaper source](https://www.kisscc0.com/photo/public-domain-creative-commons-license-nature-1a92bt/)
