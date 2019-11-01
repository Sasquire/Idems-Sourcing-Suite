module.exports = {
	test: (url) => {
		return url.href === 'https://e621.net/extensions/image_compare';
	},

	match: [
		'*://*.e621.net/extensions/image_compare'
	],

	connect: ['*'],

	title: 'Image Comparison',
	version: 1
};
