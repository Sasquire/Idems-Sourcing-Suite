const headers = require('./header.js');
const defaults = require('./../../default_settings.js');
const Settings = require('./../../../dependencies/extensions.js');

function exec () {
	// Do something with utils
	on_site_hasher_settings();
	image_compare_settings();
}

function on_site_hasher_settings () {
	const settings = new Settings({
		name: 'on-site-utilities',
		description: 'A collection of utilities for sourcing and uploading posts.'
	});

	settings.checkbox({
		name: 'on-site-hasher',
		key: 'on_site_hasher_enabled',
		default: defaults.on_site_hasher_enabled,
		description: 'Downloads, hashes, and links to various image qualities.'
	});

	settings.checkbox({
		name: 'on-site-upload',
		key: 'on_site_upload_enabled',
		default: defaults.on_site_upload_enabled,
		description: 'Provides a convenient link to upload posts directly to e621.'
	});

	settings.checkbox({
		name: 'on-site-commentary',
		key: 'on_site_commentary_enabled',
		default: defaults.on_site_commentary_enabled,
		description: 'Provides a convenient button to copy an artists commentary about an image.'
	});

	site_checkbox('DeviantArt', 'https://deviantart.com/');
	site_checkbox('FurAffinity', 'https://furaffinity.net/');
	site_checkbox('FurryNetwork', 'https://furrynetwork.com/');
	// site_checkbox('InkBunny', 'https://inkbunny.net/');
	// site_checkbox('Pixiv', 'https://www.pixiv.net/en/');
	// site_checkbox('SoFurry', 'https://www.sofurry.com/');
	site_checkbox('Twitter', 'https://twitter.com/');
	site_checkbox('Weasyl', 'https://www.weasyl.com/');

	function site_checkbox (name, url) {
		const key = `on_site_${name.toLowerCase()}_enabled`;
		settings.checkbox({
			name: name,
			key: key,
			default: defaults[key],
			description: `Enable on-site-utilities for <a href="${url}">${name}</a>.`
		});
	}
}

function image_compare_settings () {
	// eslint-disable-next-line no-unused-vars
	const settings = new Settings({
		name: 'image-compare',
		description: 'An in-browser image comparison tool. Useful for seeing the differences between two images.',
		url: 'https://e621.net/extensions/image_compare'
	});
}

module.exports = {
	exec: exec,
	...headers
};
