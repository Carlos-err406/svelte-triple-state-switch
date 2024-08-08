<script context="module" lang="ts">
	export type CarouselContext = {
		items: Writable<CarouselItemType[]>;
		centerItem: Readable<CarouselItemType | undefined>;
		nextItem: Readable<CarouselItemType | null>;
		prevItem: Readable<CarouselItemType | null>;
	};
	export type CarouselItemType = {
		item: HTMLDivElement;
		inCenter: boolean;
	};

	export type CarouselOpts = {
		animated: boolean;
		interval: number;
		duration: number;
		buttonSeparation: number;
		showControls: boolean;
	};

	export type CarouselMethods = {
		next: () => void;
		prev: () => void;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	import type { ClassValue } from 'clsx';

	import { onDestroy, onMount, setContext } from 'svelte';
	import { derived, writable, type Readable, type Writable } from 'svelte/store';

	export let animated: boolean = true;
	export let interval: number = 5000;
	export let duration: number = 300;
	export let buttonSeparation: number = 0;
	export let showControls: boolean = true;
	const carouselOpts = writable<CarouselOpts>({
		animated,
		interval,
		duration,
		buttonSeparation,
		showControls
	});

	const items = writable<CarouselItemType[]>([]);
	const centerItem = derived(items, ($items) => $items.find(({ inCenter }) => inCenter));

	const nextItem = derived(centerItem, ($centerItem) => {
		if (!$centerItem) {
			if ($items.length > 0) return $items[0];
			else return null;
		}
		const currentActiveIndex = getCenterItemIndex();
		const nextActiveIndex = currentActiveIndex + 1;
		if (nextActiveIndex >= $items.length) return $items[0];
		return $items[nextActiveIndex];
	});
	const prevItem = derived(centerItem, ($centerItem) => {
		if (!$centerItem) {
			if ($items.length > 0) return $items[$items.length - 1];
			else return null;
		}
		const currentActiveIndex = getCenterItemIndex();
		const prevActiveIndex = currentActiveIndex - 1;
		if (prevActiveIndex < 0) return $items[$items.length - 1];
		return $items[prevActiveIndex];
	});

	const getCenterItemIndex = () => {
		return $items.reduce((acc, current, index) => {
			if (current.inCenter) return index;
			return acc;
		}, 0);
	};
	const getNextItemIndex = () => {
		return $items.reduce((acc, current, index) => {
			if (current.inCenter) {
				if (index + 1 >= $items.length) return 0;
				return index + 1;
			}
			return acc;
		}, 0);
	};
	const getPrevItemIndex = () => {
		return $items.reduce((acc, current, index) => {
			if (current.inCenter) {
				if (index - 1 < 0) return $items.length - 1;
				return index - 1;
			}
			return acc;
		}, 0);
	};

	let lastDirectionClicked: 'right' | 'left' = 'right';
	const next = () => {
		redoInterval();
		const centerItemIndex = getCenterItemIndex();
		const nextItemIndex = getNextItemIndex();
		if ($centerItem) $items[centerItemIndex].inCenter = false;
		if ($nextItem) $items[nextItemIndex].inCenter = true;

		const firstItem = $items.shift();
		if (firstItem) {
			$items = [...$items, firstItem];
		}
		lastDirectionClicked = 'right';
	};
	const prev = () => {
		redoInterval();
		const centerItemIndex = getCenterItemIndex();
		const prevItemIndex = getPrevItemIndex();
		if ($centerItem) $items[centerItemIndex].inCenter = false;
		if ($prevItem) $items[prevItemIndex].inCenter = true;

		const lastItem = $items.pop();
		if (lastItem) {
			$items = [lastItem, ...$items];
		}
		lastDirectionClicked = 'left';
	};

	let intervalId: NodeJS.Timeout;
	const doInterval = () => {
		let { animated, interval } = $carouselOpts;
		if (!animated) return;
		intervalId = setInterval(() => {
			lastDirectionClicked === 'right' ? next() : prev();
		}, interval);
		return () => {
			clearInterval(intervalId);
		};
	};
	const destroyInterval = () => {
		if (!$carouselOpts.animated) return;
		clearInterval(intervalId);
	};
	const redoInterval = () => {
		if (!$carouselOpts.animated) return;
		destroyInterval();
		doInterval();
	};
	onMount(doInterval);
	onDestroy(destroyInterval);
	$: centerWidth = $centerItem?.item.offsetWidth || 0;
	$: centerHeight = $centerItem?.item.offsetHeight || 0;

	$: buttonsTop = centerHeight / 2.5;
	$: width = centerWidth + $carouselOpts.buttonSeparation;
	$: if (!$carouselOpts.buttonSeparation) {
		$carouselOpts.buttonSeparation = centerWidth / 2;
	} else {
		$carouselOpts.buttonSeparation += centerWidth / 2;
	}

	setContext('carousel-items', { items, centerItem, nextItem, prevItem });
	setContext('carousel-opts', carouselOpts);
	setContext('carousel-methods', { next, prev });
	let classNames: ClassValue = '';
	export { classNames as class };

	const controlAcction = (node: HTMLElement) => {
		const eventHandler = (e: MouseEvent) => {
			e.preventDefault();
			if (node.dataset.kind === 'prev') prev();
			else if (node.dataset.kind === 'next') next();
		};
		node.addEventListener('click', eventHandler);
		return { destroy: () => node.removeEventListener('click', eventHandler) };
	};
</script>

<div class={cn(classNames, 'py-5 w-fit')}>
	<div class="relative" style="width: {width}px; height: {centerHeight}px">
		{#if $carouselOpts.showControls && $$slots.prev}
			<div class="absolute z-20 left-0" style="top: {buttonsTop}px;">
				<slot builder={{ 'data-kind': 'prev' }} action={controlAcction} name="prev">◀️</slot>
			</div>
		{/if}
		{#if $carouselOpts.showControls && $$slots.next}
			<div class="absolute z-20 right-0" style="top: {buttonsTop}px;">
				<slot builder={{ 'data-kind': 'next' }} action={controlAcction} name="next">▶️</slot>
			</div>
		{/if}
		<div class="flex justify-center"><slot /></div>
	</div>
</div>
