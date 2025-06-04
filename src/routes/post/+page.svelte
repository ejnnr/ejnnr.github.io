<script>
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Blog Posts</title>
	<meta name="description" content="All blog posts" />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8">
	{#if data.posts && data.posts.length > 0}
		<div class="grid gap-8">
			{#each data.posts as post}
				<article
					class="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
				>
					<a href={post.path} class="block p-6">
						<h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title}</h2>

						<div class="mb-3 flex items-center gap-4 text-sm text-gray-600">
							{#if post.date}
								<time datetime={post.date}>
									{new Date(post.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
							{/if}
						</div>

						{#if post.tags && post.tags.length > 0}
							<div class="mb-3 flex flex-wrap gap-2">
								{#each post.tags as tag}
									<span
										class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
									>
										{tag}
									</span>
								{/each}
							</div>
						{/if}

						{#if post.summary}
							<!-- svelte-ignore a11y-no-inner-html -->
							<div class="text-gray-700">{@html marked.parse(post.summary)}</div>
						{/if}
					</a>
				</article>
			{/each}
		</div>
	{:else}
		<p class="text-lg text-gray-600">No posts found.</p>
	{/if}
</div>
