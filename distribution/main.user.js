// ==UserScript==
// @name         Idem's Sourcing Suite
// @description  Adds a whole bunch of utilities, helpful for sourcing images
// @version      1.00026
// @author       Meras

// @namespace    https://github.com/Sasquire/
// @supportURL   https://github.com/Sasquire/Idems-Sourcing-Suite
// @updateURL    
// @downloadURL  
// @icon         

// @license      Unlicense

// @connect      e621.net

//               FurAffinity v1
// @match        *://*.furaffinity.net/view/*
// @match        *://*.furaffinity.net/full/*
// @connect      facdn.net

//               Twitter v1
// @match        *://*.twitter.com/*
// @connect      pbs.twimg.com

// @grant        GM.addStyle
// @grant        GM.xmlHttpRequest

// ==/UserScript==

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
// If changes have to be made to the GM object, this is where
// those changes should happen. Otherwise return that
// object as is

// eslint-disable-next-line no-undef
module.exports = GM;

},{}],3:[function(require,module,exports){
/*
Javascript MD5 library - version 0.4
Coded (2011) by Luigi Galli - LG@4e71.org - http://faultylabs.com
https://gist.github.com/ForbesLindesay/5562935
Thanks to: Roberto Viola
The below code is PUBLIC DOMAIN - NO WARRANTY!

The code has been modified from its original state to
better be used in this project. And with that comes from
one public domain license to another.

Unlicense (2019) <https://unlicense.org/>
*/

// convert number to (unsigned) 32 bit hex, zero filled string
function to_zero_filled_hex (n) {
	const t1 = (n >>> 0).toString(16);
	return '00000000'.substr(0, 8 - t1.length) + t1;
}

// convert a 64 bit unsigned number to array of bytes. Little endian
function int64_to_bytes (num) {
	const return_value = [];
	for (let i = 0; i < 8; i++) {
		return_value.push(num & 0xFF);
		num = num >>> 8;
	}
	return return_value;
}

//  32 bit left-rotation
function rol (num, places) {
	return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places));
}

// The 4 MD5 functions
function fF (b, c, d) {
	return (b & c) | (~b & d);
}

function fG (b, c, d) {
	return (d & b) | (~d & c);
}

function fH (b, c, d) {
	return b ^ c ^ d;
}

function fI (b, c, d) {
	return c ^ (b | ~d);
}

// pick 4 bytes at specified offset. Little-endian is assumed
function bytes_to_int32 (arr, off) {
	const first = arr[off + 3] << 24;
	const second = arr[off + 2] << 16;
	const third = arr[off + 1] << 8;
	const fourth = arr[off];
	return first | second | third | fourth;
}

// convert the 4 32-bit buffers to a 128 bit hex string. (Little-endian is assumed)
function int128le_to_hex (a, b, c, d) {
	let ra = '';
	let t = 0;
	let ta = 0;
	for (var i = 3; i >= 0; i--) {
		ta = arguments[i]; // a, b, c, d
		t = (ta & 0xFF);
		ta = ta >>> 8;
		t = t << 8;
		t = t | (ta & 0xFF);
		ta = ta >>> 8;
		t = t << 8;
		t = t | (ta & 0xFF);
		ta = ta >>> 8;
		t = t << 8;
		t = t | ta;
		ra = ra + to_zero_filled_hex(t);
	}

	return ra;
}

function _add (n1, n2) {
	return 0x0FFFFFFFF & (n1 + n2);
}

