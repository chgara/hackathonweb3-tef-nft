import { NormalProvider } from 'utils/types';
import useNFTContract from './useNFTContract';

const useGetUnclaimedIds = async (
	p: NormalProvider
): Promise<number[]> => {
	const contract = useNFTContract(p);
	const ids: number[] = await contract.getUnclaimedTokensIds();
	return ids;
};
export default useGetUnclaimedIds;
