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
	// full_url
	// hashes
	// css
	// encased

	const commentary = artist_commentary(
		options.artist,
		options.title,
		options.description
	);

	const sources = [
		options.full_url,
		options.artist.href,
		window.location.href
	];

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
		const button = upload_button(options.full_url, sources, commentary);
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

	options.hashes = [[options.full_url, 'full image']].concat(options.hashes);

	return options;
}

module.exports = {
	simple_site: build_simple
};
