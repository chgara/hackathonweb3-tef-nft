import theme from 'utils/themes';
import { css, StyleSheet } from 'aphrodite';

const GalleryHeader: React.FC<Iprops> = () => {
	return (
		<header className={css(styles.header)}>
			<h1 className={css(styles.h1)}>
				Claim your NFT for the Web3 Hackathon at TEF
			</h1>
			<h2 className={css(styles.h2)}>
				Select the NFT that fits your best
			</h2>
		</header>
	);
};

const styles = StyleSheet.create({
	header: {
		width: '100%',
		marginTop: theme.spacing.medium,
	},
	h1: {
		width: '100%',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontSize: theme.fonts.size.bigger,
		fontFamily: theme.fonts.family.secondary,
	},
	h2: {
		width: '100%',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontSize: theme.fonts.size.medium,
		fontWeight: theme.fonts.weight.light,
	},
});

interface Iprops {}

export default GalleryHeader;
