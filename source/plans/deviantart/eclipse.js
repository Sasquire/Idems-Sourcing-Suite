const { description, upload } = require('./shared.js');
const {
	artist_commentary,
	string_to_node,
	data_to_nodes,
	common_styles,
	remove_node,
	add_css
} = require('./../../utils/utils.js');

async function run_artwork () {
	clear_all_setup();

	const here_path = new URL(window.location.href).pathname;
	const post_id = parseInt(here_path.split('-').splice(-1)[0], 10);
	const info = await get_info(post_id);

	const post_info = document.querySelector('[data-hook=deviation_meta]');
	post_info.style.flexDirection = 'column';
	const container = document.createElement('div');
	container.id = 'iss_container';
	post_info.appendChild(container);

	container.appendChild(upload(info));
	container.appendChild(description(info));

	const hashes = await data_to_nodes(info.sources);
	hashes.forEach(e => container.appendChild(e));
}

function add_style () {
	common_styles();

	add_css(`
		.iss_image_link {
			color: inherit !important;
			font-size: 1.1rem;
			margin-right: 0.3rem;
		}

		#iss_container {
			display: flex;
			flex-direction: column;
			margin-top: 1rem;
		}

		#iss_artist_commentary { width: 8rem; }
	`);
}

function clear_all_setup () {
	remove_node(document.getElementById('iss_container'));
}

async function get_info (post_id) {
	const url = new URL('https://www.deviantart.com/_napi/shared_api/deviation/extended_fetch');
	url.searchParams.set('deviationid', post_id);
	url.searchParams.set('type', 'art');
	url.searchParams.set('include_session', false);

	return fetch(url)
		.then(e => e.json())
		.then(e => ({
			sources: get_sources(e),
			description: get_description(e)
		}));
}

// I believe creating new nodes and then just passing that to
// the artist commentary function is simpler than requiring
// the nodes_to_dtext function to parse this one thing and then
// require another function to build it all.
function get_description (da_object) {
	const artist = string_to_node(da_object.deviation.author.username);
	const title = string_to_node(da_object.deviation.title);
	const description = string_to_node(da_object.deviation.extended.description);

	return artist_commentary(artist, title, description);
}

// While it may seem it, the download hash and the large view
// are not always the same md5. There is likely some optimization
// going on at DeviantArt where they choose which setup is the
// best. For an example of mismatching hashes, 467929547 is a
// post that exhibits this feature. Many others are well behaved.
// 669522728 - Only download and large
// 754495989 - Only large
// 644901973 - Only large and social
function get_sources (da_object) {
	const download_url = (() => {
		const download = da_object.deviation.extended.download;
		if (download) {
			return [{ type: 'download', src: download.url }];
		} else {
			return [];
		}
	})();

	const other_sources = ['fullview', 'social_preview', 'preview']
		.map(e => da_object.deviation.files.find(p => p.type === e))
		.filter(e => e); // Perhaps one of the results from above is null

	return download_url
		.concat(other_sources)
		.filter(e => e.src !== 'https://st.deviantart.net/misc/noentrythumb-200.png')
		.filter((e, i, a) => i === a.findIndex(p => p.src === e.src))
		.map(e => ([e.src, e.type.replace('full', 'large ').replace('_', ' ')]));
}

module.exports = {
	init: add_style,
	exec: run_artwork
};
