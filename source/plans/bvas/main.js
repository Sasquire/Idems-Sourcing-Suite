const {
	multi_input,
	remove_node,
	clear_page,
	add_css,
	get_authenticated_e621
} = require('./../../utils/utils.js');
const header = require('./header.js');

async function init () {
	clear_page();
	add_css(require('./main.css'));
	document.body.innerHTML = require('./main.html');
	const e621 = await get_authenticated_e621();
}

async function exec () {
	init();
}

module.exports = {
	exec: exec,
	...header
};
