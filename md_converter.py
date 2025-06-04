#!/usr/bin/env python3
# /// script
# dependencies = [
#   "toml>=0.10.2",
#   "pyyaml>=6.0",
# ]
# ///
"""
Markdown Converter for SvelteKit Blog

Converts blog posts from Hugo-style format to SvelteKit/mdsvex format:
1. Changes frontmatter from TOML to YAML
2. Removes {#...} annotations after headings
3. Changes LaTeX syntax from \(...\) to $...$ and \[...\] to $$...$$
4. Fixes escaped characters in LaTeX expressions (braces, underscores)
5. Fixes relative image paths by adding ./ prefix to local images
6. Converts footnote syntax from [^fn:i] to [^i]

Usage:
    uv run md_converter.py file1.md file2.md ...
"""

import os
import re
import shutil
import sys

import toml
import yaml


def convert_frontmatter(content):
    """Convert TOML frontmatter to YAML."""
    # Extract the TOML frontmatter
    toml_match = re.match(r"^\+\+\+(.*?)\+\+\+", content, re.DOTALL)
    if not toml_match:
        return content  # No frontmatter found

    toml_content = toml_match.group(1)

    try:
        # Parse TOML content
        frontmatter_data = toml.loads(toml_content)

        # Convert to YAML
        yaml_content = yaml.dump(
            frontmatter_data, default_flow_style=False, sort_keys=False
        )

        # Replace the TOML frontmatter with YAML frontmatter
        return content.replace(toml_match.group(0), f"---\n{yaml_content}---", 1)

    except Exception as e:
        print(f"Error converting frontmatter: {e}")
        return content


def remove_heading_annotations(content):
    """Remove {#...} annotations after headings."""
    # Find headings with annotations and remove the annotations
    return re.sub(r"^(#+\s+.*?)\s+\{#.*?\}", r"\1", content, flags=re.MULTILINE)


def convert_latex_syntax(content):
    """Convert LaTeX syntax from \\(...\\) to $...$ and \\[...\\] to $$...$$."""
    # Handle inline LaTeX: \(...\) -> $...$
    content = re.sub(r"\\\\?\((.+?)\\\\?\)", r"$\1$", content)

    # Process the content line by line to handle display LaTeX
    lines = content.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i]

        # Check if this line contains a display math start
        match = re.search(r"(.*?)\\\\?\[(.*)", line)
        if match:
            prefix = match.group(1)  # Content before \[
            start_content = match.group(2)  # Content after \[

            # Extract content until we find the closing \]
            full_content = [start_content]
            end_index = i

            # Look for the closing \]
            found_end = False
            if re.search(r".*\\\\?\]", start_content):
                # Case: \[...\] is on the same line
                found_end = True
                full_content = [re.sub(r"(.*?)\\\\?\].*", r"\1", start_content)]
            else:
                j = i + 1
                while j < len(lines) and not found_end:
                    if re.search(r".*\\\\?\]", lines[j]):
                        # Found the end on this line
                        end_content = re.sub(r"(.*?)\\\\?\].*", r"\1", lines[j])
                        full_content.append(end_content)
                        end_index = j
                        found_end = True
                    else:
                        # Add the whole line to the content
                        full_content.append(lines[j])
                    j += 1

            if found_end:
                # Build the replacement
                latex_content = "\n".join(full_content).strip()
                indentation = prefix  # Use the exact text before \[ as indentation

                # Replace the original lines with the new format
                replacement = [
                    f"{indentation}$$",
                    f"{indentation}{latex_content}",
                    f"{indentation}$$",
                ]

                # Replace the original lines with our new ones
                lines[i : end_index + 1] = replacement

                # Skip past the inserted lines
                i += 3
                continue

        i += 1

    # Join the lines back together
    return "\n".join(lines)


def fix_escaped_characters(content):
    """Fix escaped characters in LaTeX expressions."""
    # Replace double-escaped braces with single-escaped braces in LaTeX
    # This replaces \\{...\\} with \{...\} in LaTeX expressions
    content = re.sub(r"\\\\{([^}]*?)\\\\}", r"\\{\1\\}", content)

    # Replace escaped underscores in LaTeX (usually in subscripts)
    # Find all math expressions first (both inline $ and display $$)
    math_pattern = r"(\$\$?.+?\$\$?)"

    def fix_underscores_in_math(match):
        math_expr = match.group(1)
        # Replace escaped underscores with regular underscores in math mode
        return re.sub(r"\\_", "_", math_expr)

    # Apply the replacement function to all math expressions
    content = re.sub(math_pattern, fix_underscores_in_math, content, flags=re.DOTALL)

    return content


def fix_image_paths(content):
    """Fix image paths by adding ./ prefix to local images."""
    # Pattern to match markdown image links: ![alt text](image.ext)
    # This regex captures: ![any text](filename.ext) where filename doesn't have a path separator
    # It avoids matching URLs by excluding patterns with :// in the path
    return re.sub(
        r"(!\[.*?\])\((?!\./)(?!https?://)(?!/)([^/\s:]+\.[a-zA-Z0-9]+)\)",
        r"\1(./\2)",
        content,
    )


def convert_footnotes(content):
    """Convert footnote syntax from [^fn:i] to [^i]."""
    # Replace footnote references in text: [^fn:1] -> [^1]
    content = re.sub(r"\[\^fn:(\d+)\]", r"[^\1]", content)

    return content


def process_file(file_path):
    """Process a markdown file by converting its format according to requirements."""
    # Create backup
    backup_path = f"{file_path}.bkp"
    try:
        shutil.copy2(file_path, backup_path)
        print(f"Created backup at {backup_path}")
    except Exception as e:
        print(f"Failed to create backup: {e}")
        return

    try:
        # Read file content
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Apply transformations
        content = convert_frontmatter(content)
        content = remove_heading_annotations(content)
        content = convert_latex_syntax(content)
        content = fix_escaped_characters(content)
        content = fix_image_paths(content)
        content = convert_footnotes(content)

        # Write converted content back to the file
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Successfully converted {file_path}")

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        # Restore from backup on error
        try:
            shutil.copy2(backup_path, file_path)
            print(f"Restored {file_path} from backup")
        except Exception as restore_error:
            print(f"Failed to restore from backup: {restore_error}")


def main():
    """Main entry point for the script."""
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} file1.md file2.md ...")
        sys.exit(1)

    for file_path in sys.argv[1:]:
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            continue

        if not file_path.endswith(".md"):
            print(f"Skipping non-markdown file: {file_path}")
            continue

        process_file(file_path)


if __name__ == "__main__":
    main()
