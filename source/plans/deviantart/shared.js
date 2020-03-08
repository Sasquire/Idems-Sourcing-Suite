const { commentary_button, upload_button } = require('./../../utils/utils.js');

function create_description_button (info) {
	return commentary_button(info.description);
}

function create_upload_button (info) {
	const best_url = info.sources[0][0];
	const is_from_da = new URL(best_url).hostname === 'www.deviantart.com';

	const button = upload_button(
		is_from_da ? best_url : `Manual upload is required ${best_url}`,
		[window.location.href],
		info.description
	);

	const container = document.createElement('span');
	container.appendChild(button);

	return container;
}

module.exports = {
	description: create_description_button,
	upload: create_upload_button
};
