<script lang="ts" context="module">
	type Switch3State = 'on' | 'indeterminate' | 'off';
	type Switch2State = Omit<Switch3State, 'indeterminate'>;
	export type SwitchState<T = boolean, K = T extends true ? Switch3State : Switch2State> = K;
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { createEventDispatcher, onMount } from 'svelte';

	export let triple = false;
	export let defaultValue: SwitchState<typeof $$props.triple> = triple ? 'indeterminate' : 'off';
	export const canSetToIndeterminate = triple;
	export let state: SwitchState<typeof triple> = defaultValue;

	export let name: string | undefined = undefined;
	const dispatch = createEventDispatcher<{
		change: Switch3State;
	}>();

	let prevValue = state;

	const setState = (value: Switch3State) => {
		prevValue = state;
		state = value;
		dispatch('change', value);
	};

	let isDragging = false;
	let startX = 0;
	let diff = 0;
	let indicator: HTMLElement;

	const handleMouseDown = (event: MouseEvent) => {
		isDragging = true;
		startX = event.clientX;
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseUp = (event: MouseEvent) => {
		isDragging = false;
		diff = event.clientX - startX;
		if (diff === 0) handleContainerClick();
		else if (diff > 0) handleRight();
		else if (diff < 0) handleLeft();
		document.removeEventListener('mouseup', handleMouseUp);
	};

	const handleContainerClick = () => {
		if (state === 'off') {
			canSetToIndeterminate ? setState('indeterminate') : setState('on');
		} else if (state === 'indeterminate') {
			if (prevValue === 'off') setState('on');
			else if (prevValue === 'on') setState('off');
			else setState('on');
		} else if (state === 'on') {
			canSetToIndeterminate ? setState('indeterminate') : setState('off');
		}
	};
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			handleContainerClick();
		} else if (event.key === 'ArrowLeft') {
			handleLeft();
		} else if (event.key === 'ArrowRight') {
			handleRight();
		}
	};
	const handleLeft = () => {
		if (state === 'off') {
			canSetToIndeterminate ? setState('indeterminate') : setState('on');
		} else if (state === 'indeterminate') {
			setState('on');
		}
	};
	const handleRight = () => {
		if (state === 'on') {
			canSetToIndeterminate ? setState('indeterminate') : setState('off');
		} else if (state === 'indeterminate') {
			setState('off');
		}
	};

	onMount(() => {
		indicator.addEventListener('mousedown', handleMouseDown);
		return () => {
			indicator.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	});
</script>

<div
	data-triple-state-switch
	class={cn('border rounded-full min-h-7', $$restProps.class, 'relative overflow-clip')}
>
	<input type="text" {name} hidden bind:value={state} />
	<button
		class="flex flex-nowrap size-full"
		on:click={handleContainerClick}
		on:keydown={handleKeyDown}
	>
		<div class="rounded-full min-h-full !aspect-square flex items-center justify-center min-w-6">
			<slot name="on" />
		</div>
		{#if triple}
			<div class="rounded-full min-h-full !aspect-square flex items-center justify-center min-w-6">
				<slot name="indeterminate" />
			</div>
		{/if}
		<div class="rounded-full min-h-full !aspect-square flex items-center justify-center min-w-6">
			<slot name="off" />
		</div>
	</button>
	<button
		bind:this={indicator}
		data-state={state}
		type="button"
		class={cn(
			'backdrop-blur-[1px] border rounded-full transition-all duration-100 ease-out flex items-center justify-center',
			$$restProps.indicatorClasses,
			'absolute top-0 z-10',
			'h-full aspect-square'
		)}
	>
		<slot name="indicator-content" {state}></slot>
	</button>
</div>
