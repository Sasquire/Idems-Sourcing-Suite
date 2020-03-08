const safe_domains = [
	'furaffinity.net',
	'facdn.net',
	'deviantart.com',
	'twitter.com',
	'inkbunny.net',
	'tumblr.com',
	'aryion.com',
	'furrynetwork.com',
	'weasyl.com',
	'pixiv.net',
	'youtube.com',
	'google.com',
	'patreon.com',
	'picarto.tv',
	'gumroad.com',
	'inkedfur.com',
	'ko-fi.com'
];

function safe_link (text) {
	let url = null;
	try {
		url = new URL(text);
	} catch (e) {
		return text; // Invalid URL
	}

	if (url.protocol === 'https:') {
		return text; // already good
	} else if (safe_domains.some(e => url.hostname.includes(e))) {
		url.protocol = 'https:';
		return url.href;
	} else {
		return text;
	}
};

module.exports = {
	safe_link: safe_link
};
