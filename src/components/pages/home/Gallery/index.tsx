import Carousel from './Carousel';
import GalleryHeader from './Header';
import { css, StyleSheet } from 'aphrodite';
import useWeb3ProviderContext from 'hooks/useWeb3Provider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Gallery: React.FC<props> = () => {
	const { state, dispatch } = useWeb3ProviderContext();
	const { provider } = state;
	const router = useRouter();

	useEffect(() => {
		if (!provider) return;
		console.log(provider);
		provider.on(
			'disconnect',
			(error: { code: number; message: string }) => {
				dispatch({
					type: 'DISCONNECT',
					network: '',
					provider: null,
				});
				router.push('/login');
				console.log(error);
			}
		);
	}, [provider, router, dispatch]);
	return (
		<article id='view' className={css(styles.container)}>
			<GalleryHeader />
			<Carousel />
		</article>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
});

interface props {}

export default Gallery;
