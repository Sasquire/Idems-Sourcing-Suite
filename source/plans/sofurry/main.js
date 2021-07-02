const { simple_site, append } = require('./../../utils/utils.js');
const header = require('./header.js');

// fix this
// get urls based on page url, format of. More than content and preview?
// https://www.sofurryfiles.com/std/content?page=1515217

function get_urls () {
	const here = new URL(window.location.href).pathname;
	const post_id_string = (/\/view\/(\d+)/).exec(here)[1];
	const post_id = parseInt(post_id_string, 10);

	return [
		[`https://www.sofurryfiles.com/std/content?page=${post_id}`, 'full image'],
		[`https://www.sofurryfiles.com/std/preview?page=${post_id}`, 'thumb image']
	];
}

const get_info = async () => simple_site({
	artist: {
		textContent: document.querySelector('.sf-username').textContent,
		href: document.getElementById('sf-userinfo-outer').href
	},
	title: document.getElementById('sfContentTitle'),
	description: document.getElementById('sfContentBody'),
	year: document.querySelectorAll('.section-content')[4].innerText.split('\n')[0].match(/\b\d{4}\b/),
	full_url: get_urls()[0][0],
	hashes: get_urls().slice(1),
	css: `
		#iss_container {
			display: flex;
			flex-direction: column;
			text-align: initial;
			margin-left: 35px;
		}
		.iss_image_link {
			color: black !important;
			margin-right: 0.75rem;
		}
		.iss_hash_span {
			white-space: nowrap;
			overflow: hidden;
		}
		#iss_artist_commentary {
			padding: 4px 6px 5px;
		}
		`,
	hashes_as_array: true
});

async function exec () {
	const info = await get_info();

	const container = document.createElement('div');
	container.id = 'iss_container';
	const tags = document.getElementById('submission_tags');

	tags.parentNode.insertBefore(container, tags);
	tags.parentNode.insertBefore(document.createElement('br'), tags);
	tags.parentNode.insertBefore(document.createElement('br'), tags);

	append(container, info.upload);
	append(container, info.description);
	info.hashes.forEach(e => append(container, e));
}

module.exports = {
	...header,
	exec: exec
};
