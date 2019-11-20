const GM = require('./../../dependencies/gm_functions.js');
const defaults = require('./../default_settings.js');

async function get_value (key) {
	return GM.getValue(key).then(e => e === undefined ? defaults[key] : e);
}

module.exports = {
	get_value: get_value
};