function do_64_runs (options) {
	let a = options.a;
	let b = options.b;
	let c = options.c;
	let d = options.d;
	const pointer = options.pointer;
	const data = options.data;

	function set_values (nf, sin32, dw32, b32) {
		const temp = d;
		d = c;
		c = b;
		// b = b + rol(a + (nf + (sin32 + dw32)), b32)
		// b = b + rol(inside, b32)
		const inside = _add(a, _add(nf, _add(sin32, dw32)));
		b = _add(b, rol(inside, b32));
		a = temp;
	}

	function do_run (f_func, binary_sine, offset, shift_amount) {
		set_values(
			f_func(b, c, d),
			binary_sine,
			bytes_to_int32(data, pointer + offset),
			shift_amount
		);
	}

	const $ = do_run;

	$(fF, 0xd76aa478, 0, 7);
	$(fF, 0xe8c7b756, 4, 12);
	$(fF, 0x242070db, 8, 17);
	$(fF, 0xc1bdceee, 12, 22);
	$(fF, 0xf57c0faf, 16, 7);
	$(fF, 0x4787c62a, 20, 12);
	$(fF, 0xa8304613, 24, 17);
	$(fF, 0xfd469501, 28, 22);
	$(fF, 0x698098d8, 32, 7);
	$(fF, 0x8b44f7af, 36, 12);
	$(fF, 0xffff5bb1, 40, 17);
	$(fF, 0x895cd7be, 44, 22);
	$(fF, 0x6b901122, 48, 7);
	$(fF, 0xfd987193, 52, 12);
	$(fF, 0xa679438e, 56, 17);
	$(fF, 0x49b40821, 60, 22);
	$(fG, 0xf61e2562, 4, 5);
	$(fG, 0xc040b340, 24, 9);
	$(fG, 0x265e5a51, 44, 14);
	$(fG, 0xe9b6c7aa, 0, 20);
	$(fG, 0xd62f105d, 20, 5);
	$(fG, 0x2441453, 40, 9);
	$(fG, 0xd8a1e681, 60, 14);
	$(fG, 0xe7d3fbc8, 16, 20);
	$(fG, 0x21e1cde6, 36, 5);
	$(fG, 0xc33707d6, 56, 9);
	$(fG, 0xf4d50d87, 12, 14);
	$(fG, 0x455a14ed, 32, 20);
	$(fG, 0xa9e3e905, 52, 5);
	$(fG, 0xfcefa3f8, 8, 9);
	$(fG, 0x676f02d9, 28, 14);
	$(fG, 0x8d2a4c8a, 48, 20);
	$(fH, 0xfffa3942, 20, 4);
	$(fH, 0x8771f681, 32, 11);
	$(fH, 0x6d9d6122, 44, 16);
	$(fH, 0xfde5380c, 56, 23);
	$(fH, 0xa4beea44, 4, 4);
	$(fH, 0x4bdecfa9, 16, 11);
	$(fH, 0xf6bb4b60, 28, 16);
	$(fH, 0xbebfbc70, 40, 23);
	$(fH, 0x289b7ec6, 52, 4);
	$(fH, 0xeaa127fa, 0, 11);
	$(fH, 0xd4ef3085, 12, 16);
	$(fH, 0x4881d05, 24, 23);
	$(fH, 0xd9d4d039, 36, 4);
	$(fH, 0xe6db99e5, 48, 11);
	$(fH, 0x1fa27cf8, 60, 16);
	$(fH, 0xc4ac5665, 8, 23);
	$(fI, 0xf4292244, 0, 6);
	$(fI, 0x432aff97, 28, 10);
	$(fI, 0xab9423a7, 56, 15);
	$(fI, 0xfc93a039, 20, 21);
	$(fI, 0x655b59c3, 48, 6);
	$(fI, 0x8f0ccc92, 12, 10);
	$(fI, 0xffeff47d, 40, 15);
	$(fI, 0x85845dd1, 4, 21);
	$(fI, 0x6fa87e4f, 32, 6);
	$(fI, 0xfe2ce6e0, 60, 10);
	$(fI, 0xa3014314, 24, 15);
	$(fI, 0x4e0811a1, 52, 21);
	$(fI, 0xf7537e82, 16, 6);
	$(fI, 0xbd3af235, 44, 10);
	$(fI, 0x2ad7d2bb, 8, 15);
	$(fI, 0xeb86d391, 36, 21);

	return [
		_add(options.a, a),
		_add(options.b, b),
		_add(options.c, c),
		_add(options.d, d)
	];
}

