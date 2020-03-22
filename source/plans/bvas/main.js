const {
	multi_input,
	clear_page,
	add_css,
	get_authenticated_e621,
	get_value
} = require('./../../utils/utils.js');
const header = require('./header.js');

let e621_api = null;

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
	e621_api = await get_authenticated_e621()
		.catch(e => log_message('Error with obtaining credentials. This page may not work as intended. Please enter credentials on the settings page.'));
	if (e621_api === undefined) {
		return;
	}

	log_message('Credentials obtained. If entered incorrectly this page will experience issues later.');

	bvas_listener();
	// e621.post_show_id(6268).then(console.log);
}

function bvas_listener () {
	let new_data = null;
	const new_input = multi_input(data => {
		log_message('Loading new data for replacement post');
		data.arrayBuffer().then(e => {
			log_message('Loaded new data for replacement post');
			new_data = e;
		});
	});
	document.getElementById('new_post').appendChild(new_input);

	document.getElementById('bvas_submit').addEventListener('click', e => {
		const old_id = parseInt(document.getElementById('old_post_id').value, 10);
		perform_bvas(old_id, new_data);
	});
}

async function perform_bvas (old_id, new_data) {
	const edit_description = await get_value('postbvas_edit_description');
	const post_comment = await get_value('postbvas_post_comment');
	const delete_post = await get_value('postbvas_delete_post');

	if (Number.isNaN(old_id) === true) {
		log_message('Error with old post id. Please fix the issue.');
		return null;
	} else if (new_data === null) {
		log_message('New post data was not set. Set data and try again.');
		return null;
	} else {
		log_message('Attempting to BVAS post.');
		await e621_api.post_bvas({
			post_id: old_id,
			replacement: new_data,
			comment: post_comment,
			description: edit_description,
			delete: delete_post
		}).catch(e => {
			log_message('Error with BVASing post. Please make a bug report to idem on e621.');
			log_message(e.toString());
			throw e;
		});
		log_message('Post successfully BVASed');
		return null;
	}
}

async function exec () {
	init();
}

module.exports = {
	exec: exec,
	...header
};
