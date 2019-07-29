/* eslint-disable new-cap */
/* eslint-disable no-undef */

if(
	new URL(window.location.href).host.includes('e621.net') &&
	new URL(window.location.href).pathname.includes('/extensions/upload_bvas')
){
	const auth_token = $q('input[name="authenticity_token"]').value;
	clear_page();
	document.body.innerHTML = GM_getResourceText('bvas_html');
	GM_addStyle(GM_getResourceText('bvas_css'));
	bvas(auth_token);
}

async function bvas(auth_token){
	listener('load_post_btn', 'click', () => {
		const id = parseInt($i('e6_post_id').value, 10);
		download_post(id).then(fill_old_data);
	});

	listener('load_new_post', 'click', () => {
		$c('hidden').forEach(e => e.classList.remove('hidden'));
		load_new_image();
	});

	listener('upload_button', 'click', () => {
		console.log('yes');
	});

	function listener(id, type, func){
		$i(id).addEventListener(type, func);
	}

	const filter_tags = [
		"better_version_at_source",
		"smaller_version_at_source",
		"compression_artifacts",
		"cropped",
		"upscale"
	];

	async function bvas_whole(){
		// Upload
		// Comment
		// Set old's parent_id to this
		// Set old's children to this
		// Copy notes
		// Flag/delete old
	}

	function clear_old_data(){
		$qa('#old_stats td ~ td, #old_fields td ~ td')
			.filter(e => $q('#load_post_btn', e) === null)
			.forEach(e => (e.textContent = ''));
		$i('old_img').style.background = '';
	}

	function clear_new_data(){
		['new_size', 'new_file_ext', 'new_md5']
			.map(e => $i(e))
			.forEach(e => (e.textContent = ''));

		// eslint-disable-next-line max-len
		['new_parent_id', 'new_children', 'new_tags', 'new_sources', 'new_description']
			.map(e => $i(e))
			.forEach(e => (e.value = ''));

		$i('new_img').style.background = '';
		$c('hidable').forEach(e => e.classList.add('hidden'));
	}

	function fill_old_data(data){
		clear_old_data();
		clear_new_data();
		if(data.status == 'deleted'){
			return;
		}

		// eslint-disable-next-line max-len
		$i('old_img').style.background = `var(--grey-blue) url(${data.preview_url}) no-repeat center/150px`;

		Object.entries(data).forEach(([key, value]) => {
			const node = $i(`old_${key}`);
			if(node === null){ return; }

			if(Array.isArray(value)){
				node.innerText = value.join('\n');
			} else {
				node.innerText = value;
			}
		});
		$i('old_size').textContent = `${data.width} x ${data.height}`;

		$i('new_children').value = `${data.children},${data.id}`;
		$i('new_parent_id').value = data.parent_id;
		$q(`input[name="rating"][data-type="${data.rating}"]`).checked = true;
		$i('new_tags').value = data.tags
			.split(' ')
			.filter(e => filter_tags.includes(e) == false)
			.filter(e => e)
			.join(' ');
		$i('new_sources').value = data.sources.join('\n');
		// eslint-disable-next-line max-len
		$i('new_description').value = `Superior version of post #${data.id}\n${data.description}`;

		$i('load_new_post').parentNode.classList.remove('hidden');
	}

	async function load_new_image(){
		const new_img_url = $i('new_url').value;
		const img_blob = await download_image(new_img_url);
		const hash = await blob_to_md5(img_blob);
		const new_img = new Image();
		new_img.src = URL.createObjectURL(img_blob);

		// eslint-disable-next-line max-len
		$i('new_img').style.background = `var(--grey-blue) url(${URL.createObjectURL(img_blob)}) no-repeat center/150px`;
		$i('new_md5').textContent = hash;
		$i('new_size').textContent = `${new_img.width}x${new_img.height}`;
		$i('new_file_ext').textContent = new_img_url.split('.').reverse()[0];

		$i('new_sources').value = `${new_img_url}\n${$i('new_sources').value}`;
	}

	async function download_url(url, method = 'GET'){
		return fetch(new Request(url), {method: method})
			.then(res => res.text())
			.then(e => JSON.parse(e));
	}

	async function download_post(id){
		const url = new URL('https://e621.net/post/show.json');
		url.searchParams.set('id', id);
		const post_data = download_url(url.href);
		post_data.sources = post_data.sources || [];
		return post_data;
	}
}
