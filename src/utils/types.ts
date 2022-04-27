import { ethers } from 'ethers';

export interface NFT {
	id: string;
	uri: string;
	name: string;
	image: string;
	description: string;
}
export type NormalProvider = ethers.providers.Provider;
export type Web3Provider = ethers.providers.Web3Provider;
