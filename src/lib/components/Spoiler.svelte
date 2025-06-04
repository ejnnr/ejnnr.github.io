<!--Note: put an empyt line after the opening Spoiler tag to avoid mysterious
issues with LaTeX inside the spoiler.-->
<script>
	import { marked } from 'marked';
	import { customSlide } from '$lib/transitions/customSlide'; // Use custom slide again
	export let text = 'Spoiler';

	let isOpen = false; // Track open state locally

	function toggleSpoiler() {
		isOpen = !isOpen;
	}
</script>

<div class="my-4 border-l-4 border-gray-200 bg-white">
	<div
		class="flex cursor-pointer list-none items-center gap-2 py-4 pl-4 font-semibold hover:bg-gray-50"
		on:click={toggleSpoiler}
		role="button"
		aria-expanded={isOpen}
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') toggleSpoiler();
		}}
	>
		<span class="transition-transform duration-200 ease-in-out" class:rotate-90={isOpen}>▶</span>
		{@html marked.parseInline(text)}
	</div>

	{#if isOpen}
		<div class="overflow-hidden" transition:customSlide>
			<div class="border-t border-gray-200 pt-2 pb-4 pl-4">
				<slot />
			</div>
		</div>
	{/if}
</div>
