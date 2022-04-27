import * as dotenv from 'dotenv';
import { ethers } from 'hardhat';
import URIs from './data';

dotenv.config();

async function dev_main(): Promise<void> {
	const NFTFactory = await ethers.getContractFactory(
		'HackathonWeb3'
	);
	const NFT = NFTFactory.attach(
		'0x5FbDB2315678afecb367f032d93F642f64180aa3'
	);

	const accounts = await ethers.getSigners();
	const owner = accounts[0];

	URIs.forEach(async i => {
		await NFT.connect(owner).safeMint(i);
	});
}

async function main(): Promise<void> {
	console.log('Hola');
	const [deployer] = await ethers.getSigners();
	console.log('Deployer address:', deployer.address);
	console.log('Account balance:', await deployer.getBalance());

	const NFTFactory = await ethers.getContractFactory(
		'HackathonWeb3'
	);

	if (!process.env.CONTRACT_ADDRESS) {
		throw new Error('CONTRACT_ADDRESS not set');
	}

	const NFT = NFTFactory.attach(process.env.CONTRACT_ADDRESS);

	let nonceOffset = 0;

	async function getNonce(address: string): Promise<number> {
		return (
			(await ethers.provider.getTransactionCount(address)) +
			nonceOffset++
		);
	}

	URIs.forEach(async i => {
		console.log('Minting:', i);
		const tx = await NFT.connect(deployer).safeMint(i, {
			nonce: await getNonce(deployer.address),
		});
		await tx.wait();
	});
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
