const { artist_commentary, commentary_button } = require('./artist_commentary.js');
const { upload_button } = require('./upload_url.js');
const { data_to_span } = require('./hash_image.js');
const { common_styles, add_css } = require('./nodes.js');
const { get_value } = require('./gm_values.js');

async function build_simple (options) {
	options = transform_options(options);
	// artist
	// title
	// description
	// year
	// full_url
	// full_url_name
	// hashes
	// css
	// hashes_as_array

	const commentary = artist_commentary(
		options.artist,
		options.title,
		options.description
	);

	const sources = [
		window.location.href,
		options.full_url,
		options.artist.href
	];

	const setting_value_pairs = [
		['on_site_upload_add_year_tag', options.year]
	];

	const tags = [];
	for (const [setting_name, result_value] of setting_value_pairs) {
		if (result_value === null) {
			continue;
		} else if (typeof result_value !== 'string') {
			throw new Error(`For setting ${setting_name}, tried to add a non-string value`);
		} else {
			const should_include = await get_value(setting_name);
			if (should_include === true) {
				tags.push(result_value);
			}
		}
	}

	let commentary_span = null;
	const on_site_commentary_enabled = await get_value('on_site_commentary_enabled');
	if (on_site_commentary_enabled === true) {
		commentary_span = document.createElement('span');
		commentary_span.appendChild(commentary_button(commentary));
	}

	let upload_span = null;
	const on_site_upload_enabled = await get_value('on_site_upload_enabled');
	if (on_site_upload_enabled === true) {
		upload_span = document.createElement('span');
		const button = upload_button(options.full_url, sources, commentary, tags);
		upload_span.appendChild(button);
	}

	let hash_span = null;
	const on_site_hasher_enabled = await get_value('on_site_hasher_enabled');
	if (on_site_hasher_enabled === true) {
		const data_span = data_to_span(options.hashes);
		if (options.hashes_as_array === true) {
			hash_span = Array.from(data_span.children);
		} else {
			hash_span = data_span;
		}
	} else if (options.hashes_as_array === true) {
		hash_span = [];
	}

	common_styles();
	add_css(options.css);

	return {
		description: commentary_span,
		upload: upload_span,
		hashes: hash_span
	};
}

function transform_options (options) {
	Object.entries(options).forEach(([key, value]) => {
		if (typeof value === 'function') {
			options[key] = options[key]();
		}
	});

	const image_name = options.full_url_name || 'full image';
	options.hashes = [[options.full_url, image_name]].concat(options.hashes);

	return options;
}

module.exports = {
	simple_site: build_simple
};
