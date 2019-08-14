const e621_api = {};
e621_api.user_agent = 'Set this to a more meaningful useragent';
e621_api.credentials = async () => {
	// eslint-disable-next-line no-undef
	const username = await GM.getValue('username');
	// eslint-disable-next-line no-undef
	const api_key = await GM.getValue('api_key');

	if(!username || !api_key){
		throw new Error('Username or API key is not set');
	}

	return {
		username: username,
		api_key: api_key
	};
};

e621_api.download = async (url, options) => {
	options = options || {};
	options['User-Agent'] = options['User-Agent'] || e621_api.user_agent;
	options.method = options.method || 'GET';

	// eslint-disable-next-line no-undef
	return fetch(new Request(url), options)
		.then(async res => {
			if(res.status != 200){
				const text = await res.text();
				throw new Error(`Status: ${res.status}\n${text}`);
			} else {
				return res.text(); // This is a promise
			}
		})
		.then(e => {
			// Try to parse the json, If you can't just return the text;
			try {
				return JSON.parse(e);
			} catch(error) {
				return e;
			}
		});
};

/*
Good results look like this
{
	post_id: 1947854,
	location: "https://e621.net/post/show/1947854",
	success: true
}

Official Documentation
post[tags] A space delimited list of tags.
post[file] The file data encoded as a multipart form.
post[rating] The rating for the post. Can be: safe, questionable, or explicit.
post[upload_url] If this is a URL, e621 will download the file.
post[source] This will be used as the post's 'Source' text. Separate multiple URLs with %0A (url-encoded newline) to define multiple sources. Limit of five URLs
post[description] The description for the post.
post[is_rating_locked] Set to true to prevent others from changing the rating.
post[is_note_locked] Set to true to prevent others from adding notes.
post[parent_id] The ID of the parent post.

Input looks like
{
	tags: <A space delimited list of tags>,
	rating: <Can be: safe, questionable, or explicit>,
	url: <URL pointing to the image>,
	source: <A new line delimited list of sources>,
	description: <description for the post>,
	parent: <ID of the parent post>
}
*/

e621_api.post_create = async (obj) => {
	const url = 'https://e621.net/post/create.json';
	const { username, api_key } = await e621_api.credentials();

	if(!obj.url && !obj.file){
		throw new Error('Either url or file must be defined');
	} else if(obj.url && obj.file){
		throw new Error('Both url and file can not be defined');
	}

	// eslint-disable-next-line no-undef
	const form = new FormData();
	form.set('login', username);
	form.set('password_hash', api_key);
	form.set('post[tags]', obj.tags);
	form.set('post[rating]', obj.rating);
	form.set('post[source]', obj.source);
	form.set('post[description]', obj.description);

	if(obj.url){
		form.set('post[upload_url]', obj.url);
	} else {
		form.set('post[file]', obj.file);
	}

	const new_parent = Number(obj.parent);
	if(Number.isNaN(new_parent) == false && new_parent > 0){
		form.set('post[parent_id]', new_parent);
	}

	return e621_api.download(url, {
		method: 'POST',
		'User-Agent': e621_api.user_agent,
		body: form
	});
};

