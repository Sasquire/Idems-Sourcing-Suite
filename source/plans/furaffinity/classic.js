const { simple_site, append } = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

const get_info = async (full_url) => simple_site({
	artist: document.querySelector('.information a'),
	title: document.querySelector('.information h2'),
	description: document.querySelector('.alt1[width="70%"]'),
	year: new Date(document.querySelector('.popup_date').title.includes(',')
		? document.querySelector('.popup_date').title
		: document.querySelector('.popup_date').innerText)
		.getFullYear().toString(),
	full_url: full_url,
	hashes: [
		[full_to_thumb(full_url), 'thumb image']
	],
	css: `
		.container { display:flex; flex-direction: row; }
		.information { margin-right: auto; }

		#iss_container {
			display: flex;
			flex-direction: column;
			font-weight: 700;
			font-size: 1.3em;
			padding: 0.3rem;
		}
		.iss_image_link { margin-right: 0.4rem; }
		#iss_container > :not(.iss_hash_span) > * {
			float: right;
		}
	`,
	hashes_as_array: true
});

async function exec () {
	const full_url = document.querySelector('a[href*="d.furaffinity.net"]').href;
	const info = await get_info(full_url);

	const container = document.createElement('div');
	container.id = 'iss_container';
	document.querySelector('.container').appendChild(container);

	append(container, info.upload);
	append(container, info.description);
	info.hashes.forEach(e => append(container, e));
}

module.exports = exec;
