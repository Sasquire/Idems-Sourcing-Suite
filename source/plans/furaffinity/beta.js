const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_nodes,
	common_styles,
	GM
} = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

function style () {
	common_styles();

	GM.addStyle(`
	#iss_span {
		display: flex;
    	flex-direction: column;
    	overflow: hidden;
	}

	#iss_span > * { white-space: nowrap; }
	.iss_hash { font-weight: 700; }
	.iss_image_link { margin-right: 0.4rem; }

	#iss_upload_link {
		text-align: center;
    	font-size: 1.1rem;
    	background: #ddd;
    	border: 1px solid #bbb;
    	border-radius: 0.2rem;
    	color: black !important;
	}
`);
}

function get_artist () {
	return document.querySelector('.submission-artist-container > a ~ a');
}

function get_full_url () {
	// It appears that you can only be on the beta site while logged
	// in. This does not concern me about this node being hidden
	return document.querySelector('.download-logged-in').href;
}

function get_description () {
	const artist = get_artist();
	const title = document.querySelector('.submission-title > h2');

	const description = document.querySelector('.submission-description-container').cloneNode(true);
	const bad_title = description.querySelector('.submission-title');
	description.removeChild(bad_title);

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

async function exec () {
	const span = document.createElement('span');
	span.id = 'iss_span';
	span.appendChild(commentary());
	span.appendChild(upload());

	data_to_nodes([
		[get_full_url(), 'full image'],
		[full_to_thumb(get_full_url()), 'thumb image']
	]).forEach(e => span.appendChild(e));

	const more_from = document.querySelector('#columnpage .preview-gallery')
		.previousElementSibling;
	more_from.parentNode.insertBefore(span, more_from);

	style();
}

module.exports = exec;
