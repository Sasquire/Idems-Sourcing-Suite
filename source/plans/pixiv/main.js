const header = require('./header.js');
const {
	artist_commentary,
	commentary_button,
	data_to_nodes,
	common_styles,
	upload_button,
	get_value,
	add_css
} = require('./../../utils/utils.js');

function exec () {
	find_site();
	common_styles();
	add_css(`
		.iss_image_link {
			color: black !important;
		}

		.iss_hashes {
			display: flex;
			flex-direction: column;
		}
		
		.iss_hash_span {
			margin: 0px auto;
		}

		.iss_image_link {
			margin-right: 1rem;
		}
	`);

	// This whole thing was meant to be setup so
	// it would work with pixiv's design and will
	// load the proper things on each page, but this
	// proved to be too difficult. Commented out code
	// should be the beginnings of such a system
	// window.addEventListener('locationchange', find_site);
}

function find_site () {
	const artworks = /^\/[^/]*\/artworks\/\d+$/;

	clear_all_setup();

	const here = new URL(window.location.href);
	if (artworks.test(here.pathname)) {
		console.log('ISS: Artwork URL detected');
		run();
	}
}

function clear_all_setup () {
	// Todo
}

// let last_image_url = null;
async function run () {
	// Wait for the first image to appear. Make sure it has a different url
	// const image = await document.body.arrive(`img[srcset]:not([srcset^="${last_image_url}"])`);
	// await document.body.leave('#\\32 ');
	// last_image_url = image.srcset;

	await document.body.arrive('[role=presentation] [role=presentation]');

	// Description can always be done
	conditional_execute('on_site_commentary_enabled', do_commentary);

	// May need to wait for upload links and image hashes
	if (document.getElementById('1') !== null) {
		// https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
		await document.body.arrive('#\\32 ');
	}

	conditional_execute('on_site_upload_enabled', do_upload);
	conditional_execute('on_site_hasher_enabled', do_md5s);
}

async function do_md5s () {
	const images = get_images();
	for (let i = 0; i < images.length; i++) {
		const image = images[i];
		console.log(`ISS: Processing image ${i}`);

		const iss_container = document.createElement('span');
		iss_container.classList.add('iss_hashes');

		data_to_nodes([
			[image.best_url, 'Full'],
			[image.preview_url, 'Preview']
		]).forEach(p => {
			iss_container.appendChild(p);
		});

		image.container.appendChild(iss_container);

		// Wait a whole second so images are complete sequentially
		// and on large posts with many images, we do not get rate
		// limited by e621 or from pixiv.
		await new Promise(resolve => setTimeout(resolve, 1300));
	}
}

function get_description () {
	return artist_commentary(
		document.querySelectorAll('a[href^="/en/users"]')[1], // Artist
		document.getElementsByTagName('h1')[0], // Title
		document.querySelector('h1 ~ div > div') // Description
	);
}

function do_upload () {
	const gallery_url = document.querySelectorAll('a[href^="/en/users"]')[1].href;

	const images = get_images();
	for (let i = 0; i < images.length; i++) {
		const image = images[i];

		const button = upload_button(
			image.best_url,
			[
				window.location.href,
				image.best_url,
				gallery_url
			],
			get_description(),
			document.querySelector('[title="Posting date"]').textContent.match(/\b\d{4}\b/)[0]
		);

		image.container.appendChild(button);
	}
}

function get_images () {
	return Array.from(document.querySelectorAll('main div[role="presentation"] > a'))
		.map(e => ({
			container: e.parentNode.parentNode,
			link: e
		}))
		// Find some way to filter out bad images such
		// as animations. Currently the script will just
		// break and I guess that is okay.
		.map(e => ({
			...e,
			best_url: e.link.href,
			preview_url: e.link.href
				.replace('/img-original/', '/img-master/')
				.replace(/.(png|jpg)$/u, '_master1200.jpg')
		}));
}

function do_commentary () {
	const container = document.querySelector('h1').parentNode;
	const button = commentary_button(get_description());
	container.insertBefore(button, container.querySelector('footer'));
}

async function conditional_execute (key, func) {
	const value = await get_value(key);
	if (value === true) {
		func();
	}
}

module.exports = {
	...header,
	exec: exec
};
