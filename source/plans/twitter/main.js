const header = require('./header.js');
const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_span,
	common_styles,
	remove_node,
	GM
} = require('./../../utils/utils.js');

function find_site () {
	const status = /^\/[A-z0-9_]+\/status\/\d+$/;
	const photo = /^\/[A-z0-9_]+\/status\/\d+\/photo\/\d$/;

	clear_all_setup();

	const here = new URL(window.location.href);
	if (status.test(here.pathname)) {
		console.log('ISS: Status URL detected');
		// links to upload all images
		// copy description
	} else if (photo.test(here.pathname)) {
		console.log('ISS: Photo URL detected');
		photo_hashes().then(upload);
	}
}

// This runs too quickly. As in, It is run before
// twitter has updated its page. It will return a
// element that no longer exists
async function do_description () {
	const query = '[role=article] > div > div:first-child + div > div:first-child > div:only-child';
	const first_unquoted_icon = await document.body.arrive(query);
	const first_unquoted = first_unquoted_icon.parentNode.parentNode.parentNode;
	console.log(first_unquoted);
}

async function get_sources () {
	const image_id = parseInt((/\d+$/).exec(window.location.href)[0], 10);
	const list_elems = new Array(image_id).fill('li').join(' ~ ');
	const query = `ul[role=list] > ${list_elems} img`;

	// The structure for displaying multiple images and single
	// images is different. This attempt to find each style and
	// then return the first one that is found. The other's event
	// listeners are then discarded and those promises are left
	// never resolving. Perhaps this is not the best idea.
	const image_node = await Promise.race([
		document.getElementById('react-root').arrive(query),
		document.getElementById('react-root').arrive('div > div > div > div > div > img[alt=Image]')
	]);
	document.getElementById('react-root').forget_arrives();

	const all_sources = produce_sources(image_node.src);
	return all_sources;
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

async function photo_hashes () {
	const sources = await get_sources();
	const span = data_to_span(sources);
	console.log(document.getElementById('iss_span'));
	console.log(span);

	// Because of the async nature of stuff, a user might
	// have gone through things rather quickly. This will
	// make sure that there is always a clean slate
	clear_all_setup();

	document.body.appendChild(span);
}

async function get_description () {
	const artist = await document.body.arrive('[data-testid=tweet] [dir=ltr] > span');
	const title = null;
	const description = await document.body.arrive('[data-testid=tweet] ~ [dir=auto] > span');
	return artist_commentary(artist, title, description);
}

async function upload () {
	const full_url = await get_sources().then(e => e[0][0]);
	const description = await get_description();

	const sources = [
		document.querySelector('[data-testid=tweet] a').href,
		window.location.href,
		full_url
	];

	// Fix visual bug where upload would be crammed against
	// the other share buttons
	const quick_buttons = document.querySelector('[aria-label$=Reply]')
		.parentNode
		.parentNode;
	quick_buttons.querySelector('div ~ div ~ div ~ div').style.flexGrow = 1;

	const button = upload_button(full_url, sources, description);
	quick_buttons.appendChild(button);
}

function clear_all_setup () {
	remove_node(document.getElementById('iss_span'));
	remove_node(document.getElementById('iss_upload_link'));
}

function add_style () {
	common_styles();

	GM.addStyle(`
		#iss_hashes {
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

		#iss_upload_link {
			color: white;
			margin: auto;
		}
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
