/* eslint-disable new-cap */
/* eslint-disable no-undef */

if(
	new URL(window.location.href).host.includes('e621.net') &&
	new URL(window.location.href).pathname.includes('/extensions/upload_bvas')
){
	clear_page();
	(async () => {
		document.body.innerHTML = await GM.getResourceText('bvas_html');
		const css = await GM.getResourceText('bvas_css');
		GM.addStyle(css);
		bvas();
	})();
}

async function bvas(){
	// Init
	(() => {
		listener('load_post_btn', 'click', () => {
			const id = parseInt($i('e6_post_id').value, 10);
			e621_api.post_show(id)
				.then(fill_old_data)
				.catch(e => {
					message(`Post likely destroyed - ${e}`);
				});
		});

		listener('load_new_post', 'click', () => {
			$c('hidden').forEach(e => e.classList.remove('hidden'));
			$i('upload_medium').innerText = 'URL';
			image_url_data().then(e => load_new_image(...e));
		});

		listener('load_new_file', 'change', () => {
			$c('hidden').forEach(e => e.classList.remove('hidden'));
			const img = $i('load_new_file').files[0];
			const ext = img.name.split('.').reverse()[0];
			$i('upload_medium').innerText = 'local file';
			load_new_image(undefined, img, ext);
		});

		listener('upload_button', 'click', bvas_whole);

		listener('username', 'input', () => {
			const username = $i('username').value;
			GM.setValue('username', username);
		});
		listener('api_key', 'input', () => {
			const api_key = $i('api_key').value;
			GM.setValue('api_key', api_key);
		});

		listener('action_delete', 'click', save_action);
		listener('action_flag', 'click', save_action);
		listener('action_nothing', 'click', save_action);
		function save_action(){
			// eslint-disable-next-line max-len
			const current_selection = $q('#action_selection > input:checked').value;
			GM.setValue('bvas_action', current_selection);
		}

		listener('notification_comment', 'click', () => {
			const checked = $i('notification_comment').checked;
			GM.setValue('bvas_comment', checked);
		});
		listener('notification_description', 'click', () => {
			const checked = $i('notification_description').checked;
			GM.setValue('bvas_description', checked);
		});
		listener('copy_notes', 'click', () => {
			const checked = $i('copy_notes').checked;
			GM.setValue('bvas_notes', checked);
		});

		load_settings();

		function listener(id, type, func){
			$i(id).addEventListener(type, func);
		}
	})();

	function message(html){
		$i('message').innerText = html;
		console.log(html);
	}

	const filter_tags = [
		"better_version_at_source",
		"smaller_version_at_source",
		"compression_artifacts",
		"cropped",
		"upscale"
	];

	async function load_settings(){
		const username = await GM.getValue('username');
		if(username){
			$i('username').value = username;
		}

		const api_key = await GM.getValue('api_key');
		if(api_key){
			$i('api_key').value = api_key;
		}

		const action = await GM.getValue('bvas_action');
		$qa('#action_selection > input').forEach(e => (e.checked = false));
		($i(`action_${action}`) || $i('action_flag')).checked = true;

		const comment = await GM.getValue('bvas_comment');
		if(comment == true){
			$i('notification_comment').checked = true;
		}

		const description = await GM.getValue('bvas_description');
		if(description == true){
			$i('notification_description').checked = true;
		}

		const notes = await GM.getValue('bvas_notes');
		if(notes == true){
			$i('copy_notes').checked = true;
		}
	}

	async function bvas_whole(){
		try {
			const old_id = $i('old_id').innerText;

			// Upload
			const new_post = await do_upload();
			const new_id = new_post.post_id;

			// Comment
			if($i('notification_comment').checked){
				message(`Posting comment to post ${new_id}`);
				const msg = `Superior version of post #${old_id}`;
				const result = await e621_api.comment_create(new_id, msg);
				message(`Comment posted ${JSON.stringify(result)}`);
			}

			// Changing the children's parent to this
			await set_children_parents(new_id);

			// Copy notes
			const had_notes = $i('old_has_notes').innerText == 'true';
			const do_notes = $i('copy_notes').checked;
			if(had_notes && do_notes){
				message('Transferring notes');
				await transfer_notes(old_id, new_id);
				message('Done transferring notes');
			}

			// Flag/delete old
			const post_action = $q('input[name=action]:checked').value;
			if(post_action == 'delete'){
				message(`Deleting ${old_id} as inferior to ${new_id}`);
				const res = await e621_api.$inferior_delete(old_id, new_id);
				message(`Done deleting ${old_id} - ${JSON.stringify(res)}`);
			} else if(post_action == 'flag'){
				message(`Flagging ${old_id} as inferior to ${new_id}`);
				const res = await e621_api.$inferior_flag(old_id, new_id);
				message(`Done flagging ${old_id} - ${JSON.stringify(res)}`);
			} else {
				message('Not flagging or deleting');
				// Supposed to do nothing
			}

			$i('message').innerHTML = 'Post uploaded successfully #';
			$i('message').innerHTML += `<a href="https://e621.net/post/show/${new_id}">${new_id}</a>`;
		} catch(e) {
			console.log(e);
			const msg = 'Something went wrong send a message to idem on e621';
			$i('message').innerText += `\n${msg}\n${e}`;
		}

		async function do_upload(){
			message('Starting to upload new post');
			const options = {
				tags: $i('new_tags').value,
				rating: $q('input[name=rating]:checked').value,
				source: $i('new_sources').value,
				description: $i('new_description').value,
				parent: $i('new_parent_id').value
			};

			if($i('upload_medium').innerText == 'URL'){
				options.url = $i('new_url').value;
			} else if($i('upload_medium').innerText == 'local file'){
				options.file = $i('load_new_file').files[0];
			} else {
				throw new Error('Couldn\'t find url or local file');
			}

			const result = await e621_api.post_create(options);

			const post_info = `${result.post_id}\n${JSON.stringify(result)}`;
			message(`Post uploaded at ${post_info}`);

			return result;
		}

		async function set_children_parents(new_id){
			const children = $i('new_children').value
				.split(/[^\d]/u)
				.filter(e => e);

			for(const child_id of children){
				message(`Setting parent of ${child_id} to ${new_id}`);
				await e621_api.$set_parent(child_id, new_id);
				message(`Done setting parent of ${child_id} to ${new_id}`);
			}
		}

		async function transfer_notes(old_id, new_id){
			const sizes = (id) => $i(id).innerText
				.split('x')
				.map(e => parseInt(e, 10));
			const [new_width, new_height] = sizes('new_size');
			const [old_width, old_height] = sizes('old_size');
			const width_scale = new_width / old_width;
			const height_scale = new_height / old_height;

			const old_notes = await e621_api.note_list(old_id);
			const fixed_notes = old_notes.map(e => ({
				post_id: new_id,
				text: e.body,
				x: Math.floor(e.x * width_scale),
				y: Math.floor(e.y * height_scale),
				width: Math.floor(e.width * width_scale),
				height: Math.floor(e.height * height_scale),
				visible: e.is_active
			}));

			let i = 1;
			for(const note of fixed_notes){
				message(`Transferring note ${i} of ${fixed_notes.length}`);
				await e621_api.note_create(note);
				message(`Done transferring note ${i}`);
				i += 1;
			}
		}
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
		$i('load_new_file').value = '';
		$c('hidable').forEach(e => e.classList.add('hidden'));
	}

	function fill_old_data(data){
		message('Filling data for post');
		clear_old_data();
		clear_new_data();
		if(data.status == 'deleted'){
			message('Post was deleted. Will not continue');
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
		$i('old_size').textContent = `${data.width}x${data.height}`;

		$i('new_children').value = `${data.children},${data.id}`;
		$i('new_parent_id').value = data.parent_id;
		$q(`input[name="rating"][data-type="${data.rating}"]`).checked = true;
		$i('new_tags').value = data.tags
			.split(' ')
			.filter(e => filter_tags.includes(e) == false)
			.filter(e => e)
			.join(' ');
		$i('new_sources').value = data.sources.map(safety_link).join('\n');

		const edit = $i('notification_description').checked;
		const text = edit ? `Superior version of post #${data.id}\n\n` : '';
		$i('new_description').value = `${text}${data.description}`;

		$i('load_new_post').parentNode.classList.remove('hidden');
		$i('load_new_file').parentNode.classList.remove('hidden');
		message('Post loaded');
	}

	async function load_new_image(url, blob, file_ext){
		message('Loading new image');
		const hash = await blob_to_md5(blob);
		const img = await wait_for_image(blob);

		// eslint-disable-next-line max-len
		$i('new_img').style.background = `var(--grey-blue) url(${URL.createObjectURL(blob)}) no-repeat center/150px`;
		$i('new_md5').textContent = hash;
		$i('new_size').textContent = `${img.width}x${img.height}`;
		$i('new_file_ext').textContent = file_ext;

		if(url !== undefined){
			// eslint-disable-next-line max-len
			$i('new_sources').value = `${safety_link(url)}\n${$i('new_sources').value}`;
		}

		await e621_api.post_show_md5(hash)
			.then(() => {
				const md5 = $i('new_md5').textContent;
				const link = `https://e621.net/post/show?md5=${md5}`;
				$i('new_md5').innerHTML = `<a href="${link}">${md5}</a>`;
			})
			.catch(() => true);

		message('New image loaded');
	}

	async function image_url_data(){
		message('Getting image data from URL');
		const new_img_url = $i('new_url').value;
		const img_blob = await download_image(new_img_url);
		const file_ext = new_img_url.split('.').reverse()[0];
		message('Got image data from URL');
		return [new_img_url, img_blob, file_ext];
	}

	async function wait_for_image(img_blob){
		return new Promise(resolve => {
			const new_img = new Image();
			new_img.onload = () => resolve(new_img);
			new_img.src = URL.createObjectURL(img_blob);
		});
	}
}
