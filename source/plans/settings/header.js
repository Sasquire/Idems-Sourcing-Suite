module.exports = {
	test: (url) => {
		return url.href === 'https://e621.net/extensions';
	},

	match: ['*://*.e621.net/extensions'],

	connect: [],

	title: 'SettingsPage',
	version: 2
};
