<script>
	import { marked } from 'marked';
	import IconX from '~icons/simple-icons/x';
	import IconGoogleScholar from '~icons/simple-icons/googlescholar';
	import IconGithub from '~icons/simple-icons/github';
	// You can add any JavaScript logic here if needed
	/** @type {import('./$types').PageData} */
	export let data;

	// Simple date formatting function
	function formatDate(dateString) {
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
	}
</script>

<div class="flex min-h-screen flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
	<div class="w-full max-w-3xl space-y-8">
		<div
			class="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-y-0 md:space-x-16"
		>
			<!-- Left Side: Photo and Name -->
			<div class="flex-shrink-0 text-center">
				<img
					src="/profile-photo.png"
					alt="Erik Jenner"
					class="mx-auto mb-6 h-50 w-50 rounded-full object-cover"
				/>
				<h2 class="text-center text-3xl font-bold text-gray-900">Erik Jenner</h2>

				<div class="mt-8 flex justify-center space-x-6">
					<!-- Icon Links -->
					<a
						href="https://x.com/jenner_erik"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-gray-500"
					>
						<span class="sr-only">Twitter</span>
						<IconX class="h-6 w-6" />
					</a>
					<a
						href="https://scholar.google.com/citations?user=8DgF8HcAAAAJ"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-gray-500"
					>
						<span class="sr-only">Google Scholar</span>
						<IconGoogleScholar class="h-6 w-6" />
					</a>
					<a
						href="https://github.com/ejnnr"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-gray-500"
					>
						<span class="sr-only">GitHub</span>
						<IconGithub class="h-6 w-6" />
					</a>
				</div>
			</div>

			<!-- Right Side: Bio -->
			<div class="prose text-left text-lg text-gray-600">
				<p>
					I'm a Research Scientist at Google DeepMind working on <span
						class="paperclip-cursor-hover">AGI Safety & Alignment</span
					>. Previously, I did part of a PhD at the Center for Human-Compatible AI at UC Berkeley.
				</p>

				<p>
					See <a href="https://scholar.google.com/citations?user=8DgF8HcAAAAJ">Google Scholar</a>
					for papers I've written, and the
					<a href="https://alignmentforum.org/users/erik-jenner">Alignment Forum</a> for some blog posts
					about earlier-stage work.
				</p>
			</div>
		</div>

		<!-- Recent Blog Posts Section -->
		{#if data.posts && data.posts.length > 0}
			<div class="mt-16 w-full border-t border-gray-200 pt-10">
				<h3 class="mb-8 text-center text-2xl font-bold text-gray-900">Recent Blog Posts</h3>
				<div class="grid gap-8 md:grid-cols-1">
					{#each data.posts as post}
						<article
							class="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
						>
							<a href={post.path} class="block p-6">
								<h4 class="mb-2 text-xl font-bold tracking-tight text-gray-900">{post.title}</h4>

								<div class="mb-3 flex items-center gap-4 text-sm text-gray-600">
									{#if post.date}
										<time datetime={post.date}>{formatDate(post.date)}</time>
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
									<!-- Using svelte-ignore for potential raw HTML in summary -->
									<!-- svelte-ignore a11y-no-inner-html -->
									<div class="prose max-w-none text-gray-700">
										{@html marked.parse(post.summary)}
									</div>
								{/if}
							</a>
						</article>
					{/each}
				</div>
				<div class="mt-8 text-center">
					<a href="/post" class="text-lg font-medium text-blue-600 hover:underline">See all posts</a
					>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.paperclip-cursor-hover {
		cursor:
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M16.5 6v11.5a4 4 0 0 1-4 4a4 4 0 0 1-4-4V5A2.5 2.5 0 0 1 11 2.5A2.5 2.5 0 0 1 13.5 5v10.5a1 1 0 0 1-1 1a1 1 0 0 1-1-1V6H10v9.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5V5a4 4 0 0 0-4-4a4 4 0 0 0-4 4v12.5a5.5 5.5 0 0 0 5.5 5.5a5.5 5.5 0 0 0 5.5-5.5V6z'/%3E%3C/svg%3E"),
			auto;
	}
</style>
