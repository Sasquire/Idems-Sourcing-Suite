module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _post_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _post_post_show_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _post_raw_post_create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _post_post_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);








class E621API {
	// Any of these can be anything, but errors will be thrown
	// when any requests are trying to be made.
	constructor (useragent, username, api_key) {
		this.useragent = useragent;
		this.username = username;
		this.api_key = api_key;
	}
}

E621API.prototype.raw_post_show = _post_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_show"];
E621API.prototype.raw_post_show_id = _post_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_show_id"];
E621API.prototype.raw_post_show_md5 = _post_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_show_md5"];

E621API.prototype.post_show_id = _post_post_show_js__WEBPACK_IMPORTED_MODULE_1__["post_show_id"];
E621API.prototype.post_show_md5 = _post_post_show_js__WEBPACK_IMPORTED_MODULE_1__["post_show_md5"];
E621API.prototype.post_show = _post_post_show_js__WEBPACK_IMPORTED_MODULE_1__["post_show"];

E621API.prototype.raw_post_create = _post_raw_post_create__WEBPACK_IMPORTED_MODULE_2__["raw_post_create"];

E621API.prototype.post_create = _post_post_create__WEBPACK_IMPORTED_MODULE_3__["post_create"];

/* harmony default export */ __webpack_exports__["default"] = (E621API);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_show", function() { return raw_post_show; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_show_id", function() { return raw_post_show_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_show_md5", function() { return raw_post_show_md5; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



async function raw_post_show (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].bind(this)({
		method: 'GET',
		path: '/post/show',
		response: 'JSON',

		format: 'URL',
		data: make_data(settings),
		authenticate: false
	}).catch(handle_post_show_error);
}

async function raw_post_show_id (post_id) {
	return raw_post_show.bind(this)({
		post_id: post_id
	});
}

async function raw_post_show_md5 (post_md5) {
	return raw_post_show.bind(this)({
		md5: post_md5
	});
}

function make_data (settings) {
	if (settings.md5) {
		return {
			md5: settings.md5
		};
	} else {
		return {
			id: settings.post_id
		};
	}
}

function validate_settings (settings) {
	const md5_exists = settings.md5 !== undefined;
	const post_id_exists = settings.post_id !== undefined;

	if (md5_exists && post_id_exists) {
		throw new Error('post_id and md5 can not both exist');
	} else if (md5_exists === false && post_id_exists === false) {
		throw new Error('post_id or md5 must exist');
	}

	if (md5_exists) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_md5"])(settings.md5);
	}

	if (post_id_exists) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_post_id"])(settings.post_id);
	}
}

