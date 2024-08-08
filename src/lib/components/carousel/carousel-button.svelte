<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { ClassValue } from 'clsx';
	import { getContext } from 'svelte';
	import type { CarouselMethods } from './carousel.svelte';

	export let kind: string;
	let className: ClassValue = '';
	export { className as class };

	const { next, prev } = getContext<CarouselMethods>('carousel-methods');
	if (!next || !prev) throw Error('<CarouselButton> must be used inside the <Carousel> component');

	const handleClick = () => {
		switch (kind) {
			case 'prev':
				prev();
				break;
			case 'next':
				next();
				break;
			default:
				throw Error(`<CarouselButton> kind: ${kind}`);
		}
	};
</script>

<button {...$$restProps} class={cn(className)} type="button" on:click={handleClick}>
	<slot />
</button>
