const E621API = require('./../../dependencies/e621_API.commonjs2.userscript.js');
const gm_values = require('./gm_values.js');

const user_agent_string = 'Idem\'s Sourcing Suite';

const e621 = new E621API(user_agent_string);

async function get_authenticated () {
	const username = await gm_values.get_value('username');
	const api_key = await gm_values.get_value('api_key');

	if (username === null || api_key === null) {
		throw new Error('username or api_key are not set');
	}

	return new E621API(user_agent_string, username, api_key);
}

module.exports = {
	e621: e621,
	get_authenticated_e621: get_authenticated
};
