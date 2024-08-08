<script lang="ts">
	import * as Carousel from '$lib/index.js';
</script>

<Carousel.Root>
	<svelte:fragment let:builder slot="prev">
		<button {...builder} type="button" class="scale-150">◀️</button>
	</svelte:fragment>
	<svelte:fragment let:builder slot="next">
		<button {...builder} type="button" class="scale-150">▶️</button>
	</svelte:fragment>
	<Carousel.Item>
		<div class="size-60 flex items-center justify-center bg-red-500">A</div>
	</Carousel.Item>
	<Carousel.Item>
		<div class="size-60 flex items-center justify-center bg-blue-500">B</div>
	</Carousel.Item>
	<Carousel.Item>
		<div class="size-60 flex items-center justify-center bg-yellow-500">C</div>
	</Carousel.Item>
	<Carousel.Item>
		<div class="size-60 flex items-center justify-center bg-pink-500">D</div>
	</Carousel.Item>
	<Carousel.Item>
		<div class="size-60 flex items-center justify-center bg-green-500">E</div>
	</Carousel.Item>
</Carousel.Root>
