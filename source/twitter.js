// Todo
// Copy Description

/* eslint-disable no-undef */
if(new URL(window.location.href).host.includes('twitter.com')){
	twitter();
}

function twitter(){
	// eslint-disable-next-line new-cap
	GM.addStyle(`
	.Gallery-content{
		margin-top: 1em;
	}
	
	#hKmwl_hashes {
		position: fixed;
		top: 0px;
		z-index: 3000;
		display: flex;
		width: 100%;
	}
	
	#hKmwl_hashes > div { flex: auto; }
	#hKmwl_hashes a { color: white; }`);

	new MutationObserver(watch_mutations)
		.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true
		});

	let last_url = window.location.href;
	async function watch_mutations(mutations){
		const new_url = window.location.href;
		if(last_url == new_url){
			// Do nothing
			return;
		} else {
			last_url = new_url;
		}

		if((/\/photo\/\d$/u).test(new_url) == false){
			// Bad URL
			return;
		}
		// Relieve this instance so another can take over and
		// Add the proper dom elements
		await new Promise(resolve => setTimeout(resolve, 10));
		const id = parseInt((/\d$/u).exec(new_url), 10);
		const node = $qa('[alt="Image"]')[id - 1];
		const image_url = new URL(node.src);
		console.log(new_url, node, id, image_url);

		if($i('hKmwl_hashes')){
			$i('hKmwl_hashes').parentNode.removeChild($i('hKmwl_hashes'));
		}

		body_append('<div id="hKmwl_hashes"></div>');

		const hash_data = await Promise.all([
			add_md5(new_url_type(image_url.href, 'orig'), 'full'),
			add_md5(new_url_type(image_url.href, '4096x4096'), '4096x4096'),
			add_md5(new_url_type(image_url.href, 'large'), 'large'),
			add_md5(new_url_type(image_url.href, 'thumb'), 'thumb')
		]);

		hash_data.map(e => pretty_md5([e], ''))
			.forEach(e => $i('hKmwl_hashes').appendChild(e));

		const md5sums = $c('md5sum');
		for(const link of md5sums){
			await color_link(link);
		}
	}

	function new_url_type(url, new_type){
		const duplicate = new URL(url);
		duplicate.searchParams.set('name', new_type);
		return duplicate.href;
	}
}
