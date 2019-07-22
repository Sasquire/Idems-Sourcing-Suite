// Todo
// Copy Description

/* eslint-disable no-undef */
if(new URL(window.location.href).host.includes('twitter.com')){
	twitter();
}

function twitter(){
	// eslint-disable-next-line new-cap
	GM_addStyle(`
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
		.observe($q('.Gallery-media'), {
			childList: true,
			subtree: true
		});

	async function watch_mutations(mutations){
		const added = clean_mutations(mutations, 'added');
		const removed = clean_mutations(mutations, 'removed');

		// If an image was removed, remove the hashes
		if(removed.length > 0){
			$i('hKmwl_hashes').parentNode.removeChild($i('hKmwl_hashes'));
		}

		// If an image was added, add hashes
		if(added.length > 0){
			body_append('<div id="hKmwl_hashes"></div>');

			const sample = added[0].src;
			const hash_data = await Promise.all([
				add_md5(sample.replace(/:large$/u, ':orig'), 'full'),
				add_md5(sample, 'sample'),
				add_md5(sample.replace(/:large$/u, ''), 'thumb')
			]);
			hash_data.map(e => pretty_md5([e], ''))
				.forEach(e => $i('hKmwl_hashes').appendChild(e));
		}
	}

	function clean_mutations(mutations, added){
		return mutations
			.map(o => (added == 'added' ? o.addedNodes : o.removedNodes))
			.reduce((acc, e) => acc.concat(Array.from(e)), []);
	}
}
