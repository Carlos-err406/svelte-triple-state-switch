<script lang="ts" context="module">
	type Switch3State = 'on' | 'indeterminate' | 'off';
	type Switch2State = Omit<Switch3State, 'indeterminate'>;
	export type SwitchState<T = boolean, K = T extends true ? Switch3State : Switch2State> = K;
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { createEventDispatcher } from 'svelte';

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
	let indicatorWidth = 0;

	const handleContainerClick = () => {
		console.log('here');
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
			if (state === 'off') {
				canSetToIndeterminate ? setState('indeterminate') : setState('on');
			} else if (state === 'indeterminate') {
				setState('on');
			}
		} else if (event.key === 'ArrowRight') {
			if (state === 'on') {
				canSetToIndeterminate ? setState('indeterminate') : setState('off');
			} else if (state === 'indeterminate') {
				setState('off');
			}
		}
	};
</script>

<input type="text" {name} hidden bind:value={state} />
<button
	data-triple-state-switch
	on:click={handleContainerClick}
	on:keydown={handleKeyDown}
	class={cn(
		'border rounded-full min-h-7',
		$$restProps.class,
		'flex flex-nowrap relative overflow-clip'
	)}
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
	<div
		bind:clientWidth={indicatorWidth}
		style="--indicator-width: {indicatorWidth}px"
		data-state={state}
		class={cn(
			'backdrop-blur-[1px] border rounded-full transition-all duration-100 ease-out flex items-center justify-center',
			$$restProps.indicatorClasses,
			'absolute top-0 pointer-events-none transform',
			'h-full aspect-square'
		)}
	>
		<slot name="indicator-content" {state}></slot>
	</div>
</button>
