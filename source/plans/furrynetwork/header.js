module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'furrynetwork.com';
	},

	match: ['*://*.furrynetwork.com/*'],

	connect: ['https://d3gz42uwgl1r1y.cloudfront.net/'],

	title: 'FurryNetwork',
	version: 1
};
