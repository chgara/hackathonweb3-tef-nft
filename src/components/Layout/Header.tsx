import { css, StyleSheet } from 'aphrodite';
import Navbar from 'components/Navbar';

const Content: React.FC<Iprops> = () => {
	return (
		<header className={css(styles.header)}>
			<Navbar />
		</header>
	);
};
export default Content;

const styles = StyleSheet.create({
	header: {
		width: '100%',
	},
});

interface Iprops {}
