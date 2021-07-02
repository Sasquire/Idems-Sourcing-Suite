const headers = require('./header.js');
const defaults = require('./../../default_settings.js');
const Settings = require('./../../../dependencies/extensions.js');
const { set_value } = require('./../../utils/utils.js');

function exec () {
	// Do something with utils
	on_site_hasher_settings();
	image_compare_settings();
	post_bvas_settings();
	add_credentials_listener();
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
		name: 'on-site-upload-add-year-tag',
		key: 'on_site_upload_add_year_tag',
		default: defaults.on_site_upload_add_year_tag,
		description: 'Automatically guesses year-tags for posts. Enable only if you understand the risks.'
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
	site_checkbox('InkBunny', 'https://inkbunny.net/');
	site_checkbox('Pixiv', 'https://www.pixiv.net/en/');
	site_checkbox('SoFurry', 'https://www.sofurry.com/');
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
	const settings = new Settings({
		name: 'image-compare',
		description: 'An in-browser image comparison tool. Useful for seeing the differences between two images.',
		url: 'https://e621.net/extensions/image_compare'
	});

	settings.checkbox({
		name: 'Enabled',
		key: 'on_site_imagecomparison_enabled',
		default: defaults.on_site_imagecomparison_enabled,
		description: 'Enables or disables the image-compare tool located at <a href="https://e621.net/extensions/image_compare">/extensions/image_compare</a>.'
	});
}

function post_bvas_settings () {
	const settings = new Settings({
		name: 'post-bvas',
		description: 'A tool to automate the process of replacing posts with better versions.',
		url: 'https://e621.net/extensions/upload_bvas'
	});

	settings.checkbox({
		name: 'Enabled',
		key: 'on_site_postbvas_enabled',
		default: defaults.on_site_postbvas_enabled,
		description: 'Enables or disables the post-bvaser tool located at <a href="https://e621.net/extensions/upload_bvas">/extensions/upload_bvas</a>.'
	});

	settings.checkbox({
		name: 'Edit Description',
		key: 'postbvas_edit_description',
		default: defaults.postbvas_edit_description,
		description: 'Toggles the automatic editing of a new post\'s description to link to the old post.'
	});

	settings.checkbox({
		name: 'Post Comment',
		key: 'postbvas_post_comment',
		default: defaults.postbvas_post_comment,
		description: 'Toggles the automatic creation of a comment linking to the old post.'
	});

	settings.checkbox({
		name: 'Delete post',
		key: 'postbvas_delete_post',
		default: defaults.postbvas_delete_post,
		description: 'For janitor+ use. If enabled the post will be deleted instead of flagged.'
	});
}

function add_credentials_listener () {
	document.getElementById('update_credentials_button').addEventListener('click', async e => {
		const username = document.getElementById('credentials_username').value;
		const api_key = document.getElementById('credentials_api_key').value;
		await set_value('username', username);
		await set_value('api_key', api_key);
	});
}

module.exports = {
	exec: exec,
	...headers
};