function handle_post_show_error (error) {
	// Todo
	throw error;
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


/* Input to this method is structured like this
{
	method: 'POST' | 'GET' // Defines how the request should be made
	path: <string> // The path of the URL that is being accessed
	response: 'JSON' | 'XML' | 'HTML' // Defines the response type

	format: 'URL' | 'FORM' | undefined // Defines how the data is passed
	data: <object> | undefined // Data being passed in the request
}

*/
async function download (settings) {
	_validate_settings_js__WEBPACK_IMPORTED_MODULE_0__["default"].bind(this)(settings);
	const request_options = build_request_options.bind(this)(settings);

	return new Promise((resolve, reject) => {
		const on_load = (e) => {
			if (e.status === 200) {
				resolve(e.response); // This will likely cause errors later
			} else {
				// eslint-disable-next-line prefer-promise-reject-errors
				reject({
					response: {
						status: e.status
					},
					data: e
				});
			}
		};

		request_options.onload = on_load;
		request_options.onerror = on_load;

		// eslint-disable-next-line no-undef
		GM.xmlHttpRequest(request_options);
	});
}

function build_request_options (settings) {
	const url = new URL('https://e621.net/');
	url.pathname = settings.path + '.' + settings.response.toLowerCase();

	if (settings.format === 'URL') {
		Object.entries(settings.data).forEach(([key, value]) => {
			url.searchParams.set(key, value);
		});

		if (settings.authenticate) {
			url.searchParams.set('login', this.username);
			url.searchParams.set('password_hash', this.api_key);
		}
	}

	const request_options = {
		url: url.href,
		method: settings.method,
		responseType: settings.response === 'JSON' ? 'json' : 'text',
		headers: {
			'user-agent': this.useragent
		}
	};

	if (settings.format === 'FORM') {
		const form = new FormData();
		Object.entries(settings.data).forEach(([key, value]) => {
			if (value.constructor === ArrayBuffer) {
				form.append(key, new Blob([value]));
			} else {
				form.append(key, value);
			}
		});

		if (settings.authenticate) {
			form.append('login', this.username);
			form.append('password_hash', this.api_key);
		}

		request_options.data = form;
	}

	return request_options;
}

/* harmony default export */ __webpack_exports__["default"] = (download);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Validates the custom settings object for making requests.
// This object will have the same properties no matter the
// platform it is run on, streamlining the development of
// new methods to interface with the e621 api.

// The E621API class's context must be bound when calling this
// function so that it may access the useragent, username, and
// api_key.

function validate_settings (settings) {
	if (['POST', 'GET'].includes(settings.method) === false) {
		throw new Error('method must be POST or GET');
	}

	if (typeof settings.path !== 'string') {
		throw new Error('path must be a string');
	}

	if (['JSON', 'XML', 'HTML'].includes(settings.response) === false) {
		throw new Error('response must be JSON or XML or HTML');
	}

	if (['URL', 'FORM', undefined].includes(settings.format) === false) {
		throw new Error('format must be URL or FORM or undefined');
	}

	if (['object', 'undefined'].includes(typeof settings.data) === false) {
		throw new Error('data must be an object or undefined');
	}

	if (typeof this.useragent !== 'string') {
		throw new Error('useragent must be a string');
	}

	if (settings.authenticate === true) {
		// If authenticating, then both username and api_key must be present
		if (typeof this.username !== 'string') {
			throw new Error('username must be a string');
		} else if (typeof this.api_key !== 'string') {
			throw new Error('api_key must be a string');
		}

		if (settings.data === undefined) {
			throw new Error('data can not be undefined if authenticating');
		}

		if (settings.format === undefined) {
			throw new Error('format can not be undefined if authenticating');
		}
	}
}

/* harmony default export */ __webpack_exports__["default"] = (validate_settings);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_md5", function() { return validate_md5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_post_id", function() { return validate_post_id; });
function validate_md5 (md5) {
	if (typeof md5 !== 'string') {
		throw new Error('md5 must be of type string');
	}

	if (md5.length !== 32) {
		throw new Error('md5 must be of length 32');
	}

	const contains_non_hex = /[^0-9a-fA-F]/g;
	if (contains_non_hex.test(md5)) {
		throw new Error('md5 contains non-hexadecimal character');
	}
}