function digest (data) {
	// initialize 4x32 bit state
	let h0 = 0x67452301;
	let h1 = 0xEFCDAB89;
	let h2 = 0x98BADCFE;
	let h3 = 0x10325476;

	// Digest message
	for (let i = 0; i < data.length / 64; i++) {
		[h0, h1, h2, h3] = do_64_runs({
			a: h0,
			b: h1,
			c: h2,
			d: h3,
			pointer: i * 64,
			data: data
		});
	}

	// Done! Convert buffers to 128 bit (LE)
	return int128le_to_hex(h3, h2, h1, h0);
}

// data should be of type <ArrayBuffer>
function pad_input (data) {
	const original_len = data.byteLength;

	// tail is the amount of space used in the last 512 bit block.
	// 1 is added to it because 0b10000000 must be appended to the
	// end of the buffer before it is passed on.
	const tail = (original_len + 1) % 64;
	const zero_pad = tail > 56 ? (120 - tail) : (56 - tail);

	// 0b10000000 + to 512 bit block + original length
	const total_pad = 1 + zero_pad + 8;
	const new_size = original_len + total_pad;

	// Copy data into new ArrayBuffer of proper size and requirements
	const new_data = new ArrayBuffer(new_size);
	const view = new Uint8Array(new_data);
	view.set(data); // Copy old data
	view.set([0x80], original_len); // 0b10000000
	// Zero padding is done automatically
	view.set(int64_to_bytes(original_len * 8), new_size - 8); // Original size

	return view;
}

// Takes input as an <ArrayBuffer>
function MD5 (data) {
	data = new Uint8Array(data);
	data = pad_input(data);
	return digest(data);
}

/* Testing
const a = new ArrayBuffer(5);
const view = new Uint8Array(a);
view.set([104, 101, 108, 108, 111]); // `hello` as an array buffer
console.log(MD5(a));
*/

