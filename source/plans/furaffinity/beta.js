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
/*
	#iss_buttons, #iss_links { display: flex; flex-direction: column; }
	.information { margin-right: auto; }
	#iss_upload_link {
		border: 1px solid black;
		padding: 0px 4px;
		font-size: 0.9rem;
		margin-top: auto;
	}
	#iss_links { font-size: 1.3em; padding: 0.3rem; }
	
	#iss_links > .iss_hash_span ~ .iss_hash_span { margin-top: 0.5rem; }
	
	*/
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
	const container = document.querySelector('.submission-sidebar');

	const commentary_button = commentary();
	const upload_button = upload();

	const span = document.createElement('span');
	span.id = 'iss_span';
	span.appendChild(commentary_button);
	span.appendChild(upload_button);

	container.appendChild(span);

	const hashes = await data_to_nodes([
		[get_full_url(), 'full image'],
		[full_to_thumb(get_full_url()), 'thumb image']
	]);

	hashes.forEach(e => span.appendChild(e));

	style();
}

module.exports = exec;
