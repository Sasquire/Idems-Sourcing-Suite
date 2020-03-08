module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'furaffinity.net';
	},

	match: [
		'*://*.furaffinity.net/view/*',
		'*://*.furaffinity.net/full/*'
	],

	connect: ['facdn.net'],

	title: 'FurAffinity',
	version: 1
};
