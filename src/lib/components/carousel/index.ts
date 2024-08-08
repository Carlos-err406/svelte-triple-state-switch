// Reexport your entry components here
import Button from './carousel-button.svelte';
import Item from './carousel-item.svelte';
import Root from './carousel.svelte';

export {
	Root,
	Item,
	Button,

	//
	Root as Carousel,
	Button as CarouselButton,
	Item as CarouselItem
};
