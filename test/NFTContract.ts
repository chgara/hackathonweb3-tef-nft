import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { HackathonWeb3, HackathonWeb3__factory } from '../typechain';

describe('NFT Contract Works Correctly', () => {
	// Stuff that we need later
	let accounts: SignerWithAddress[];
	let owner: SignerWithAddress;
	let NFTFactory: HackathonWeb3__factory;
	let NFT: HackathonWeb3;

	beforeEach(async () => {
		// Get the accounts
		accounts = await ethers.getSigners();
		owner = accounts[0];

		// Deploy the contract
		NFTFactory = await ethers.getContractFactory('HackathonWeb3');
		NFT = await NFTFactory.deploy();
	});

	describe('Deploy of the token', () => {
		it('Should deploy correctly the NFT', async () => {
			expect(NFT.address).to.not.be.equal(
				'0x0000000000000000000000000000000000000000'
			);
		});
		it('Should have the owner correctly setted', async () => {
			expect(await NFT.owner()).to.be.equal(owner.address);
		});
	});

	describe('Minting of NFTs works as expected', () => {
		it('Should let mint the owner', async () => {
			await expect(
				NFT.connect(owner).safeMint('holaquetal:)')
			).not.to.be.revertedWith(
				'Ownable: caller is not the owner'
			);
		});

		it('Should not let someone random to mint', async () => {
			await expect(
				NFT.connect(accounts[1]).safeMint('holaquetal:)')
			).to.be.revertedWith('Ownable: caller is not the owner');
		});

		it('Should set the URI as expected', async () => {
			await NFT.safeMint('holaquetal:)');
			const uri: string = await NFT.connect(
				accounts[2]
			).tokenURI(0);
			expect(uri).to.be.equal('holaquetal:)');
		});

		it('Should set correctly the balance of the contract', async () => {
			await NFT.safeMint('holaquetal:)');
			const balance = await NFT.connect(owner).balanceOf(
				NFT.address
			);
			expect(balance).to.be.equal(1);
		});

		it('Should add the token to the unclaimedTokenIds list', async () => {
			await NFT.safeMint('holaquetal:)');
			await NFT.safeMint('holaquetal2:)');
			const ids = await NFT.connect(
				accounts[2]
			).getUnclaimedTokensIds();
			expect(ids.length).to.be.equal(2);
			expect(ids[0]).to.be.equal(0);
			expect(ids[1]).to.be.equal(1);
		});
	});

	describe('Claim List operations', () => {
		it('Only the owner can call it', async () => {
			await expect(
				NFT.connect(accounts[1]).addToClaimList(
					accounts[1].address
				)
			).to.be.revertedWith('Ownable: caller is not the owner');
		});

		it('Should add address to the claim list', async () => {
			await NFT.addToClaimList(accounts[1].address);
			const isInList = await NFT.canAddressClaim(
				accounts[1].address
			);
			const isInList2 = await NFT.canAddressClaim(
				accounts[2].address
			);
			expect(isInList).to.be.equal(true);
			expect(isInList2).to.be.equal(false);
		});

		it('Should let only people on the claim list can claim', async () => {
			await expect(
				NFT.connect(accounts[2]).claimToken(0)
			).to.be.revertedWith('You are not on the claim list');
		});

		it('Should let only claim the tokens that are in the list', async () => {
			await NFT.addToClaimList(accounts[1].address);
			await expect(
				NFT.connect(accounts[1]).claimToken(0)
			).to.be.revertedWith('Token is not claimable');
		});

		it('Should remove the token from the list once claimed', async () => {
			await NFT.safeMint('holaquetal:)');
			await NFT.safeMint('holaquetal2:)');
			await NFT.addToClaimList(accounts[1].address);
			await NFT.addToClaimList(accounts[2].address);
			let ids = await NFT.getUnclaimedTokensIds();
			expect(ids.length).to.be.equal(2);
			expect(ids[0]).to.be.equal(0);
			expect(ids[1]).to.be.equal(1);
			await NFT.connect(accounts[1]).claimToken(0);
			await NFT.connect(accounts[2]).claimToken(1);
			ids = await NFT.getUnclaimedTokensIds();
			expect(ids.length).to.be.equal(0);
		});

		it('Should let you claim only once', async () => {
			await NFT.safeMint('holaquetal:)');
			await NFT.safeMint('holaquetal2:)');
			await NFT.addToClaimList(accounts[1].address);
			await NFT.connect(accounts[1]).claimToken(0);
			// Change rever to verify
			await expect(
				NFT.connect(accounts[1]).claimToken(1)
			).to.be.revertedWith('You are not on the claim list');

			await NFT.addToClaimList(accounts[1].address);
			await expect(
				NFT.connect(accounts[1]).claimToken(1)
			).to.be.revertedWith('You can only claim 1 token');
		});

		it('Should transfer the token once claimed', async () => {
			await NFT.safeMint('holaquetal:)');
			await NFT.addToClaimList(accounts[1].address);
			await NFT.connect(accounts[1]).claimToken(0);
			const balance = await NFT.connect(accounts[1]).balanceOf(
				accounts[1].address
			);
			const ownerOf = await NFT.connect(accounts[1]).ownerOf(0);
			expect(balance).to.be.equal(1);
			expect(ownerOf).to.be.equal(accounts[1].address);
		});
	});
});
