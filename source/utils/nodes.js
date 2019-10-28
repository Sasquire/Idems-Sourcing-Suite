const GM = require('./../../dependencies/gm_functions.js');

function clear_page () {
	clear_children(document.head);
	clear_children(document.body);
}

function clear_children (node) {
	while (node.children.length > 0) {
		node.removeChild(node.children[0]);
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

function string_to_node (string) {
	return new DOMParser().parseFromString(string, 'text/html').documentElement;
}

function remove_node (node) {
	if (node) {
		node.parentNode.removeChild(node);
	}
}

module.exports = {
	clear_children: clear_children,
	clear_page: clear_page,
	common_styles: apply_common_styles,
	string_to_node: string_to_node,
	remove_node: remove_node
};
