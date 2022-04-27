import {
	web3ProviderReducer,
	Web3ProviderContext,
} from 'context/web3Provider';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { Web3Provider } from 'utils/types';
import { useEffect, useReducer } from 'react';

const Web3ContextProvider: React.FC<Iprops> = ({ children }) => {
	const [state, dispatch] = useReducer(web3ProviderReducer, {
		network: '',
		provider: null,
	});

	const value = { state, dispatch };

	const loadProvider = async (): Promise<void> => {
		const network = 'Goerli';

		const provider: Web3Provider =
			new ethers.providers.Web3Provider(
				await new Web3Modal({
					network,
					cacheProvider: true,
				}).connect()
			);

		dispatch({
			type: 'SET_WEB3_PROVIDER',
			provider,
			network,
		});
	};

	useEffect(() => {
		loadProvider();
	}, []);

	return (
		<Web3ProviderContext.Provider value={value}>
			{children}
		</Web3ProviderContext.Provider>
	);
};

interface Iprops {
	children: React.ReactNode;
}

export default Web3ContextProvider;
