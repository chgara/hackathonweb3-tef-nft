import { css, StyleSheet } from 'aphrodite';
import src from '../../../public/background.jpg';
import Image from 'next/image';
import theme from 'utils/themes';

const BackgroundImage: React.FC<props> = () => {
	return (
		<div className={css(styles.container)}>
			<Image
				className={css(styles.bgImage)}
				src={src}
				layout='fill'
				objectFit='cover'
				role='presentation'
				alt='cover'
				priority
			/>
		</div>
	);
};

export default BackgroundImage;

const styles = StyleSheet.create({
	container: {
		width: '100vw',
		height: '100vh',
		backgroundColor: theme.colors.primary,
		...theme.positioning.absLeft,
	},
	bgImage: {
		objectFit: 'cover',
		filter: 'blur(50px)',
	},
});

interface props {}
