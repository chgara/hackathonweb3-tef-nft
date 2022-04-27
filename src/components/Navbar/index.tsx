import Link from 'next/link';
import { css, StyleSheet } from 'aphrodite';
import theme from 'utils/themes';

const Navbar: React.FC<Iprops> = () => {
	return (
		<nav className={css(styles.nav)}>
			<div className={css(styles.logo)}>
				<Link href='/' passHref>
					<a>HW3</a>
				</Link>
			</div>
			<ul className={css(styles.list)}>
				<li className={css(styles.listItem)}>
					<Link href='/' passHref>
						<a>Home</a>
					</Link>
				</li>
				<li className={css(styles.listItem)}>
					<Link href='#view' passHref>
						<a>View</a>
					</Link>
				</li>
				<li className={css(styles.listItem)}>
					<Link href='#claim' passHref>
						<a>Claim</a>
					</Link>
				</li>
			</ul>
			<div className={css(styles.twoLines)}>
				<div className={css(styles.linesContainer)}>
					<div className={css(styles.line)}></div>
					<div className={css(styles.line)}></div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;

const styles = StyleSheet.create({
	nav: {
		width: '100%',
		height: '10vh',
		display: 'flex',
	},
	logo: {
		width: '10%',
		height: '100%',
		fontWeight: theme.fonts.weight.bolder,
		fontSize: theme.fonts.size.medium,
		fontFamily: theme.fonts.family.secondary,
		...theme.positioning.center,
	},
	list: {
		width: '50%',
		height: '100%',
		...theme.positioning.center,
		justifyContent: 'space-around',
		textTransform: 'uppercase',
	},
	listItem: {
		fontSize: theme.fonts.size.normal,
		':hover': {
			fontWeight: theme.fonts.weight.bolder,
			transition: 'all 0.3s ease-in-out',
		},
	},
	twoLines: {
		width: '10%',
		height: '100%',
		...theme.positioning.center,
		...theme.positioning.absRight,
	},
	linesContainer: {
		width: '50%',
		height: '25%',
		...theme.positioning.center,
		justifyContent: 'space-around',
		flexDirection: 'column',
	},
	line: {
		width: '50%',
		height: '4px',
		borderRadius: '20%',
		backgroundColor: theme.colors.secondary,
	},
});

interface Iprops {}
