const {
	artist_commentary,
	commentary_button,
	e621_lookup_hash,
	clear_children,
	common_styles,
	upload_button,
	get_value,
	add_css
} = require('./../../utils/utils.js');

async function exec () {
	fix_styles();
	add_iss_div();

	conditional_execute('on_site_hasher_enabled', transition_old_md5s);
	conditional_execute('on_site_commentary_enabled', do_commentary);
	conditional_execute('on_site_upload_enabled', do_upload);
}

async function conditional_execute (key, func) {
	const value = await get_value(key);
	if (value === true) {
		func();
	}
}

function transition_old_md5s () {
	// eslint-disable-next-line no-undef
	showMD5(); // This is a function in the inkbunny window object
	const md5box = document.getElementById('md5box');
	md5box.parentNode.removeChild(md5box.previousElementSibling);

	const new_hashes = Array.from(md5box.children)
		.map(e => e.textContent)
		.map(e => (/\s+([\w\s]+): ([0-9a-f]{32})/).exec(e))
		.map((e, i) => {
			const container = document.createElement('span');
			container.classList.add('iss_hash_span');

			const link = document.createElement('a');
			link.classList.add('iss_image_link');
			link.href = generate_urls()[i];
			link.textContent = e[1] + '\u200B';

			const hash = document.createElement('span');
			hash.classList.add('iss_hash');
			hash.textContent = e[2];
			e621_lookup_hash(e[2], hash);

			container.appendChild(link);
			container.appendChild(hash);
			return container;
		});

	clear_children(md5box);

	new_hashes.forEach(e => md5box.appendChild(e));
}

function generate_urls () {
	const original_url = document.getElementById('magicbox').src;
	return [
		// We never have access to the original file, so linking to this
		// page is the next best thing that we can do.
		window.location.href,
		original_url.replace(/\/files\/\w+\//, '/files/full/'),
		original_url.replace(/\/files\/\w+\//, '/files/screen/'),
		original_url.replace(/\/files\/\w+\//, '/files/preview/')
	];
}

function fix_styles () {
	document.getElementById('md5box').style = '';
	common_styles();
	add_css(`
		#md5box {
			display: flex !important;
			flex-direction: column;
			margin: 0px 0px 0px 20px;
			font-size: 8pt;
		}
		.iss_image_link {
			margin-right: 0.5rem;
			color: black !important;
		}
		#iss_container {
			width: 232px;
			padding-left: 16px;
			margin-bottom: 15px;
			float: left;
			display: flex;
			flex-direction: column;
		}
		
		#iss_container > span:first-child {
			margin-bottom: 0.5rem;
			display: inline-block;
		}
	`);
}

function add_iss_div () {
	const post_info = document.getElementById('md5box').parentNode.parentNode;
	const stats = post_info
		.lastElementChild
		.previousElementSibling
		.previousElementSibling;

	const container = document.createElement('div');
	container.id = 'iss_container';

	const header = document.createElement('span');
	header.textContent = 'idem\'s sourcing suite';
	container.appendChild(header);

	post_info.insertBefore(container, stats);
}

function get_artist () {
	const artist_node = document.querySelector('a[href^="/gallery"]');
	return {
		href: artist_node.href,
		textContent: new URL(artist_node.href).pathname.replace('/gallery/', '')
	};
}

function get_description () {
	return artist_commentary(
		get_artist(),
		document.querySelector('.pooltable h1'), // Title
		document.querySelector('.elephant_bottom > .content > div > span') // Description
	);
}

function do_commentary () {
	const description = get_description();
	const button = commentary_button(description);
	const container = document.createElement('span');
	container.appendChild(button);
	document.getElementById('iss_container').appendChild(container);
}

function do_upload () {
	const link = upload_button(
		generate_urls()[1],
		[
			window.location.href,
			generate_urls()[1],
			get_artist().href
		],
		get_description(),
		document.querySelector('#submittime_exact').innerText.match(/\b\d{4}\b/)[0]
	);
	const container = document.createElement('span');
	container.appendChild(link);
	document.getElementById('iss_container').appendChild(container);
}

module.exports = {
	...require('./header.js'),
	exec: exec
};
