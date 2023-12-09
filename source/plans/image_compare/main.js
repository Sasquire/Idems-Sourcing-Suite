const {
	multi_input,
	remove_node,
	clear_page,
	add_css
} = require('./../../utils/utils.js');
const { addElement } = require('././../../../dependencies/gm_functions.js');
const compare_nodes = require('./compare_canvas.js');

function exec () {
	clear_page();
	add_css(require('./main.css'));
	document.body.innerHTML = require('./main.html');
	add_input_canvases();
	add_button_listener();
}

function add_button_listener () {
	const button = document.getElementById('compare_button');
	button.addEventListener('click', () => {
		compare_nodes({
			canvas1: document.getElementById('c1'),
			canvas2: document.getElementById('c2'),
			leave_early: document.getElementById('leave_early').checked,
			algorithm: document.getElementById('algorithm_select').value
		}).then(result => {
			const output_canvas = document.getElementById('o1');

			log_message(result.message);
			output_canvas.width = result.width;
			output_canvas.height = result.height;
			output_canvas.getContext('2d').putImageData(result.data, 0, 0);
		}).catch(message => {
			log_message(message);
		});
	});
}

function add_input_canvases () {
	const input = document.getElementById('input');
	const c1 = get_element(1);
	const c2 = get_element(2);

	// insert backwards so they appear forwards
	input.insertBefore(c2, input.firstChild);
	input.insertBefore(c1, input.firstChild);

	function get_element (type) {
		return multi_input((data) => {
			const canvas = document.getElementById(`c${type}`);
			paste_data(data, canvas).then(() => {
				log_message(`Loaded image #${type} with ${canvas.width}x${canvas.height}`);
			});
		});
	}
}

async function paste_data (data, canvas_node) {
	const ctx = canvas_node.getContext('2d');
	const img = await addElement('img', { src: URL.createObjectURL(data) });
	return new Promise((resolve, reject) => {
		const image_loaded = () => {
			ctx.canvas.width = img.width;
			ctx.canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			resolve(ctx);
		};

		// Loaded from cache
		if (img.complete) {
			image_loaded();
		} else {
			img.onload = image_loaded;
		}
	});
}

function log_message (text) {
	console.log(text);

	const messages = document.getElementById('messages');

	const span = document.createElement('span');
	span.textContent = text;
	messages.appendChild(span);

	if (messages.children.length > 7) {
		remove_node(messages.firstChild);
	}
};

module.exports = {
	...require('./header.js'),
	exec: exec
};
