const MD5 = require('./../../dependencies/md5.js');
const GM = require('./../../dependencies/gm_functions.js');
const { e621 } = require('./e621_api.js');

async function download_image (url, headers = {}) {
	return new Promise((resolve, reject) => {
		GM.xmlHttpRequest({
			method: 'GET',
			url: url,
			headers: headers,
			responseType: 'blob',
			onload: e => (e.status === 200 ? resolve(e.response) : reject(e)),
			onerror: e => reject(e)
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

async function hash_url (url, headers = {}) {
	return download_image(url, headers).then(md5_blob);
}

function check_hash (hash) {
	const bad_hashes = [
		'd41d8cd98f00b204e9800998ecf8427e', // Empty
		'a6433af4191d95f6191c2b90fc9117af', // FA 404
		'9eef03f05be8bcd4f6affc9876247a3f', // Pixiv 404
		'00000000000000000000000000000000',
		'ffffffffffffffffffffffffffffffff'
	];

	if (bad_hashes.includes(hash)) {
		throw new Error('Hash included in list of known faulty hashes');
	}

	return hash;
}

async function lookup_hash (container_node) {
	const url = container_node.querySelector('.iss_image_link').href;
	const hash_node = container_node.getElementsByClassName('iss_hash')[0];

	hash_url(url).then(hash => {
		return check_hash(hash);
	}).then(hash => {
		hash_node.textContent = hash;
		hash_node.classList.add('iss_hash_checking');
		return e621.post_show_md5(hash);
	}).then(post => {
		hash_node.classList.remove('iss_hash_checking');

		if (post.status === 'destroyed') {
			hash_node.classList.add('iss_hash_notfound');
		} else {
			const new_hash = document.createElement('a');
			new_hash.classList.add('iss_hash_found');
			Array.from(hash_node.classList)
				.forEach(e => new_hash.classList.add(e));

			new_hash.href = `https://e621.net/post/show/${post.post_id}`;
			new_hash.textContent = post.file.md5;
			hash_node.parentNode.replaceChild(new_hash, hash_node);
		}
	}).catch(e => {
		hash_node.textContent = hash_lookup_error(e);
	});
}

function hash_lookup_error (error) {
	if (error.message === 'Hash included in list of known faulty hashes') {
		console.log([
			'The hash provided was in a list of known faulty hashes.',
			'This error is being thrown so that you do not mistake',
			'the hash as a valid one. Consider reporting this at',
			'https://github.com/Sasquire/Idems-Sourcing-Suite',
			'or',
			'https://e621.net/forum/show/270739'
		].join('\n'));
		return 'Error. Known faulty hash.';
	} else if (error.status !== undefined) {
		console.log([
			'When attempting to download',
			error.finalUrl,
			`An unexpected response code of ${error.status} was given.`,
			'For more info on the specific code, Look at',
			'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
			'If this result is persistent, consider reporting this at',
			'https://github.com/Sasquire/Idems-Sourcing-Suite',
			'or',
			'https://e621.net/forum/show/270739'
		].join('\n'));
		return 'Error. Unexpected response.';
	} else {
		console.log([
			'When attempting to check this hash an unexpected error',
			'from e621 was thrown. Please report this bug at',
			'https://github.com/Sasquire/Idems-Sourcing-Suite',
			'or',
			'https://e621.net/forum/show/270739',
			'Make sure to record the text directly following this message'
		].join('\n'));
		console.log(error);
		return 'Error. Unexpected e621 error';
	}
}

function object_to_node (url, type) {
	const image = document.createElement('a');
	image.href = url;
	image.textContent = type + '\u200b'; // zero width space
	image.classList.add('iss_image_link');

	const hash_node = document.createElement('span');
	hash_node.textContent = 'Downloading image please wait...';
	hash_node.classList.add('iss_hash');

	const container = document.createElement('span');
	container.classList.add('iss_hash_span');
	container.appendChild(image);
	container.appendChild(hash_node);

	lookup_hash(container);

	return container;
}

// Data looks like
// [[small_url, 'small image'],
//  [thumb_url, 'thumb image'],
//  [full_url,  'full image' ]]
function data_to_nodes (data) {
	return data.map(([url, type]) => object_to_node(url, type));
}

function data_to_span (data) {
	const hashes = data_to_nodes(data);

	const span = document.createElement('span');
	span.id = 'iss_hashes';
	hashes.forEach(e => span.appendChild(e));

	return span;
}

module.exports = {
	download_image: download_image,
	md5_blob: md5_blob,
	hash_url: hash_url,
	data_to_nodes: data_to_nodes,
	data_to_span: data_to_span
};
