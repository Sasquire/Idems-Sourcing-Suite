const { simple_site, remove_node, append } = require('./../../utils/utils.js');
const header = require('./header.js');

let last_url = null;

const signal = {
	wait: async () => document.body.leave('.submission-description__created[title$=" "]'),
	load: () => (document.querySelector('.submission-description__created').title += ' ')
};

function attempt_site () {
	const here = new URL(window.location.href);
	const is_direct = (/^\/artwork\/\d+\//).test(here.pathname);
	const is_viewed = here.searchParams.get('viewType') === 'artwork';

	remove_node(document.getElementById('iss_container'));

	if (last_url && here.href === last_url.href) {
		console.log('ISS: Duplicate URL detected');
	} else if (last_url === null && is_viewed) {
		// Do nothing because we will be redirected to
		// the direct view shortly
	} else if (is_direct) {
		console.log('ISS: Direct artwork URL detected');
		document.body.arrive('.l--app__layout .submission')
			.then(run_site)
			.then(signal.load);
	} else if (is_viewed) {
		console.log('ISS: Linked artwork URL detected');
		// Wait for known element on first run (can be discarded on all)
		//   runs after the first.
		// Wait for specific element to not have a space at the end
		//   (This should be always the case if running normally, with this
		//   extension, when the new post data is loaded, this element is
		//   overwritten and will no longer have a space at the end. This
		//   signals that there is new data to be retrieved)
		// Run site
		// Update that element to have a space at the end to prime it for
		//   the next time it is needed.

		// This is way too complex and should be simplified
		document.body.arrive('.submission__tags')
			.then(signal.wait)
			.then(run_site)
			.then(signal.load);
	}

	last_url = here;
}

async function run_site () {
	const aside = document.querySelector('.submission__aside__inner');
	const container = document.createElement('div');
	container.id = 'iss_container';

	const info = await get_info();
	append(container, info.upload);
	append(container, info.description);
	info.hashes.forEach(e => append(container, e));

	const description = aside.querySelector('.submission__description');
	aside.insertBefore(container, description);
}

function get_sources () {
	return {
		full: document.querySelector('.submission-actions > a.t--reset-link').href,
		thumb: document.querySelector('.image.submission-media__img img').src
	};
}

const get_info = async () => simple_site({
	artist: () => {
		const node = document.querySelector('.submission-author__display-name');
		return {
			href: node.parentNode.href,
			textContent: node.textContent
		};
	},
	title: document.querySelector('.submission-description__title'),
	description: document.querySelector('.submission-description__description__md'),
	year: document.querySelector('.submission-description__created').title.match(/\b\d{4}\b/)[0],
	full_url: get_sources().full,
	hashes: [
		[get_sources().thumb, 'thumb image']
	],
	css: `
	#iss_container {
		margin: .9375rem 0;
    	padding: .9375rem 0;
		border-top: 1px solid #3e3e40;
		display: flex;
		flex-direction: column;
		white-space: nowrap;
		overflow: hidden;
	}

	.iss_image_link { margin-right: 1rem; }
	`,
	hashes_as_array: true
});

async function exec () {
	attempt_site();
	window.addEventListener('locationchange', attempt_site);
}

module.exports = {
	exec: exec,
	...header
};
