import { css, StyleSheet } from 'aphrodite';
import theme from 'utils/themes';

const CarouselButtons: React.FC<IButtonsprops> = props => {
	const { scrollPrev, scrollNext, prevBtnEnabled, nextBtnEnabled } =
		props;
	return (
		<>
			<PrevButton
				onClick={scrollPrev}
				enabled={prevBtnEnabled}
			/>
			<NextButton
				onClick={scrollNext}
				enabled={nextBtnEnabled}
			/>
		</>
	);
};

export default CarouselButtons;

interface IButtonsprops {
	prevBtnEnabled: boolean;
	nextBtnEnabled: boolean;
	scrollNext: () => void;
	scrollPrev: () => void;
}

export const PrevButton: React.FC<Iprops> = ({
	enabled,
	onClick,
}) => (
	<button
		className={css([styles.emblaButton, styles.emblaButtonPrev])}
		onClick={onClick}
		disabled={!enabled}
	>
		<svg
			className={css([styles.emblaButtonSvg])}
			viewBox='137.718 -1.001 366.563 644'
		>
			<path d='M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z' />
		</svg>
	</button>
);

export const NextButton: React.FC<Iprops> = ({
	enabled,
	onClick,
}) => (
	<button
		className={css([styles.emblaButton, styles.emblaButtonNext])}
		onClick={onClick}
		disabled={!enabled}
	>
		<svg
			className={css([styles.emblaButtonSvg])}
			viewBox='0 0 238.003 238.003'
		>
			<path d='M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z' />
		</svg>
	</button>
);

const styles = StyleSheet.create({
	emblaButton: {
		outline: '0',
		cursor: 'pointer',
		backgroundColor: 'transparent',
		touchAction: 'manipulation',
		position: 'absolute',
		zIndex: 1,
		top: '50%',
		transform: 'translateY(-50%)',
		border: '0',
		width: theme.fonts.size.bigger,
		height: theme.fonts.size.bigger,
		justifyContent: 'center',
		alignItems: 'center',
		fill: '#1bcacd',
		padding: '0',
	},
	emblaButtonSvg: {
		width: '100%',
		height: '100%',
	},
	emblaButtonNext: {
		right: '27px',
	},
	emblaButtonPrev: {
		left: '27px',
	},
});

interface Iprops {
	enabled: boolean;
	onClick: () => void;
}
