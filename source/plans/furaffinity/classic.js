const { simple_site } = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

async function exec () {
	const full_url = document.querySelector('a[href^="//d.facdn.net"]').href;

	const info = simple_site({
		artist: document.querySelector('.information a'),
		title: document.querySelector('.information h2'),
		description: document.querySelector('.alt1[width="70%"]'),
		full_url: full_url,
		hashes: [
			[full_to_thumb(full_url), 'thumb image']
		],
		css: `
			.container { display:flex; flex-direction: row; }
			.information { margin-right: auto; }
			#iss_container {
				display: grid;
				grid-template-columns: auto auto;
				grid-gap: 5px;

				font-weight: 700;
				font-size: 1.3em;
				padding: 0.3rem;
			}
			.iss_image_link { margin-right: 0.4rem; }
		`
	});

	const container = document.createElement('div');
	container.id = 'iss_container';
	document.querySelector('.container').appendChild(container);

	container.appendChild(info.upload);
	container.appendChild(info.hashes.childNodes.item(0));
	container.appendChild(info.description);
	// Appending the zeroth element a second time because the
	// first append shifts the array
	container.appendChild(info.hashes.childNodes.item(0));
}

module.exports = exec;
