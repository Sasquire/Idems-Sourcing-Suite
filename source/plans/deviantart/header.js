module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'deviantart.com';
	},

	match: ['*://*.deviantart.com/*'],

	connect: ['wixmp.com'],

	title: 'DeviantArt',
	version: 3
};
