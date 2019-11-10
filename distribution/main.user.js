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

//               DeviantArt v1
// @match        *://*.deviantart.com/*
// @connect      wixmp.com

//               FurAffinity v1
// @match        *://*.furaffinity.net/view/*
// @match        *://*.furaffinity.net/full/*
// @connect      facdn.net

//               FurryNetwork v1
// @match        *://*.furrynetwork.com/*
// @connect      https://d3gz42uwgl1r1y.cloudfront.net/

//               Image Comparison v1
// @match        *://*.e621.net/extensions/image_compare
// @connect      *

//               Twitter v1
// @match        *://*.twitter.com/*
// @connect      pbs.twimg.com

//               Weasyl v1
// @match        *://*.weasyl.com/*/submissions/*
// @connect      cdn.weasyl.com

// @grant        GM.addStyle
// @grant        GM.xmlHttpRequest

// ==/UserScript==

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Based on the popular package arrive https://github.com/uzairfarooq/arrive
// Redone to how I think it should be done, in a license that I like
// Unlicense (2019)

async function arrive (query) {
	const node = this.querySelector(query);
	if (node) {
		return Promise.resolve(node);
	}

	return new Promise((resolve, reject) => {
		const observer = new MutationObserver((mutations, _observer) => {
			const node = this.querySelector(query);
			if (node) {
				delete this.arrives.find(e => e === observer);
				_observer.disconnect();
				resolve(node);
			}
		});

		if (this.arrives === undefined) {
			this.arrives = [];
		}

		this.arrives.push(observer);

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

		if (this.leaves === undefined) {
			this.leaves = [];
		}

		this.leaves.push(observer);

		observer.observe(this, {
			attributes: true,
			childList: true,
			subtree: true
		});
	});
};

function destroy () {
	const arrives = this.arrives;
	if (arrives) {
		arrives.forEach(e => e.disconnect());
		this.arrives = [];
	}

	const leaves = this.leaves;
	if (leaves) {
		leaves.forEach(e => e.disconnect());
	}
}

HTMLElement.prototype.arrive = arrive;
HTMLElement.prototype.leave = leave;
HTMLElement.prototype.forget_arrives = destroy;

},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
// If changes have to be made to the GM object, this is where
// those changes should happen. Otherwise return that
// object as is

// eslint-disable-next-line no-undef
module.exports = GM;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
// custom events for url change
require('./../dependencies/on_url_change.js');

// custom prototypes for waiting on new nodes
require('./../dependencies/arrive.js');

const plans = [
	require('./plans/furaffinity/main.js'),
	require('./plans/twitter/main.js'),
	require('./plans/deviantart/main.js'),
	require('./plans/weasyl/main.js'),
	require('./plans/image_compare/main.js'),
	require('./plans/furrynetwork/main.js')
];

