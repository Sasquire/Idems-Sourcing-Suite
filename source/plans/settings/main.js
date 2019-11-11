const headers = require('./header.js');
const Settings = require('./../../../dependencies/extensions.js');

function exec () {
	// Do something with utils
	on_site_hasher_settings();
}

function on_site_hasher_settings () {
	const settings = new Settings({
		name: 'on-site-hasher',
		description: 'Will display the md5 sum of images on various sites.'
	});

	settings.checkbox({
		name: 'Enabled',
		key: 'on_site_md5_hasher',
		default: true,
		description: 'Determines if this functionality should be turned on at all.'
	});
}

module.exports = {
	exec: exec,
	...headers
};
