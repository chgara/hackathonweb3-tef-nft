import Image from 'next/image';
import theme from 'utils/themes';
import { NFT } from 'utils/types';
import { css, StyleSheet } from 'aphrodite';

const CarouselItem: React.FC<Iprops> = props => {
	const { nft /**isLast**/ } = props;
	const { id, name, image } = nft;
	return (
		<div className={css(styles.emblaSlide)}>
			<div className={css(styles.emblaSlideInner)}>
				<Image
					className={css(styles.emblaSlideImg)}
					src={image}
					alt={name}
					width={500}
					height={500}
					layout='responsive'
					placeholder='blur'
					blurDataURL='/blur.jpg'
				/>
				<p className={css(styles.id)}>
					{/**
					#{isLast ? 'Ultimo' : id}
					**/}
					#{id}
				</p>
			</div>
		</div>
	);
};

interface Iprops {
	nft: NFT;
}

const styles = StyleSheet.create({
	emblaSlide: {
		position: 'relative',
		minWidth: '25%',
		paddingLeft: theme.spacing.small,
		'@media (max-width: 1300px)': {
			minWidth: '35%',
		},
		'@media (max-width: 650px)': {
			minWidth: '45%',
		},
		'@media (max-width: 500px)': {
			minWidth: '80%',
		},
	},
	emblaSlideInner: {
		position: 'relative',
		overflow: 'hidden',
	},
	emblaSlideImg: {
		position: 'absolute',
		display: 'block',
		top: '100%',
		left: '50%',
		width: 'auto',
		minHeight: '100%',
		minWidth: '100%',
		maxWidth: 'none',
		transform: 'translate(-50%,-50%)',
	},

	id: {
		width: '100%',
		padding: `${theme.spacing.smaller} 0`,
		backgroundColor: theme.colors.tertiary,
		position: 'absolute',
		bottom: 0,
		fontSize: theme.fonts.size.medium,
		fontWeight: theme.fonts.weight.bold,
		...theme.positioning.center,
	},
});

export default CarouselItem;
