// place files you want to import through the `$lib` alias in this folder.

export async function getPostBySlug(slug) {
    try {
        console.log(`Attempting to load post: ${slug}`);
        const post = await import(`./post/${slug}/index.md`);
        console.log(`Post loaded successfully:`, post);

        if (!post.metadata) {
            console.error(`No metadata found for post: ${slug}`, post);
        }

        return {
            slug,
            ...post.metadata,
            content: post.default
        };
    } catch (e) {
        console.error(`Failed to load post: ${slug}`, e);
        return null;
    }
}

export async function getAllPosts() {
    const modules = import.meta.glob('./post/*/index.md');

    const posts = await Promise.all(
        Object.entries(modules).map(async ([path, module]) => {
            const slug = path.split('/').at(-2);
            const post = await module();

            return {
                slug,
                ...post.metadata,
                content: post.default
            };
        })
    );

    return posts.sort((a, b) => {
        return new Date(b.date || 0) - new Date(a.date || 0);
    });
}
