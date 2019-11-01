const { artist_commentary, commentary_button } = require('./artist_commentary.js');
const { upload_button } = require('./upload_url.js');
const { data_to_span } = require('./hash_image.js');
const { common_styles, add_css } = require('./nodes.js');

function build_simple (options) {
	options = transform_options(options);
	// artist
	// title
	// description
	// full_url
	// hashes
	// css

	const commentary = artist_commentary(
		options.artist,
		options.title,
		options.description
	);

	const commentary_span = document.createElement('span');
	commentary_span.appendChild(commentary_button(commentary));

	const sources = [
		options.full_url,
		options.artist.href,
		window.location.href
	];

	const upload_span = document.createElement('span');
	const upload_link = upload_button(options.full_url, sources, commentary);
	upload_span.appendChild(upload_link);

	common_styles();
	add_css(options.css);

	return {
		description: commentary_span,
		upload: upload_span,
		hashes: data_to_span(options.hashes)
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