/*
Official documentation
id The ID number of the post to update.
post[tags] A space delimited list of tags.
post[old_tags] A space delimited list of tags. Should include the same tags submitted to post[tags] minus any intended changes. Does nothing without post[tags].
post[rating] The rating for the post. Can be: safe, questionable, or explicit.
post[source] This will be used as the post's 'Source' text. Separate multiple URLs with %0A (url-encoded newline) to define multiple sources. Limit of five URLs
post[description] This will be used as the post's 'Description' text.
post[is_rating_locked] Set to true to prevent others from changing the rating.
post[is_note_locked] Set to true to prevent others from adding notes.
post[parent_id] The ID of the parent post.
reason The reason for the submitted changes. Inline DText allowed.

If an option is not specified, it will not be changed
Input looks like
{
	// This is required
	post_id: <ID of the post to edit>,

	// If you want one of these, both must be specified
	tags: <A space delimited list of tags>,
	old_tags: <A space delimited list of old tags>

	rating: <Can be: safe, questionable, or explicit>,
	source: <A new line delimited list of sources>,
	description: <description for the post>,
	parent_id: <ID of the parent post>,
	reason: <dtext reason for editing the post>
}
*/
e621_api.post_update = async (obj) => {
	const url = 'https://e621.net/post/update.json';
	const { username, api_key } = await e621_api.credentials();

	if(!obj.post_id){
		throw new Error('post_id is not defined');
	}

	// eslint-disable-next-line no-undef
	const form = new FormData();
	form.set('login', username);
	form.set('password_hash', api_key);

	form.set('id', obj.post_id);

	if(obj.tags && obj.old_tags){
		form.set('post[tags]', obj.tags);
		form.set('post[old_tags]', obj.old_tags);
	}

	if(obj.rating){
		form.set('post[rating]', obj.rating);
	}

	if(obj.source){
		form.set('post[source]', obj.source);
	}

	if(obj.description){
		form.set('post[description]', obj.description);
	}

	if(obj.parent_id){
		form.set('post[parent_id]', obj.parent_id);
	}

	if(obj.reason){
		form.set('reason', obj.reason);
	}

	return e621_api.download(url, {
		method: 'POST',
		'User-Agent': e621_api.user_agent,
		body: form
	});
};

e621_api.$set_parent = async (post, parent) => {
	return e621_api.post_update({
		post_id: post,
		parent_id: parent
	});
};

e621_api.post_show = async (id) => {
	if(!id){
		throw new Error('post_id is not defined');
	}

	// eslint-disable-next-line no-undef
	const url = new URL('https://e621.net/post/show.json');
	url.searchParams.set('id', id);
	const data = await e621_api.download(url.href);

	// Very nice QOL, worthy of this sin.
	data.sources = data.sources || [];

	return data;
};

e621_api.post_show_md5 = async (md5) => {
	if(!md5){
		throw new Error('md5 is not defined');
	}

	// eslint-disable-next-line no-undef
	const url = new URL('https://e621.net/post/show.json');
	url.searchParams.set('md5', md5);
	const data = await e621_api.download(url.href);

	// Very nice QOL, worthy of this sin.
	data.sources = data.sources || [];

	return data;
};

e621_api.$post_edit = async (id, edit) => {
	const post_data = await e621_api.post_show(id);
	const changed_data = await edit(post_data);
	await e621_api.post_update(changed_data);
};

/*
Good results look like this

Official Documentation
<id> The ID number of the post to flag for deletion.
<inferior_parent> The ID number of the post which is superior to the post
	being flagged.For duplicates, this should be the ID of the post which is
	older. Use only when flag_option is set to inferior.
<flag_option> Indicates the reason the post should be deleted. Valid values are:
	uploader Uploader requests deletion
	inferior Repost/inferior version of existing post
	1 Artist is on avoid-posting list
	2 Post is paysite material
	3 Uncredited trace
	4 Real-life pornography
	5 File corrupted
	6 Image previously deleted

[8:20 PM] Kira: The flagging params MUST be in the POST body section.
*/

e621_api.post_flag = async (id, option, inferior_parent) => {
	if(!id && !option){
		throw new Error('post_id or flag_option is not defined');
	}

	if(option == 'inferior' && inferior_parent === undefined){
		// eslint-disable-next-line max-len
		throw new Error('if flag_option "inferior", inferior_parent must be supplied');
	}

	const url = 'https://e621.net/post/flag.json';
	const { username, api_key } = await e621_api.credentials();
	// eslint-disable-next-line no-undef
	const form = new FormData();
	form.set('login', username);
	form.set('password_hash', api_key);

	form.set('id', id);
	form.set('flag_option', option);
	if(option == 'inferior'){
		form.set('inferior_parent', inferior_parent);
	}

	return e621_api.download(url, {
		method: 'POST',
		'User-Agent': e621_api.user_agent,
		body: form
	});
};

