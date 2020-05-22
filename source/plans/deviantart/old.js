const { description, upload } = require('./shared.js');
const {
	commentary_from_text,
	string_to_node,
	data_to_nodes,
	node_to_dtext,
	common_styles,
	remove_node,
	get_value,
	add_css
} = require('./../../utils/utils.js');

async function run_artwork () {
	clear_all_setup();

	const here_path = new URL(window.location.href).pathname;
	const post_id = parseInt(here_path.split('-').splice(-1)[0], 10);
	const info = await get_info(post_id);

	// DA has a smaller div that is changed and update for
	// all pages loads that are not the first page load. We have
	// to wait for this div to be updated. Not the original one
	let post_info = document.querySelector('.dev-title-container');
	if (document.querySelectorAll('.dev-view-about').length > 1) {
		await document.body.arrive('.minibrowse-container .dev-view-about .avatar');
		post_info = document.querySelector('.minibrowse-container .dev-title-container');
	}
	const container = document.createElement('div');
	container.id = 'iss_container';
	post_info.appendChild(container);

	await conditional_execute('on_site_commentary_enabled', () => {
		container.appendChild(description(info));
	});

	await conditional_execute('on_site_upload_enabled', () => {
		container.appendChild(upload(info));
	});

	await conditional_execute('on_site_hasher_enabled', () => {
		const hashes = data_to_nodes(info.sources);
		hashes.forEach(e => container.appendChild(e));
	});
}

async function conditional_execute (key, func) {
	const value = await get_value(key);
	if (value === true) {
		func();
	}
}

function add_style () {
	common_styles();

	add_css(`
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

	return commentary_from_text(null, null, da_object.title, description);
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
