import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from 'next/document';
import { ReactElement } from 'react';
import { StyleSheetServer } from 'aphrodite';

class MyDocument extends Document {
	static async getInitialProps({
		renderPage,
	}: DocumentContext): Promise<DocumentInitialProps> {
		// @ts-ignore
		const { html, css } = StyleSheetServer.renderStatic(() =>
			// @ts-ignore
			renderPage()
		);

		const ids = css.renderedClassNames;
		// @ts-ignore
		return { ...html, css, ids };
	}

	render(): ReactElement {
		/* Make sure to use data-aphrodite attribute in the style tag here
		 * so that aphrodite knows which style tag it's in control of when
		 * the client goes to render styles. If you don't you'll get a second
		 * <style> tag
		 */

		// @ts-ignore
		const { css, ids } = this.props;
		return (
			<Html>
				<Head>
					<link
						rel='preconnect'
						href='https://fonts.googleapis.com'
					/>
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin='True'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Quicksand:wght@500&family=Roboto+Condensed&display=swap'
						rel='stylesheet'
					/>
					<style
						data-aphrodite
						dangerouslySetInnerHTML={{
							__html: css.content,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					{ids && (
						<script
							dangerouslySetInnerHTML={{
								__html: `
                  window.__REHYDRATE_IDS = ${JSON.stringify(ids)}
                `,
							}}
						/>
					)}
				</body>
			</Html>
		);
	}
}

export default MyDocument;
