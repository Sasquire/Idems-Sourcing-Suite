const { simple_site } = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

const get_info = (full_url) => simple_site({
	artist: document.querySelector('.submission-artist-container > a ~ a'),
	title: document.querySelector('.submission-title > h2'),
	description: () => {
		// FA combines the title node and the description into one
		// This will create a duplicate node where the title is not
		// there. This will duplicate and remove that node.
		const description = document
			.querySelector('.submission-description-container')
			.cloneNode(true);
		const bad_title = description.querySelector('.submission-title');
		description.removeChild(bad_title);
		return description;
	},
	full_url: full_url,
	hashes: [
		[full_to_thumb(full_url), 'thumb image']
	],
	css: `
		#iss_container { 
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}
		#iss_container > * { white-space: nowrap; }
		.iss_hash { font-weight: 700; }
		.iss_image_link { margin-right: 0.4rem; }
	`
});

async function exec () {
	// It appears that you can only be on the beta site while logged
	// in. This does not concern me about this node being hidden
	const full_url = document.querySelector('.download-logged-in').href;
	const info = get_info(full_url);

	const container = document.createElement('div');
	container.id = 'iss_container';
	const more_from = document
		.querySelector('#columnpage .preview-gallery')
		.previousElementSibling;
	more_from.parentNode.insertBefore(container, more_from);

	container.appendChild(info.upload);
	container.appendChild(info.description);
	while (info.hashes.firstChild) {
		container.appendChild(info.hashes.firstChild);
	}
}

module.exports = exec;
