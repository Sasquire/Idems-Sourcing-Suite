const old = require('./old.js');
const eclipse = require('./eclipse.js');
const header = require('./header.js');

let last_url = { href: null };
let version = null;

async function find_site () {
	const here = new URL(window.location.href);

	if (here.href === last_url.href) {
		console.log('ISS: Duplicate URL detected');
		return; // Why are we loading twice on the same page?
	} else if (last_url !== null && here.pathname === last_url.pathname) {
		console.log('ISS: Comment URL change detected');
		return;
	} else {
		last_url = here;
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
