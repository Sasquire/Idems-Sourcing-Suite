const header = require('./header.js');
const {
	commentary_button,
	artist_commentary,
	string_to_node,
	upload_button,
	data_to_nodes,
	common_styles,
	remove_node,
	GM
} = require('./../../utils/utils.js');

let last_url = null;

async function find_site () {
	const here = new URL(window.location.href);

	if (here.href === last_url) {
		console.log('ISS: Duplicate URL detected');
		return; // Why are we loading twice on the same page?
	} else {
		last_url = here.href;
	}

	clear_all_setup();

	const artwork_regex = /^\/[A-z0-9_-]+\/art\/.*$/;
	if (artwork_regex.test(here.pathname)) {
		console.log('ISS: Artwork URL detected');
		run_artwork();
	}
}

async function run_artwork () {
	const here_path = new URL(window.location.href).pathname;
	const post_id = parseInt(here_path.split('-').splice(-1)[0], 10);
	const info = await get_info(post_id);

	const post_info = document.querySelector('[data-hook=deviation_meta]');
	post_info.style.flexDirection = 'column';
	const container = document.createElement('div');
	container.id = 'iss_container';
	post_info.appendChild(container);

	const upload_button = create_upload_button(info.sources[0][0], info.description);
	container.appendChild(upload_button);

	const description_button = commentary_button(info.description);
	container.appendChild(description_button);

	const hashes = await data_to_nodes(info.sources);
	hashes.forEach(e => container.appendChild(e));
}

function add_style () {
	common_styles();

	GM.addStyle(`
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

function create_upload_button (best_url, description) {
	const is_from_da = new URL(best_url).hostname === 'www.deviantart.com';

	return upload_button(
		is_from_da ? best_url : `Manual upload is required ${best_url}`,
		[window.location.href],
		description
	);
}

function exec () {
	add_style();
	find_site();
	window.addEventListener('locationchange', find_site);
}

function get_info (post_id) {
	const url = new URL('https://www.deviantart.com/_napi/shared_api/deviation/extended_fetch');
	url.searchParams.set('deviationid', post_id);
	url.searchParams.set('type', 'art');
	url.searchParams.set('include_session', false);
	return fetch(url)
		.then(e => e.text())
		.then(e => JSON.parse(e))
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
	...header,
	exec: exec
};
