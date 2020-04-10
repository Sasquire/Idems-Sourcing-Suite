module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'pixiv.net';
	},

	match: [
		'*://*.pixiv.net/*'
	],

	connect: ['i.pximg.net'],

	title: 'Pixiv',
	version: 2
};
