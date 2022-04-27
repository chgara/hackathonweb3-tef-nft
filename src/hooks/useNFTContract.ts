import { ethers } from 'ethers';
import { contractABI, contractAddress } from 'utils/config';
import { NormalProvider } from 'utils/types';

const useNFTContract = (
	p: NormalProvider | ethers.Signer
): ethers.Contract => {
	if (typeof window === 'undefined') {
		throw new Error('useNFTContract must be used in browser');
	}
	return new ethers.Contract(atob(contractAddress), contractABI, p);
};
export default useNFTContract;
