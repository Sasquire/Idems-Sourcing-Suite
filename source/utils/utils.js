const { arrive, leave } = require('./nodes.js');
const GM = require('./../../dependencies/gm_functions.js');

HTMLElement.prototype.arrive = arrive;
HTMLElement.prototype.leave = leave;

module.exports = {
	...require('./artist_commentary.js'),
	...require('./e621_api.js'),
	...require('./hash_image.js'),
	...require('./node_to_dtext.js'),
	...require('./nodes.js'),
	...require('./safe_link.js'),
	...require('./upload_url.js'),
	GM: GM
};
