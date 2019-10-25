function produce_link (source_url, sources, description = '', tags = []) {
	const url = new URL('https://e621.net/post/upload');
	url.searchParams.set('url', source_url);
	url.searchParams.set('source', sources.join('\n'));
	url.searchParams.set('description', description);
	url.searchParams.set('tags', tags.join(' '));
	return url.href;
}

function upload_button (source_url, sources, description, tags = []) {
	const link = document.createElement('a');
	link.textContent = 'Upload to e621';
	link.id = 'iss_upload_link';
	link.href = produce_link(source_url, sources, description, tags);
	link.target = '_blank';

	return link;
}

module.exports = {
	upload_url: produce_link,
	upload_button: upload_button
};