const here = new URL(window.location.href);
const site = plans.find(e => e.test(here));
if (site !== undefined) {
	console.log(`idem's Sourcing Suite: Running ${site.title} v${site.version}`);
	site.exec();
}

},{"./../dependencies/arrive.js":1,"./../dependencies/on_url_change.js":5,"./plans/deviantart/main.js":9,"./plans/furaffinity/main.js":16,"./plans/furrynetwork/main.js":18,"./plans/image_compare/main.js":24,"./plans/twitter/main.js":26,"./plans/weasyl/main.js":28}],7:[function(require,module,exports){
const { description, upload } = require('./shared.js');
const {
	artist_commentary,
	string_to_node,
	data_to_nodes,
	common_styles,
	remove_node,
	add_css
} = require('./../../utils/utils.js');

async function run_artwork () {
	clear_all_setup();

	const here_path = new URL(window.location.href).pathname;
	const post_id = parseInt(here_path.split('-').splice(-1)[0], 10);
	const info = await get_info(post_id);

	const post_info = document.querySelector('[data-hook=deviation_meta]');
	post_info.style.flexDirection = 'column';
	const container = document.createElement('div');
	container.id = 'iss_container';
	post_info.appendChild(container);

	container.appendChild(upload(info));
	container.appendChild(description(info));

	const hashes = await data_to_nodes(info.sources);
	hashes.forEach(e => container.appendChild(e));
}

function add_style () {
	common_styles();

	add_css(`
		.iss_image_link {
			color: inherit !important;
			font-size: 1.1rem;
			margin-right: 0.3rem;
		}

		#iss_container {
			display: flex;
			flex-direction: column;
			margin-top: 1rem;
		}

		#iss_artist_commentary { width: 8rem; }
	`);
}

function clear_all_setup () {
	remove_node(document.getElementById('iss_container'));
}

async function get_info (post_id) {
	const url = new URL('https://www.deviantart.com/_napi/shared_api/deviation/extended_fetch');
	url.searchParams.set('deviationid', post_id);
	url.searchParams.set('type', 'art');
	url.searchParams.set('include_session', false);

	return fetch(url)
		.then(e => e.json())
		.then(e => ({
			sources: get_sources(e),
			description: get_description(e)
		}));
}

// I believe creating new nodes and then just passing that to
// the artist commentary function is simpler than requiring
// the nodes_to_dtext function to parse this one thing and then
// require another function to build it all.
function get_description (da_object) {
	const artist = string_to_node(da_object.deviation.author.username);
	const title = string_to_node(da_object.deviation.title);
	const description = string_to_node(da_object.deviation.extended.description);

	return artist_commentary(artist, title, description);
}

// While it may seem it, the download hash and the large view
// are not always the same md5. There is likely some optimization
// going on at DeviantArt where they choose which setup is the
// best. For an example of mismatching hashes, 467929547 is a
// post that exhibits this feature. Many others are well behaved.
// 669522728 - Only download and large
// 754495989 - Only large
// 644901973 - Only large and social
function get_sources (da_object) {
	const download_url = (() => {
		const download = da_object.deviation.extended.download;
		if (download) {
			return [{ type: 'download', src: download.url }];
		} else {
			return [];
		}
	})();

	const other_sources = ['fullview', 'social_preview', 'preview']
		.map(e => da_object.deviation.files.find(p => p.type === e))
		.filter(e => e); // Perhaps one of the results from above is null

	return download_url
		.concat(other_sources)
		.filter(e => e.src !== 'https://st.deviantart.net/misc/noentrythumb-200.png')
		.filter((e, i, a) => i === a.findIndex(p => p.src === e.src))
		.map(e => ([e.src, e.type.replace('full', 'large ').replace('_', ' ')]));
}

module.exports = {
	init: add_style,
	exec: run_artwork
};

},{"./../../utils/utils.js":37,"./shared.js":11}],8:[function(require,module,exports){
module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'deviantart.com';
	},

	match: ['*://*.deviantart.com/*'],

	connect: ['wixmp.com'],

	title: 'DeviantArt',
	version: 1
};

},{}],9:[function(require,module,exports){
const old = require('./old.js');
const eclipse = require('./eclipse.js');
const header = require('./header.js');

let last_url = null;
let version = null;

async function find_site () {
	const here = new URL(window.location.href);

	if (here.href === last_url) {
		console.log('ISS: Duplicate URL detected');
		return; // Why are we loading twice on the same page?
	} else {
		last_url = here.href;
	}

	const artwork_regex = /^\/[A-z0-9_-]+\/art\/.*$/;
	if (artwork_regex.test(here.pathname)) {
		console.log('ISS: Artwork URL detected');
		version.exec();
	}
}

async function exec () {
	const is_old = document.getElementById('oh-menu-eclipse-toggle');

	if (is_old) {
		console.log(`ISS: ${header.title} old version`);
		version = old;
	} else {
		console.log(`ISS: ${header.title} eclipse version`);
		version = eclipse;
	}

	version.init();
	find_site();
	window.addEventListener('locationchange', find_site);
}

module.exports = {
	...header,
	exec: exec
};

},{"./eclipse.js":7,"./header.js":8,"./old.js":10}],10:[function(require,module,exports){
const { description, upload } = require('./shared.js');
const {
	commentary_from_text,
	string_to_node,
	data_to_nodes,
	node_to_dtext,
	common_styles,
	remove_node,
	add_css
} = require('./../../utils/utils.js');

async function run_artwork () {
	clear_all_setup();

	const here_path = new URL(window.location.href).pathname;
	const post_id = parseInt(here_path.split('-').splice(-1)[0], 10);
	const info = await get_info(post_id);

	// DA has a smaller div that is changed and update for
	// all pages loads that are not the first page load. We have
	// to wait for this div to be updated. Not the original one
	let post_info = document.querySelector('.dev-title-container');
	if (document.querySelectorAll('.dev-view-about').length > 1) {
		await document.body.arrive('.minibrowse-container .dev-view-about .avatar');
		post_info = document.querySelector('.minibrowse-container .dev-title-container');
	}
	const container = document.createElement('div');
	container.id = 'iss_container';
	post_info.appendChild(container);

	container.appendChild(upload(info));
	container.appendChild(description(info));

	const hashes = await data_to_nodes(info.sources);
	hashes.forEach(e => container.appendChild(e));
}

function add_style () {
	common_styles();

	add_css(`
		.iss_image_link {
			color: inherit !important;
			font-size: 1.1rem;
			margin-right: 0.3rem;
		}

		#iss_container {
			display: flex;
			flex-direction: column;
			margin-left: 5rem;
		}

		#iss_artist_commentary { width: 8rem; }
		#iss_upload_link { font-size: 1rem; }
	`);
}

function clear_all_setup () {
	remove_node(document.getElementById('iss_container'));
}

async function get_info (post_id) {
	const user_info = document.cookie
		.split(';')
		.map(e => e
			.split('=')
			.map(e => decodeURIComponent(e))
		)
		.find(([name, value]) => name.replace(' ', '') === 'userinfo')[1];

	const url = new URL('https://www.deviantart.com/global/difi/');
	url.searchParams.set('t', 'json');
	url.searchParams.set('ui', user_info);
	url.searchParams.set('c[]', `"DeviationView","getExtrasHTML",["${post_id}","",{},{}]`);

	return fetch(url, { method: 'POST' })
		.then(e => e.text())
		.then(e => JSON.parse(e))
		.then(e => e.DiFi.response.calls[0].response.content)
		.then(e => ({
			description: get_commentary(e, string_to_node(e.html_col1)),
			sources: get_sources(string_to_node(e.html_col2))
		}));
}

function get_commentary (da_object, html1) {
	const description_node = html1.querySelector('.dev-description .text.block');
	const description = node_to_dtext(description_node);

	return commentary_from_text(null, da_object.title, description);
}

function get_sources (html2) {
	const sources = [];

	const download_link = html2.querySelector('.dev-page-download');
	if (download_link) {
		sources.push([download_link.href, 'download']);
	}

	const image = html2.querySelector('.preview a');
	sources.push([image.dataset.superFullImg, 'large view']);
	sources.push([image.dataset.superImg, 'social preview']);

	return sources.filter((e, i, a) => i === a.findIndex(p => p[0] === e[0]));
}

module.exports = {
	init: add_style,
	exec: run_artwork
};

},{"./../../utils/utils.js":37,"./shared.js":11}],11:[function(require,module,exports){
const { commentary_button, upload_button } = require('./../../utils/utils.js');

function create_description_button (info) {
	return commentary_button(info.description);
}

function create_upload_button (info) {
	const best_url = info.sources[0][0];
	const is_from_da = new URL(best_url).hostname === 'www.deviantart.com';

	const button = upload_button(
		is_from_da ? best_url : `Manual upload is required ${best_url}`,
		[window.location.href],
		info.description
	);

	const container = document.createElement('span');
	container.appendChild(button);

	return container;
}

module.exports = {
	description: create_description_button,
	upload: create_upload_button
};

},{"./../../utils/utils.js":37}],12:[function(require,module,exports){
const { simple_site } = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

const get_info = (full_url) => simple_site({
	artist: document.querySelector('.submission-artist-container > a ~ a'),
	title: document.querySelector('.submission-title > h2'),
	description: () => {
		// FA combines the title node and the description into one
		// This will create a duplicate node where the title is not
		// there. This will duplicate and remove that node.
		const description = document
			.querySelector('.submission-description-container')
			.cloneNode(true);
		const bad_title = description.querySelector('.submission-title');
		description.removeChild(bad_title);
		return description;
	},
	full_url: full_url,
	hashes: [
		[full_to_thumb(full_url), 'thumb image']
	],
	css: `
		#iss_container { 
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}
		#iss_container > * { white-space: nowrap; }
		.iss_hash { font-weight: 700; }
		.iss_image_link { margin-right: 0.4rem; }
	`
});

async function exec () {
	// It appears that you can only be on the beta site while logged
	// in. This does not concern me about this node being hidden
	const full_url = document.querySelector('.download-logged-in').href;
	const info = get_info(full_url);

	const container = document.createElement('div');
	container.id = 'iss_container';
	const more_from = document
		.querySelector('#columnpage .preview-gallery')
		.previousElementSibling;
	more_from.parentNode.insertBefore(container, more_from);

	container.appendChild(info.upload);
	container.appendChild(info.description);
	while (info.hashes.firstChild) {
		container.appendChild(info.hashes.firstChild);
	}
}

module.exports = exec;

},{"./../../utils/utils.js":37,"./links.js":15}],13:[function(require,module,exports){
const { simple_site } = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

const get_info = (full_url) => simple_site({
	artist: document.querySelector('.information a'),
	title: document.querySelector('.information h2'),
	description: document.querySelector('.alt1[width="70%"]'),
	full_url: full_url,
	hashes: [
		[full_to_thumb(full_url), 'thumb image']
	],
	css: `
		.container { display:flex; flex-direction: row; }
		.information { margin-right: auto; }
		#iss_container {
			display: grid;
			grid-template-columns: auto auto;
			grid-gap: 5px;

			font-weight: 700;
			font-size: 1.3em;
			padding: 0.3rem;
		}
		.iss_image_link { margin-right: 0.4rem; }
	`
});

async function exec () {
	const full_url = document.querySelector('a[href^="//d.facdn.net"]').href;
	const info = get_info(full_url);

	const container = document.createElement('div');
	container.id = 'iss_container';
	document.querySelector('.container').appendChild(container);

	container.appendChild(info.upload);
	container.appendChild(info.hashes.childNodes.item(0));
	container.appendChild(info.description);
	// Appending the zeroth element a second time because the
	// first append shifts the array
	container.appendChild(info.hashes.childNodes.item(0));
}

module.exports = exec;

},{"./../../utils/utils.js":37,"./links.js":15}],14:[function(require,module,exports){
module.exports = {
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

},{}],15:[function(require,module,exports){
function full_to_thumb (full_url) {
	const timestamp = full_url.match(/.*\/(\d+)\/\d+\..*?_.*\..*/u)[1];
	const post_id = new URL(window.location.href).pathname.split('/')[2];
	return `https://t.facdn.net/${post_id}@${400}-${timestamp}.jpg`;
}

module.exports = {
	full_to_thumb: full_to_thumb
};

},{}],16:[function(require,module,exports){
const run_classic = require('./classic.js');
const run_beta = require('./beta.js');
const header = require('./header.js');

async function exec () {
	const is_classic = document.body.dataset.staticPath === '/themes/classic';

	if (is_classic) {
		console.log(`ISS: ${header.title} classic version`);
		run_classic();
	} else {
		console.log(`ISS: ${header.title} beta version`);
		run_beta();
	}
}

module.exports = {
	...header,
	exec: exec
};

},{"./beta.js":12,"./classic.js":13,"./header.js":14}],17:[function(require,module,exports){
module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'furrynetwork.com';
	},

	match: ['*://*.furrynetwork.com/*'],

	connect: ['https://d3gz42uwgl1r1y.cloudfront.net/'],

	title: 'FurryNetwork',
	version: 1
};

},{}],18:[function(require,module,exports){
const {
	simple_site,
	remove_node,
	move_children
} = require('./../../utils/utils.js');
const header = require('./header.js');

let last_url = null;

function attempt_site () {
	const here = new URL(window.location.href);
	const is_direct = (/^\/artwork\/\d+\//).test(here.pathname);
	const is_viewed = here.searchParams.get('viewType') === 'artwork';

	remove_node(document.getElementById('iss_container'));

	if (last_url && here.href === last_url.href) {
		console.log('ISS: Duplicate URL detected');
	} else if (last_url === null && is_viewed) {
		// Do nothing because we will be redirected to
		// the direct view shortly
	} else if (is_direct) {
		console.log('ISS: Direct artwork URL detected');
		document.body.arrive('.l--app__layout .submission')
			.then(run_site)
			.then(load_signal);
	} else if (is_viewed) {
		console.log('ISS: Linked artwork URL detected');
		// Wait for known element on first run (can be discarded on all)
		//   runs after the first.
		// Wait for specific element to not have a space at the end
		//   (This should be always the case if running normally, with this
		//   extension, when the new post data is loaded, this element is
		//   overwritten and will no longer have a space at the end. This
		//   signals that there is new data to be retrieved)
		// Run site
		// Update that element to have a space at the end to prime it for
		//   the next time it is needed.

		// This is way too complex and should be simplified
		document.body.arrive('.submission__tags')
			.then(wait_signal)
			.then(run_site)
			.then(load_signal);
	}

	last_url = here;
}

async function wait_signal () {
	return document.body.leave('.submission-description__created[title$=" "]');
}

function load_signal () {
	document.querySelector('.submission-description__created').title += ' ';
}

function run_site () {
	const aside = document.querySelector('.submission__aside__inner');
	const container = document.createElement('div');
	container.id = 'iss_container';

	const info = get_info();
	container.appendChild(info.upload);
	container.appendChild(info.description);
	move_children(info.hashes, container);

	const description = aside.querySelector('.submission__description');
	aside.insertBefore(container, description);
}

function get_sources () {
	return {
		full: document.querySelector('.submission-actions > a.t--reset-link').href,
		thumb: document.querySelector('.image.submission-media__img img').src
	};
}

const get_info = () => simple_site({
	artist: () => {
		const node = document.querySelector('.submission-author__display-name');
		return {
			href: node.parentNode.href,
			textContent: node.textContent
		};
	},
	title: document.querySelector('.submission-description__title'),
	description: document.querySelector('.submission-description__description__md'),
	full_url: get_sources().full,
	hashes: [
		[get_sources().thumb, 'thumb image']
	],
	css: `
	#iss_container {
		margin: .9375rem 0;
    	padding: .9375rem 0;
		border-top: 1px solid #3e3e40;
		display: flex;
		flex-direction: column;
		white-space: nowrap;
		overflow: hidden;
	}

	.iss_image_link { margin-right: 1rem; }
	`
});

async function exec () {
	attempt_site();
	window.addEventListener('locationchange', attempt_site);
}

module.exports = {
	exec: exec,
	...header
};

},{"./../../utils/utils.js":37,"./header.js":17}],19:[function(require,module,exports){
const pixel_compare = require('./compare_points.js');

async function compare (options) {
	const context1 = options.canvas1.getContext('2d');
	const context2 = options.canvas2.getContext('2d');

	const same_width = options.canvas1.width === options.canvas2.width;
	const same_height = options.canvas1.height === options.canvas2.height;

	if (!same_width || !same_height) {
		throw new Error('Images did not have the same width and height');
	}

	const width = context1.canvas.width;
	const height = context1.canvas.height;

	const data1 = context1.getImageData(0, 0, width, height).data;
	const data2 = context2.getImageData(0, 0, width, height).data;

	if (data1.every(e => e === 0) && data2.every(e => e === 0)) {
		throw new Error('Images have not been set');
	}

	const algorithm = pixel_compare[options.algorithm];
	if (algorithm === undefined) {
		throw new Error('Somehow a non-valid comparison algorithm was selected');
	}

	let some_change = 0;

	const new_data = new Uint8ClampedArray(width * height * 4);
	for (let i = 0; i < new_data.length; i += 4) {
		// The last value for all of these if flipped. The reason is because
		// it is the alpha channel, and an alpha of 0 means the image will
		// not be displayed. The point of these is to return 0 if there is no
		// change. Therefore it makes sense to flip this one value. It may not
		// produce the best viewed outputs for things with alpha layers, but it
		// does produce an output that reflects them.

		const result = algorithm(data1, data2, i);
		new_data[i + 0] = result[0];
		new_data[i + 1] = result[1];
		new_data[i + 2] = result[2];
		new_data[i + 3] = 255 - result[3];

		some_change = some_change | result[0] | result[1] | result[2] | result[3];

		if (options.leave_early && some_change !== 0) {
			break;
		}

		// Relinquish control of the event loop so other things
		// can run, creating a smoother user experience
		if (i % 400000 === 0) {
			await new Promise(resolve => setTimeout(resolve, 1));
		}
	}

	return {
		data: new ImageData(new_data, width, height),
		message: some_change === 0 ? 'Images are identical' : 'There is a difference!',
		width: width,
		height: height
	};
}

module.exports = compare;

},{"./compare_points.js":20}],20:[function(require,module,exports){
const library = {};

// https://stackoverflow.com/questions/8885323/speed-of-the-math-object-in-javascript
// Some things are going to look odd. This is an attempt to make
// this library run quickly. WebAssembly with webpack was looked
// into briefly, but a good solution was not found.

// The function order is named after the degrees a polynomial can take
// because I have no shame and I must push math in everywhere
// https://en.wikipedia.org/wiki/Degree_of_a_polynomial

// d1 and d2 are the data of the images where o is the offset.
// This is to simplify code so only an index needs to be passed
// each time.
library.constant = (d1, d2, o) => [
	d1[o + 0] === d2[o + 0] ? 0 : 255, // Red
	d1[o + 1] === d2[o + 1] ? 0 : 255, // Green
	d1[o + 2] === d2[o + 2] ? 0 : 255, // Blue
	d1[o + 3] === d2[o + 3] ? 0 : 255 // Alpha
];

// It is indeed faster. On a test of 100,000 elements, this
// version outperformed Math.abs by 30% (7ms vs 4.5ms)
library.linear = (d1, d2, o) => [
	// Difference >= 0 ? Difference : -Difference
	d1[o + 0] - d2[o + 0] >= 0 ? d1[o + 0] - d2[o + 0] : -(d1[o + 0] - d2[o + 0]),
	d1[o + 1] - d2[o + 1] >= 0 ? d1[o + 1] - d2[o + 1] : -(d1[o + 1] - d2[o + 1]),
	d1[o + 2] - d2[o + 2] >= 0 ? d1[o + 2] - d2[o + 2] : -(d1[o + 2] - d2[o + 2]),
	d1[o + 3] - d2[o + 3] >= 0 ? d1[o + 3] - d2[o + 3] : -(d1[o + 3] - d2[o + 3])
];

library.quadratic = (d1, d2, o) => [
	// Difference >= 0 ? Difference : -Difference
	(d1[o + 0] - d2[o + 0]) ** 2 < 255 ? (d1[o + 0] - d2[o + 0]) ** 2 : 255,
	(d1[o + 1] - d2[o + 1]) ** 2 < 255 ? (d1[o + 1] - d2[o + 1]) ** 2 : 255,
	(d1[o + 2] - d2[o + 2]) ** 2 < 255 ? (d1[o + 2] - d2[o + 2]) ** 2 : 255,
	(d1[o + 3] - d2[o + 3]) ** 2 < 255 ? (d1[o + 3] - d2[o + 3]) ** 2 : 255
];

library.in_first = (d1, d2, o) => {
	const nr = d1[o + 0] !== d2[o + 0] ? d1[o + 0] : 0;
	const ng = d1[o + 1] !== d2[o + 1] ? d1[o + 1] : 0;
	const nb = d1[o + 2] !== d2[o + 2] ? d1[o + 2] : 0;
	// skip alpha
	return nr | ng | nb ? [d1[o + 0], d1[o + 1], d1[o + 2], 255 - d1[o + 3]] : [0, 0, 0, 255 + 255];
};

library.in_second = (d1, d2, o) => {
	const nr = d1[o + 0] !== d2[o + 0] ? d2[o + 0] : 0;
	const ng = d1[o + 1] !== d2[o + 1] ? d2[o + 1] : 0;
	const nb = d1[o + 2] !== d2[o + 2] ? d2[o + 2] : 0;
	// skip alpha
	return nr | ng | nb ? [d2[o + 0], d2[o + 1], d2[o + 2], 255 - d2[o + 3]] : [0, 0, 0, 255 + 255];
};

module.exports = library;

},{}],21:[function(require,module,exports){
module.exports = {
	test: (url) => {
		return url.href === 'https://e621.net/extensions/image_compare';
	},

	match: [
		'*://*.e621.net/extensions/image_compare'
	],

	connect: ['*'],

	title: 'Image Comparison',
	version: 1
};

},{}],22:[function(require,module,exports){
module.exports = ":root {\n\t--dark-blue: #031131;\n\t--blue: #284a81;\n\t--other-blue: #174891;\n\t--more-blue: #152f56;\n\t--yellow: #fdba31;\n\t--light-yellow: #ffde9b;\n\t--dark-yellow: #d8b162;\n}\n\nbody { background-color: var(--blue); }\n\ncanvas {\n\tborder: 5px dashed var(--dark-blue);\n}\n\n#c1, #c2 {\n\tmax-width: 400px;\n\tmax-height: 400px;\n}\n\n#input {\n\tdisplay: grid;\n\tgrid-template-columns: auto auto;\n\tgrid-gap: 5px;\n\tflex-grow: 1;\n}\n\n#control {\n\tflex-grow: 5;\n}\n\n#main {\n\tdisplay: flex;\n}\n\n#messages {\n\tdisplay: flex;\n\tflex-direction: column;\n\tcolor: var(--light-yellow);\n}\n\n#leave_early ~ label {\n\tcolor: var(--light-yellow);\n}\n\nhr { color: var(--light-yellow); }";

},{}],23:[function(require,module,exports){
module.exports = "<div id=\"main\">\n\t<div id=\"control\">\n\t\t<button id=\"compare_button\">Compare images using</button>\n\t\t<select id=\"algorithm_select\" title=\"These are named after the degrees of a polynomial\">\n\t\t\t<option value=\"constant\" title=\"This is what you want\">Constant</option>\n\t\t\t<option value=\"linear\" title=\"absoluteValue of color1 - color2\">Linear</option>\n\t\t\t<option value=\"quadratic\" title=\"(color1 - color2)^2\">Quadratic</option>\n\t\t\t<option value=\"in_first\" title=\"Only pixels that are in the first image\">In First</option>\n\t\t\t<option value=\"in_second\" title=\"Only pixels that are in the second image\">In Second</option>\n\t\t</select>\n\t\t<br>\n\t\t<input type=\"checkbox\" id=\"leave_early\" name=\"leave_early\"></input>\n\t\t<label for=\"leave_early\">Quick Compare</label>\n\t\t<br>\n\t\t<div id=\"messages\">\n\t\t\t<span>Logging information should appear here<span>\n\t\t</div>\n\t</div>\n\t<div id=\"input\">\n\t\t<canvas id=\"c1\"></canvas>\n\t\t<canvas id=\"c2\"></canvas>\n\t</div>\n</div>\n<hr>\n<div>\n\t<canvas id=\"o1\"></canvas>\n</div>";

},{}],24:[function(require,module,exports){
const {
	multi_input,
	remove_node,
	clear_page,
	add_css
} = require('./../../utils/utils.js');
const compare_nodes = require('./compare_canvas.js');

function exec () {
	clear_page();
	add_css(require('./main.css'));
	document.body.innerHTML = require('./main.html');
	add_input_canvases();
	add_button_listener();
}

function add_button_listener () {
	const button = document.getElementById('compare_button');
	button.addEventListener('click', () => {
		compare_nodes({
			canvas1: document.getElementById('c1'),
			canvas2: document.getElementById('c2'),
			leave_early: document.getElementById('leave_early').checked,
			algorithm: document.getElementById('algorithm_select').value
		}).then(result => {
			const output_canvas = document.getElementById('o1');

			log_message(result.message);
			output_canvas.width = result.width;
			output_canvas.height = result.height;
			output_canvas.getContext('2d').putImageData(result.data, 0, 0);
		}).catch(message => {
			log_message(message);
		});
	});
}

function add_input_canvases () {
	const input = document.getElementById('input');
	const c1 = get_element(1);
	const c2 = get_element(2);

	// insert backwards so they appear forwards
	input.insertBefore(c2, input.firstChild);
	input.insertBefore(c1, input.firstChild);

	function get_element (type) {
		return multi_input((data) => {
			const canvas = document.getElementById(`c${type}`);
			paste_data(data, canvas).then(() => {
				log_message(`Loaded image #${type} with ${canvas.width}x${canvas.height}`);
			});
		});
	}
}

async function paste_data (data, canvas_node) {
	const ctx = canvas_node.getContext('2d');
	const img = new Image();
	return new Promise((resolve, reject) => {
		img.onload = () => {
			ctx.canvas.width = img.width;
			ctx.canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			resolve(ctx);
		};
		img.src = URL.createObjectURL(data);
	});
}

function log_message (text) {
	console.log(text);

	const messages = document.getElementById('messages');

	const span = document.createElement('span');
	span.textContent = text;
	messages.appendChild(span);

	if (messages.children.length > 7) {
		remove_node(messages.firstChild);
	}
};

module.exports = {
	...require('./header.js'),
	exec: exec
};

},{"./../../utils/utils.js":37,"./compare_canvas.js":19,"./header.js":21,"./main.css":22,"./main.html":23}],25:[function(require,module,exports){
module.exports = {
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

},{}],26:[function(require,module,exports){
const header = require('./header.js');
const {
	commentary_button,
	artist_commentary,
	upload_button,
	data_to_span,
	common_styles,
	remove_node,
	add_css
} = require('./../../utils/utils.js');

function find_site () {
	const status = /^\/[A-z0-9_]+\/status\/\d+$/;
	const photo = /^\/[A-z0-9_]+\/status\/\d+\/photo\/\d$/;

	clear_all_setup();

	const here = new URL(window.location.href);
	if (status.test(here.pathname)) {
		console.log('ISS: Status URL detected');
		// links to upload all images
		// copy description
	} else if (photo.test(here.pathname)) {
		console.log('ISS: Photo URL detected');
		photo_hashes().then(upload);
	}
}

// This runs too quickly. As in, It is run before
// twitter has updated its page. It will return a
// element that no longer exists
async function do_description () {
	const query = '[role=article] > div > div:first-child + div > div:first-child > div:only-child';
	const first_unquoted_icon = await document.body.arrive(query);
	const first_unquoted = first_unquoted_icon.parentNode.parentNode.parentNode;
	console.log(first_unquoted);
}

async function get_sources () {
	const image_id = parseInt((/\d+$/).exec(window.location.href)[0], 10);
	const list_elems = new Array(image_id).fill('li').join(' ~ ');
	const query = `ul[role=list] > ${list_elems} img`;

	// The structure for displaying multiple images and single
	// images is different. This attempt to find each style and
	// then return the first one that is found. The other's event
	// listeners are then discarded and those promises are left
	// never resolving. Perhaps this is not the best idea.
	const image_node = await Promise.race([
		document.getElementById('react-root').arrive(query),
		document.getElementById('react-root').arrive('div > div > div > div > div > img[alt=Image]')
	]);
	document.getElementById('react-root').forget_arrives();

	const all_sources = produce_sources(image_node.src);
	return all_sources;
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
		url.searchParams.set('name', new_type);
		return url.href;
	}
}

async function photo_hashes () {
	const sources = await get_sources();
	const span = data_to_span(sources);
	console.log(document.getElementById('iss_span'));
	console.log(span);

	// Because of the async nature of stuff, a user might
	// have gone through things rather quickly. This will
	// make sure that there is always a clean slate
	clear_all_setup();

	document.body.appendChild(span);
}

async function get_description () {
	const artist = await document.body.arrive('[data-testid=tweet] [dir=ltr] > span');
	const title = null;
	const description = await document.body.arrive('[data-testid=tweet] ~ [dir=auto] > span');
	return artist_commentary(artist, title, description);
}

async function upload () {
	const full_url = await get_sources().then(e => e[0][0]);
	const description = await get_description();

	const sources = [
		document.querySelector('[data-testid=tweet] a').href,
		window.location.href,
		full_url
	];

	// Fix visual bug where upload would be crammed against
	// the other share buttons
	const quick_buttons = document.querySelector('[aria-label$=Reply]')
		.parentNode
		.parentNode;
	quick_buttons.querySelector('div ~ div ~ div ~ div').style.flexGrow = 1;

	const button = upload_button(full_url, sources, description);
	quick_buttons.appendChild(button);
}

function clear_all_setup () {
	remove_node(document.getElementById('iss_span'));
	remove_node(document.getElementById('iss_upload_link'));
}

function add_style () {
	common_styles();

	add_css(`
		#iss_hashes {
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

		#iss_upload_link {
			color: white;
			margin: auto;
		}
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

},{"./../../utils/utils.js":37,"./header.js":25}],27:[function(require,module,exports){
module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'weasyl.com';
	},

	match: [
		'*://*.weasyl.com/*/submissions/*'
	],

	connect: ['cdn.weasyl.com'],

	title: 'Weasyl',
	version: 1
};

},{}],28:[function(require,module,exports){
const { simple_site } = require('./../../utils/utils.js');
const header = require('./header.js');

const get_info = () => simple_site({
	artist: document.querySelector('#db-user > .username'),
	title: document.querySelector('#detail-bar-title'),
	description: document.querySelector('#detail-description > .formatted-content'),
	full_url: document.querySelector('#detail-art > a').href,
	hashes: [
		[document.querySelector('#detail-art > a > img').src, 'thumb image']
	],
	css: `
		#iss_container, #iss_hashes {
			display: flex;
			flex-direction: column;
		}
		.iss_image_link { margin-right: 1rem; }
	`
});

async function exec () {
	const info = get_info();

	const container = document.createElement('div');
	container.id = 'iss_container';
	document.querySelector('#di-info').appendChild(container);

	container.appendChild(info.upload);
	container.appendChild(info.description);
	container.appendChild(info.hashes);
}

module.exports = {
	...header,
	exec: exec
};

},{"./../../utils/utils.js":37,"./header.js":27}],29:[function(require,module,exports){
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
	const artist = artist_node.textContent;
	const title = title_node !== null ? node_to_dtext(title_node) : 'Untitled';
	const description = node_to_dtext(description_node);
	return commentary_from_text(artist, title, description);
}

function commentary_from_text (artist, title, description) {
	description = description.replace('[/section]', '(/section)');
	const lines = description.split('\n').length;
	const should_expand = lines <= 5 || description.length <= 500;

	const fixed_title = title
		.replace(/\[/gu, '(')
		.replace(/\]/gu, ')');

	const full_title = artist === null ? title : `${fixed_title} - by ${artist}`;

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
	commentary_button: commentary_button,
	commentary_from_text: commentary_from_text
};

},{"./node_to_dtext.js":32}],30:[function(require,module,exports){
const E621API = require('./../../dependencies/e621_API.commonjs2.userscript.js');

const e621 = new E621API('Idem\'s Sourcing Suite');

module.exports = {
	e621: e621
};

},{"./../../dependencies/e621_API.commonjs2.userscript.js":2}],31:[function(require,module,exports){
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

},{"./../../dependencies/gm_functions.js":3,"./../../dependencies/md5.js":4,"./e621_api.js":30}],32:[function(require,module,exports){
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
	if (entry === null) {
		return '';
	} else if (typeof entry === 'string') {
		return entry;
	}

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

},{"./safe_link.js":34}],33:[function(require,module,exports){
const GM = require('./../../dependencies/gm_functions.js');
const { download_image } = require('./hash_image.js');

function clear_page () {
	clear_children(document.head);
	clear_children(document.body);
}

function clear_children (node) {
	while (node.firstChild) {
		remove_node(node.firstChild);
	}
}

function move_children (donor_node, new_node) {
	while (donor_node.firstChild !== null) {
		new_node.appendChild(donor_node.firstChild);
	}
}

function remove_node (node) {
	if (node) {
		node.parentNode.removeChild(node);
	}
}

function apply_common_styles () {
	GM.addStyle(`
		span.iss_hash_checking { color: #830; }	
		span.iss_hash_notfound { color: #333; }
		a.iss_hash_found, a.iss_hash_found:visited { color: #4cf; }
		a.iss_image_link, a.iss_image_link:visited { color: #fff; }
		.iss_hash { font-family: monospace; }
	`);
}

function add_css (css) {
	GM.addStyle(css);
}

function string_to_node (string) {
	return new DOMParser().parseFromString(string, 'text/html').documentElement;
}

function multi_input (callback) {
	const container = document.createElement('span');

	const url_box = document.createElement('input');
	url_box.type = 'url';
	url_box.placeholder = 'Image URL or ...';
	container.appendChild(url_box);

	const file_box = document.createElement('input');
	file_box.type = 'file';
	container.appendChild(file_box);

	url_box.addEventListener('change', () => {
		file_box.value = '';
		download_image(url_box.value).then(callback);
	});

	file_box.addEventListener('change', () => {
		url_box.value = '';
		callback(file_box.files[0]);
	});

	return container;
}

module.exports = {
	clear_children: clear_children,
	clear_page: clear_page,
	remove_node: remove_node,
	common_styles: apply_common_styles,
	add_css: add_css,
	string_to_node: string_to_node,
	multi_input: multi_input,
	move_children: move_children
};

},{"./../../dependencies/gm_functions.js":3,"./hash_image.js":31}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
const { artist_commentary, commentary_button } = require('./artist_commentary.js');
const { upload_button } = require('./upload_url.js');
const { data_to_span } = require('./hash_image.js');
const { common_styles, add_css } = require('./nodes.js');

function build_simple (options) {
	options = transform_options(options);
	// artist
	// title
	// description
	// full_url
	// hashes
	// css

	const commentary = artist_commentary(
		options.artist,
		options.title,
		options.description
	);

	const commentary_span = document.createElement('span');
	commentary_span.appendChild(commentary_button(commentary));

	const sources = [
		options.full_url,
		options.artist.href,
		window.location.href
	];

	const upload_span = document.createElement('span');
	const upload_link = upload_button(options.full_url, sources, commentary);
	upload_span.appendChild(upload_link);

	common_styles();
	add_css(options.css);

	return {
		description: commentary_span,
		upload: upload_span,
		hashes: data_to_span(options.hashes)
	};
}

function transform_options (options) {
	Object.entries(options).forEach(([key, value]) => {
		if (typeof value === 'function') {
			options[key] = options[key]();
		}
	});

	options.hashes = [[options.full_url, 'full image']].concat(options.hashes);

	return options;
}

module.exports = {
	simple_site: build_simple
};

},{"./artist_commentary.js":29,"./hash_image.js":31,"./nodes.js":33,"./upload_url.js":36}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
const GM = require('./../../dependencies/gm_functions.js');

module.exports = {
	...require('./artist_commentary.js'),
	...require('./e621_api.js'),
	...require('./hash_image.js'),
	...require('./node_to_dtext.js'),
	...require('./nodes.js'),
	...require('./safe_link.js'),
	...require('./upload_url.js'),
	...require('./simple_site.js'),
	GM: GM
};

},{"./../../dependencies/gm_functions.js":3,"./artist_commentary.js":29,"./e621_api.js":30,"./hash_image.js":31,"./node_to_dtext.js":32,"./nodes.js":33,"./safe_link.js":34,"./simple_site.js":35,"./upload_url.js":36}]},{},[6]);
