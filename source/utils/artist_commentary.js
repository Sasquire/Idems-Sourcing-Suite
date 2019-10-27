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
	const description = node_to_dtext(description_node)
		.replace('[/section]', '(/section)');
	const lines = description.split('\n').length;
	const should_expand = lines <= 5 || description.length <= 500;

	const title = title_node !== null ? node_to_dtext(title_node) : 'Untitled';
	const fixed_title = title
		.replace(/\[/gu, '(')
		.replace(/\]/gu, ')');

	const artist = artist_node.textContent;
	const full_title = `${fixed_title} - by ${artist}`;

	const header = `[section${should_expand ? ',expanded' : ''}=${full_title}]`;
	return `${header}\n${description}\n[/section]`;
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
	commentary_button: commentary_button
};
