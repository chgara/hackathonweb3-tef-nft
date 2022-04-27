// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract HackathonWeb3 is
	ERC721,
	ERC721URIStorage,
	Pausable,
	Ownable
{
	event CanClaimToken(uint256 tokenId);
	event ClaimedToken(uint256 tokenId, address claimer);

	using Counters for Counters.Counter;
	using EnumerableSet for EnumerableSet.UintSet;

	Counters.Counter private _tokenIdCounter;
	EnumerableSet.UintSet private _unClaimedTokensIds;

	mapping(address => bool) public canAddressClaim;

	constructor() ERC721('Hackathon Web3', 'HW3') {}

	// @dev A person can claim a token if dont have it yet and is in the list of people that can claim it
	modifier canClaim() {
		require(
			canAddressClaim[msg.sender],
			'You are not on the claim list'
		);
		require(
			balanceOf(msg.sender) == 0,
			'You can only claim 1 token'
		);
		_;
	}

	// @dev A token is claimable if it is on the token list
	modifier isTokenClaimable(uint256 _tokenId) {
		require(
			_unClaimedTokensIds.contains(_tokenId),
			'Token is not claimable'
		);
		_;
	}

	// @notice Return all the unclaimed tokens ids
	function getUnclaimedTokensIds()
		public
		view
		returns (uint256[] memory)
	{
		return _unClaimedTokensIds.values();
	}

	// @notice Add a new address to the list of people that can claim tokens
	function addToClaimList(address _address)
		public
		whenNotPaused
		onlyOwner
	{
		canAddressClaim[_address] = true;
	}

	// @notice All tokens are minted to the contract so it can transfer them later
	function safeMint(string memory uri)
		public
		whenNotPaused
		onlyOwner
	{
		uint256 tokenId = _tokenIdCounter.current();
		_tokenIdCounter.increment();
		_mint(address(this), tokenId);
		_setTokenURI(tokenId, uri);

		// Add the token to the list of unclaimed tokens
		_unClaimedTokensIds.add(tokenId);

		emit CanClaimToken(tokenId);
	}

	// @notice Claim a token that is on the list of unclaimed tokens
	// You can select the token that fits your needs
	// @dev Refer to the modifiers to see the pre-conditions that must be met
	// to use this function
	function claimToken(uint256 tokenId)
		public
		whenNotPaused
		canClaim
		isTokenClaimable(tokenId)
	{
		// Remove token from unclaimed list
		_unClaimedTokensIds.remove(tokenId);
		// Once claimed you can not claim it again
		canAddressClaim[msg.sender] = false;

		// Setting the permissions and sending the token to the owner
		_transfer(address(this), msg.sender, tokenId);

		emit ClaimedToken(tokenId, msg.sender);
	}

	function pause() public onlyOwner {
		_pause();
	}

	function unpause() public onlyOwner {
		_unpause();
	}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId
	) internal override whenNotPaused {
		super._beforeTokenTransfer(from, to, tokenId);
	}

	// The following functions are overrides required by Solidity.

	function _burn(uint256 tokenId)
		internal
		override(ERC721, ERC721URIStorage)
	{
		super._burn(tokenId);
	}

	function tokenURI(uint256 tokenId)
		public
		view
		override(ERC721, ERC721URIStorage)
		returns (string memory)
	{
		return super.tokenURI(tokenId);
	}
}
