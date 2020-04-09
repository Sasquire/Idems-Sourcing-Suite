module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'inkbunny.net';
	},

	match: [
		'*://*.inkbunny.net/s/*'
	],

	connect: [], // I have complete trust in InkBunny's md5s

	title: 'InkBunny',
	version: 2
};
