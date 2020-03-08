module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'sofurry.com';
	},

	match: [
		'*://*.sofurry.com/view/*'
	],

	connect: ['www.sofurryfiles.com'],

	title: 'SoFurry',
	version: 1
};