module.exports = MD5;

},{}],4:[function(require,module,exports){
// Unlisence (2019)

// For sites like twitter it is very useful to tell when the
// URL has changed. Normally you would use the `popstate` event
// and add it with an event listener to `window`. The issue with
// that is this will only fire events when the browsers internal
// history is changed with the forward and back buttons. What we
// can do is modify how the actual functions to change the current
// url function. We can then send our own events whenever we want.
// https://stackoverflow.com/a/52809105

// A named function is probably necessary to prevent breaking
// other sites.

function create_alter (old_func, custom_event_string) {
	return function () {
		// Run this first and save the value because things may
		// rely on the new url. This prevents things from being
		// notified of a new url before there is one.
		const return_value = old_func.apply(this, arguments);
		window.dispatchEvent(new Event(custom_event_string));
		window.dispatchEvent(new Event('locationchange'));
		return return_value;
	};
}

history.pushState = create_alter(history.pushState, 'pushState');
history.replaceState = create_alter(history.replaceState, 'replaceState');
window.addEventListener('popstate', e => {
	window.dispatchEvent(new Event('locationchange'));
});

},{}],5:[function(require,module,exports){
const plans = require('./plans/plans.js');
const here = new URL(window.location.href);
const site = plans.find(e => e.test(here));
if (site !== undefined) {
	console.log(`idem's Sourcing Suite: Running ${site.title} v${site.version}`);
	site.exec();
}

},{"./plans/plans.js":11}],6:[function(require,module,exports){
const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_nodes,
	common_styles,
	GM
} = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

function style () {
	common_styles();

	GM.addStyle(`
	#iss_span {
		display: flex;
    	flex-direction: column;
    	overflow: hidden;
	}

	#iss_span > * { white-space: nowrap; }
	.iss_hash { font-weight: 700; }
	.iss_image_link { margin-right: 0.4rem; }

	#iss_upload_link {
		text-align: center;
    	font-size: 1.1rem;
    	background: #ddd;
    	border: 1px solid #bbb;
    	border-radius: 0.2rem;
    	color: black !important;
	}
/*
	#iss_buttons, #iss_links { display: flex; flex-direction: column; }
	.information { margin-right: auto; }
	#iss_upload_link {
		border: 1px solid black;
		padding: 0px 4px;
		font-size: 0.9rem;
		margin-top: auto;
	}
	#iss_links { font-size: 1.3em; padding: 0.3rem; }
	
	#iss_links > .iss_hash_span ~ .iss_hash_span { margin-top: 0.5rem; }
	
	*/
`);
}

function get_artist () {
	return document.querySelector('.submission-artist-container > a ~ a');
}

function get_full_url () {
	// It appears that you can only be on the beta site while logged
	// in. This does not concern me about this node being hidden
	return document.querySelector('.download-logged-in').href;
}

function get_description () {
	const artist = get_artist();
	const title = document.querySelector('.submission-title > h2');

	const description = document.querySelector('.submission-description-container').cloneNode(true);
	const bad_title = description.querySelector('.submission-title');
	description.removeChild(bad_title);

	return artist_commentary(artist, title, description);
}

function commentary () {
	return commentary_button(get_description());
}

function upload () {
	const sources = [
		get_artist().href,
		window.location.href,
		get_full_url()
	];

	// no tags because they are meaningless from FA
	return upload_button(get_full_url(), sources, get_description());
}

async function exec () {
	const container = document.querySelector('.submission-sidebar');

	const commentary_button = commentary();
	const upload_button = upload();

	const span = document.createElement('span');
	span.id = 'iss_span';
	span.appendChild(commentary_button);
	span.appendChild(upload_button);

	container.appendChild(span);

	const hashes = await data_to_nodes([
		[get_full_url(), 'full image'],
		[full_to_thumb(get_full_url()), 'thumb image']
	]);

	hashes.forEach(e => span.appendChild(e));

	style();
}

module.exports = exec;

},{"./../../utils/utils.js":21,"./links.js":9}],7:[function(require,module,exports){
const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_nodes,
	common_styles,
	GM
} = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

function style () {
	common_styles();

	GM.addStyle(`
	.container { display: flex; }
	#iss_buttons, #iss_links { display: flex; flex-direction: column; }
	.information { margin-right: auto; }
	#iss_upload_link {
		border: 1px solid black;
		padding: 0px 4px;
		font-size: 0.9rem;
		margin-top: auto;
	}
	#iss_links { font-size: 1.3em; padding: 0.3rem; }
	.iss_image_link { margin-right: 0.4rem; }
	#iss_links > .iss_hash_span ~ .iss_hash_span { margin-top: 0.5rem; }
	.iss_hash { font-weight: 700; }
`);
}

function get_artist () {
	return document.querySelector('.information a');
}

function get_full_url () {
	return document.querySelector('a[href^="//d.facdn.net"]').href;
}

function get_description () {
	const artist = get_artist();
	const title = document.querySelector('.information h2');
	const description = document.querySelector('.alt1[width="70%"]');
	return artist_commentary(artist, title, description);
}

function commentary () {
	return commentary_button(get_description());
}

function upload () {
	const sources = [
		get_artist().href,
		window.location.href,
		get_full_url()
	];

	// no tags because they are meaningless from FA
	return upload_button(get_full_url(), sources, get_description());
}

async function get_hashes () {
	const hashes = await data_to_nodes([
		[get_full_url(), 'full image'],
		[full_to_thumb(get_full_url()), 'thumb image']
	]);

	const span = document.createElement('span');
	span.id = 'iss_links';
	hashes.forEach(e => span.appendChild(e));

	return span;
}

async function exec () {
	const container = document.querySelector('.container');

	const commentary_button = commentary();
	const upload_button = upload();

	const span = document.createElement('span');
	span.id = 'iss_buttons';
	span.appendChild(commentary_button);
	span.appendChild(upload_button);
	container.appendChild(span);

	const hashes = await get_hashes();
	container.insertBefore(hashes, span);

	style();
}

module.exports = exec;

},{"./../../utils/utils.js":21,"./links.js":9}],8:[function(require,module,exports){
const info = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'furaffinity.net';
	},

	match: [
		'*://*.furaffinity.net/view/*',
		'*://*.furaffinity.net/full/*'
	],

	connect: ['facdn.net'],

	title: 'FurAffinity',
	version: 1
};

