const {
	multi_input,
	remove_node,
	clear_page,
	add_css
} = require('./../../utils/utils.js');
const header = require('./header.js');

async function init () {
	clear_page();
	add_css(require('./main.css'));
	document.body.innerHTML = require('./main.html');
}

async function exec () {
	init();
}

module.exports = {
	exec: exec,
	...header
};
