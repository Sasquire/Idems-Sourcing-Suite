// Todo
// Make this so you do not need to reload on each
// page and so that the text goes away when you
// move to a new page
// It works, but it isnt pretty

/* eslint-disable no-undef */
if(new URL(window.location.href).host.includes('furrynetwork.com')){
	furry_network();
}

async function furry_network(){
	// eslint-disable-next-line new-cap
	GM.addStyle(`
	#copy_description {
		color: black;
		background-color: #ccc;
		padding: 1px 6px;
		border: 1px solid black;
    	border-radius: 4px;
	}
	#hashes { font-size: 0.85rem; }
	`);

	await wait_for_query('.submission');

	const title = $q('.submission-description__title').textContent;
	const artist = $q('.submission-author__display-name').textContent;
	description_button(
		$q('.submission__description'), // Where to place description
		$q('.submission-description__description'), // Description node
		`${title} - by ${artist}` // Title
	);

	// This looks weird so that it can support getting the
	// MD5 of webms and non image posts
	const hash_data = await Promise.all((() => {
		const full_url = $q('.submission-actions > a.t--reset-link').href;

		if(new URL(window.location.href).pathname.includes('multimedia')){
			return [add_md5(full_url, 'full')];
		} else {
			const preview_src = $q('.image.submission-media__img img').src;
			return [
				add_md5(full_url, 'full'),
				add_md5(preview_src, 'sample')
			];
		}
	})());
	const html = pretty_md5(hash_data, '<br>', 'hashes');
	const tags = $q('.submission__description');
	tags.parentNode.insertBefore(html, tags.nextSibling);

	const md5sums = $c('md5sum');
	for(const link of md5sums){
		await color_link(link);
	}
}
