import Gallery from './Gallery';
import NFTClaim from './NFTClaim';

const HomePage: React.FC<props> = () => {
	return (
		<>
			<Gallery />
			<NFTClaim />
		</>
	);
};

interface props {}

export default HomePage;
