const GM = require('./../../dependencies/gm_functions.js');
const { download_image } = require('./hash_image.js');

function clear_page () {
	clear_children(document.head);
	clear_children(document.body);
}

function clear_children (node) {
	while (node.firstChild) {
		remove_node(node.firstChild);
	}
}

function remove_node (node) {
	if (node) {
		node.parentNode.removeChild(node);
	}
}

function apply_common_styles () {
	GM.addStyle(`
		span.iss_hash_checking { color: #830; }	
		span.iss_hash_notfound { color: #333; }
		a.iss_hash_found, a.iss_hash_found:visited { color: #4cf; }
		a.iss_image_link, a.iss_image_link:visited { color: #fff; }
		.iss_hash { font-family: monospace; }
	`);
}

function add_css (css) {
	GM.addStyle(css);
}

function string_to_node (string) {
	return new DOMParser().parseFromString(string, 'text/html').documentElement;
}

function multi_input (callback) {
	const container = document.createElement('span');

	const url_box = document.createElement('input');
	url_box.type = 'url';
	url_box.placeholder = 'Image URL or ...';
	container.appendChild(url_box);

	const file_box = document.createElement('input');
	file_box.type = 'file';
	container.appendChild(file_box);

	url_box.addEventListener('change', () => {
		file_box.value = '';
		download_image(url_box.value).then(callback);
	});

	file_box.addEventListener('change', () => {
		url_box.value = '';
		callback(file_box.files[0]);
	});

	return container;
}

module.exports = {
	clear_children: clear_children,
	clear_page: clear_page,
	remove_node: remove_node,
	common_styles: apply_common_styles,
	add_css: add_css,
	string_to_node: string_to_node,
	multi_input: multi_input
};
