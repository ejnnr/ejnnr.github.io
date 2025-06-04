# Markdown Converter for SvelteKit Blog

A simple utility to convert Markdown files from Hugo format to SvelteKit/mdsvex format.

## Features

- Converts TOML frontmatter to YAML
- Removes heading annotations (e.g., `{#heading-id}`)
- Changes LaTeX syntax:
  - `\(...\)` to `$...$`
  - `\[...\]` to `$$...$$`
- Fixes escaped characters in LaTeX expressions:
  - Escaped braces (`\\{`) → (`\{`)
  - Escaped underscores (`\_`) → (`_`) in math mode
- Creates backup files before making changes

## Requirements

- Python 3.8+
- [uv](https://github.com/astral-sh/uv) - Python package manager

The script uses inline metadata to declare its dependencies, so there's no need to manually install dependencies first.

## Usage

Run the script with `uv run`:

```bash
uv run md_converter.py file1.md file2.md
```

Process all markdown files in a directory:

```bash
uv run md_converter.py path/to/posts/**/*.md
```

For each file, a backup copy is created with a `.bkp` extension before any changes are made.

## How It Works

The script performs these transformations on each markdown file:

1. **Frontmatter conversion**: Changes TOML frontmatter (between `+++` tags) to YAML frontmatter (between `---` tags)
2. **Heading annotation removal**: Removes annotations like `{#heading-id}` from headings
3. **LaTeX syntax update**: Changes LaTeX delimiters from `\(...\)` to `$...$` and from `\[...\]` to `$$...$$`
4. **LaTeX character fixes**: Fixes escaped characters in LaTeX expressions for better compatibility with mdsvex
