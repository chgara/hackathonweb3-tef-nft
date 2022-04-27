import 'sanitize.css';
import '../utils/styles/main.css';
import Layout from 'components/Layout';
import type { AppProps } from 'next/app';
import Web3ContextProvider from 'components/providers/Web3ContextProvider';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<Web3ContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Web3ContextProvider>
	);
}

export default MyApp;
