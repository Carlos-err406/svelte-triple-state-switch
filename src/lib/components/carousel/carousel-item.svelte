<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { ClassValue } from 'clsx';
	import { getContext, onMount } from 'svelte';
	import { derived, type Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import type { CarouselContext, CarouselOpts } from './carousel.svelte';

	onMount(addThisItemToContext);

	const { items, centerItem, nextItem, prevItem } = getContext<CarouselContext>('carousel-items');
	const carouselOpts = getContext<Writable<CarouselOpts>>('carousel-opts');
	const { duration } = $carouselOpts;
	let carouselItem: HTMLDivElement;

	let width: number = 0;
	const isCenter = derived(centerItem, ($centerItem) => $centerItem?.item.isSameNode(carouselItem));
	const isPrev = derived(prevItem, ($prevItem) => $prevItem?.item.isSameNode(carouselItem));
	const isNext = derived(nextItem, ($nextItem) => $nextItem?.item.isSameNode(carouselItem));
	const hide = derived(
		[isCenter, isPrev, isNext],
		([$isCenter, $isPrev, $isNext]) => !$isCenter && !$isPrev && !$isNext
	);

	function addThisItemToContext() {
		items.update((current) => [...current, { item: carouselItem, inCenter: current.length === 0 }]);
	}

	const translateX = derived([isCenter, isPrev, isNext], () => {
		if ($isPrev) return `-${width / 5}px`;
		else if ($isNext) return `${width / 5}px`;
		return `${0}px`;
	});

	const scale = derived([isCenter, isPrev, isNext, hide], () => {
		if ($isPrev || $isNext) return `0.75`;
		else if ($hide) return '0';
		return `1`;
	});

	let classNames: ClassValue = '';
	export { classNames as class };
</script>

<div
	bind:offsetWidth={width}
	bind:this={carouselItem}
	data-hide={$hide}
	data-isCenter={$isCenter}
	class:opacity-0={$hide}
	class:z-10={$isCenter}
	class:z-0={!$isCenter}
	style="transform: translateX({$translateX}) scale({$scale}); transition-duration: {duration}ms"
	class={cn(classNames, 'absolute transition-all')}
>
	<div class="carousel-item">
		<slot></slot>
	</div>
	{#if $isCenter && $$slots.footer}
		<div
			transition:fade={{ duration: 300 }}
			style="width: {width}px;"
			class="mt-2 whitespace-break-spaces scale-100"
		>
			<slot name="footer"></slot>
		</div>
	{/if}
</div>
