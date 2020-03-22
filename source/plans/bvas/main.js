const {
	multi_input,
	remove_node,
	clear_page,
	add_css,
	get_authenticated_e621
} = require('./../../utils/utils.js');
const header = require('./header.js');

function log_message (text) {
	console.log(text);

	const messages = document.getElementById('messages');

	const span = document.createElement('span');
	span.textContent = text;
	messages.appendChild(span);
};

async function init () {
	clear_page();
	add_css(require('./main.css'));
	document.body.innerHTML = require('./main.html');
	const e621 = await get_authenticated_e621()
		.then(e => log_message('Credentials obtained. If entered incorrectly this page will experience issues later.'))
		.catch(e => log_message('Error with obtaining credentials. This page may not work as intended. Please enter credentials on the settings page.'));
}

async function exec () {
	init();
}

module.exports = {
	exec: exec,
	...header
};
