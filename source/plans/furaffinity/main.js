const run_classic = require('./classic.js');
const run_beta = require('./beta.js');
const header = require('./header.js');

async function exec () {
	const is_classic = document.body.dataset.staticPath === '/themes/classic';

	if (is_classic) {
		console.log(`ISS: ${header.title} classic version`);
		run_classic();
	} else {
		console.log(`ISS: ${header.title} beta version`);
		run_beta();
	}
}

module.exports = {
	...header,
	exec: exec
};
