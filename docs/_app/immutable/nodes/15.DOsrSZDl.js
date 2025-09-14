import{t as U,a as I}from"../chunks/ZND8Q6sY.js";import"../chunks/D1wvszJw.js";import{s as e,f as R,c as a,b as s,n as o}from"../chunks/CXEaPN9q.js";import{h as t}from"../chunks/CkMDHBy_.js";import{s as B}from"../chunks/dy7G579c.js";import{l as C,s as W}from"../chunks/lNFSlT5-.js";import{_ as P}from"../chunks/C2OPhFAa.js";const S=""+new URL("../assets/_20210317_140709screenshot.CWqizSxF.png",import.meta.url).href,k={title:"Emacs as an amazing LaTeX editor",summary:`  Emacs has some really amazing features for writing LaTeX; this post gives
  an overview of some of them, either to convince you to give Emacs a try,
  or to make you aware that these features exist if you're already using
  Emacs but didn't know about them.
  `,date:"2021-03-17T13:14:00.000Z",tags:["Productivity"],draft:!1,image:{preview_only:"true"}},{title:K,summary:M,date:Q,tags:ee,draft:ae,image:se}=k;var O=U(`<p>The purpose of this post is to point you towards some great features
and packages if you’re already using Emacs to edit LaTeX, and to
make you jealous if you’re using some other editor<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>.</p> <p>This isn’t a tutorial for Emacs or even a tutorial on how to write LaTeX inside
Emacs. Rather, it’s supposed to give an idea of what’s possible, either
as inspiration or to convince you to give Emacs a try. One problem is
that setting all of this up can be a huge time sink, so you might want
to use a framework such as <a href="https://github.com/hlissner/doom-emacs" rel="nofollow">Doom</a>, where you just need to enable the LaTeX
module and get almost everything I describe here.</p> <h2>The basics</h2> <p>Of course you get all the basics you would expect from a LaTeX editor.
Synctex is supported (meaning you can jump from a certain line in the
LaTeX code to the corresponding place inside your PDF viewer and the other
way around), you can compile files from inside emacs, you can jump to
compilation errors if there are any, there is auto-completion and so on.</p> <h2>Visuals</h2> <p>LaTeX can produce beautiful documents, but the source code isn’t very
readable when writing mathematical expressions:</p> <pre class="language-latex"><!></pre> <p>Emacs and AUCTeX (which is the de-facto standard package for using LaTeX inside
Emacs) have several features that improve this situation:</p> <ul><li><code>preview-latex</code> replaces equations (and other parts of the LaTeX document)
with images by compiling them. This means they look exactly the same inside
the editor as they will in the compiled document. When the cursor is on
an equation, this image preview is automatically replaced by the underlying text so you can
still easily edit equations. However, this method of course has a noticeable
delay because it requires a call to the LaTeX compiler.</li> <li>LaTeX superscripts and subscripts are displayed as super-/subscripts inside the editor.
This is a purely visual feature, editing them doesn’t require “entering” or “exiting”
the subscript or anything like that.</li> <li><code>prettify-symbols-mode</code> allows you to replace any string with any unicode symbol.
AUCTeX comes with a fairly comprehensive predefined list, which replaces LaTeX commands
such as greek letters, arrows and others with symbolic representations. But you
can also add your own. For example, the example above uses <code>\\R</code>, which my custom style
file defines as <code>\\mathbb&#123;R&#125;</code>, and it’s possible to add replacement rules for such custom
commands (as long as there is a fitting Unicode symbol). This makes the line above
look like this in my editor: <img> When the cursor moves over one of those Unicode symbols, it is expanded to the underlying
text. And the nice thing about this is that it’s essentially instantaneous because nothing
needs to be compiled.</li> <li><em>Folding</em> is something similar but more general (though unlike <code>prettify-symbols-mode</code> it’s specific to LaTeX).
It doesn’t just allow replacing fixed strings but also more complicated
expressions. By default, this is used for example to display <code>\\label&#123;some_label&#125;</code> as <code>[l]</code> (which as always expands when the cursor moves over it). The reasoning here is that
some elements such as labels are just distractions when reading LaTeX source code.
But you can also use this to further improve how math is displayed, see <a href="https://tecosaur.github.io/emacs-config/config.html#editor-visuals" rel="nofollow">this config</a> for some ideas (and in general for more ideas on how to
beautify LaTeX inside Emacs).</li></ul> <h2>Editing</h2> <p>AUCTeX has a couple of nice features that make typing LaTeX a bit easier.
For example, you can let it automatically insert braces <code>&#123;&#125;</code> when typing <code>_</code> or <code>^</code> inside a math environment, you can let it insert <code>\\(\\)</code> when typing a dollar sign,
and even <code>\\enquote&#123;&#125;</code> when typing <code>"</code> <sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>.</p> <p>But things get even better with the <a href="https://github.com/iyefrat/evil-tex" rel="nofollow"><code>evil-tex</code></a> package. As the name suggests,
this is only relevant if you’re using <code>evil-mode</code> (vim keybindings inside emacs),
but if so, it’s definitely worth trying. Just a few examples of what this allows
you to do:</p> <ul><li><p>Say you’ve typed</p> <pre class="language-latex"><!></pre> <p>and suddenly realize that this is supposed to go into an exponent. With your cursor
anywhere on this math environment, type <code>ysim^</code> (“surround everything inside the math
environment as an exponent”) and you’ll get</p> <pre class="language-latex"><!></pre> <p>with the cursor at the <code>^</code>. Now you just need to enter the base.</p></li> <li><p>Your equations is now</p> <pre class="language-latex"><!></pre> <p>and you decide that this merits its own displayed rather than
inline equation. So you type <code>csmee</code> (“change the surrounding math environment
to <code>equation</code>”) and get</p> <pre class="language-latex"><!></pre></li> <li><p>After a bit more editing, you have (for some reason)</p> <pre class="language-latex"><!></pre> <p>Of course this looks ugly in the compiled document, you need to use <code>\\left(</code> and <code>\\right)</code>.
With <code>evil-tex</code>, you can just type <code>mtd</code> (“toggle delimiter”) with the cursor anywhere
inside the parantheses, and it will add <code>\\left</code> and <code>\\right</code> for you. Type <code>mtd</code> again to
go back to just the parantheses.</p></li></ul> <h2>Emacs calc’s embedded mode</h2> <p><code>calc</code> is the built-in calculator for Emacs; though saying “calculator”
is a bit misleading because it can do symbolic differentiation, unit conversion,
linear algebra and more. If your press <code>C-x * e</code> with your cursor on any LaTeX equation,
you will start <code>calc</code> in “embedded mode”. This means that <code>calc</code> will parse the LaTeX
code and then let you do any calculations you want involving the expression.
The result will automatically be converted back to LaTeX and written into the
buffer.</p> <p>For example, say you have</p> <pre class="language-latex"><!></pre> <p>and want to know the derivative. You can enter embedded mode and type <code>ad</code> to differentiate,
then type <code>x</code> when prompted for the variable with respect to which to differentiate.
And just like that, you will have</p> <pre class="language-latex"><!></pre> <p>inside your buffer. <code>calc</code> can even parse and output things like <code>\\begin&#123;pmatrix&#125;...\\end&#123;pmatrix&#125;</code>,
so you can multiply matrices as well.</p> <h2>And more</h2> <p>I’ve only covered some of my personal favorite features when it comes to
writing LaTeX inside Emacs, there’s much more. For example, <code>LaTeX-math-mode</code> allows
you to very quickly enter mathematical symbols and RefTeX as well as other packages
make handling references, labels and citations very efficient.
And of course there are a gazillion other packages that can make writing LaTeX
easier — this is Emacs after all.</p> <p>The downside is of course that there is a pretty steep learning curve.
But for people who need to write LaTeX documents all the time, I’d argue
it’s worth it.</p> <div class="footnotes"><hr> <ol><li id="fn-1">Though mostly the first part — I haven’t actually tried many others and they may be just as amazing.<a href="#fnref-1" class="footnote-backref">↩</a></li> <li id="fn-2">Using <code>TeX-electric-sub-and-superscript</code>, <code>TeX-electric-math</code>, and <code>LaTeX-csquotes-open-quote</code> / <code>LaTeX-csquotes-close-quote</code><a href="#fnref-2" class="footnote-backref">↩</a></li></ol></div>`,1);function te(b,x){const q=C(x,["children","$$slots","$$events","$$legacy"]);P(b,W(()=>q,k,{children:(T,D)=>{var h=O(),n=e(R(h),12),_=a(n);t(_,()=>'<code class="language-latex"><span class="token function selector">\\</span>alpha <span class="token function selector">\\</span>mapsto <span class="token function selector">\\</span>int_<span class="token punctuation">&#123;</span><span class="token function selector">\\</span>R<span class="token punctuation">&#125;</span>e^<span class="token punctuation">&#123;</span>-<span class="token function selector">\\</span>alpha x^2<span class="token punctuation">&#125;</span><span class="token function selector">\\</span>,dx</code>'),s(n);var i=e(n,4),m=e(a(i),4),X=e(a(m),6);B(X,"src",S),o(),s(m),o(2),s(i);var r=e(i,8),c=a(r),l=e(a(c),2),L=a(l);t(L,()=>'<code class="language-latex"><span class="token equation string">$ax^&#123;2&#125; + b$</span></code>'),s(l);var g=e(l,4),$=a(g);t($,()=>'<code class="language-latex"><span class="token equation string">$^&#123;ax^&#123;2&#125; + b&#125;$</span></code>'),s(g),o(2),s(c);var d=e(c,2),p=e(a(d),2),E=a(p);t(E,()=>'<code class="language-latex"><span class="token equation string">$e^&#123;ax^&#123;2&#125; + b&#125;$</span></code>'),s(p);var f=e(p,4),j=a(f);t(j,()=>`<code class="language-latex"><span class="token function selector">\\</span>begin<span class="token punctuation">&#123;</span><span class="token keyword">equation</span><span class="token punctuation">&#125;</span><span class="token equation string">
e^&#123;ax^&#123;2&#125; + b&#125;
<span class="token equation-command regex">\\</span></span><span class="token function selector">end</span><span class="token punctuation">&#123;</span><span class="token keyword">equation</span><span class="token punctuation">&#125;</span></code>`),s(f),s(d);var y=e(d,2),v=e(a(y),2),A=a(v);t(A,()=>`<code class="language-latex"><span class="token function selector">\\</span>begin<span class="token punctuation">&#123;</span><span class="token keyword">equation</span><span class="token punctuation">&#125;</span><span class="token equation string">
<span class="token equation-command regex">\\</span>beta(e^&#123;ax^&#123;2&#125; + b&#125; + <span class="token equation-command regex">\\</span>frac&#123;1&#125;&#123;x&#125;)
<span class="token equation-command regex">\\</span></span><span class="token function selector">end</span><span class="token punctuation">&#123;</span><span class="token keyword">equation</span><span class="token punctuation">&#125;</span></code>`),s(v),o(2),s(y),s(r);var u=e(r,8),z=a(u);t(z,()=>`<code class="language-latex"><span class="token equation string">$$
<span class="token equation-command regex">\\</span>sin<span class="token equation-command regex">\\</span>left( x^2 + <span class="token equation-command regex">\\</span>sqrt&#123;x&#125; <span class="token equation-command regex">\\</span>right)
$$</span></code>`),s(u);var w=e(u,4),F=a(w);t(F,()=>`<code class="language-latex"><span class="token equation string">$$
<span class="token equation-command regex">\\</span>left( 2 x + <span class="token equation-command regex">\\</span>frac&#123;0.5&#125;&#123;<span class="token equation-command regex">\\</span>sqrt&#123;x&#125;&#125; <span class="token equation-command regex">\\</span>right) <span class="token equation-command regex">\\</span>cos<span class="token equation-command regex">\\</span>left( x^2 + <span class="token equation-command regex">\\</span>sqrt&#123;x&#125; <span class="token equation-command regex">\\</span>right)
$$</span></code>`),s(w),o(10),I(T,h)},$$slots:{default:!0}}))}export{te as component};
