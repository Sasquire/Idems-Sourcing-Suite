const { simple_site, append } = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

const get_info = async (full_url) => simple_site({
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
	`,
	hashes_as_array: true
});

async function exec () {
	// There seem to be two different display modes for the beta site
	// This code only works on the wide version because in the thin
	// view, the place where the container is placed disappears. This
	// seems like it is only done with css because the node will come
	// back if the window is stretched to fit again.

	// It appears that you can only be on the beta site while logged
	// in. This does not concern me about this node being hidden
	const full_url = document.querySelector('.download-logged-in').href;
	const info = await get_info(full_url);

	const container = document.createElement('div');
	container.id = 'iss_container';
	const more_from = document
		.querySelector('#columnpage .preview-gallery')
		.previousElementSibling;
	more_from.parentNode.insertBefore(container, more_from);

	const header = document.createElement('h2');
	header.innerText = 'idem\'s sourcing suite';
	container.appendChild(header);

	append(container, info.upload);
	append(container, info.description);
	info.hashes.forEach(e => append(container, e));
}

module.exports = exec;
