import * as dotenv from 'dotenv';
import { ethers } from 'hardhat';

dotenv.config();

async function dev_main(): Promise<void> {
	const NFTFactory = await ethers.getContractFactory(
		'HackathonWeb3'
	);
	const NFT = await NFTFactory.deploy();

	await NFT.deployed();

	console.log('NFT contract deployed to:', NFT.address);
}

async function main(): Promise<void> {
	const [deployer] = await ethers.getSigners();
	console.log('Deployer address:', deployer.address);

	console.log('Account balance:', await deployer.getBalance());

	const NFTFactory = await ethers.getContractFactory(
		'HackathonWeb3'
	);
	const NFT = await NFTFactory.deploy();

	await NFT.deployed();

	console.log('NFT contract deployed to:', NFT.address);
}

if (process.env.BLOCKCHAIN_ENV === 'deploy') {
	main().catch(error => {
		console.error(error);
		process.exitCode = 1;
	});
} else if (process.env.BLOCKCHAIN_ENV === 'dev') {
	dev_main().catch(error => {
		console.error(error);
		process.exitCode = 1;
	});
} else {
	throw new Error('Invalid BLOCKCHAIN_ENV');
}
