import { useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import useNFTContract from 'hooks/useNFTContract';
import useWeb3ProviderContext from 'hooks/useWeb3Provider';
import theme from 'utils/themes';

// TODO: Add confetti

const NFTClaim: React.FC<props> = () => {
	const [error, setError] = useState('');
	const [tokenId, setTokenId] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { state } = useWeb3ProviderContext();
	const { provider } = state;

	const validate = (i: string): boolean => {
		return (
			Number.isInteger(Number(i)) &&
			Number(i) >= 0 &&
			Number(i) <= 500
		);
	};

	const handleErrorClick = (): void => {
		setError('');
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		if (!validate(e.target.value)) return;
		console.log(e.target.value);
		setTokenId(e.target.value);
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		setIsLoading(true);

		if (!provider) {
			setError(
				'No web3 provider found. Please contact to us to solve the problem.'
			);
			setIsLoading(false);
			return;
		}

		if (provider.network.name !== 'goerli') {
			setError('Please connect to the goerli network.');
			setIsLoading(false);
			return;
		}

		try {
			const signer = provider.getSigner();
			const nftContract = useNFTContract(signer);
			const tx = await nftContract.claimToken(Number(tokenId));

			console.log(tx);
		} catch (e) {
			console.error(e);
			const errorMessage =
				'Are you sure you are on the list or in the correct network';
			setError(errorMessage);
		}
		setIsLoading(false);
	};

	return (
		<article id='claim' className={css(styles.container)}>
			<form
				onSubmit={handleSubmit}
				className={css(styles.form)}
			>
				<label
					htmlFor='claimInput'
					className={css(styles.label)}
				>
					Enter the id of the NFT that you want
				</label>
				<input
					className={css(styles.input)}
					type='number'
					placeholder='ID'
					value={tokenId}
					onChange={handleChange}
				/>
				<button
					type='submit'
					className={css(styles.button)}
					disabled={isLoading}
				>
					{isLoading ? 'Loading...' : 'Claim'}
				</button>
				{error !== '' && (
					<p
						onClick={handleErrorClick}
						className={css(styles.error)}
					>
						{error}
						<br />

						<small className={css(styles.small)}>
							(Click to disappear)
						</small>
					</p>
				)}
			</form>
			{isLoading && <div className='loader'>Loading</div>}
		</article>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	form: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
		padding: theme.spacing.littleMedium,
	},

	label: {
		fontSize: theme.fonts.size.medium,
		fontWeight: theme.fonts.weight.bold,
		marginRight: theme.spacing.smaller,
	},

	input: {
		width: '3em',
		padding: '0.2em 0.3em',
		border: `4px solid ${theme.colors.tertiary}`,
		borderRadius: '0.5em',
		fontSize: theme.fonts.size.medium,
		marginRight: theme.spacing.smaller,
	},

	button: {
		borderRadius: '0.5em',
		fontSize: theme.fonts.size.medium,
		marginRight: theme.spacing.smaller,
		textTransform: 'uppercase',
		fontFamily: theme.fonts.family.primary,
		fontWeight: theme.fonts.weight.bold,
		color: theme.colors.secondary,
		backgroundColor: theme.colors.tertiary,
		padding: `0.2em ${theme.spacing.smaller}`,
	},
	error: {
		textAlign: 'center',
		color: theme.colors.secondary,
		fontSize: theme.fonts.size.littleMedium,
		fontWeight: theme.fonts.weight.bold,
		textTransform: 'uppercase',
		backgroundColor: 'rgba(244, 113, 116, 0.9)',
		padding: `0.6em ${theme.spacing.medium}`,
		borderRadius: '0.5em',
		position: 'absolute',
		top: '-50vh',
		left: '0',
		right: '0',
		animation: 'fadeIn 0.5s ease-in-out',
	},

	small: {
		fontSize: theme.fonts.size.small,
		fontWeight: theme.fonts.weight.bold,
		textTransform: 'none',
	},
});

interface props {}

export default NFTClaim;
