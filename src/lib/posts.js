import { readdir, readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

// Get the directory path for the post directory relative to this file
const __dirname = fileURLToPath(new URL('.', import.meta.url));
// Assuming posts are in src/routes/post/ relative to the project root
// Adjust the path resolution as needed based on project structure
const postsDir = resolve(__dirname, '../routes/post');

/**
 * Fetches and processes blog posts from the filesystem.
 * Reads markdown files from subdirectories in the posts directory,
 * extracts frontmatter, sorts posts by date (newest first),
 * and filters out drafts.
 * @returns {Promise<Array<Object|null>>} A promise that resolves to an array of post objects.
 */
export async function fetchPosts() {
    try {
        // Read all directories in the posts directory (each directory is a post)
        const postDirs = await readdir(postsDir, { withFileTypes: true });

        // Filter for only directories and exclude hidden/special directories
        const validPostDirs = postDirs.filter(
            dirent => dirent.isDirectory() && !dirent.name.startsWith('_') && !dirent.name.startsWith('.')
        );

        // For each directory, read the +page.md file and extract frontmatter
        const postPromises = validPostDirs.map(async (dirent) => {
            const postPath = join(postsDir, dirent.name);
            const mdPath = join(postPath, '+page.md');

            try {
                // Read the markdown file
                const fileContent = await readFile(mdPath, 'utf-8');

                // Extract frontmatter (between --- markers)
                const frontmatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
                let content = fileContent; // Default to full content if no frontmatter

                if (frontmatterMatch && frontmatterMatch[1]) {
                    const frontmatter = parse(frontmatterMatch[1]);
                    content = fileContent.substring(frontmatterMatch[0].length).trim(); // Extract content after frontmatter

                    // Skip draft posts
                    if (frontmatter.draft === true) {
                        return null;
                    }

                    // Ensure summary exists, generate from content if necessary
                    const summary = frontmatter.summary || (content.slice(0, 350) + (content.length > 350 ? '...' : ''));

                    return {
                        title: frontmatter.title || dirent.name,
                        date: frontmatter.date || null,
                        summary: summary, // Use generated or existing summary
                        tags: frontmatter.tags || [],
                        // content: content, // Still avoid loading full content
                        path: `/post/${dirent.name}`,
                        slug: dirent.name
                    };
                }

                // No valid frontmatter found, treat as a basic post
                // Generate summary from content
                const summary = content.slice(0, 350) + (content.length > 350 ? '...' : '');
                return {
                    title: dirent.name,
                    date: null, // Or attempt to get date from filename/metadata if needed
                    summary: summary, // Use generated summary
                    tags: [],
                    path: `/post/${dirent.name}`,
                    slug: dirent.name,
                    // content: content // Avoid loading full content
                };
            } catch (error) {
                // Handle cases where +page.md might be missing or unreadable
                if (error.code === 'ENOENT') {
                    console.warn(`Warning: +page.md not found in directory ${dirent.name}. Skipping.`);
                } else {
                    console.error(`Error reading post ${dirent.name}:`, error);
                }
                return null;
            }
        });

        // Wait for all promises to resolve
        const posts = (await Promise.all(postPromises))
            .filter(Boolean) // Remove null entries (drafts, errors)
            .sort((a, b) => {
                // Sort posts by date (newest first)
                if (!a.date) return 1; // Posts without dates go to the end
                if (!b.date) return -1;
                // Ensure dates are valid before comparing
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateB - dateA;
            });

        return posts;
    } catch (error) {
        // Handle error reading the main posts directory
        console.error('Error loading posts:', error);
        // Decide how to handle this error - throw, or return empty array?
        // Returning empty array might be safer for page rendering
        return [];
        // Or rethrow if it's critical: throw new Error('Could not load posts.');
    }
} 