module.exports = info;

},{}],9:[function(require,module,exports){
function full_to_thumb (full_url) {
	const timestamp = full_url.match(/.*\/(\d+)\/\d+\..*?_.*\..*/u)[1];
	const post_id = new URL(window.location.href).pathname.split('/')[2];
	return `https://t.facdn.net/${post_id}@${400}-${timestamp}.jpg`;
}

module.exports = {
	full_to_thumb: full_to_thumb
};

},{}],10:[function(require,module,exports){
const run_classic = require('./classic.js');
const run_beta = require('./beta.js');
const header = require('./header.js');

async function exec () {
	const is_classic = document.body.dataset.staticPath === '/themes/classic';

	if (is_classic) {
		console.log(`${header.title} classic version`);
		run_classic();
	} else {
		console.log(`${header.title} beta version`);
		run_beta();
	}
}

module.exports = {
	...header,
	exec: exec
};

},{"./beta.js":6,"./classic.js":7,"./header.js":8}],11:[function(require,module,exports){
module.exports = [
	require('./furaffinity/main.js'),
	require('./twitter/main.js')
];

},{"./furaffinity/main.js":10,"./twitter/main.js":13}],12:[function(require,module,exports){
const info = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'twitter.com';
	},

	match: [
		'*://*.twitter.com/*'
	],

	connect: ['pbs.twimg.com'],

	title: 'Twitter',
	version: 1
};

