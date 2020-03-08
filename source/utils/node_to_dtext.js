const { safe_link } = require('./safe_link.js');

function get_link (node) {
	const inner = inner_text(node);
	const link = safe_link(node.href);

	// if node is like <a href="https://google.com">Yahoo</a>
	if (inner && inner !== node.href) {
		return `"${inner}":${link}`;
	} else {
		return link;
	}
}

function inner_text (node) {
	if (node.hasChildNodes()) {
		return Array.from(node.childNodes)
			.map(html_to_dtext)
			.filter(e => e)
			.join(' ')
			.replace(/\n /ug, '\n');
	} else {
		return node.textContent.trim();
	}
}

function html_to_dtext (entry) {
	if (entry === null) {
		return '';
	} else if (typeof entry === 'string') {
		return entry;
	}

	switch (entry.nodeName) {
		case 'B':
		case 'STRONG': return `[b] ${inner_text(entry)} [/b]`;
		case 'EM':
		case 'I': return `[i] ${inner_text(entry)} [/i]`;
		case 'U': return `[u] ${inner_text(entry)} [/u]`;
		case 'O': return `[o] ${inner_text(entry)} [/o]`;
		case 'S': return `[s] ${inner_text(entry)} [/s]`;
		case 'SUP': return `[sup] ${inner_text(entry)} [/sup]`;
		case 'SUB': return `[sub] ${inner_text(entry)} [/sub]`;

		case 'A': return get_link(entry);

		case 'PRE': return `[code] ${inner_text(entry)} [/code]`;

		case 'H1': return `h1. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H2': return `h2. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H3': return `h3. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H4': return `h4. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H5': return `h5. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H6': return `h6. ${inner_text(entry).replace(/\n/gu, ' ')}`;

		case 'LI': return `* ${inner_text(entry)}`;

		case '#comment':
		case 'IMG': return ''; // Images get destroyed :(
		case 'BR': return '\n';
		case 'P': return `${inner_text(entry)}\n`;

		default: return inner_text(entry);
	}
}

module.exports = {
	node_to_dtext: html_to_dtext
};
