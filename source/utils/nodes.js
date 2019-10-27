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
		.iss_hash_notfound { color: #333 !important; }
		.iss_hash_found { color: #4cf !important; }
		.iss_image_link { color: #fff !important; }
	`);
}

module.exports = {
	clear_children: clear_children,
	clear_page: clear_page,
	common_styles: apply_common_styles
};
