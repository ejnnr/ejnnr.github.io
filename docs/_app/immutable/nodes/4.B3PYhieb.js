import{t as c,a as p}from"../chunks/ZND8Q6sY.js";import"../chunks/D1wvszJw.js";import{s as o,f as m,c as d,n as s,b as u}from"../chunks/CXEaPN9q.js";import{s as y}from"../chunks/dy7G579c.js";import{l as f,s as g}from"../chunks/lNFSlT5-.js";import{_ as w}from"../chunks/BInqBSHA.js";const b=""+new URL("../assets/welcome.DqY5fqXn.png",import.meta.url).href,a={title:"Scripting for personal productivity",summary:`  If you can program, you can use that to support your habits and automate
  some routines. This post gives a few examples.
  `,date:"2021-04-14T17:42:00.000Z",tags:["Productivity"],draft:!1,image:{preview_only:"true"}},{title:O,summary:j,date:A,tags:C,draft:B,image:F}=a;var k=c(`<p>This is just a short PSA: if you can code, you can write small scripts
to support your habits and productivity routines. I’m not talking about
automating long, tedious tasks. Rather, I mean automating tasks that
take about five or ten seconds but that you do every day, or at least
very often.</p> <p>The point is not actually that you’ll save five seconds. Instead, such scripts
can give you the right nudges at the right time, make your life slightly less
annoying, or automate stuff so you can’t accidentially forget doing it.
The philosophy is that <a href="https://www.lesswrong.com/posts/reitXJgJXFzKpdKyd/beware-trivial-inconveniences" rel="nofollow">even very small inconveniences matter</a>, and if you can
spend a few minutes to make every day that follows even a tiny bit more convenient,
it’s probably worth doing.</p> <p>This is best illustrated by some examples, so that’s what the rest of this
post consists of. But I’m sure this is only scratching the surface, so take
these as inspiration and not as a comprehensive list of possibilities.</p> <h2>Checklists</h2> <p>One of my most important routines is a “daily checklist” that I go through
at the end of each day, where I reflect a bit but mainly plan the next day.
I used to just have a list of all the steps in a text file and went through
those, but as the checklist grew, this became ever so slightly annoying,
and I was liable to skip steps sometimes. So I wrote a small script (inside
Emacs), which takes me through the checklist. I press a keyboard shortcut
to start the checklist and I’m prompted with the first item, then I press the
same shortcut again and I’m prompted with the next item and so on. For me,
this alone is already an improvement over a list in a textfile, because
I’m less likely to press the shortcut without actually doing the current item
than I was to just skip to the next one when reading a checklist. But even
better, for many items my script can give me additional nudges to make
the checklist less annoying. For example, I have several items where I look
at my weekly goals, my scheduled TODO items for the next day etc. Instead
of opening the right files by hand, the script does that automatically once
the corresponding prompt comes up. It doesn’t sound like much, but it adds
up and makes going through the checklist much less annoying, which means
I’m more likely to do it diligently. Using a script for this checklist
has other advantages, which I’ll talk about below.</p> <p>Of course, this is not specific about a daily checklist you go through
every evening, it applies to any checklist you use regularly and which
has a reasonably large nummber of items.</p> <h2>Automatically close distracting programs</h2> <p>Cal Newport recommends ending the work day with a <a href="https://www.calnewport.com/blog/2009/06/08/drastically-reduce-stress-with-a-work-shutdown-ritual/" rel="nofollow">shutdown ritual</a> and
truly relaxing afterwards. This doesn’t really work if you still have
programs such as Slack open that distract you with work-related notifications,
so my daily checklist script closes distracting programs automatically
at the end of the checklist.</p> <p>One thing I haven’t yet looked into but that would be nice is to also close
individual browser tabs automatically. For example, you could close
distracting websites whenever you suspend your PC, or
whenever they were idle for a specific time, or when you start
a Pomodoro, etc. A website blocker can of course serve a similar function,
but unless you <em>always</em> block those website, the slight nudge from closing
tabs automatically could be useful on top of a blocker.</p> <h2>Welcome screen</h2> <p>When I start my computer in the morning, I’m greeted by a fullscreen wallpaper,
with a nice quote and my top priority for the day. For example, it might look
like this<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>: <img> The top priority is another thing where my daily checklist script comes
in handy: it prompts me to enter one for the next day and stores it; the welcome
screen can then later read it from disk and display it.</p> <h2>Use APIs for the apps you use</h2> <p>This is of course very specific to the apps you use, but I’ll give an example.
I use <a href="https://complice.co/" rel="nofollow">Complice</a> to plan my day and <a href="https://www.beeminder.com/" rel="nofollow">Beeminder</a> for accountability for my goals.
Yet another thing my daily checklist script does is to fetch all goals from
Beeminder for which some progress is due the next day, using the Beeminder API.
It then adds corresponding TODOs to Complice, using the Complice API. So before
I add TODOs manually, the list on Complice is already pre-populated with
what I need to do to stay on track with my Beeminder goals.</p> <p>Of course this is only possible when the services you want to automate stuff
for expose an API, but it’s worth checking whether that’s the case. If it is,
it’s often surprisingly easy to use, as long as you only want to do a few simple
things. What I just described as an example can be implemented as a bash script
with just a few lines, using <code>curl</code> to access the API and <a href="https://stedolan.github.io/jq/" rel="nofollow"><code>jq</code></a> to parse JSON.</p> <h2>Final notes</h2> <p>In case you’re interested, <a href="https://github.com/ejnnr/dotfiles/blob/main/bin/welcome%5Fscreen.sh" rel="nofollow">here</a> is the script that displays the welcome screen and <a href="https://github.com/ejnnr/dotfiles/blob/main/bin/complice.sh" rel="nofollow">here</a> is the one for the Complice/Beeminder API.
That repository also contains the other things I mentioned in this post.</p> <p>I’m interested to apply this idea of automating parts of my routines
even more. If you have ideas in that direction, I would appreaciate <a href="mailto:erik@ejenner.com">a message</a>.
Also feel free to shoot me an email if you are trying to set up any of the things
I’ve described here and want more details on how to do that.</p> <div class="footnotes"><hr> <ol><li id="fn-1"><a href="https://www.kisscc0.com/photo/public-domain-creative-commons-license-nature-1a92bt/" rel="nofollow">Wallpaper source</a><a href="#fnref-1" class="footnote-backref">↩</a></li></ol></div>`,1);function S(i,n){const r=f(n,["children","$$slots","$$events","$$legacy"]);w(i,g(()=>r,a,{children:(l,v)=>{var e=k(),t=o(m(e),20),h=o(d(t),3);y(h,"src",b),s(),u(t),s(14),p(l,e)},$$slots:{default:!0}}))}export{S as component};