module.exports = info;

},{}],13:[function(require,module,exports){
const header = require('./header.js');
const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_nodes,
	common_styles,
	GM
} = require('./../../utils/utils.js');

function find_site () {
	const status = /^\/[A-z0-9_]+\/status\/\d+$/;
	const photo = /^\/[A-z0-9_]+\/status\/\d+\/photo\/\d$/;

	clear_all_setup();

	const here = new URL(window.location.href);
	if (status.test(here.pathname)) {
		console.log('status');
	} else if (photo.test(here.pathname)) {
		console.log('photo');
		hash_photo();
	}
}

async function hash_photo () {
	const image_id = parseInt((/\d+$/).exec(window.location.href)[0], 10);
	const list_elems = new Array(image_id).fill('li').join(' ~ ');
	const query = `ul[role=list] > ${list_elems} img`;
	const image_node = await document.body.arrive(query);

	const sources = produce_sources(image_node.src);
	const nodes = await data_to_nodes(sources);
	const span = document.createElement('span');
	span.id = 'iss_span';
	nodes.forEach(e => span.appendChild(e));

	// Because of the async nature of stuff, a user might
	// have gone through things rather quickly. This will
	// make sure that there is always a clean slate
	clear_all_setup();
	document.body.appendChild(span);
}

function produce_sources (starting_url) {
	return [
		[url_type('orig'), 'full '],
		[url_type('4096x4096'), '4096 '],
		[url_type('large'), 'large '],
		[url_type('medium'), 'thumb ']
	];

	function url_type (new_type) {
		const url = new URL(starting_url);
		url.searchParams.set('name', new_type)
		return url.href;
	}
}

function clear_all_setup () {
	const hashes = document.getElementById('iss_span');
	if (hashes) {
		hashes.parentNode.removeChild(hashes);
	}
}

function add_style () {
	common_styles();

	GM.addStyle(`
		#iss_span {
			position: fixed;
			top: 0px;
			z-index: 3000;
			display: flex;
			width: 100%;
			background-color: #0006;
			flex-wrap: wrap;
		}
		.iss_hash_span { margin: auto; }
		.iss_image_link { margin-right: 0.2rem; }
	`);
}

function exec () {
	add_style();
	find_site();
	window.addEventListener('locationchange', find_site);
}

module.exports = {
	...header,
	exec: exec
};

},{"./../../utils/utils.js":21,"./header.js":12}],14:[function(require,module,exports){
const { node_to_dtext } = require('./node_to_dtext.js');

function set_clipboard (str) {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

function artist_commentary (artist_node, title_node, description_node) {
	const description = node_to_dtext(description_node)
		.replace('[/section]', '(/section)');
	const lines = description.split('\n').length;
	const should_expand = lines <= 5 || description.length <= 500;

	const title = node_to_dtext(title_node);
	const fixed_title = title
		.replace(/\[/gu, '(')
		.replace(/\]/gu, ')');

	const artist = artist_node.textContent;
	const full_title = `${fixed_title} - by ${artist}`;

	const header = `[section${should_expand ? ',expanded' : ''}=${full_title}]`;
	return `${header}\n${description}\n[/section]`;
}

function commentary_button (description) {
	const button = document.createElement('button');
	button.textContent = 'Copy Description';
	button.id = 'iss_artist_commentary';
	// maybe deal with id's and classes?

	button.addEventListener('click', event => {
		event.preventDefault();
		set_clipboard(description);
	});

	return button;
}

module.exports = {
	set_clipboard: set_clipboard,
	artist_commentary: artist_commentary,
	commentary_button: commentary_button
};

},{"./node_to_dtext.js":17}],15:[function(require,module,exports){
const E621API = require('./../../dependencies/e621_API.commonjs2.userscript.js');

const e621 = new E621API('Idem\'s Sourcing Suite');

module.exports = {
	e621: e621
};

},{"./../../dependencies/e621_API.commonjs2.userscript.js":1}],16:[function(require,module,exports){
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

},{"./../../dependencies/gm_functions.js":2,"./../../dependencies/md5.js":3,"./e621_api.js":15}],17:[function(require,module,exports){
const { safe_link } = require('./safe_link.js');

function get_link (node) {
	const inner = inner_text(node);
	const link = safe_link(node.href);

	// if node is like <a href="https://google.com">Yahoo</a>
	if (inner && inner !== node.href) {
		return `"${inner}":${link}`;
	} else {
		return link;
	}
}

function inner_text (node) {
	if (node.hasChildNodes()) {
		return Array.from(node.childNodes)
			.map(html_to_dtext)
			.filter(e => e)
			.join(' ')
			.replace(/\n /ug, '\n');
	} else {
		return node.textContent.trim();
	}
}

function html_to_dtext (entry) {
	switch (entry.nodeName) {
		case 'B':
		case 'STRONG': return `[b] ${inner_text(entry)} [/b]`;
		case 'EM':
		case 'I': return `[i] ${inner_text(entry)} [/i]`;
		case 'U': return `[u] ${inner_text(entry)} [/u]`;
		case 'O': return `[o] ${inner_text(entry)} [/o]`;
		case 'S': return `[s] ${inner_text(entry)} [/s]`;
		case 'SUP': return `[sup] ${inner_text(entry)} [/sup]`;
		case 'SUB': return `[sub] ${inner_text(entry)} [/sub]`;

		case 'A': return get_link(entry);

		case 'PRE': return `[code] ${inner_text(entry)} [/code]`;

		case 'H1': return `h1. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H2': return `h2. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H3': return `h3. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H4': return `h4. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H5': return `h5. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H6': return `h6. ${inner_text(entry).replace(/\n/gu, ' ')}`;

		case 'LI': return `* ${inner_text(entry)}`;

		case '#comment':
		case 'IMG': return ''; // Images get destroyed :(
		case 'BR': return '\n';
		case 'P': return `${inner_text(entry)}\n`;

		default: return inner_text(entry);
	}
}

module.exports = {
	node_to_dtext: html_to_dtext
};

},{"./safe_link.js":19}],18:[function(require,module,exports){
const GM = require('./../../dependencies/gm_functions.js');

function clear_page () {
	clear_children(document.head);
	clear_children(document.body);
}

function clear_children (node) {
	while (node.children.length > 0) {
		node.removeChild(node.children[0]);
	}
}

async function arrive (query) {
	const node = this.querySelector(query);
	if (node) {
		return Promise.resolve(node);
	}

	return new Promise((resolve, reject) => {
		const observer = new MutationObserver((mutations, _observer) => {
			const node = this.querySelector(query);
			if (node) {
				_observer.disconnect();
				resolve(node);
			}
		});

		observer.observe(this, {
			attributes: true,
			childList: true,
			subtree: true
		});
	});
};

async function leave (query) {
	if (this.querySelector(query) === null) {
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {
		const observer = new MutationObserver((mutations, _observer) => {
			if (this.querySelector(query) === null) {
				_observer.disconnect();
				resolve();
			}
		});

		observer.observe(this, {
			attributes: true,
			childList: true,
			subtree: true
		});
	});
};

function apply_common_styles () {
	GM.addStyle(`
		.iss_hash_notfound { color: #333 !important; }
		.iss_hash_found { color: #4cf !important; }
		.iss_image_link { color: #d50 !important; }
	`);
}

module.exports = {
	clear_children: clear_children,
	clear_page: clear_page,
	arrive: arrive,
	leave: leave,
	common_styles: apply_common_styles
};

},{"./../../dependencies/gm_functions.js":2}],19:[function(require,module,exports){
const safe_domains = [
	'furaffinity.net',
	'facdn.net',
	'deviantart.com',
	'twitter.com',
	'inkbunny.net',
	'tumblr.com',
	'aryion.com',
	'furrynetwork.com',
	'weasyl.com',
	'pixiv.net',
	'youtube.com',
	'google.com',
	'patreon.com',
	'picarto.tv',
	'gumroad.com',
	'inkedfur.com',
	'ko-fi.com'
];

function safe_link (text) {
	let url = null;
	try {
		url = new URL(text);
	} catch (e) {
		return text; // Invalid URL
	}

	if (url.protocol === 'https:') {
		return text; // already good
	} else if (safe_domains.some(e => url.hostname.includes(e))) {
		url.protocol = 'https:';
		return url.href;
	} else {
		return text;
	}
};

module.exports = {
	safe_link: safe_link
};

},{}],20:[function(require,module,exports){
function produce_link (source_url, sources, description = '', tags = []) {
	const url = new URL('https://e621.net/post/upload');
	url.searchParams.set('url', source_url);
	url.searchParams.set('source', sources.join('\n'));
	url.searchParams.set('description', description);
	url.searchParams.set('tags', tags.join(' '));
	return url.href;
}

function upload_button (source_url, sources, description, tags = []) {
	const link = document.createElement('a');
	link.textContent = 'Upload to e621';
	link.id = 'iss_upload_link';
	link.href = produce_link(source_url, sources, description, tags);
	link.target = '_blank';

	return link;
}

module.exports = {
	upload_url: produce_link,
	upload_button: upload_button
};

},{}],21:[function(require,module,exports){
const { arrive, leave } = require('./nodes.js');
const GM = require('./../../dependencies/gm_functions.js');

// custom events for url change
require('./../../dependencies/on_url_change.js');

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

},{"./../../dependencies/gm_functions.js":2,"./../../dependencies/on_url_change.js":4,"./artist_commentary.js":14,"./e621_api.js":15,"./hash_image.js":16,"./node_to_dtext.js":17,"./nodes.js":18,"./safe_link.js":19,"./upload_url.js":20}]},{},[5]);
