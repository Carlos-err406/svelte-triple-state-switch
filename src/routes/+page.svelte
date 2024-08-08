<script lang="ts">
	import * as Carousel from '$lib/index.js';
</script>

<Carousel.Root class="[&_.carousel-item]:rounded-full [&_.carousel-item]:overflow-clip">
	<svelte:fragment let:builder slot="prev">
		<Carousel.Button {...builder} class="scale-150">◀️</Carousel.Button>
	</svelte:fragment>
	<svelte:fragment let:builder slot="next">
		<Carousel.Button {...builder} class="scale-150">▶️</Carousel.Button>
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

<Carousel.Root>
	<svelte:fragment let:builder slot="prev">
		<Carousel.Button {...builder} class="scale-150">◀️</Carousel.Button>
	</svelte:fragment>
	<svelte:fragment let:builder slot="next">
		<Carousel.Button {...builder} class="scale-150">▶️</Carousel.Button>
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
