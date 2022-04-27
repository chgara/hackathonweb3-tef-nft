/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['thumbs.gfycat.com', 'ipfs.infura.io'],
	},
};

const withImages = require('next-images');

module.exports = withImages();
module.exports = nextConfig;
