import { useContext } from 'react';
import { Web3ProviderContext } from 'context/web3Provider';

const useWeb3ProviderContext = () => {
	return useContext(Web3ProviderContext);
};

export default useWeb3ProviderContext;
