<script lang="ts">
	import type { SwitchState } from '$lib/components/switch.svelte';
	import { Switch } from '$lib/index.js';
	let value1: SwitchState;
	let value2: SwitchState;
	let value3: SwitchState;
	$: console.log({ value1, value2, value3 });
</script>

<svelte:head>
	<title>Playground</title>
</svelte:head>

<div class="space-y-5">
	<div class="w-fit">
		<Switch
			bind:state={value1}
			on:change={({ detail }) => console.log(detail)}
			triple
			canSetToIndeterminate
		>
			<svelte:fragment slot="indicator-content" let:state>
				{#if state === 'indeterminate'}
					<span>➖</span>
				{:else if state === 'on'}
					<span>✔️</span>
				{:else if state === 'off'}
					<span class="rotate-45">➕</span>
				{/if}
			</svelte:fragment>
		</Switch>
	</div>
	<div class="flex gap-3">
		<Switch
			class="rounded-tl-none rounded-br-none"
			indicatorClasses="bg-blue-400"
			bind:state={value3}
			on:change={({ detail }) => console.log(detail)}
			triple
			canSetToIndeterminate
		>
			<svelte:fragment slot="indicator-content" let:state>
				{#if state === 'indeterminate'}
					<span></span>
				{:else if state === 'on'}
					<span></span>
				{:else if state === 'off'}
					<span></span>
				{/if}
			</svelte:fragment>
		</Switch>
		<Switch
			class="rounded-tr-none rounded-bl-none"
			indicatorClasses="bg-blue-400"
			bind:state={value3}
			on:change={({ detail }) => console.log(detail)}
			triple={true}
			canSetToIndeterminate={false}
		>
			<svelte:fragment slot="indicator-content" let:state>
				{#if state === 'indeterminate'}
					<span></span>
				{:else if state === 'on'}
					<span></span>
				{:else if state === 'off'}
					<span></span>
				{/if}
			</svelte:fragment>
		</Switch>
	</div>
</div>
