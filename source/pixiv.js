// Todo
// Like furrynetwork, the page must be reloaded on
// the specific image for the extension to work.

/* eslint-disable no-undef */
if(new URL(window.location.href).host.includes('pixiv.net')){
	pixiv();
}

async function pixiv(){
	// eslint-disable-next-line new-cap
	GM.addStyle('#md5_hash { z-index: 1000; }');

	// Figure containing images
	await wait_for_query('aside > section > h2 > div > div');
	setup_description();

	const button = $qa('button').find(e => e.innerText.includes('See all'));
	if(button !== undefined){
		// https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
		await wait_for_query('#\\32 '); // Wait for images
	}
	add_md5s();


	async function add_md5s(){
		let i = 1;
		// eslint-disable-next-line max-len
		const images = $qa('main div[role="presentation"] > a');
		for(const image of images){
			console.log(`Trying image ${i++}`);

			const node = image.parentNode.parentNode;
			const full_url = image.href;
			const preview_url = full_url
				.replace('img-original', 'img-master')
				.replace(/.(png|jpg)$/u, '_master1200.jpg');

			const hash_data = await Promise.all([
				add_md5(full_url, 'full', {referer: window.location.href}),
				add_md5(preview_url, 'sample', {referer: window.location.href})
			]);
			const html = pretty_md5(hash_data);
			html.classList.add('md5_hash');
			node.appendChild(html);

			const md5sums = $c('md5sum', html);
			for(const link of md5sums){
				await color_link(link);
			}
		}
	}

	function setup_description(){
		const box = $q('figcaption');
		const title_elem = $q('h1', box);
		const title = title_elem ? title_elem.textContent : 'Untitled';
		const artist = $q('aside > section > h2 > div > div').textContent;
		description_button(
			$q('footer', box), // Where to place description
			$q(' div ~ div ~ div', box), // Description node
			`${title} - by ${artist}` // Title
		);
	}
}