function validate_post_id (post_id) {
	if (typeof post_id !== 'number') {
		throw new Error('post_id must be a number');
	}

	if (Number.isInteger(post_id) === false) {
		throw new Error('post_id must be an integer');
	}

	if (post_id < 0) {
		throw new Error('post_id must be greater than zero');
	}
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_show_id", function() { return post_show_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_show_md5", function() { return post_show_md5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_show", function() { return post_show_determine; });
/* harmony import */ var _raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _sentinel_values_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);



async function post_show (func, post_id) {
	try {
		const data = await func(post_id);
		return transform_post(data);
	} catch (e) {
		// Do better error handling for other cases
		const has_code = e && e.response && e.response.status;
		const status_code = has_code ? e.response.status : null;
		if (status_code === 404) {
			return _sentinel_values_js__WEBPACK_IMPORTED_MODULE_1__["destroyed_post"];
		} else {
			throw e;
		}
	}
}

async function post_show_id (post_id) {
	return post_show(_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_show_id"].bind(this), post_id);
}

async function post_show_md5 (post_md5) {
	return post_show(_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_show_md5"].bind(this), post_md5);
}

async function post_show_determine (id_md5) {
	if (typeof id_md5 === 'string' && id_md5.length === 32) {
		return post_show(_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_show_md5"].bind(this), id_md5);
	} else {
		const post_id = Number(id_md5);
		return post_show(_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_show_id"].bind(this), post_id);
	}
}

function transform_post (raw_data) {
	return {
		post_id: raw_data.id,
		instance_id: raw_data.change,

		// Partial user
		creator: extract_user(raw_data),
		created_at: fix_date(raw_data.created_at),

		// Reason the post was flagged. Is undefined if the post
		// has never been flagged, otherwise it is a string.
		flag_reason: replace(raw_data.delreason, ''),
		status: raw_data.status,

		tags: replace(raw_data.tags, '')
			.split(' '),
		sources: replace(raw_data.sources, []),
		description: replace(raw_data.description, ''),
		rating: extract_rating(raw_data),

		favorites: replace(raw_data.fav_count, 0),
		score: replace(raw_data.score, 0),

		// Find a better place for these
		has_notes: !!raw_data.has_notes,
		has_comments: !!raw_data.has_comments,

		parent: raw_data.parent_id,
		children: replace(raw_data.children, '')
			.split(',')
			.filter(e => e.length > 0)
			.map(e => parseInt(e, 10)),

		file: extract_file(raw_data),
		image: extract_image(raw_data, 'full'),
		sample: extract_image(raw_data, 'sample'),
		preview: extract_image(raw_data, 'preview')
	};
}

function extract_rating (raw_data) {
	switch (raw_data.rating) {
		case 'e': return 'explicit';
		case 'q': return 'questionable';
		case 's': return 'safe';

		// Default case does not happen
		default: return 'unknown';
	}
}

function extract_file (raw_data) {
	if (raw_data.status === 'deleted') {
		return _sentinel_values_js__WEBPACK_IMPORTED_MODULE_1__["deleted_file"];
	}

	return {
		md5: raw_data.md5,
		size: raw_data.file_size,
		type: raw_data.file_ext
	};
}

// Todo, make this more functional
function extract_image (raw_data, type) {
	if (raw_data.status === 'deleted') {
		return _sentinel_values_js__WEBPACK_IMPORTED_MODULE_1__["deleted_image"];
	}

	if (type === 'full') {
		type = '';
	} else {
		type += '_';
	}

	return {
		url: raw_data[`${type || 'file_'}url`],
		width: raw_data[`${type}width`],
		height: raw_data[`${type}height`]
	};
}

function extract_user (raw_data) {
	if (raw_data.creator_id === null) {
		return _sentinel_values_js__WEBPACK_IMPORTED_MODULE_1__["anonymous_user"];
	} else {
		return {
			name: raw_data.author,
			id: raw_data.creator_id
		};
	}
}

// Takes in a date object as returned by e621
// and converts to a proper javascript date
function fix_date (created_at) {
	const seconds = created_at.s * 1000;
	const nano_seconds = created_at.n / 1000000000;
	return new Date(seconds + nano_seconds);
}

function replace (value, default_value) {
	return (value === undefined || value === null) ? default_value : value;
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleted_image", function() { return deleted_image; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleted_file", function() { return deleted_file; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anonymous_user", function() { return anonymous_user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroyed_post", function() { return destroyed_post; });
const deleted_file = {
	md5: '4c9de9799beb45b0cae52cac37445098',
	size: 13582,
	type: 'png'
};

const deleted_image = {
	url: 'https://e621.net/images/deleted-preview.png',
	width: 150,
	height: 150
};

const anonymous_user = {
	name: 'The dog in your guitar',
	id: 1
};

const destroyed_post = {
	post_id: -1,
	instance_id: -1,

	creator: anonymous_user,
	created_at: new Date(0),

	flag_reason: '',
	status: 'destroyed',

	tags: [],
	sources: [],
	description: '',
	rating: 'explicit',

	favorites: 0,
	score: 0,

	// Find a better place for these
	has_notes: false,
	has_comments: false,

	parent: null,
	children: [],

	file: deleted_file,
	image: deleted_image,
	sample: deleted_image,
	preview: deleted_image
};




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_create", function() { return raw_post_create; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



async function raw_post_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].bind(this)({
		method: 'POST',
		path: '/post/create',
		response: 'JSON',

		format: 'FORM',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_post_show_error);
}

function make_data (settings) {
	const new_settings = {
		'post[tags]': settings['post[tags]'],
		'post[rating]': settings['post[rating]'],
		'post[source]': settings['post[source]']
	};

	if (settings['post[file]'] !== undefined) {
		new_settings['post[file]'] = settings['post[file]'];
	} else {
		new_settings['post[upload_url]'] = settings['post[upload_url]'];
	}

	if (settings['post[description]'] !== null) {
		new_settings['post[description]'] = settings['post[description]'];
	}

	if (settings['post[parent_id]'] !== null) {
		new_settings['post[parent_id]'] = settings['post[parent_id]'];
	}

	return new_settings;
}

function validate_settings (settings) {
	if (settings['post[tags]'] === undefined) {
		throw new Error('post[tags] must be present');
	} else if (typeof settings['post[tags]'] !== 'string') {
		throw new Error('post[tags] must be a list of space delimited tags');
	}

	if (settings['post[file]'] !== undefined && settings['post[upload_url]'] !== undefined) {
		throw new Error('Both post[file] and post[upload_url] can not be defined');
	} else if (settings['post[file]'] === undefined && settings['post[upload_url]'] === undefined) {
		throw new Error('Either post[file] or post[upload_url] must be defined');
	}

	if (settings['post[file]']) {
		if (settings['post[file]'].constructor !== ArrayBuffer) {
			throw new Error('post[file] must be of type ArrayBuffer');
		}

		// Check for data in the array buffer?
	}

	if (settings['post[upload_url]']) {
		if (typeof settings['post[upload_url]'] !== 'string') {
			throw new Error('post[upload_url] must be of type string');
		}

		// Check it is an actual url?
	}

	if (['safe', 'questionable', 'explicit'].includes(settings['post[rating]']) === false) {
		throw new Error('post[rating] must be one of [\'safe\', \'questionable\', \'explicit\']');
	}

	if (settings['post[source]'] === undefined) {
		throw new Error('post[source] must be present');
	} else if (typeof settings['post[source]'] !== 'string') {
		throw new Error('post[source] must be undefined or of type string or null');
	}

	if (settings['post[description]'] === undefined) {
		throw new Error('post[description] must be present');
	} else if (settings['post[description]'] === null) {
		// It is fine if the description is null
	} else if (typeof settings['post[description]'] !== 'string') {
		throw new Error('post[description] must be of type string or null');
	}

	if (settings['post[parent_id]'] === undefined) {
		throw new Error('post[parent_id] must present');
	} else if (settings['post[parent_id]'] === null) {
		// It is fine if parent_id is null
	} else {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_post_id"])(settings['post[parent_id]']);
	}
}

function handle_post_show_error (error) {
	// Todo
	throw error;
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_create", function() { return post_create; });
/* harmony import */ var _raw_post_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


async function post_create (settings) {
	validate_settings(settings);
	settings = transform_settings(settings);
	return _raw_post_create_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_create"].bind(this)(settings)
		.catch(handle_error);
}

function transform_settings (old_settings) {
	const new_settings = {
		'post[rating]': old_settings.rating,
		'post[tags]': old_settings.tags ? old_settings.tags.join(' ') : '',
		'post[source]': old_settings.sources ? old_settings.sources.join('\n') : '',
		'post[description]': old_settings.description || null,
		'post[parent_id]': old_settings.parent_id || null
	};

	if (old_settings.url !== undefined) {
		new_settings['post[upload_url]'] = old_settings.url;
	} else {
		new_settings['post[file]'] = old_settings.file;
	}

	return new_settings;
}

function validate_settings (settings) {
	if (settings.tags) {
		if (Array.isArray(settings.tags === false)) {
			throw new Error('tags must be of type array');
		} else if (settings.tags.every(e => typeof e === 'string') === false) {
			throw new Error('Every element of tags must of of type string');
		}
	}

	if (settings.sources) {
		if (Array.isArray(settings.sources === false)) {
			throw new Error('sources must be of type array');
		} else if (settings.tags.every(e => typeof e === 'string') === false) {
			throw new Error('Every element of sources must of of type string');
		}
	}
}

function handle_error (error) {
	// Todo
	throw error;
}




/***/ })
/******/ ])["default"];