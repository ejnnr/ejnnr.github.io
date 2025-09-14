import{t as w,a as b}from"../chunks/ZND8Q6sY.js";import"../chunks/D1wvszJw.js";import{s as e,f as v,c as o,b as t,n as k}from"../chunks/CXEaPN9q.js";import{h as i}from"../chunks/CkMDHBy_.js";import{l as x,s as z}from"../chunks/lNFSlT5-.js";import{_ as I}from"../chunks/BInqBSHA.js";const u={title:"Collection of quick computer tips",summary:`  Many of us spend a lot of time working with our computer, so it's worth
  spending some time to make that experience as pleasent and productive
  as possible. This is a collection of tips that are relatively quick
  to implement and still very valuable in the long run in my opinion.
  Mainly geared towards developers and others who work with the shell
  a lot.
  `,date:"2021-03-31T12:49:00.000Z",tags:["Productivity"],draft:!1,image:{preview_only:"true"}},{title:F,summary:S,date:D,tags:O,draft:L,image:R}=u;var _=w(`<p>This is a list of tips for improving your experience working
with your computer. I focus on things that are quick to implement
(say, 5 minutes to half an hour). Spending 5 minutes on something becomes
worthwhile as soon as it saves you <a href="https://xkcd.com/1205/" rel="nofollow">5 seconds per month over 5 years</a>,
and I think all the tips here easily clear that bar.
I’m not mentioning some things that are extremely
valuable but take more time to do, stuff like “learn vim keybindings”.
That’s not because those aren’t important — they might even be more important
than these quick hacks. But they don’t fit well into this format because
I would need to give a lot more context: who they are useful for, why it’s
worth investing time in them etc.</p> <p>I’ve grouped these tips and tried to sort them by descending usefulness
inside each category, but that’s of course quite subjective.
As a final caveat, I don’t explain in detail how to set all of this up.
If you’ve played around with configuration files before, the pointers I give are hopefully
enough. If you haven’t, this might not be the easiest place to start.</p> <h2>General</h2> <p>Make use of your Caps Lock key
: The Caps Lock key takes up extremely
valuable keyboard real estate, even though most people never use it.
I suggest mapping it to Control for non-vim users. If you use vim keybindings,
you’ve probably already remapped it to Escape; in that case I would suggest
using it as an Escape key when pressed and as Control when held down while
pressing another key. How that works depends on your OS (I’m using <a href="https://gitlab.com/interception/linux/plugins/caps2esc" rel="nofollow">caps2esc</a> on Archlinux).</p> <p>Fuzzy finder for opening files
: Opening files using a file browser or by first opening
an application and then using the “Open file” dialog is really slow. Instead, you can
use a launcher  that you can invoke with a keyboard
shortcut. You then type in part of the path or filename and once you confirm your selection,
the file is opened. On Linux, you can install for example <a href="https://albertlauncher.github.io/" rel="nofollow">Alfred</a> or <a href="https://ulauncher.io/" rel="nofollow">ULauncher</a> (which also have additional
functionality rather than just opening files). Or you can use <a href="https://github.com/davatorium/rofi" rel="nofollow">rofi</a>, which is extremely
flexible but will require a bit more setup.</p> <p>Adjust your typematic delay and rate
: If you hold a key down, this simulates
pressing that key a bunch of times at a high frequency. The typematic rate
is this frequency and the typematic delay is the time delay before this effect kicks
in. You can adjust these values to your liking, how that works depends on your OS/Desktop environment.
On Linux with X, you can use <code>xset r rate &lt;delay in ms&gt; &lt;rate in Hz&gt;</code> (this is temporary, so put this
in a script that will be executed on startup).</p> <p>Redshift
: Use <a href="http://jonls.dk/redshift/" rel="nofollow">redshift</a> or <a href="https://justgetflux.com/" rel="nofollow">f.lux</a> to automatically adjust the color temperature of your screen according
to the time of day. This will gradually make your screen look warmer during the evening.</p> <p>Dotfiles
: Put your dotfiles in a git repository. <a href="http://dotfiles.github.io/" rel="nofollow">This page</a> contains a few ideas as inspiration on
how to best set this up. Personally, I use <a href="https://github.com/anishathalye/dotbot" rel="nofollow">Dotbot</a>, which means I can put all my configuration
files into one directory and they will be symlinked to the right places. You can also do something
similar for your <code>/etc</code> files using <a href="http://etckeeper.branchable.com/" rel="nofollow">etckeeper</a>.</p> <p>sshfs
: This lets you mount a remote directory inside your local file system,
after which you can edit, create, move and delete files there using whichever
tools you like to use for that on your local machine. It’s in the package repositories
of most Linux distributions and using it is as simple as</p> <pre class="language-undefined"><!></pre> <h2>Shell</h2> <p>Use vim keybindings everywhere
: There are extensions for most browsers
that let you browse web pages with vim keybindings.
You can also use them in <code>zsh</code> (add <code>bindkey -v</code> to you <code>~/.zshrc</code> or use <a href="https://github.com/jeffreytse/zsh-vi-mode" rel="nofollow">this extension</a> for some improved features). In <code>fish</code>, you can use <code>fish_vi_key_bindings</code> inside your config,
and for <code>bash</code> it’s <code>set -o vi</code>. You can even enable them for all readline programs,
such as the Python REPL, by adding</p> <pre class="language-undefined"><!></pre> <p>to your <code>~/.inputrc</code>.</p> <p>Ctrl-R history search
: Pressing Ctrl-R inside your terminal will let you search
through your history of commands and paste the one you select to your prompt,
after which you can edit it.</p> <p>Aliases
: Pay attention to commands you’re using frequently and create aliases for them.
Using <a href="https://linux.byexamples.com/archives/332/what-is-your-10-common-linux-commands/" rel="nofollow">this command</a>, you can also show your most common commands, maybe that gives some
ideas (though what we really care about is closer to “most common long prefixes of commands”;
might be worth it to write a script for that instead).</p> <p>fzf
: <a href="https://github.com/junegunn/fzf" rel="nofollow">fzf</a> is a general purpose fuzzy finder and you can use it for all kinds of
things. But more importantly, for this list, it comes with three pre-defined
shell-keybindings: Ctrl-R is replaced with an improved history search, and Alt-C lets
you fuzzy search the directories on your machine and will <code>cd</code> to the chosen one.
Finally, Ctrl-T lets you search files inside the current directory (recursively)
and pastes the selected path into the prompt, which is much faster for typing long
paths than the usual TAB completion.</p> <p>Autosuggestions
: Autosuggestions in your shell mean
that the shell always tries to guess which command you’re entering, typically
based on the TAB completions as well as your history. It shows this guess and
you can hit a keybinding to complete it. Make sure to remap this
to something sensible (for example, zsh uses the right arrow key, which is way too far
away, I use Ctrl-Space insted). <code>fish</code> has these built in, and there is an <a href="https://github.com/zsh-users/zsh-autosuggestions" rel="nofollow">extension</a> for <code>zsh</code>. As far as I know, <code>bash</code> doesn’t have autosuggestions at the moment.</p> <p>autojump
: <a href="https://github.com/wting/autojump" rel="nofollow">autojump</a> watches the directories you visit in your shell and maintains
a database of which ones you use the most. Then you can type <code>$ j &lt;part of directory path&gt;</code> and <code>autojump</code> will try to guess which directory you want to go to and <code>cd</code> there.
A couple of letters from the directory name are usually enough for that.
This is a good alternative to <code>fzf</code>’s Alt-C search.</p> <p>Syntax highlighting
: This just means different parts of your command are colored
differently, much more pleasant to work with. Again, <code>fish</code> has this built in, for <code>zsh</code> you can use another <a href="https://github.com/zsh-users/zsh-syntax-highlighting" rel="nofollow">extension</a>, and I don’t think there’s an easy way to do this
in bash.</p> <p>!!
: <code>!!</code> expands to the previous command. So for example, <code>$ sudo !!</code> reruns your previous
command as a super user.</p> <p>Output coloring
: Many shell commands can color their output but have this disabled by default. In particular:</p> <ul><li><code>alias ls='ls --color=auto'</code> to always have colored <code>ls</code> output</li> <li><a href="https://github.com/sharkdp/bat" rel="nofollow">bat</a> is a <code>cat</code> replacement with syntax highlighting among other things.
It can also be used to <a href="https://github.com/sharkdp/bat#man" rel="nofollow">color man pages</a></li> <li>The <a href="https://wiki.archlinux.org/index.php/Color%5Foutput%5Fin%5Fconsole" rel="nofollow">ArchWiki</a> contains many more cases (most of them not specific to Arch)</li></ul> <p>Color theme
: Most terminal emulators allow choosing your own color theme,
and there are configurations online for most pairs of terminal emulator and
popular color theme. So you can for example use the same theme you use inside
your editor for your terminal as well.</p> <h2>Zathura</h2> <p>Zathura is a lightweight PDF viewer with vim keybindings. I’m a big fan; in case
you are as well, here are two tips to make it even better:</p> <ul><li><p>When you’re on e.g. page 10 of a PDF but the page number in the footer is 1
(because of title pages etc.), type <code>:offset 9</code> to tell Zathura about this mismatch.
Whenever you type <code>&lt;page number&gt; G</code> later, Zathura will subtract this offset and
you will be on the page with <code>&lt;page number&gt;</code> in the footer. Extremely useful if
the PDF has no hyperlinked table of contents. Zathura remembers this setting for each file.</p></li> <li><p>Recoloring allows you to give PDFs a custom foreground and background color. For example,
you could display PDFs as light text on a dark background. Or use the following in your <code>zathurarc</code>,
which displays PDFs in a Solarized light color scheme:</p> <pre class="language-nil"><!></pre> <p>The last line means that the colors of images should be preserved (though they’ll be
less vibrant). This works for <em>all</em> pdfs, even scanned images! Ctrl-R will toggle recolorization
on and off, in case you want to switch back to the original.
For the ideal visual experience, you can also set the color of all the GUI elements,
see <a href="https://github.com/lennonwoo/zathura-solarized" rel="nofollow">https://github.com/lennonwoo/zathura-solarized</a> for a Solarized version.</p></li></ul>`,1);function M(c,d){const p=x(d,["children","$$slots","$$events","$$legacy"]);I(c,z(()=>p,u,{children:(m,T)=>{var r=_(),a=e(v(r),18),f=o(a);i(f,()=>'<code class="language-undefined">$ sshfs [user@]hostname:[directory] mountpoint</code>'),t(a);var s=e(a,6),y=o(s);i(y,()=>`<code class="language-undefined">set editing-mode vi
set keymap vi</code>`),t(s);var n=e(s,28),l=e(o(n),2),h=e(o(l),2),g=o(h);i(g,()=>`<code class="language-nil">    set recolor
    set recolor-darkcolor &quot;#586e75&quot;
    set recolor-lightcolor &quot;#fdf6e3&quot;
    set recolor-keephue</code>`),t(h),k(2),t(l),t(n),b(m,r)},$$slots:{default:!0}}))}export{M as component};
