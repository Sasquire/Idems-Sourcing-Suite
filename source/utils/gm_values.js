const GM = require('./../../dependencies/gm_functions.js');
const defaults = require('./../default_settings.js');

async function get_value (key) {
	return GM.getValue(key).then(e => e === undefined ? defaults[key] : e);
}

async function set_value (key, value) {
	return GM.setValue(key, value);
}

module.exports = {
	get_value: get_value,
	set_value: set_value
};
