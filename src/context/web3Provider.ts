import { Web3Provider } from 'utils/types';
import { createContext } from 'react';

const defaultSate = {
	state: {
		network: '',
		provider: null,
	} as IWeb3ProviderState,
	dispatch: (): void => {
		throw new Error('Web3ProviderContext used outside provider');
	},
};

export const Web3ProviderContext =
	createContext<IWeb3ProviderContext>(defaultSate);

export const web3ProviderReducer = (
	state: IWeb3ProviderState,
	action: IWeb3ProviderAction
): IWeb3ProviderState => {
	switch (action.type) {
		case 'SET_WEB3_PROVIDER':
			return {
				...state,
				provider: action.provider,
				network: action.network,
			};
		case 'DISCONNECT':
			return {
				...state,
				provider: null,
				network: '',
			};
		default:
			return state;
	}
};

interface IWeb3ProviderState {
	network: string;
	provider: Web3Provider | null;
}

interface IWeb3ProviderAction {
	type: string;
	provider: Web3Provider | null;
	network: string;
}

interface IWeb3ProviderContext {
	state: IWeb3ProviderState;
	dispatch: React.Dispatch<IWeb3ProviderAction>;
}
