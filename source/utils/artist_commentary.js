const { node_to_dtext } = require('./node_to_dtext.js');

function set_clipboard (str) {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

function artist_commentary (artist_node, title_node, description_node) {
	const artist = artist_node.textContent;
	const artist_link = artist_node.href;
	const title = title_node !== null ? node_to_dtext(title_node) : 'Untitled';
	const description = node_to_dtext(description_node);
	return commentary_from_text(artist, artist_link, title, description);
}

function commentary_from_text (artist, artist_link, title, description) {
	description = description.replace('[/section]', '(/section)');
	const full_title = (() => {
		const fixed_title = title.replace(/\[/gu, '(').replace(/\]/gu, ')');
		if (artist === null) {
			return fixed_title;
		} else if (artist_link === null || artist_link === undefined) {
			return `${fixed_title} - by ${artist}`;
		} else {
			return `${fixed_title} - by "${artist}":${artist_link}`;
		}
	})();

	const header = (() => {
		const lines = description.split('\n').length;
		const should_expand = lines <= 5 || description.length <= 500;
		const expanded_text = should_expand ? ',expanded' : '';
		return `[section${expanded_text}=${full_title}]`;
	})();

	return `From source:\n${header}\n${description}\n[/section]`;
}

function commentary_button (description) {
	const button = document.createElement('button');
	button.textContent = 'Copy Description';
	button.id = 'iss_artist_commentary';
	// maybe deal with id's and classes?

	button.addEventListener('click', event => {
		event.preventDefault();
		set_clipboard(description);
	});

	return button;
}

module.exports = {
	set_clipboard: set_clipboard,
	artist_commentary: artist_commentary,
	commentary_button: commentary_button,
	commentary_from_text: commentary_from_text
};
