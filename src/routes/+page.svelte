<script lang="ts">
	import { Carousel, CarouselButton, CarouselItem } from '$lib/index.js';
</script>

<Carousel>
	<svelte:fragment let:kind slot="prev">
		<CarouselButton {kind} class="scale-150">◀️</CarouselButton>
	</svelte:fragment>
	<svelte:fragment let:kind slot="next">
		<CarouselButton {kind} class="scale-150">▶️</CarouselButton>
	</svelte:fragment>
	<CarouselItem>
		<div class="size-60 flex items-center justify-center bg-red-500">A</div>
	</CarouselItem>
	<CarouselItem>
		<div class="size-60 flex items-center justify-center bg-blue-500">B</div>
	</CarouselItem>
	<CarouselItem>
		<div class="size-60 flex items-center justify-center bg-yellow-500">C</div>
	</CarouselItem>
	<CarouselItem>
		<div class="size-60 flex items-center justify-center bg-pink-500">D</div>
	</CarouselItem>
	<CarouselItem>
		<div class="size-60 flex items-center justify-center bg-green-500">E</div>
	</CarouselItem>
</Carousel>