/*
Official documentation
<id> The ID number of the post to delete.
<reason> The reason you are deleting the post.
<mode> Set to 1 if you are attempting to permanently destroy this post
	(will only work if called on an already deleted post).
*/
e621_api.post_destroy = async (id, reason, permanent) => {
	if(!id && !reason){
		throw new Error('post_id or del_reason is not defined');
	}

	const url = 'https://e621.net/post/destroy.json';
	const { username, api_key } = await e621_api.credentials();
	// eslint-disable-next-line no-undef
	const form = new FormData();
	form.set('login', username);
	form.set('password_hash', api_key);

	form.set('id', id);
	form.set('reason', reason);
	if(permanent){
		form.set('mode', '1');
	}

	return e621_api.download(url, {
		method: 'POST',
		'User-Agent': e621_api.user_agent,
		body: form
	});
};

e621_api.$inferior_flag = async (bad_id, better_id) => {
	return e621_api.post_flag(bad_id, 'inferior', better_id);
};

e621_api.$inferior_delete = async (bad_id, better_id) => {
	const reason = `Inferior version/duplicate of post #${better_id}`;
	return e621_api.post_destroy(bad_id, reason);
};


e621_api.comment_create = async (post_id, text) => {
	const url = 'https://e621.net/comment/create.json';
	const { username, api_key } = await e621_api.credentials();

	// eslint-disable-next-line no-undef
	const form = new FormData();
	form.set('login', username);
	form.set('password_hash', api_key);

	form.set('comment[post_id]', post_id);
	form.set('comment[body]', text);

	return e621_api.download(url, {
		method: 'POST',
		'User-Agent': e621_api.user_agent,
		body: form
	});
};

// This function should not be called, it is ""private""
// eslint-disable-next-line no-underscore-dangle
e621_api._note_update_create = async (obj) => {
	// All of these must be defined for a note to be created
	['post_id', 'x', 'y', 'width', 'height', 'text'].forEach(e => {
		if(obj[e] == undefined){
			throw new Error(`${e} is not defined`);
		}
	});

	const url = 'https://e621.net/note/update.json';
	const { username, api_key } = await e621_api.credentials();

	// eslint-disable-next-line no-undef
	const form = new FormData();
	form.set('login', username);
	form.set('password_hash', api_key);

	if(obj.note_id){
		form.set('id', obj.note_id);
	}

	form.set('note[post_id]', obj.post_id);
	form.set('note[x]', obj.x);
	form.set('note[y]', obj.y);
	form.set('note[width]', obj.width);
	form.set('note[height]', obj.height);
	form.set('note[body]', obj.text);

	if(obj.visible !== undefined){
		const is_visible = obj.visible ? 1 : 0;
		form.set('note[is_active]', is_visible);
	}

	return e621_api.download(url, {
		method: 'POST',
		'User-Agent': e621_api.user_agent,
		body: form
	});
};

e621_api.note_create = async (obj) => {
	if(obj.note_id){
		throw new Error('When creating notes, a note_id is invalid');
	}

	// eslint-disable-next-line no-underscore-dangle
	return e621_api._note_update_create(obj);
};

e621_api.note_update = async (obj) => {
	if(!obj.note_id){
		throw new Error('note_id is not defined');
	}

	// eslint-disable-next-line no-underscore-dangle
	return e621_api._note_update_create(obj);
};

e621_api.note_list = async (post_id) => {
	// eslint-disable-next-line no-undef
	const url = new URL('https://e621.net/note/index.json');
	url.searchParams.set('post_id', post_id);

	return e621_api.download(url.href, {
		method: 'POST',
		'User-Agent': e621_api.user_agent
	});
};

