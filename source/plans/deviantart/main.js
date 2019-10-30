const old = require('./old.js');
const eclipse = require('./eclipse.js');
const header = require('./header.js');

let last_url = null;
let version = null;

async function find_site () {
	const here = new URL(window.location.href);

	if (here.href === last_url) {
		console.log('ISS: Duplicate URL detected');
		return; // Why are we loading twice on the same page?
	} else {
		last_url = here.href;
	}

	const artwork_regex = /^\/[A-z0-9_-]+\/art\/.*$/;
	if (artwork_regex.test(here.pathname)) {
		console.log('ISS: Artwork URL detected');
		version.exec();
	}
}

async function exec () {
	const is_old = document.getElementById('oh-menu-eclipse-toggle');

	if (is_old) {
		console.log(`ISS: ${header.title} old version`);
		version = old;
	} else {
		console.log(`ISS: ${header.title} eclipse version`);
		version = eclipse;
	}

	version.init();
	find_site();
	window.addEventListener('locationchange', find_site);
}

module.exports = {
	...header,
	exec: exec
};
