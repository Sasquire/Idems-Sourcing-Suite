const MD5 = require('./../../dependencies/md5.js');
const GM = require('./../../dependencies/gm_functions.js');

async function download_image (url) {
	return new Promise((resolve, reject) => {
		GM.xmlHttpRequest({
			method: 'GET',
			url: url,
			responseType: 'blob',
			onload: e => (e.status === 200 ? resolve(e.response) : reject(e))
		});
	});
}

async function md5_blob (blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener('loadend', (e) => {
			const md5 = MD5(e.currentTarget.result);
			resolve(md5);
		});

		reader.readAsArrayBuffer(blob);
	});
}

async function hash_url (url) {
	return download_image(url).then(md5_blob);
}

module.exports = {
	download_image: download_image,
	md5_blob: md5_blob,
	hash_url: hash_url
};
