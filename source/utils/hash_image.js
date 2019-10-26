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

async function hash_url (url, headers = {}) {
	return download_image(url, headers).then(md5_blob);
}

async function md5_obj (url, type, headers = {}) {
	const hash = await hash_url(url, headers);
	check_hash(hash);

	return {
		url: url,
		type: type,
		hash: hash
	};
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
}

function replace_hash (old_hash) {
	const new_hash = document.createElement('span');
	new_hash.textContent = old_hash.textContent;
	Array.from(old_hash.classList)
		.forEach(e => new_hash.classList.add(e));
	old_hash.parentNode.replaceChild(new_hash, old_hash);
	return new_hash;
}

async function color_hash (node) {
	// Color the node depending on its upload status to e621
	return e621.post_show_md5(node.textContent).then(post => {
		if (post.status === 'destroyed') {
			node = replace_hash(node);
			node.classList.add('iss_hash_notfound'); // e621 red
		} else {
			node.classList.add('iss_hash_found');
			node.href = `https://e621.net/post/show/${post.post_id}`;
		}
	});
}

function md5_obj_to_node (object) {
	const image = document.createElement('a');
	image.href = object.url;
	image.textContent = object.type;
	image.classList.add('iss_image_link');

	const hash = document.createElement('a');
	hash.href = `https://e621.net/post/show?md5=${object.hash}`;
	hash.textContent = object.hash;
	hash.classList.add('iss_hash');

	const container = document.createElement('span');
	container.classList.add('iss_hash_span');
	container.appendChild(image);
	container.appendChild(hash);

	color_hash(hash);

	return container;
}

// Data looks like
// [[small_url, 'small image'],
//  [thumb_url, 'thumb image'],
//  [full_url,  'full image' ]]
async function data_to_nodes (data) {
	const quick_md5 = (url, type) => md5_obj(url, type);

	return Promise.all(data.map(e => quick_md5(...e)))
		.then(e => e.map(md5_obj_to_node));
}

module.exports = {
	download_image: download_image,
	md5_blob: md5_blob,
	hash_url: hash_url,
	md5_obj: md5_obj,
	color_hash: color_hash,
	md5_obj_to_node: md5_obj_to_node,
	data_to_nodes: data_to_nodes
};
