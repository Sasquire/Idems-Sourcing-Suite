module.exports = {
	test: (url) => {
		return url.href === 'https://e621.net/extensions/upload_bvas';
	},

	match: ['https://e621.net/extensions/upload_bvas'],

	connect: ['*'],

	title: 'PostBVAS',
	version: 1
};
