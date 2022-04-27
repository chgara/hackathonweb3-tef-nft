import * as dotenv from 'dotenv';
import fs from 'fs';
import { ethers } from 'hardhat';

dotenv.config();

// read each line from the wallets.txt file from the ../
function getAddress(): string[] {
	const file = fs.readFileSync('./scripts/wallets.txt', 'utf8');
	return file.split('\n').filter(i => i !== '');
}

async function dev_main(): Promise<void> {
	const NFTFactory = await ethers.getContractFactory(
		'HackathonWeb3'
	);
	const NFT = NFTFactory.attach(
		'0x5FbDB2315678afecb367f032d93F642f64180aa3'
	);

	const dev_address = [
		'0x5FbDB2315678afecb367f032d93F642f64180aa3',
		'0x18031Cdf42654910703984e18F172316BC7aE0f4',
		'0x71bE63f3384f5fb98995898A86B02Fb2426c5788',
		'0xB617A1AC78B3ebBc51F600da78ff2b35ED16C61c',
	];

	const accounts = await ethers.getSigners();
	const owner = accounts[0];

	dev_address.forEach(async i => {
		await NFT.connect(owner).addToClaimList(i);
	});
}

async function main(): Promise<void> {
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

	getAddress().forEach(async i => {
		console.log('Adding to claim list:', i);
		const tx = await NFT.connect(deployer).addToClaimList(i);
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
