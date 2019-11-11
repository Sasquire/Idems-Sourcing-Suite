const headers = require('./header.js');
const utils = require('./../../../dependencies/extensions.js');

function exec () {
	// Do something with utils
	return utils;
}

module.exports = {
	exec: exec,
	...headers
};
