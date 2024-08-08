<script lang="ts">
	import * as Carousel from 'svelte-inplace-carousel';
</script>

<Carousel.Root >
	<svelte:fragment slot="prev" let:builder>
		<Carousel.Button {...builder}>
			{'<'}
		</Carousel.Button>
	</svelte:fragment>
	<svelte:fragment slot="next" let:builder>
		<Carousel.Button {...builder}>
			{'>'}
		</Carousel.Button>
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
