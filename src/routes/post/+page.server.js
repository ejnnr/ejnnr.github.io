import { fetchPosts } from '../../lib/posts';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const posts = await fetchPosts();
    return {
        posts
    };
} 