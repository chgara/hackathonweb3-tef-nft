import theme from 'utils/themes';
import { css, StyleSheet } from 'aphrodite';
import CarouselButtons from './Buttons';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect, useCallback } from 'react';
import ItemRender from './Render';

const HomeCarousel: React.FC<Iprops> = () => {
	const [viewportRef, embla] = useEmblaCarousel({
		dragFree: true,
		containScroll: 'trimSnaps',
		inViewThreshold: 0,
	});

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

	const scrollPrev = useCallback(
		() => embla && embla.scrollPrev(),
		[embla]
	);

	const scrollNext = useCallback(
		() => embla && embla.scrollNext(),
		[embla]
	);

	const onSelect = useCallback(() => {
		if (!embla) return;
		setPrevBtnEnabled(embla.canScrollPrev());
		setNextBtnEnabled(embla.canScrollNext());
	}, [embla]);

	useEffect(() => {
		if (!embla) return;
		embla.on('select', onSelect);
		embla.on('reInit', onSelect);
		onSelect();
	}, [embla, onSelect]);

	useEffect(() => {
		onSelect();
	}, []);

	return (
		<section className={css(styles.embla)}>
			<div
				className={css(styles.emblaViewport)}
				ref={viewportRef}
			>
				<ItemRender embla={embla} />
			</div>
			<CarouselButtons
				prevBtnEnabled={prevBtnEnabled}
				nextBtnEnabled={nextBtnEnabled}
				scrollPrev={scrollPrev}
				scrollNext={scrollNext}
			/>
		</section>
	);
};

interface Iprops {
	reverse?: boolean;
}

const styles = StyleSheet.create({
	embla: {
		maxWidth: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		position: 'relative',
		marginTop: theme.spacing.normal,
	},
	emblaViewport: {
		overflow: 'hidden',
		width: '100%',
	},
});

export default HomeCarousel;
