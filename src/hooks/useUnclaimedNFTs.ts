import { NFT, NormalProvider } from 'utils/types';
import useGetUnclaimedIds from 'hooks/useGetUnclaimedIds';
import useNFT from 'hooks/useNFT';

const useUnclaimedNFTs = async (
	provider: NormalProvider,
	abortConrtoller: AbortController,
	offset = 0,
	count = 5
): Promise<NFT[]> => {
	const totalIds = await useGetUnclaimedIds(provider);

	const secureCount =
		offset + count > totalIds.length
			? totalIds.length - offset
			: count;

	const ids = totalIds.slice(offset, offset + secureCount);

	const promises: Promise<NFT>[] = [];

	for (const id of ids) {
		promises.push(useNFT(provider, id, abortConrtoller));
	}

	const resolvedPromises = await Promise.allSettled(promises);
	const filtered = resolvedPromises.filter(
		promise => promise.status === 'fulfilled'
	);

	// @ts-ignore
	return filtered.map(promise => promise.value);
};
export default useUnclaimedNFTs;
