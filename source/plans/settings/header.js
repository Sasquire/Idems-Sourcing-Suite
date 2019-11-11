module.exports = {
	test: (url) => {
		return url.href === 'https://e621.net/extensions';
	},

	match: ['*://*.e621.net/extensions'],

	connect: [],

	title: 'Settings Page',
	version: 1
};
