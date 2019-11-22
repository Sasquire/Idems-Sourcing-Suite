const { simple_site, append } = require('./../../utils/utils.js');

const get_info = async () => simple_site({
	artist: document.querySelector('#db-user > .username'),
	title: document.querySelector('#detail-bar-title'),
	description: document.querySelector('#detail-description > .formatted-content'),
	full_url: document.querySelector('#detail-art > a').href,
	hashes: [
		[document.querySelector('#detail-art > a > img').src, 'thumb image']
	],
	css: `
		#iss_container, #iss_hashes {
			display: flex;
			flex-direction: column;
		}
		.iss_image_link { margin-right: 1rem; }
	`,
	hashes_as_array: false
});

async function exec () {
	const info = await get_info();

	const container = document.createElement('div');
	container.id = 'iss_container';
	document.querySelector('#di-info').appendChild(container);

	append(container, info.upload);
	append(container, info.description);
	append(container, info.hashes);
}

module.exports = {
	...require('./header.js'),
	exec: exec
};
