<script>
	import '../app.css';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let { children } = $props();

	let y = $state(0);
	let lastY = $state(0);
	let showHeader = $state(true);
	let headerElement;

	function handleScroll() {
		if (!browser) return;
		y = window.scrollY;
		if (y <= 60) {
			// Near the top, always show non-fixed
			showHeader = true;
		} else if (y > lastY) {
			// Scrolling down, hide
			showHeader = false;
		} else {
			// Scrolling up, show fixed
			showHeader = true;
		}
		lastY = y;
	}

	onMount(() => {
		lastY = window.scrollY;
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
		integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
		crossorigin="anonymous"
	/>
</svelte:head>

<svelte:window on:scroll={handleScroll} />

<header
	bind:this={headerElement}
	class="sticky top-0 z-10 w-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out {y >
		60 && showHeader
		? 'fixed'
		: y > 60 && !showHeader
			? 'fixed -translate-y-full'
			: 'relative'} // Apply fixed/translate classes based on state"
>
	<nav class="mx-auto flex max-w-3xl items-center justify-between p-4">
		<a href="/" class="text-lg font-semibold text-gray-800 hover:text-blue-600">My Site</a>
		<div class="space-x-4">
			<a href="/" class="text-gray-600 hover:text-blue-600">Home</a>
			<a href="/post" class="text-gray-600 hover:text-blue-600">Posts</a>
		</div>
	</nav>
</header>

<main class="mx-auto max-w-3xl p-4">
	{@render children()}
</main>
