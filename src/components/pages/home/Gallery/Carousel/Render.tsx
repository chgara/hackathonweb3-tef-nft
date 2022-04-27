import Item from './Item';
import { NFT } from 'utils/types';
import { css, StyleSheet } from 'aphrodite';
import { useCallback, useEffect, useState } from 'react';
import useUnclaimedNFTs from 'hooks/useUnclaimedNFTs';
import { EmblaCarouselType } from 'embla-carousel-react';
import { ethers } from 'ethers';
import { rpcEndpoint } from 'utils/config';

// TODO: Add loader
const ItemRender: React.FC<Iprops> = ({ embla }) => {
	const [NFTs, SetNFTs] = useState<NFT[]>([]);
	const [progress, setProgress] = useState(0);

	const onSelect = useCallback(() => {
		if (!embla) return;
		setProgress(embla.scrollProgress());
	}, [embla]);

	useEffect(() => {
		if (!embla) return;

		const desidredProgrress =
			0.9 - 1 / (NFTs.length === 0 ? 1 : NFTs.length);

		// use progress
		if (embla.scrollProgress() < desidredProgrress) return;

		const abortConrtoller = new AbortController();

		const newProvider = new ethers.providers.JsonRpcProvider(
			atob(rpcEndpoint)
		);

		useUnclaimedNFTs(newProvider, abortConrtoller, NFTs.length)
			.then(nfts => {
				SetNFTs(pastNFTs => [...pastNFTs, ...nfts]);
			})
			.catch(err => {
				console.error(err);
			});
		return (): void => {
			abortConrtoller.abort();
		};
	}, [SetNFTs, embla, progress]);

	useEffect(() => {
		if (!embla) return;
		embla?.reInit();
		embla.on('select', onSelect);
		onSelect();
	}, [NFTs, embla, onSelect]);

	return (
		<div className={css(styles.emblaContainer)}>
			{NFTs.map((v, i) => {
				return <Item key={i} nft={v} />;
			})}
			<Item
				nft={{
					id: 'Loading',
					name: 'Loading',
					image: 'https://thumbs.gfycat.com/IlliterateAnchoredIntermediateegret-size_restricted.gif',
					description: 'Loading',
					uri: 'Loading',
				}}
			/>
			<Item
				nft={{
					id: 'Loading',
					name: 'Loading',
					image: 'https://thumbs.gfycat.com/IlliterateAnchoredIntermediateegret-size_restricted.gif',
					description: 'Loading',
					uri: 'Loading',
				}}
			/>
		</div>
	);
};

interface Iprops {
	embla: EmblaCarouselType | undefined;
}

const styles = StyleSheet.create({
	emblaContainer: {
		display: 'flex',
		userSelect: 'none',
	},
});

export default ItemRender;
