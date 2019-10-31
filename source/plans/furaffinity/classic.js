const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_span,
	common_styles,
	GM
} = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

function style () {
	common_styles();

	GM.addStyle(`
	.container { display: flex; }
	#iss_buttons, #iss_hashes { display: flex; flex-direction: column; }
	.information { margin-right: auto; }
	#iss_upload_link {
		border: 1px solid black;
		padding: 0px 4px;
		font-size: 0.9rem;
		margin-top: auto;
	}
	#iss_hashes { font-size: 1.3em; padding: 0.3rem; }
	.iss_image_link { margin-right: 0.4rem; }
	#iss_hashes > .iss_hash_span ~ .iss_hash_span { margin-top: 0.5rem; }
	.iss_hash { font-weight: 700; }
`);
}

function get_artist () {
	return document.querySelector('.information a');
}

function get_full_url () {
	return document.querySelector('a[href^="//d.facdn.net"]').href;
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

function get_hashes () {
	return data_to_span([
		[get_full_url(), 'full image'],
		[full_to_thumb(get_full_url()), 'thumb image']
	]);
}

async function exec () {
	const span = document.createElement('span');
	span.id = 'iss_buttons';
	span.appendChild(commentary());
	span.appendChild(upload());

	const container = document.querySelector('.container');
	container.appendChild(get_hashes());
	container.appendChild(span);

	style();
}

module.exports = exec;
