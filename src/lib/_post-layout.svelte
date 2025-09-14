<!-- 
  Post layout component that enhances the display of blog posts
  This will be used with mdsvex layouts
-->

<script>
	// Import components and libraries if needed
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// Props passed directly from mdsvex frontmatter
	export let title = '';
	export let date = '';
	export let summary = '';
	export let tags = [];
	export let image = undefined;
	export let slug = undefined;
	export let readingTime = undefined;
	export let toc = false;

	// Reactive variable for parsed summary removed; summary is used only for meta description

	// Get the slug from the URL if not provided directly
	$: actualSlug = slug || $page.url.pathname.split('/').filter(Boolean).pop();

	// Format the date
	const formatDate = (dateString) => {
		if (!dateString) return '';

		// Extract just the date part (YYYY-MM-DD) to avoid timezone conversion issues
		const dateOnly = dateString.split('T')[0] || dateString.split(' ')[0];
		const [year, month, day] = dateOnly.split('-');

		// Create date using local timezone to avoid conversion
		const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	/** @type {Array<{id: string, text: string, level: number}>} */
	let tableOfContents = [];

	// Generate table of contents from headings
	onMount(() => {
		if (toc) {
			// Find all h2 and h3 headings
			const headings = document.querySelectorAll('.prose h2, .prose h3');
			tableOfContents = Array.from(headings).map((heading) => ({
				id: heading.id,
				text: heading.textContent || '',
				level: heading.tagName === 'H2' ? 2 : 3
			}));
		}
	});
</script>

<svelte:head>
	<title>{title}</title>
	{#if summary}
		<meta name="description" content={summary} />
	{/if}
</svelte:head>

<article class="mx-auto max-w-3xl px-4 py-8">
	<header class="mb-8">
		<h1 class="mb-4 border-b pb-4 text-4xl leading-tight font-bold text-gray-900">
			{title}
		</h1>

		{#if date}
			<div class="mt-2 flex items-center gap-4 text-sm text-gray-600">
				<time datetime={date}>
					{formatDate(date)}
				</time>

				{#if readingTime}
					<span class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1 h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{readingTime} min read
					</span>
				{/if}
			</div>
		{/if}

		{#if tags && tags.length > 0}
			<div class="mt-4 flex flex-wrap gap-2">
				{#each tags as tag}
					<span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	{#if toc && tableOfContents.length > 0}
		<div
			class="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
		>
			<h2 class="mb-3 text-lg font-semibold">Table of Contents</h2>
			<ul class="space-y-1">
				{#each tableOfContents as item}
					<li class="text-sm" style={item.level === 3 ? 'margin-left: 1rem;' : ''}>
						<a href={`#${item.id}`} class="text-blue-600 hover:underline dark:text-blue-400">
							{item.text}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if image && !image.preview_only}
		<div class="mb-8 overflow-hidden rounded-lg shadow-md">
			<img
				src={image.src || `${actualSlug}/featured-image.jpg`}
				alt={image.alt || title}
				class="h-auto w-full"
			/>
		</div>
	{/if}

	<div class="prose prose-lg prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl max-w-none">
		<slot />
	</div>

	<div class="mt-12 border-t border-gray-200 pt-8">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<a href="/post" class="inline-flex items-center text-blue-600 hover:text-blue-800">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-2 h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
				Back to all posts
			</a>

			<!-- Post navigation will be implemented later -->
			<!-- Placeholder for previous/next post navigation -->
		</div>
	</div>
</article>
