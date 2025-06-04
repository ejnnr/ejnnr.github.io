<script>
	import { marked } from 'marked';
	export let src = '';
	export let caption = '';
	export let width = 'auto'; // Default width
</script>

<figure class="mx-auto my-6 flex flex-col items-center" style="width: {width}; max-width: 100%;">
	<img {src} alt={caption || 'Figure'} class="h-auto max-w-full" />
	{#if caption}
		<figcaption class="text-s mt-2 text-center text-gray-500 italic">
			{@html marked.parseInline(caption)}
		</figcaption>
	{/if}
</figure>
