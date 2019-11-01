const { simple_site } = require('./../../utils/utils.js');
const header = require('./header.js');

const get_info = () => simple_site({
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
	`
});

async function exec () {
	const info = get_info();

	const container = document.createElement('div');
	container.id = 'iss_container';
	document.querySelector('#di-info').appendChild(container);

	container.appendChild(info.upload);
	container.appendChild(info.description);
	container.appendChild(info.hashes);
}

module.exports = {
	...header,
	exec: exec
};
