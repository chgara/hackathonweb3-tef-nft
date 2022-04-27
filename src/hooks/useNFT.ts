import { NFT, NormalProvider } from 'utils/types';
import { IPFSGATEWAY } from 'utils/config';
import useNFTContract from './useNFTContract';

const useNFT = async (
	p: NormalProvider,
	nftId: number,
	abortConrtoller: AbortController
): Promise<NFT> => {
	const contract = useNFTContract(p);
	const uri = await contract.tokenURI(nftId);

	const realUri = uri.replace('ipfs://', IPFSGATEWAY);
	const nftJson = await fetch(realUri, {
		signal: abortConrtoller.signal,
	});
	const nftData = await nftJson.json();

	const nft: NFT = {
		id: String(nftId),
		uri: realUri,
		name: nftData?.name || 'unknown',
		image: nftData?.image.replace('ipfs://', IPFSGATEWAY) || '',
		description: nftData?.name || '',
	};

	return nft;
};
export default useNFT;
