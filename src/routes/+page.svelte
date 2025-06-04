<script>
	import { marked } from 'marked';
	// You can add any JavaScript logic here if needed
	/** @type {import('./$types').PageData} */
	export let data;

	// Simple date formatting function
	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
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
						<!-- Twitter Icon -->
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/>
						</svg>
					</a>
					<a
						href="https://scholar.google.com/citations?user=8DgF8HcAAAAJ"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-gray-500"
					>
						<span class="sr-only">Google Scholar</span>
						<!-- Google Scholar Icon -->
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-22c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm-3.6 15.187l3.6-2.113 3.6 2.113-1.377-4.074 3.08-2.667h-3.802l-1.501-4.286-1.501 4.286h-3.802l3.08 2.667-1.377 4.074z"
							/>
						</svg>
					</a>
					<a
						href="https://github.com/ejnnr"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-400 hover:text-gray-500"
					>
						<span class="sr-only">GitHub</span>
						<!-- GitHub Icon -->
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.5.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.523 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Right Side: Bio -->
			<div class="prose text-left text-lg text-gray-600">
				<p>
					I'm a Research Scientist at Google DeepMind working on <span
						class="paperclip-cursor-hover">AGI Safety & Alignment</span
					>. I'm on leave from a PhD at the Center for Human-Compatible AI at UC Berkeley.
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
