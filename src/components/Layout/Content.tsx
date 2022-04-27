import { css, StyleSheet } from 'aphrodite';

const Content: React.FC<Iprops> = props => {
	return (
		<main className={css(styles.container)}>
			{props.children}
		</main>
	);
};
export default Content;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		minWidth: '100%',
		minHeight: '75vh',
	},
});

interface Iprops {
	children: React.ReactNode;
}
