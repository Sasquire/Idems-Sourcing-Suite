// custom events for url change
require('./../dependencies/on_url_change.js');

// custom prototypes for waiting on new nodes
require('./../dependencies/arrive.js');

const plans = [
	require('./plans/furaffinity/main.js'),
	require('./plans/twitter/main.js'),
	require('./plans/deviantart/main.js'),
	require('./plans/weasyl/main.js'),
	require('./plans/image_compare/main.js')
];

const here = new URL(window.location.href);
const site = plans.find(e => e.test(here));
if (site !== undefined) {
	console.log(`idem's Sourcing Suite: Running ${site.title} v${site.version}`);
	site.exec();
}
