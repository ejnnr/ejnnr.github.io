/**
 * Fetch and process blog posts using Vite's glob imports so that
 * prerendered builds can find posts without relying on runtime FS paths.
 */
export async function fetchPosts() {
    try {
        // Eagerly load compiled mdsvex modules to access exported metadata
        const modules = import.meta.glob('../routes/post/**/+page.md', { eager: true });
        // Also load raw markdown to generate summaries when not provided
        const rawFiles = import.meta.glob('../routes/post/**/+page.md', { as: 'raw', eager: true });

        const posts = Object.entries(modules)
            .map(([path, mod]) => {
                const pathSegments = path.split('/');
                const slug = pathSegments[pathSegments.length - 2];

                const metadata = /** @type {any} */ (mod)?.metadata ?? {};
                if (metadata.draft === true) return null;

                // Raw content to compute a fallback summary
                let content = /** @type {string} */ (rawFiles[path]) ?? '';
                const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
                if (fmMatch) {
                    content = content.substring(fmMatch[0].length).trim();
                }
                const summary = metadata.summary || (content.slice(0, 350) + (content.length > 350 ? '...' : ''));

                return {
                    title: metadata.title || slug,
                    date: metadata.date || null,
                    summary,
                    tags: metadata.tags || [],
                    path: `/post/${slug}`,
                    slug
                };
            })
            .filter(Boolean)
            .sort((a, b) => {
                // Newest first by date (fallback puts undated at end)
                if (!a.date) return 1;
                if (!b.date) return -1;
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateB - dateA;
            });

        return posts;
    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
}