module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'weasyl.com';
	},

	match: [
		'*://*.weasyl.com/*/submissions/*'
	],

	connect: ['cdn.weasyl.com'],

	title: 'Weasyl',
	version: 1
};
