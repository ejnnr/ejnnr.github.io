---
title: Collection of quick computer tips
summary: "  Many of us spend a lot of time working with our computer, so it's worth\n\
  \  spending some time to make that experience as pleasent and productive\n  as possible.\
  \ This is a collection of tips that are relatively quick\n  to implement and still\
  \ very valuable in the long run in my opinion.\n  Mainly geared towards developers\
  \ and others who work with the shell\n  a lot.\n  "
date: 2021-03-31 14:49:00+02:00
tags:
- Productivity
draft: false
image:
  preview_only: 'true'
---

This is a list of tips for improving your experience working
with your computer. I focus on things that are quick to implement
(say, 5 minutes to half an hour). Spending 5 minutes on something becomes
worthwhile as soon as it saves you [5 seconds per month over 5 years](https://xkcd.com/1205/),
and I think all the tips here easily clear that bar.
I'm not mentioning some things that are extremely
valuable but take more time to do, stuff like "learn vim keybindings".
That's not because those aren't important -- they might even be more important
than these quick hacks. But they don't fit well into this format because
I would need to give a lot more context: who they are useful for, why it's
worth investing time in them etc.

I've grouped these tips and tried to sort them by descending usefulness
inside each category, but that's of course quite subjective.
As a final caveat, I don't explain in detail how to set all of this up.
If you've played around with configuration files before, the pointers I give are hopefully
enough. If you haven't, this might not be the easiest place to start.


## General

Make use of your Caps Lock key
: The Caps Lock key takes up extremely
    valuable keyboard real estate, even though most people never use it.
    I suggest mapping it to Control for non-vim users. If you use vim keybindings,
    you've probably already remapped it to Escape; in that case I would suggest
    using it as an Escape key when pressed and as Control when held down while
    pressing another key. How that works depends on your OS (I'm using [caps2esc](https://gitlab.com/interception/linux/plugins/caps2esc) on Archlinux).

Fuzzy finder for opening files
: Opening files using a file browser or by first opening
    an application and then using the "Open file" dialog is really slow. Instead, you can
    use a launcher  that you can invoke with a keyboard
    shortcut. You then type in part of the path or filename and once you confirm your selection,
    the file is opened. On Linux, you can install for example [Alfred](https://albertlauncher.github.io/) or [ULauncher](https://ulauncher.io/) (which also have additional
    functionality rather than just opening files). Or you can use [rofi](https://github.com/davatorium/rofi), which is extremely
    flexible but will require a bit more setup.

Adjust your typematic delay and rate
: If you hold a key down, this simulates
    pressing that key a bunch of times at a high frequency. The typematic rate
    is this frequency and the typematic delay is the time delay before this effect kicks
    in. You can adjust these values to your liking, how that works depends on your OS/Desktop environment.
    On Linux with X, you can use `xset r rate <delay in ms> <rate in Hz>` (this is temporary, so put this
    in a script that will be executed on startup).

Redshift
: Use [redshift](http://jonls.dk/redshift/) or [f.lux](https://justgetflux.com/) to automatically adjust the color temperature of your screen according
    to the time of day. This will gradually make your screen look warmer during the evening.

Dotfiles
: Put your dotfiles in a git repository. [This page](http://dotfiles.github.io/) contains a few ideas as inspiration on
    how to best set this up. Personally, I use [Dotbot](https://github.com/anishathalye/dotbot), which means I can put all my configuration
    files into one directory and they will be symlinked to the right places. You can also do something
    similar for your `/etc` files using [etckeeper](http://etckeeper.branchable.com/).

sshfs
: This lets you mount a remote directory inside your local file system,
    after which you can edit, create, move and delete files there using whichever
    tools you like to use for that on your local machine. It's in the package repositories
    of most Linux distributions and using it is as simple as

    ```nil
                $ sshfs [user@]hostname:[directory] mountpoint
    ```


## Shell

Use vim keybindings everywhere
: There are extensions for most browsers
    that let you browse web pages with vim keybindings.
    You can also use them in `zsh` (add `bindkey -v` to you `~/.zshrc` or use [this extension](https://github.com/jeffreytse/zsh-vi-mode)
    for some improved features). In `fish`, you can use `fish_vi_key_bindings` inside your config,
    and for `bash` it's `set -o vi`. You can even enable them for all readline programs,
    such as the Python REPL, by adding

    ```nil
              set editing-mode vi
              set keymap vi
    ```

    to your `~/.inputrc`.

Ctrl-R history search
: Pressing Ctrl-R inside your terminal will let you search
    through your history of commands and paste the one you select to your prompt,
    after which you can edit it.

Aliases
: Pay attention to commands you're using frequently and create aliases for them.
    Using [this command](https://linux.byexamples.com/archives/332/what-is-your-10-common-linux-commands/), you can also show your most common commands, maybe that gives some
    ideas (though what we really care about is closer to "most common long prefixes of commands";
    might be worth it to write a script for that instead).

fzf
: [fzf](https://github.com/junegunn/fzf) is a general purpose fuzzy finder and you can use it for all kinds of
    things. But more importantly, for this list, it comes with three pre-defined
    shell-keybindings: Ctrl-R is replaced with an improved history search, and Alt-C lets
    you fuzzy search the directories on your machine and will `cd` to the chosen one.
    Finally, Ctrl-T lets you search files inside the current directory (recursively)
    and pastes the selected path into the prompt, which is much faster for typing long
    paths than the usual TAB completion.

Autosuggestions
: Autosuggestions in your shell mean
    that the shell always tries to guess which command you're entering, typically
    based on the TAB completions as well as your history. It shows this guess and
    you can hit a keybinding to complete it. Make sure to remap this
    to something sensible (for example, zsh uses the right arrow key, which is way too far
    away, I use Ctrl-Space insted). `fish` has these built in, and there is an [extension](https://github.com/zsh-users/zsh-autosuggestions)
    for `zsh`. As far as I know, `bash` doesn't have autosuggestions at the moment.

autojump
: [autojump](https://github.com/wting/autojump) watches the directories you visit in your shell and maintains
    a database of which ones you use the most. Then you can type `$ j <part of directory path>`
    and `autojump` will try to guess which directory you want to go to and `cd` there.
    A couple of letters from the directory name are usually enough for that.
    This is a good alternative to `fzf`'s Alt-C search.

Syntax highlighting
: This just means different parts of your command are colored
    differently, much more pleasant to work with. Again, `fish` has this built in, for
    `zsh` you can use another [extension](https://github.com/zsh-users/zsh-syntax-highlighting), and I don't think there's an easy way to do this
    in bash.

!!
: `!!` expands to the previous command. So for example, `$ sudo !!` reruns your previous
    command as a super user.

Output coloring
: Many shell commands can color their output but have this disabled by default. In particular:
    -   `alias ls='ls --color=auto'` to always have colored `ls` output
    -   [bat](https://github.com/sharkdp/bat) is a `cat` replacement with syntax highlighting among other things.
        It can also be used to [color man pages](https://github.com/sharkdp/bat#man)
    -   The [ArchWiki](https://wiki.archlinux.org/index.php/Color%5Foutput%5Fin%5Fconsole) contains many more cases (most of them not specific to Arch)

Color theme
: Most terminal emulators allow choosing your own color theme,
    and there are configurations online for most pairs of terminal emulator and
    popular color theme. So you can for example use the same theme you use inside
    your editor for your terminal as well.


## Zathura

Zathura is a lightweight PDF viewer with vim keybindings. I'm a big fan; in case
you are as well, here are two tips to make it even better:

-   When you're on e.g. page 10 of a PDF but the page number in the footer is 1
    (because of title pages etc.), type `:offset 9` to tell Zathura about this mismatch.
    Whenever you type `<page number> G` later, Zathura will subtract this offset and
    you will be on the page with `<page number>` in the footer. Extremely useful if
    the PDF has no hyperlinked table of contents. Zathura remembers this setting for each file.
-   Recoloring allows you to give PDFs a custom foreground and background color. For example,
    you could display PDFs as light text on a dark background. Or use the following in your `zathurarc`,
    which displays PDFs in a Solarized light color scheme:

    ```nil
        set recolor
        set recolor-darkcolor "#586e75"
        set recolor-lightcolor "#fdf6e3"
        set recolor-keephue
    ```

    The last line means that the colors of images should be preserved (though they'll be
    less vibrant). This works for _all_ pdfs, even scanned images! Ctrl-R will toggle recolorization
    on and off, in case you want to switch back to the original.
    For the ideal visual experience, you can also set the color of all the GUI elements,
    see <https://github.com/lennonwoo/zathura-solarized> for a Solarized version.
