const { description, upload } = require('./shared.js');
const {
	commentary_from_text,
	string_to_node,
	data_to_nodes,
	node_to_dtext,
	common_styles,
	remove_node,
	GM
} = require('./../../utils/utils.js');

async function run_artwork () {
	clear_all_setup();

	const here_path = new URL(window.location.href).pathname;
	const post_id = parseInt(here_path.split('-').splice(-1)[0], 10);
	const info = await get_info(post_id);

	await document.body.arrive(`[data-modalsrc^="https://www.deviantart.com/deviation/report/${post_id}"]`);
	const post_info = document.querySelector('.dev-title-container');
	const container = document.createElement('div');
	container.id = 'iss_container';
	post_info.appendChild(container);

	container.appendChild(upload(info));
	container.appendChild(description(info));

	const hashes = await data_to_nodes(info.sources);
	hashes.forEach(e => container.appendChild(e));
}

function add_style () {
	common_styles();

	GM.addStyle(`
		.iss_image_link {
			color: inherit !important;
			font-size: 1.1rem;
			margin-right: 0.3rem;
		}

		#iss_container {
			display: flex;
			flex-direction: column;
			margin-left: 5rem;
		}

		#iss_artist_commentary { width: 8rem; }
		#iss_upload_link { font-size: 1rem; }
	`);
}

function clear_all_setup () {
	remove_node(document.getElementById('iss_container'));
}

async function get_info (post_id) {
	const user_info = document.cookie
		.split(';')
		.map(e => e
			.split('=')
			.map(e => decodeURIComponent(e))
		)
		.find(([name, value]) => name.replace(' ', '') === 'userinfo')[1];

	const url = new URL('https://www.deviantart.com/global/difi/');
	url.searchParams.set('t', 'json');
	url.searchParams.set('ui', user_info);
	url.searchParams.set('c[]', `"DeviationView","getExtrasHTML",["${post_id}","",{},{}]`);

	return fetch(url, { method: 'POST' })
		.then(e => e.text())
		.then(e => JSON.parse(e))
		.then(e => e.DiFi.response.calls[0].response.content)
		.then(e => ({
			description: get_commentary(e, string_to_node(e.html_col1)),
			sources: get_sources(string_to_node(e.html_col2))
		}));
}

function get_commentary (da_object, html1) {
	const description_node = html1.querySelector('.dev-description .text.block');
	const description = node_to_dtext(description_node);

	return commentary_from_text(null, da_object.title, description);
}

function get_sources (html2) {
	const sources = [];

	const download_link = html2.querySelector('.dev-page-download');
	if (download_link) {
		sources.push([download_link.href, 'download']);
	}

	const image = html2.querySelector('.preview a');
	sources.push([image.dataset.superFullImg, 'large view']);
	sources.push([image.dataset.superImg, 'social preview']);

	return sources.filter((e, i, a) => i === a.findIndex(p => p[0] === e[0]));
}

module.exports = {
	init: add_style,
	exec: run_artwork
};
