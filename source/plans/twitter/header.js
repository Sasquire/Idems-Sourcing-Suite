module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'twitter.com';
	},

	match: [
		'*://*.twitter.com/*'
	],

	connect: ['pbs.twimg.com'],

	title: 'Twitter',
	version: 1
};
