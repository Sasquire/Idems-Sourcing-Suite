const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_nodes,
	common_styles,
	GM
} = require('./../../utils/utils.js');
const header = require('./header.js');

function style () {
	common_styles();

	GM.addStyle(`
	#iss_container, #iss_links {
		display: flex;
		flex-direction: column;
	}
	.iss_image_link { margin-right: 1rem; }
	#iss_artist_commentary { width: 30rem; }
	`);
}

function get_artist () {
	return document.querySelector('#db-user > .username');
}

function get_full_url () {
	return document.querySelector('#detail-art > a').href;
}

function get_description () {
	const artist = get_artist();
	const title = document.querySelector('#detail-bar-title');
	const description = document.querySelector('#detail-description > .formatted-content');
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
	const thumb = document.querySelector('#detail-art > a > img');

	return data_to_nodes([
		[get_full_url(), 'full image'],
		[thumb.src, 'thumb image']
	]);
}

async function exec () {
	const container = document.createElement('div');
	container.id = 'iss_container';
	document.querySelector('#di-info').appendChild(container);

	container.appendChild(upload());
	container.appendChild(commentary());
	get_hashes().forEach(e => container.appendChild(e));

	style();
}

module.exports = {
	...header,
	exec: exec
};

/*

if(new URL(window.location.href).host.includes('weasyl.com')){
	weasyl();
}

function weasyl(){
	$i('detail-description').innerHTML += '<hr>';

	const img = $q('#detail-art img');
	md5_append(
		'#detail-description', // Where to place md5s
		[img.parentNode.href, 'full image'], // MD5 Data
		[img.src, 'sample']
	).then(async () => {
		const md5sums = $c('md5sum');
		for(const link of md5sums){
			await color_link(link);
		}
	});

	const title = $q('#detail-bar-title').innerText;
	const artist = $q('#db-user > .username').innerText;
	description_button(
		$q('#detail-description'), // Where to place description
		$q('#detail-description > .formatted-content'), // Description node
		`${title} - by ${artist}` // Title
	);
}
*/
