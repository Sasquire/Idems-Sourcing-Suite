const header = require('./header.js');
const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_nodes,
	common_styles,
	GM
} = require('./../../utils/utils.js');

function find_site () {
	const status = /^\/[A-z0-9_]+\/status\/\d+$/;
	const photo = /^\/[A-z0-9_]+\/status\/\d+\/photo\/\d$/;

	clear_all_setup();

	const here = new URL(window.location.href);
	if (status.test(here.pathname)) {
		console.log('status');
		// links to upload all images
		// copy description
	} else if (photo.test(here.pathname)) {
		console.log('ISS: Photo URL detected');
		photo_hashes();
		// upload link
		// copy description
	}
}

async function photo_hashes () {
	const image_id = parseInt((/\d+$/).exec(window.location.href)[0], 10);
	const list_elems = new Array(image_id).fill('li').join(' ~ ');
	const query = `ul[role=list] > ${list_elems} img`;
	const image_node = await document.body.arrive(query);

	const sources = produce_sources(image_node.src);
	const nodes = await data_to_nodes(sources);
	const span = document.createElement('span');
	span.id = 'iss_span';
	nodes.forEach(e => span.appendChild(e));

	// Because of the async nature of stuff, a user might
	// have gone through things rather quickly. This will
	// make sure that there is always a clean slate
	clear_all_setup();
	document.body.appendChild(span);
}

function produce_sources (starting_url) {
	return [
		[url_type('orig'), 'full '],
		[url_type('4096x4096'), '4096 '],
		[url_type('large'), 'large '],
		[url_type('medium'), 'thumb ']
	];

	function url_type (new_type) {
		const url = new URL(starting_url);
		url.searchParams.set('name', new_type);
		return url.href;
	}
}

function clear_all_setup () {
	const hashes = document.getElementById('iss_span');
	if (hashes) {
		hashes.parentNode.removeChild(hashes);
	}
}

function add_style () {
	common_styles();

	GM.addStyle(`
		#iss_span {
			position: fixed;
			top: 0px;
			z-index: 3000;
			display: flex;
			width: 100%;
			background-color: #0006;
			flex-wrap: wrap;
		}
		.iss_hash_span { margin: auto; }
		.iss_image_link { margin-right: 0.2rem; }
	`);
}

function exec () {
	add_style();
	find_site();
	window.addEventListener('locationchange', find_site);
}

module.exports = {
	...header,
	exec: exec
};
