import { fetchPosts } from '$lib/posts';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const allPosts = await fetchPosts();

    // Get the 3 most recent posts
    const recentPosts = allPosts.slice(0, 3);

    return {
        posts: recentPosts
    };
} 