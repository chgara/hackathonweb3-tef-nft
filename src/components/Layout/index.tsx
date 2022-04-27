import Header from './Header';
import Content from './Content';
import theme from 'utils/themes';
import { css, StyleSheet } from 'aphrodite';
import BackgroundImage from './Background';

const Layout: React.FC<props> = props => {
	return (
		<>
			<BackgroundImage />
			<div className={css(styles.container)}>
				<Header />
				<Content>{props.children}</Content>
			</div>
		</>
	);
};

export default Layout;

const styles = StyleSheet.create({
	container: {
		color: theme.colors.secondary,
		width: '100vw',
		height: '100%',
		maxWidth: '100%',
		paddingLeft: theme.spacing.littleMedium,
		paddingRight: theme.spacing.littleMedium,
		fontSize: theme.fonts.size.normal,
		overflowX: 'hidden',
	},
});

interface props {
	children: React.ReactNode;
}
