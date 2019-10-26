function full_to_thumb (full_url) {
	const timestamp = full_url.match(/.*\/(\d+)\/\d+\..*?_.*\..*/u)[1];
	const post_id = new URL(window.location.href).pathname.split('/')[2];
	return `https://t.facdn.net/${post_id}@${400}-${timestamp}.jpg`;
}

module.exports = {
	full_to_thumb: full_to_thumb
};
