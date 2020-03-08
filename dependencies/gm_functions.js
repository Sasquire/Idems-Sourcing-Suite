/*
Originally I wanted to use https://github.com/greasemonkey/gm4-polyfill
to provide compatibility between the new async greasemonkey functions
and the old GM_* functions. But in order to keep this project purely
public domain, I could not use their MIT licensed code.

This is an attempt at providing the same functionality, while being
separate from that work. I understand how the old version functions
but this will be my own unique creation, free from their license.

Unlicense (2019)
*/

// old https://violentmonkey.github.io/api/gm/
// new https://wiki.greasespot.net/Greasemonkey_Manual%3aAPI

let gm_object = null;
try {
	if (window.GM) {
		// We are not in a sandbox
		gm_object = window.GM;
	} else {
		// We are in a sandbox
		// eslint-disable-next-line no-undef
		gm_object = GM;
	}
} catch (e) { // e should be a ReferenceError
	// We have no access to the GM object. Something is wrong
	// Attempt to recover and hope we can make something out of it
	gm_object = {};
}

const transitions = [
	// Values
	['GM_getValue', 'getValue'],
	['GM_setValue', 'setValue'],
	['GM_listValues', 'listValues'],
	['GM_deleteValue', 'deleteValue'],

	// GM_getResourceText and GM_getResourceURL
	// are not supported in this version because of the
	// incompatibility between the GM_* functions and GM 4

	// Other
	['GM_notification', 'notification'],
	['GM_openInTab', 'openInTab'],
	['GM_setClipboard', 'setClipboard'],
	['GM_xmlhttpRequest', 'xmlHttpRequest'],
	['GM_addStyle', 'addStyle']
];

transitions.forEach(([old_id, new_id]) => {
	// If this is ever true, we are not in a sandbox. I do not think
	// there is a userscript manager that uses both the old GM_* functions
	// and sandboxes the code. The day I am wrong is the day this breaks.
	const old_function = window[old_id];
	if (old_function === undefined) {
		return;
	}

	// Why would we overwrite the new function with a worse old one
	if (gm_object[new_id] !== undefined) {
		return;
	}

	// Again, there should not be a time when we get here that the
	gm_object[new_id] = (...args) => new Promise((resolve, reject) => {
		try {
			resolve(old_function(...args));
		} catch (error) {
			reject(error);
		}
	});
});

function add_style (css) {
	const node = document.createElement('style');
	node.type = 'text/css';
	node.textContent = css;

	const head = document.head;
	const body = document.body;
	head ? head.appendChild(node) : body.appendChild(node);
}

// If its not present, overwrite with our own function
if (gm_object.addStyle === undefined) {
	gm_object.addStyle = add_style;
}

module.exports = gm_object;
