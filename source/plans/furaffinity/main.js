const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_nodes,
	GM
} = require('./../../utils/utils.js');
const header = require('./header.js');

function style () {
	GM.addStyle(`
	.iss_hash_notfound { color: #333 !important; }
	.iss_hash_found { color: #4cf !important; }

	.container { display: flex; }
	#iss_buttons, #iss_links { display: flex; flex-direction: column; }
	.information { margin-right: auto; }
	#iss_upload_link {
		border: 1px solid black;
		padding: 0px 4px;
		font-size: 0.9rem;
		margin-top: auto;
	}
	#iss_links { font-size: 1.3em; padding: 0.3rem; }
	.iss_image_link { margin-right: 0.4rem; }
	#iss_links > .iss_hash_span ~ .iss_hash_span { margin-top: 0.5rem; }
`);
}

function get_artist () {
	return document.querySelector('.information a');
}

function get_full_url () {
	return document.querySelector('a[href^="//d.facdn.net"]').href;
}

function get_thumb_url () {
	const full_url = get_full_url();
	const timestamp = full_url.match(/.*\/(\d+)\/\d+\..*?_.*\..*/u)[1];
	const post_id = new URL(window.location.href).pathname.split('/')[2];
	return `https://t.facdn.net/${post_id}@${400}-${timestamp}.jpg`;
}

function get_description () {
	const artist = get_artist();
	const title = document.querySelector('.information h2');
	const description = document.querySelector('.alt1[width="70%"]');
	return artist_commentary(artist, title, description);
}

function commentary () {
	return commentary_button(get_description());
}

function upload () {
	const sources = [
		get_artist().href,
		window.location.href,
		get_full_url()
	];

	// no tags because they are meaningless from FA
	return upload_button(get_full_url(), sources, get_description());
}

async function get_hashes () {
	const hashes = await data_to_nodes([
		[get_full_url(), 'full image'],
		[get_thumb_url(), 'thumb image']
	]);

	const span = document.createElement('span');
	span.id = 'iss_links';
	hashes.forEach(e => span.appendChild(e));

	return span;
}

async function exec () {
	const container = document.querySelector('.container');

	const commentary_button = commentary();
	const upload_button = upload();

	const span = document.createElement('span');
	span.id = 'iss_buttons';
	span.appendChild(commentary_button);
	span.appendChild(upload_button);
	container.appendChild(span);

	const hashes = await get_hashes();
	container.insertBefore(hashes, span);

	style();
}

module.exports = {
	...header,
	exec: exec
};
