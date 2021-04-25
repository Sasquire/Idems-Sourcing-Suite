const { remove_node, simple_site, append } = require('./../../utils/utils.js');
const header = require('./header.js');

// Twitter actually has a different site for people not logged in
// There *should* be a case where this is handled, but I am just going
// to leave that out and hope that twitter will force the new site
// design on everyone soon. Worst case, users of this can simply
// make a twitter account for this to work. (I'm sorry this is a bad solution)

async function photo_hashes () {
	const info = await build_info();

	// Because of the async nature of stuff, a user might
	// have gone through things rather quickly. This will
	// make sure that there is always a clean slate
	clear_all_setup();

	const quick_buttons = document.querySelector('[aria-label$=Reply]')
		.parentNode
		.parentNode;
	quick_buttons.querySelector('div ~ div ~ div ~ div').style.flexGrow = 1;

	append(quick_buttons, info.upload);
	append(document.body, info.hashes);
	// I can not get the button when pressed to copy the description
	// append(quick_buttons, info.description);
}

function exec () {
	find_site();
	window.addEventListener('locationchange', find_site);
}

async function get_sources () {
	const image_node = await (async () => {
		// Apparently some posts will be weird and not have a single ul element
		// on the page at all. Here is an example link that showcases this behavior.
		// No idea how well this will hold up in the future with changes to twitter,
		// but on the two test cases I tried, it worked!
		// https://twitter.com/xzorgothoth/status/1376220068711923720
		if (document.querySelector('ul') === null) {
			const image_node = await document.getElementById('react-root').arrive('div[role=dialog] img');
			document.getElementById('react-root').forget_arrives();
			return image_node;
		} else {
			const image_id = parseInt((/\d+$/).exec(window.location.href)[0], 10);
			const list_elems = new Array(image_id).fill('li').join(' ~ ');
			const query = `ul[role=list] > ${list_elems} img`;

			// The structure for displaying multiple images and single
			// images is different. This attempt to find each style and
			// then return the first one that is found. The other's event
			// listeners are then discarded and those promises are left
			// never resolving. Perhaps this is not the best idea.
			const image_node = await Promise.race([
				// Specific image
				document.getElementById('react-root').arrive(query),

				// Single image
				document.getElementById('react-root').arrive('div > div > div > div > div > img[alt=Image]')
			]);
			document.getElementById('react-root').forget_arrives();
			return image_node;
		}
	})();
	const all_sources = produce_sources(image_node.src);
	return all_sources;
}

function produce_sources (starting_url) {
	return [
		[url_type('orig'), 'full '],
		[url_type('4096x4096'), '4096 '],
		[url_type('large'), 'large ']
	];

	function url_type (new_type) {
		const url = new URL(starting_url);
		url.searchParams.set('name', new_type);
		return url.href;
	}
}

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
		photo_hashes();
	}
}

function clear_all_setup () {
	remove_node(document.getElementById('iss_hashes'));
	remove_node(document.getElementById('iss_upload_link'));
}

async function build_info () {
	const artist = await document.body.arrive('[data-testid=tweet] [dir=ltr] > span');
	// This should always be present if using the site normally
	// when launched from a  direct photo url, the top tweet
	// isn't actually present! This causes some problems, so saying
	// it is empty is a lot better
	const description = document.querySelector('[data-testid=tweet] ~ [dir=auto] > span');
	const sources = await get_sources();

	return get_info({
		artist: artist,
		description: description,
		sources: sources
	});
}

const get_info = async (pre_found) => simple_site({
	artist: pre_found.artist,
	title: null, // No titles on twitter
	description: pre_found.description,
	full_url: pre_found.sources[0][0],
	full_url_name: 'orig',
	hashes: pre_found.sources.slice(1),
	css: `
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
	`,
	hashes_as_array: false
});

module.exports = {
	...header,
	exec: exec
};
