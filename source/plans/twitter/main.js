const header = require('./header.js');

function find_site () {
	const status = /^\/[A-z0-9_]+\/status\/\d+$/;
	const photo = /^\/[A-z0-9_]+\/status\/\d+\/photo\/\d$/;

	clear_all_setup();

	const here = new URL(window.location.href);
	if (status.test(here.pathname)) {
		console.log('status');
	} else if (photo.test(here.pathname)) {
		console.log('photo');
	}
}

function clear_all_setup () {
	// Todo
}

function exec () {
	find_site();
	window.addEventListener('locationchange', find_site);
}

module.exports = {
	...header,
	exec: exec
};
