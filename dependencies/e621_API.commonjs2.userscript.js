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
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/comment/create/comment_create.js":
/*!*************************************************!*\
  !*** ./source/comment/create/comment_create.js ***!
  \*************************************************/
/*! exports provided: comment_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comment_create", function() { return comment_create; });
const { raw_comment_create } = __webpack_require__(/*! ./raw_comment_create.js */ "./source/comment/create/raw_comment_create.js");

async function comment_create (post_id, text) {
	return raw_comment_create.call(this, {
		'comment[post_id]': post_id,
		'comment[body]': text
	});
}




/***/ }),

/***/ "./source/comment/create/raw_comment_create.js":
/*!*****************************************************!*\
  !*** ./source/comment/create/raw_comment_create.js ***!
  \*****************************************************/
/*! exports provided: raw_comment_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_comment_create", function() { return raw_comment_create; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



// Add support for ['do_not_bump_post', 'is_sticky', 'is_hidden']

async function raw_comment_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/comments',
		response: 'JSON',

		format: 'FORM',
		data: {
			'comment[post_id]': settings['comment[post_id]'],
			'comment[body]': settings['comment[body]']
		},
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['comment[post_id]'], 'comment[post_id]');
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_string"])(settings['comment[body]'], 'comment[body]');
}




/***/ }),

/***/ "./source/download/download.userscript.js":
/*!************************************************!*\
  !*** ./source/download/download.userscript.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
	const request_options = build_request_options.call(this, settings);

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
	}

	const request_options = {
		url: url.href,
		method: settings.method,
		responseType: settings.response === 'JSON' ? 'json' : 'text',
		headers: {
			'user-agent': this.useragent
		}
	};

	const has_credentials = (this.username !== undefined && this.api_key !== undefined);
	if (settings.authenticate || has_credentials) {
		const key = `Basic ${btoa(`${this.username}:${this.api_key}`)}`;
		request_options.headers.Authorization = key;
	}

	if (settings.format === 'FORM') {
		const form = new FormData();
		Object.entries(settings.data).forEach(([key, value]) => {
			if (value.constructor === ArrayBuffer) {
				form.append(key, new Blob([value]));
			} else {
				form.append(key, value);
			}
		});

		request_options.data = form;
	}

	return request_options;
}

/* harmony default export */ __webpack_exports__["default"] = (download);


/***/ }),

/***/ "./source/main.js":
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _post_show_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post/show/raw_post_show.js */ "./source/post/show/raw_post_show.js");
/* harmony import */ var _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post/show/post_show.js */ "./source/post/show/post_show.js");
/* harmony import */ var _post_index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post/index/raw_post_search.js */ "./source/post/index/raw_post_search.js");
/* harmony import */ var _post_index_post_search_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./post/index/post_search.js */ "./source/post/index/post_search.js");
/* harmony import */ var _post_index_post_search_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./post/index/post_search_iterator.js */ "./source/post/index/post_search_iterator.js");
/* harmony import */ var _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post/vote/raw_post_vote.js */ "./source/post/vote/raw_post_vote.js");
/* harmony import */ var _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./post/vote/post_vote.js */ "./source/post/vote/post_vote.js");
/* harmony import */ var _post_create_raw_post_create_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./post/create/raw_post_create.js */ "./source/post/create/raw_post_create.js");
/* harmony import */ var _post_create_post_create_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./post/create/post_create.js */ "./source/post/create/post_create.js");
/* harmony import */ var _post_update_raw_post_update_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./post/update/raw_post_update.js */ "./source/post/update/raw_post_update.js");
/* harmony import */ var _post_update_post_update_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./post/update/post_update.js */ "./source/post/update/post_update.js");
/* harmony import */ var _post_copy_notes_raw_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./post/copy_notes/raw_post_copy_notes.js */ "./source/post/copy_notes/raw_post_copy_notes.js");
/* harmony import */ var _post_copy_notes_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./post/copy_notes/post_copy_notes.js */ "./source/post/copy_notes/post_copy_notes.js");
/* harmony import */ var _post_flag_create_raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./post_flag/create/raw_post_flag_create.js */ "./source/post_flag/create/raw_post_flag_create.js");
/* harmony import */ var _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./post_flag/create/post_flag_create.js */ "./source/post_flag/create/post_flag_create.js");
/* harmony import */ var _comment_create_raw_comment_create_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./comment/create/raw_comment_create.js */ "./source/comment/create/raw_comment_create.js");
/* harmony import */ var _comment_create_comment_create_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./comment/create/comment_create.js */ "./source/comment/create/comment_create.js");
/* harmony import */ var _post_bvas_post_bvas_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./post/bvas/post_bvas.js */ "./source/post/bvas/post_bvas.js");



























class E621API {
	// Any of these can be anything, but errors will be thrown
	// when any requests are trying to be made.
	constructor (useragent, username, api_key) {
		this.useragent = useragent;
		this.username = username;
		this.api_key = api_key;
	}
}

E621API.prototype.version = '1.00100';

E621API.prototype.raw_post_show = _post_show_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_show"];
E621API.prototype.post_show_id = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__["post_show_id"];
E621API.prototype.post_show_md5 = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__["post_show_md5"];
E621API.prototype.post_show = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__["post_show"];

E621API.prototype.raw_post_search = _post_index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_2__["raw_post_search"];
E621API.prototype.post_search = _post_index_post_search_js__WEBPACK_IMPORTED_MODULE_3__["post_search"];
E621API.prototype.post_search_iterator = _post_index_post_search_iterator_js__WEBPACK_IMPORTED_MODULE_4__["post_search_iterator"];

E621API.prototype.raw_post_vote = _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__["raw_post_vote"];
E621API.prototype.post_vote_up = _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__["post_vote_up"];
E621API.prototype.post_vote_down = _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__["post_vote_down"];
E621API.prototype.post_vote_remove = _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__["post_vote_remove"];

E621API.prototype.raw_post_create = _post_create_raw_post_create_js__WEBPACK_IMPORTED_MODULE_7__["raw_post_create"];
E621API.prototype.post_create = _post_create_post_create_js__WEBPACK_IMPORTED_MODULE_8__["post_create"];

E621API.prototype.raw_post_update = _post_update_raw_post_update_js__WEBPACK_IMPORTED_MODULE_9__["raw_post_update"];
E621API.prototype.post_update = _post_update_post_update_js__WEBPACK_IMPORTED_MODULE_10__["post_update"];

E621API.prototype.raw_post_copy_notes = _post_copy_notes_raw_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_11__["raw_post_copy_notes"];
E621API.prototype.post_copy_notes = _post_copy_notes_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_12__["post_copy_notes"];

E621API.prototype.raw_post_flag_create = _post_flag_create_raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_13__["raw_post_flag_create"];
E621API.prototype.post_flag_create = _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__["post_flag_create"];
E621API.prototype.post_flag_reasons = _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__["post_flag_reasons"];

E621API.prototype.raw_comment_create = _comment_create_raw_comment_create_js__WEBPACK_IMPORTED_MODULE_15__["raw_comment_create"];
E621API.prototype.comment_create = _comment_create_comment_create_js__WEBPACK_IMPORTED_MODULE_16__["comment_create"];

E621API.prototype.post_bvas = _post_bvas_post_bvas_js__WEBPACK_IMPORTED_MODULE_17__["post_bvas"];

/* harmony default export */ __webpack_exports__["default"] = (E621API);


/***/ }),

/***/ "./source/post/bvas/post_bvas.js":
/*!***************************************!*\
  !*** ./source/post/bvas/post_bvas.js ***!
  \***************************************/
/*! exports provided: post_bvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_bvas", function() { return post_bvas; });
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");


// settings = {
//   post_id: id of the post to be replaced
//   replacement: the replacement file/URL
//   comment: boolean if a comment should be posted to the new post
//   description: boolean if the description should be edited.
//   message: message of superior quality. '%' replaced with old_id
//   delete: boolean. If true will try to delete post. if false will flag
// }

async function post_bvas (settings) {
	settings = apply_defaults(settings);
	const old_post = await this.post_show(settings.post_id);
	settings.message = settings.message.replace('%', old_post.id);

	const new_post = await this.post_create({
		tags: filter_tags(old_post.tags),
		sources: old_post.sources,
		description: settings.description === true ? `${settings.message}\n${old_post.description}` : old_post.description,
		rating: old_post.rating,
		parent_id: old_post.relationships.parent_id,

		upload: settings.replacement
	});

	if (settings.comment === true) {
		await this.comment_create(new_post.post_id, settings.message);
	}

	await set_parent.call(this, old_post.id, new_post.post_id);
	for (const child_id of old_post.relationships.children) {
		await set_parent.call(this, child_id, new_post.post_id);
	}
	// Fix with pool

	await this.post_copy_notes(old_post.id, new_post.post_id);

	// optionally delete the post
	await this.post_flag_create(this.post_flag_reasons.inferior, old_post.id, new_post.post_id);
}

function apply_defaults (settings) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_0__["validate_counting_number"])(settings.post_id, 'post_id');
	if (settings.replacement === undefined) {
		throw new Error('replacement must be defined');
	}

	return {
		post_id: settings.post_id,
		comment: nullish(settings.comment, false),
		description: nullish(settings.description, true),
		message: nullish(settings.message, 'Superior version of post #%'),
		delete: nullish(settings.delete, false),
		replacement: settings.replacement
	};
}

function nullish (value, replacement) {
	if (value === null || value === undefined) {
		return replacement;
	} else {
		return value;
	}
}

async function set_parent (post_id, new_parent) {
	return this.post_update({
		id: post_id,
		parent_id: new_parent
	});
}

function filter_tags (tag_object) {
	const tags_to_remove = [
		'better_version_at_source',
		'smaller_version_at_source',
		'compression_artifacts',
		'cropped',
		'upscale'
	];

	return Object.values(tag_object)
		.reduce((acc, e) => acc.concat(e))
		.filter(e => tags_to_remove.includes(e) === false);
}




/***/ }),

/***/ "./source/post/copy_notes/post_copy_notes.js":
/*!***************************************************!*\
  !*** ./source/post/copy_notes/post_copy_notes.js ***!
  \***************************************************/
/*! exports provided: post_copy_notes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_copy_notes", function() { return post_copy_notes; });
const { raw_post_copy_notes } = __webpack_require__(/*! ./raw_post_copy_notes.js */ "./source/post/copy_notes/raw_post_copy_notes.js");

async function post_copy_notes (post_id, to_id) {
	return raw_post_copy_notes.call(this, {
		id: post_id,
		other_post_id: to_id
	});
}




/***/ }),

/***/ "./source/post/copy_notes/raw_post_copy_notes.js":
/*!*******************************************************!*\
  !*** ./source/post/copy_notes/raw_post_copy_notes.js ***!
  \*******************************************************/
/*! exports provided: raw_post_copy_notes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_copy_notes", function() { return raw_post_copy_notes; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_copy_notes (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'PUT',
		path: `/posts/${settings.id}/copy_notes`,
		response: 'JSON',

		format: 'URL',
		data: {
			id: settings.id,
			other_post_id: settings.other_post_id
		}
	}).catch(handle_error);
}

function handle_error (error) {
	if (error.response.data.reason === 'Post has no notes') {
		return null; // Expected behavior is to have no errors thrown if post has no notes
	} else {
		// Todo
		console.log(error);
		throw error;
	}
}

function validate_settings (settings) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.id, 'id');
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.other_post_id, 'other_post_id');
}




/***/ }),

/***/ "./source/post/create/post_create.js":
/*!*******************************************!*\
  !*** ./source/post/create/post_create.js ***!
  \*******************************************/
/*! exports provided: post_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_create", function() { return post_create; });
const { raw_post_create } = __webpack_require__(/*! ./raw_post_create.js */ "./source/post/create/raw_post_create.js");

async function post_create (settings) {
	validate_settings(settings);
	return raw_post_create.call(this, transform_settings(settings));
}

function validate_settings (settings) {
	if (settings.upload === undefined) {
		throw new Error('You must supply an upload file to upload a post');
	}

	if (typeof settings.rating !== 'string') {
		throw new Error('rating must be of type string');
	} else if (['e', 'q', 's'].includes(settings.rating.charAt(0)) === false) {
		throw new Error('first character of rating must be one of [\'e\', \'q\', \'s\']');
	}

	if (settings.tags !== undefined) {
		if (Array.isArray(settings.tags === false)) {
			throw new Error('tags must be of type array');
		} else if (settings.tags.every(e => typeof e === 'string') === false) {
			throw new Error('every element of tags must of of type string');
		}
	}

	if (settings.sources !== undefined) {
		if (Array.isArray(settings.sources === false)) {
			throw new Error('sources must be of type array');
		} else if (settings.tags.every(e => typeof e === 'string') === false) {
			throw new Error('every element of sources must of of type string');
		}
	}
}

function transform_settings (settings) {
	const return_object = {
		'upload[tag_string]': (settings.tags || []).join(' '),
		'upload[rating]': settings.rating.charAt(0),
		'upload[source]': (settings.sources || []).join('\n'),
		'upload[description]': (settings.description || ''),
		'upload[parent_id]': (settings.parent_id || null)
	};

	if (settings.upload.constructor === ArrayBuffer) {
		return_object['upload[file]'] = settings.upload;
	} else {
		return_object['upload[direct_url]'] = settings.upload;
	}

	return return_object;
}




/***/ }),

/***/ "./source/post/create/raw_post_create.js":
/*!***********************************************!*\
  !*** ./source/post/create/raw_post_create.js ***!
  \***********************************************/
/*! exports provided: raw_post_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_create", function() { return raw_post_create; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



// upload[tag_string] A space delimited list of tags.
// upload[file] The file data encoded as a multipart form.
// upload[rating] The rating for the post. Can be: s, q or e for safe, questionable, and explicit respectively.
// upload[direct_url] If this is a URL, e621 will download the file.
// upload[source] This will be used as the post's 'Source' text. Separate multiple URLs with %0A (url-encoded newline) to define multiple sources. Limit of ten URLs
// upload[description] The description for the post.
// upload[parent_id] The ID of the parent post.
// upload[referer_url]         ?
// upload[md5_confirmation]    useless
// upload[as_pending] If true post will be posted as pending

// tag_string, rating, source (file || direct_ulr) are required
// all others should be null

async function raw_post_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/uploads',
		response: 'JSON',

		format: 'FORM',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function make_data (settings) {
	const new_settings = {
		'upload[tag_string]': settings['upload[tag_string]'],
		'upload[rating]': settings['upload[rating]'],
		'upload[source]': settings['upload[source]']
	};

	if (settings['upload[file]'] !== undefined) {
		new_settings['upload[file]'] = settings['upload[file]'];
	} else {
		new_settings['upload[direct_url]'] = settings['upload[direct_url]'];
	}

	if (settings['upload[description]'] !== null) {
		new_settings['upload[description]'] = settings['upload[description]'];
	}

	if (settings['upload[parent_id]'] !== null) {
		new_settings['upload[parent_id]'] = settings['upload[parent_id]'];
	}

	return new_settings;
}

function validate_settings (settings) {
	if (settings['upload[tag_string]'] === undefined) {
		throw new Error('upload[tag_string] must be present');
	} else if (typeof settings['upload[tag_string]'] !== 'string') {
		throw new Error('upload[tag_string] must be of type string');
	}

	if (settings['upload[file]'] !== undefined && settings['upload[direct_url]'] !== undefined) {
		throw new Error('Both upload[file] and upload[direct_url] can not be defined');
	} else if (settings['upload[file]'] === undefined && settings['upload[direct_url]'] === undefined) {
		throw new Error('Either upload[file] or upload[direct_url] must be defined');
	}

	// todo test this
	if (settings['upload[file]']) {
		if (settings['upload[file]'].constructor !== ArrayBuffer) {
			throw new Error('upload[file] must be of type ArrayBuffer');
		}

		// Check for data in the array buffer?
	}

	if (settings['upload[direct_url]']) {
		if (typeof settings['upload[direct_url]'] !== 'string') {
			throw new Error('upload[direct_url] must be of type string');
		}

		// Check it is an actual url?
	}

	if (['s', 'q', 'e'].includes(settings['upload[rating]']) === false) {
		throw new Error('upload[rating] must be one of [\'s\', \'q\', \'e\']');
	}

	if (settings['upload[source]'] === undefined) {
		throw new Error('upload[source] must be present');
	} else if (typeof settings['upload[source]'] !== 'string') {
		throw new Error('upload[source] must be undefined or of type string or null');
	}

	if (settings['upload[description]'] === undefined) {
		throw new Error('upload[description] must be present');
	} else if (typeof settings['upload[description]'] !== 'string') {
		throw new Error('upload[description] must be of type string');
	}

	if (settings['upload[parent_id]'] === undefined) {
		throw new Error('upload[parent_id] must present');
	} else if (settings['upload[parent_id]'] === null) {
		// It is fine if parent_id is null
	} else {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['upload[parent_id]'], 'upload[parent_id]');
	}
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/index/post_search.js":
/*!******************************************!*\
  !*** ./source/post/index/post_search.js ***!
  \******************************************/
/*! exports provided: post_search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_search", function() { return post_search; });
/* harmony import */ var _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_search.js */ "./source/post/index/raw_post_search.js");


async function post_search (tag_string, page = 0) {
	return _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_search"].call(this, {
		limit: 320,
		tags: tag_string,
		page: page.toString()
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/index/post_search_iterator.js":
/*!***************************************************!*\
  !*** ./source/post/index/post_search_iterator.js ***!
  \***************************************************/
/*! exports provided: post_search_iterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_search_iterator", function() { return post_search_iterator; });
/* harmony import */ var _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_search.js */ "./source/post/index/raw_post_search.js");


const posts_per_page = 320;

// You can not have a different order when searching through posts like this
async function* post_search_iterator (search_string) {
	// "Providing arbitrarily large values to obtain the most recent posts
	// is not portable and may break in the future". (wiki)
	// I do what I want
	let max_id = 1e9;
	while (true) {
		// https://github.com/zwagoth/e621ng/issues/202
		const { posts } = await _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_search"].call(this, {
			tags: search_string,
			limit: posts_per_page,
			page: `b${max_id}`
		}).catch(handle_error);

		yield* posts;
		max_id = posts.reduce((acc, e) => acc.id < e.id ? acc : e).id;

		if (posts.length < posts_per_page) {
			return;
		}
	}
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/index/raw_post_search.js":
/*!**********************************************!*\
  !*** ./source/post/index/raw_post_search.js ***!
  \**********************************************/
/*! exports provided: raw_post_search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_search", function() { return raw_post_search; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



// There is an edge case where the data can be md5=<md5>

async function raw_post_search (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: '/posts',
		response: 'JSON',

		format: 'URL',
		data: make_data(settings)
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	if (settings.tags !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_string"])(settings.tags, 'tags');
	}

	if (settings.limit !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.limit, 'limit');
	}

	if (settings.page !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_page_string"])(settings.page, 'page');
	}
}

function make_data (settings) {
	const return_object = {};

	if (settings.limit !== null) {
		return_object.limit = settings.limit;
	}

	if (settings.tags !== null) {
		return_object.tags = settings.tags;
	}

	if (settings.page !== null) {
		return_object.page = settings.page;
	}

	return return_object;
}




/***/ }),

/***/ "./source/post/show/post_show.js":
/*!***************************************!*\
  !*** ./source/post/show/post_show.js ***!
  \***************************************/
/*! exports provided: post_show_id, post_show_md5, post_show */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_show_id", function() { return post_show_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_show_md5", function() { return post_show_md5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_show", function() { return post_show; });
/* harmony import */ var _index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../index/raw_post_search.js */ "./source/post/index/raw_post_search.js");
/* harmony import */ var _raw_post_show_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw_post_show.js */ "./source/post/show/raw_post_show.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");




async function post_show_id (post_id) {
	return _raw_post_show_js__WEBPACK_IMPORTED_MODULE_1__["raw_post_show"].call(this, {
		id: post_id
	}).then(e => e.post);
}

async function post_show_md5 (md5) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_2__["validate_md5"])(md5);
	return _index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_search"].call(this, {
		tags: `md5:${md5}`,
		limit: 1
	}).then(e => {
		if (e.posts.length === 0) {
			return null;
		} else {
			return e.posts[0];
		}
	});
}

async function post_show (id_md5) {
	if (typeof id_md5 === 'string' && id_md5.length === 32) {
		return post_show_md5.call(this, id_md5);
	} else {
		return post_show_id.call(this, Number(id_md5));
	}
}




/***/ }),

/***/ "./source/post/show/raw_post_show.js":
/*!*******************************************!*\
  !*** ./source/post/show/raw_post_show.js ***!
  \*******************************************/
/*! exports provided: raw_post_show */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_show", function() { return raw_post_show; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_show (settings) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.id, 'post_id');

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: `/posts/${settings.id}`,
		response: 'JSON',

		format: undefined,
		data: null
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/update/post_update.js":
/*!*******************************************!*\
  !*** ./source/post/update/post_update.js ***!
  \*******************************************/
/*! exports provided: post_update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_update", function() { return post_update; });
/* harmony import */ var _raw_post_update_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_update.js */ "./source/post/update/raw_post_update.js");


async function post_update (settings) {
	return _raw_post_update_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_update"].call(this, {
		id: settings.id,
		'post[tag_string_diff]': get_differences(settings, 'tags_to_add', 'tags_to_remove', ' '),
		'post[tag_string]': optional_join(settings.tags, ' '),
		'post[old_tag_string]': optional_join(settings.old_tags, ' '),
		'post[source_diff]': get_differences(settings, 'sources_to_add', 'sources_to_remove', '\n'),
		'post[source]': optional_join(settings.sources, '\n'),
		'post[old_source]': optional_join(settings.old_sources, '\n'),
		'post[description]': settings.description || null,
		'post[old_description]': settings.old_description || null,
		'post[parent_id]': settings.parent_id || null,
		'post[old_parent_id]': settings.old_parent_id || null,
		'post[rating]': get_rating(settings.rating),
		'post[old_rating]': get_rating(settings.old_rating),
		'post[edit_reason]': settings.reason || null
	});
}

// Idea for a different type of update function. Maybe its better in some cases
// async function transform_post (post_id, transform_function) {
//   const post = await get_post(post_id);
//   const new_post = await transform_function(post_id)
//   return post_update(post, new_post);
// }

function get_rating (rating) {
	if (rating !== undefined) {
		return rating.charAt(0);
	} else {
		return null;
	}
}

function optional_join (list, joiner) {
	if (list !== undefined) {
		return list.join(joiner);
	} else {
		return null;
	}
}

function get_differences (settings, add_string, remove_string, joiner) {
	if (settings[add_string] !== undefined || settings[remove_string] !== undefined) {
		const adds = (settings[add_string] || [])
			.join(joiner);
		const removes = (settings[remove_string] || [])
			.map(e => `-${e.toString()}`)
			.join(joiner);

		return `${adds}${joiner}${removes}`;
	} else {
		return null; // If no changes return null
	}
}




/***/ }),

/***/ "./source/post/update/raw_post_update.js":
/*!***********************************************!*\
  !*** ./source/post/update/raw_post_update.js ***!
  \***********************************************/
/*! exports provided: raw_post_update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_update", function() { return raw_post_update; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_update (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'PATCH',
		path: `/posts/${settings.id}`,
		response: 'JSON',

		format: 'FORM',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.id, 'id');

	[
		'post[tag_string_diff]',
		'post[tag_string]',
		'post[old_tag_string]',
		'post[source_diff]',
		'post[source]',
		'post[old_source]',
		'post[description]',
		'post[old_description]',
		// parent_id
		'post[rating]',
		'post[old_rating]',
		'post[edit_reason]'
		// has_embedded_notes will be removed at some point.
	].forEach(e => {
		if (settings[e] === undefined) {
			throw new Error(`${e} must be present`);
		} else if (settings[e] === null) {
			// all of these can be null
		} else if (typeof settings[e] !== 'string') {
			throw new Error(`${e} must be of type string`);
		}
	});

	if (settings['post[parent_id]'] === undefined) {
		throw new Error('post[parent_id] must be present');
	}

	if (settings['post[old_parent_id]'] === undefined) {
		throw new Error('post[old_parent_id] must be present');
	}

	[
		'tag_string',
		'source',
		'description',
		'parent_id',
		'rating'
	].forEach(e => {
		if (settings[`post[old_${e}]`] !== null && settings[`post[${e}]`] === null) {
			throw new Error(`old_${e} must not be present if ${e} is not present`);
		}
	});

	if (settings['post[tag_string]'] !== null && settings['post[tag_string_diff]'] !== null) {
		throw new Error('at most one of tag_string and tag_string_diff can be non-null');
	}

	if (settings['post[source]'] !== null && settings['post[source_diff]'] !== null) {
		throw new Error('at most one of source and source_diff can be non-null');
	}

	// Parent_id
	if (settings['post[parent_id]'] === undefined) {
		throw new Error('parent_id must be present');
	} else if (settings['post[parent_id]'] === null) {
		// it can be null without issue
	} else {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['post[parent_id]'], 'parent_id');
	}

	if (settings['post[old_parent_id]'] === undefined) {
		throw new Error('old_parent_id must be present');
	} else if (settings['post[old_parent_id]'] === null) {
		// it can be null without issue
	} else {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['post[old_parent_id]'], 'old_parent_id');
	}

	// Rating
	if (settings['post[rating]'] !== null && ['e', 'q', 's'].includes(settings['post[rating]']) === false) {
		throw new Error('rating must be one of [\'e\', \'q\', \'s\']');
	}

	if (settings['post[old_rating]'] !== null && ['e', 'q', 's'].includes(settings['post[old_rating]']) === false) {
		throw new Error('old_rating must be one of [\'e\', \'q\', \'s\']');
	}
}

function make_data (settings) {
	return [
		'post[tag_string_diff]',
		'post[tag_string]',
		'post[old_tag_string]',
		'post[source_diff]',
		'post[source]',
		'post[old_source]',
		'post[description]',
		'post[old_description]',
		'post[parent_id]',
		'post[old_parent_id]',
		'post[rating]',
		'post[old_rating]',
		'post[edit_reason]'
	].reduce((acc, e) => {
		if (settings[e] !== null) {
			acc[e] = settings[e];
		}

		return acc;
	}, {});
}




/***/ }),

/***/ "./source/post/vote/post_vote.js":
/*!***************************************!*\
  !*** ./source/post/vote/post_vote.js ***!
  \***************************************/
/*! exports provided: post_vote_up, post_vote_down */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_vote_up", function() { return post_vote_up; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_vote_down", function() { return post_vote_down; });
/* harmony import */ var _raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_vote.js */ "./source/post/vote/raw_post_vote.js");


async function post_vote_up (post_id) {
	return _raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_vote"].call(this, {
		id: post_id,
		score: 1,
		no_unvote: true
	});
}

async function post_vote_down (post_id) {
	_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_vote"].call(this, {
		id: post_id,
		score: -1,
		no_unvote: true
	});
}




/***/ }),

/***/ "./source/post/vote/raw_post_vote.js":
/*!*******************************************!*\
  !*** ./source/post/vote/raw_post_vote.js ***!
  \*******************************************/
/*! exports provided: raw_post_vote, post_vote_remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_vote", function() { return raw_post_vote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_vote_remove", function() { return post_vote_remove; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_vote (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: `/posts/${settings.id}/votes`,
		response: 'JSON',

		format: 'URL',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

async function post_vote_remove (id) {
	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'DELETE',
		path: `/posts/${id}/votes`,
		response: 'JSON',

		format: undefined,
		data: undefined,
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings.id, 'post_id');
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_vote_option"])(settings.score);

	if (settings.no_unvote !== null) {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_boolean"])(settings.no_unvote, 'no_unvote');
	}
}

function make_data (settings) {
	const return_object = {
		score: settings.score
	};

	if (settings.no_unvote !== null) {
		return_object.no_unvote = settings.no_unvote;
	}

	return return_object;
}




/***/ }),

/***/ "./source/post_flag/create/post_flag_create.js":
/*!*****************************************************!*\
  !*** ./source/post_flag/create/post_flag_create.js ***!
  \*****************************************************/
/*! exports provided: post_flag_create, post_flag_reasons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_flag_create", function() { return post_flag_create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post_flag_reasons", function() { return post_flag_reasons; });
/* harmony import */ var _raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_flag_create.js */ "./source/post_flag/create/raw_post_flag_create.js");


const post_flag_reasons = {
	deletion: 'deletion',
	inferior: 'inferior',
	custom: 'user',
	dnp: 'dnp_artist',
	pay_content: 'pay_content',
	trace: 'trace',
	previously_deleted: 'previously_deleted',
	real: 'real_porn',
	corrupt: 'corrupt'
};

async function post_flag_create (reason, post_id, extra) {
	if (post_flag_reasons[reason] === undefined) {
		throw new Error(`reason must be one of [${Object.keys(post_flag_reasons).join(', ')}]`);
	}

	const data = {
		'post_flag[post_id]': post_id,
		'post_flag[reason_name]': post_flag_reasons[reason],
		'post_flag[user_reason]': null,
		'post_flag[parent_id]': null
	};

	if (reason === post_flag_reasons.custom) {
		data['post_flag[user_reason]'] = extra;
	} else if (reason === post_flag_reasons.inferior) {
		data['post_flag[parent_id]'] = extra;
	}

	return _raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_0__["raw_post_flag_create"].call(this, data);
}




/***/ }),

/***/ "./source/post_flag/create/raw_post_flag_create.js":
/*!*********************************************************!*\
  !*** ./source/post_flag/create/raw_post_flag_create.js ***!
  \*********************************************************/
/*! exports provided: raw_post_flag_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_flag_create", function() { return raw_post_flag_create; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_flag_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/post_flags',
		response: 'JSON',

		format: 'URL',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function validate_settings (settings) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['post_flag[post_id]'], 'post_flag[post_id]');
	const valid_reason = [
		'deletion',
		'inferior',
		'user',
		'dnp_artist',
		'pay_content',
		'trace',
		'previously_deleted',
		'real_porn',
		'corrupt'
	];

	if (valid_reason.includes(settings['post_flag[reason_name]']) === false) {
		throw new Error(`post_flag[reason_name] must be one of [${valid_reason.join(', ')}]`);
	}

	if (settings['post_flag[reason_name]'] === 'user') {
		if (typeof settings['post_flag[user_reason]'] !== 'string')	{
			throw new Error('if post_flag[reason_name] is \'user\' then post_flag[user_reason] must be a string');
		}
	} else if (settings['post_flag[user_reason]'] !== null) {
		throw new Error('post_flag[user_reason] must be null unless post_flag[reason_name] is \'user\'');
	}

	if (settings['post_flag[reason_name]'] === 'inferior') {
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_counting_number"])(settings['post_flag[parent_id]'], 'post_flag[parent_id]');
	} else if (settings['post_flag[parent_id]'] !== null) {
		throw new Error('post_flag[parent_id] must be null unless post_flag[parent_id] is \'inferior\'');
	}
}

function make_data (settings) {
	const return_object = {
		'post_flag[post_id]': settings['post_flag[post_id]'],
		'post_flag[reason_name]': settings['post_flag[reason_name]']
	};

	if (settings['post_flag[reason_name]'] === 'user') {
		return_object['post_flag[user_reason]'] = settings['post_flag[user_reason]'];
	} else if (settings['post_flag[reason_name]'] === 'inferior') {
		return_object['post_flag[parent_id]'] = settings['post_flag[parent_id]'];
	}

	return return_object;
}

function handle_error (err) {
	console.log(err);
	throw err;
};




/***/ }),

/***/ "./source/validation/validation.js":
/*!*****************************************!*\
  !*** ./source/validation/validation.js ***!
  \*****************************************/
/*! exports provided: validate_md5, validate_counting_number, validate_string, validate_vote_option, validate_page_string, validate_boolean */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_md5", function() { return validate_md5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_counting_number", function() { return validate_counting_number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_string", function() { return validate_string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_vote_option", function() { return validate_vote_option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_page_string", function() { return validate_page_string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_boolean", function() { return validate_boolean; });
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

function validate_counting_number (number, name) {
	if (typeof number !== 'number') {
		throw new Error(`${name} must be a number`);
	}

	if (Number.isInteger(number) === false) {
		throw new Error(`${name}must be an integer`);
	}

	if (number < 0) {
		throw new Error(`${name} must be greater than zero`);
	}
}

function validate_string (string, name) {
	if (typeof string !== 'string') {
		throw new Error(`${name} is not a string`);
	}
}

function validate_vote_option (vote) {
	if (vote !== -1 && vote !== 0 && vote !== 1) {
		throw new Error('vote is not of the values [-1, 1]');
	}
}

function validate_page_string (string, name) {
	validate_string(string, name);

	if ((/[ab]?\d+/).test(string) === false) {
		throw new Error(`${name} does not match the format /[ab]?\\d+/`);
	}
}

function validate_boolean (boolean, name) {
	if (boolean !== false && boolean !== true) {
		throw new Error(`${name} is not of the type boolean`);
	}
}




/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9FNjIxQVBJL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvY29tbWVudC9jcmVhdGUvY29tbWVudF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9jb21tZW50L2NyZWF0ZS9yYXdfY29tbWVudF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9kb3dubG9hZC9kb3dubG9hZC51c2Vyc2NyaXB0LmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvbWFpbi5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvYnZhcy9wb3N0X2J2YXMuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2NvcHlfbm90ZXMvcG9zdF9jb3B5X25vdGVzLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9jb3B5X25vdGVzL3Jhd19wb3N0X2NvcHlfbm90ZXMuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2NyZWF0ZS9wb3N0X2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvY3JlYXRlL3Jhd19wb3N0X2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvaW5kZXgvcG9zdF9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2luZGV4L3Bvc3Rfc2VhcmNoX2l0ZXJhdG9yLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9pbmRleC9yYXdfcG9zdF9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3Nob3cvcG9zdF9zaG93LmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9zaG93L3Jhd19wb3N0X3Nob3cuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3VwZGF0ZS9wb3N0X3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvdXBkYXRlL3Jhd19wb3N0X3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3Qvdm90ZS9wb3N0X3ZvdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3ZvdGUvcmF3X3Bvc3Rfdm90ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3RfZmxhZy9jcmVhdGUvcG9zdF9mbGFnX2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3RfZmxhZy9jcmVhdGUvcmF3X3Bvc3RfZmxhZ19jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7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Ozs7Ozs7Ozs7Ozs7QUN0Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBK0Q7QUFDYTs7QUFFNUU7QUFDQTs7QUFFQSxRQUFRLG9FQUFRO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQSxDQUFDLDBGQUF3QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNERBQTRELHdCQUF3QjtBQUNwRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0EsRUFBRSwwRkFBd0I7QUFDMUIsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVnQzs7Ozs7Ozs7Ozs7OztBQ3RFaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLEtBQUs7QUFDMUI7O0FBRUE7QUFDQSxxQkFBcUIsS0FBSztBQUMxQjs7QUFFQTtBQUNBLHFCQUFxQixLQUFLO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixLQUFLO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLEtBQUs7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLEtBQUs7QUFDMUI7QUFDQTs7QUFTRSIsImZpbGUiOiJlNjIxX0FQSS5jb21tb25qczIudXNlcnNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc291cmNlL21haW4uanNcIik7XG4iLCJjb25zdCB7IHJhd19jb21tZW50X2NyZWF0ZSB9ID0gcmVxdWlyZSgnLi9yYXdfY29tbWVudF9jcmVhdGUuanMnKTtcblxuYXN5bmMgZnVuY3Rpb24gY29tbWVudF9jcmVhdGUgKHBvc3RfaWQsIHRleHQpIHtcblx0cmV0dXJuIHJhd19jb21tZW50X2NyZWF0ZS5jYWxsKHRoaXMsIHtcblx0XHQnY29tbWVudFtwb3N0X2lkXSc6IHBvc3RfaWQsXG5cdFx0J2NvbW1lbnRbYm9keV0nOiB0ZXh0XG5cdH0pO1xufVxuXG5leHBvcnQgeyBjb21tZW50X2NyZWF0ZSB9O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIsXG5cdHZhbGlkYXRlX3N0cmluZ1xufSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbi8vIEFkZCBzdXBwb3J0IGZvciBbJ2RvX25vdF9idW1wX3Bvc3QnLCAnaXNfc3RpY2t5JywgJ2lzX2hpZGRlbiddXG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19jb21tZW50X2NyZWF0ZSAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRwYXRoOiAnL2NvbW1lbnRzJyxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnRk9STScsXG5cdFx0ZGF0YToge1xuXHRcdFx0J2NvbW1lbnRbcG9zdF9pZF0nOiBzZXR0aW5nc1snY29tbWVudFtwb3N0X2lkXSddLFxuXHRcdFx0J2NvbW1lbnRbYm9keV0nOiBzZXR0aW5nc1snY29tbWVudFtib2R5XSddXG5cdFx0fSxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3NbJ2NvbW1lbnRbcG9zdF9pZF0nXSwgJ2NvbW1lbnRbcG9zdF9pZF0nKTtcblx0dmFsaWRhdGVfc3RyaW5nKHNldHRpbmdzWydjb21tZW50W2JvZHldJ10sICdjb21tZW50W2JvZHldJyk7XG59XG5cbmV4cG9ydCB7IHJhd19jb21tZW50X2NyZWF0ZSB9O1xuIiwiLyogSW5wdXQgdG8gdGhpcyBtZXRob2QgaXMgc3RydWN0dXJlZCBsaWtlIHRoaXNcbntcblx0bWV0aG9kOiAnUE9TVCcgfCAnR0VUJyAvLyBEZWZpbmVzIGhvdyB0aGUgcmVxdWVzdCBzaG91bGQgYmUgbWFkZVxuXHRwYXRoOiA8c3RyaW5nPiAvLyBUaGUgcGF0aCBvZiB0aGUgVVJMIHRoYXQgaXMgYmVpbmcgYWNjZXNzZWRcblx0cmVzcG9uc2U6ICdKU09OJyB8ICdYTUwnIHwgJ0hUTUwnIC8vIERlZmluZXMgdGhlIHJlc3BvbnNlIHR5cGVcblxuXHRmb3JtYXQ6ICdVUkwnIHwgJ0ZPUk0nIHwgdW5kZWZpbmVkIC8vIERlZmluZXMgaG93IHRoZSBkYXRhIGlzIHBhc3NlZFxuXHRkYXRhOiA8b2JqZWN0PiB8IHVuZGVmaW5lZCAvLyBEYXRhIGJlaW5nIHBhc3NlZCBpbiB0aGUgcmVxdWVzdFxufVxuXG4qL1xuYXN5bmMgZnVuY3Rpb24gZG93bmxvYWQgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJlcXVlc3Rfb3B0aW9ucyA9IGJ1aWxkX3JlcXVlc3Rfb3B0aW9ucy5jYWxsKHRoaXMsIHNldHRpbmdzKTtcblxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGNvbnN0IG9uX2xvYWQgPSAoZSkgPT4ge1xuXHRcdFx0aWYgKGUuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0cmVzb2x2ZShlLnJlc3BvbnNlKTsgLy8gVGhpcyB3aWxsIGxpa2VseSBjYXVzZSBlcnJvcnMgbGF0ZXJcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcHJvbWlzZS1yZWplY3QtZXJyb3JzXG5cdFx0XHRcdHJlamVjdCh7XG5cdFx0XHRcdFx0cmVzcG9uc2U6IHtcblx0XHRcdFx0XHRcdHN0YXR1czogZS5zdGF0dXNcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGRhdGE6IGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJlcXVlc3Rfb3B0aW9ucy5vbmxvYWQgPSBvbl9sb2FkO1xuXHRcdHJlcXVlc3Rfb3B0aW9ucy5vbmVycm9yID0gb25fbG9hZDtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHRcdEdNLnhtbEh0dHBSZXF1ZXN0KHJlcXVlc3Rfb3B0aW9ucyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZF9yZXF1ZXN0X29wdGlvbnMgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHVybCA9IG5ldyBVUkwoJ2h0dHBzOi8vZTYyMS5uZXQvJyk7XG5cdHVybC5wYXRobmFtZSA9IHNldHRpbmdzLnBhdGggKyAnLicgKyBzZXR0aW5ncy5yZXNwb25zZS50b0xvd2VyQ2FzZSgpO1xuXG5cdGlmIChzZXR0aW5ncy5mb3JtYXQgPT09ICdVUkwnKSB7XG5cdFx0T2JqZWN0LmVudHJpZXMoc2V0dGluZ3MuZGF0YSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHR1cmwuc2VhcmNoUGFyYW1zLnNldChrZXksIHZhbHVlKTtcblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IHJlcXVlc3Rfb3B0aW9ucyA9IHtcblx0XHR1cmw6IHVybC5ocmVmLFxuXHRcdG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuXHRcdHJlc3BvbnNlVHlwZTogc2V0dGluZ3MucmVzcG9uc2UgPT09ICdKU09OJyA/ICdqc29uJyA6ICd0ZXh0Jyxcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHQndXNlci1hZ2VudCc6IHRoaXMudXNlcmFnZW50XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGhhc19jcmVkZW50aWFscyA9ICh0aGlzLnVzZXJuYW1lICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hcGlfa2V5ICE9PSB1bmRlZmluZWQpO1xuXHRpZiAoc2V0dGluZ3MuYXV0aGVudGljYXRlIHx8IGhhc19jcmVkZW50aWFscykge1xuXHRcdGNvbnN0IGtleSA9IGBCYXNpYyAke2J0b2EoYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLmFwaV9rZXl9YCl9YDtcblx0XHRyZXF1ZXN0X29wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0ga2V5O1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLmZvcm1hdCA9PT0gJ0ZPUk0nKSB7XG5cdFx0Y29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdE9iamVjdC5lbnRyaWVzKHNldHRpbmdzLmRhdGEpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuXHRcdFx0XHRmb3JtLmFwcGVuZChrZXksIG5ldyBCbG9iKFt2YWx1ZV0pKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmVxdWVzdF9vcHRpb25zLmRhdGEgPSBmb3JtO1xuXHR9XG5cblx0cmV0dXJuIHJlcXVlc3Rfb3B0aW9ucztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWQ7XG4iLCJpbXBvcnQgeyByYXdfcG9zdF9zaG93IH0gZnJvbSAnLi9wb3N0L3Nob3cvcmF3X3Bvc3Rfc2hvdy5qcyc7XG5pbXBvcnQge1xuXHRwb3N0X3Nob3dfaWQsXG5cdHBvc3Rfc2hvd19tZDUsXG5cdHBvc3Rfc2hvd1xufSBmcm9tICcuL3Bvc3Qvc2hvdy9wb3N0X3Nob3cuanMnO1xuXG5pbXBvcnQgeyByYXdfcG9zdF9zZWFyY2ggfSBmcm9tICcuL3Bvc3QvaW5kZXgvcmF3X3Bvc3Rfc2VhcmNoLmpzJztcbmltcG9ydCB7IHBvc3Rfc2VhcmNoIH0gZnJvbSAnLi9wb3N0L2luZGV4L3Bvc3Rfc2VhcmNoLmpzJztcbmltcG9ydCB7IHBvc3Rfc2VhcmNoX2l0ZXJhdG9yIH0gZnJvbSAnLi9wb3N0L2luZGV4L3Bvc3Rfc2VhcmNoX2l0ZXJhdG9yLmpzJztcblxuaW1wb3J0IHtcblx0cmF3X3Bvc3Rfdm90ZSxcblx0cG9zdF92b3RlX3JlbW92ZVxufSBmcm9tICcuL3Bvc3Qvdm90ZS9yYXdfcG9zdF92b3RlLmpzJztcbmltcG9ydCB7XG5cdHBvc3Rfdm90ZV91cCxcblx0cG9zdF92b3RlX2Rvd25cbn0gZnJvbSAnLi9wb3N0L3ZvdGUvcG9zdF92b3RlLmpzJztcblxuaW1wb3J0IHsgcmF3X3Bvc3RfY3JlYXRlIH0gZnJvbSAnLi9wb3N0L2NyZWF0ZS9yYXdfcG9zdF9jcmVhdGUuanMnO1xuaW1wb3J0IHsgcG9zdF9jcmVhdGUgfSBmcm9tICcuL3Bvc3QvY3JlYXRlL3Bvc3RfY3JlYXRlLmpzJztcblxuaW1wb3J0IHsgcmF3X3Bvc3RfdXBkYXRlIH0gZnJvbSAnLi9wb3N0L3VwZGF0ZS9yYXdfcG9zdF91cGRhdGUuanMnO1xuaW1wb3J0IHsgcG9zdF91cGRhdGUgfSBmcm9tICcuL3Bvc3QvdXBkYXRlL3Bvc3RfdXBkYXRlLmpzJztcblxuaW1wb3J0IHsgcmF3X3Bvc3RfY29weV9ub3RlcyB9IGZyb20gJy4vcG9zdC9jb3B5X25vdGVzL3Jhd19wb3N0X2NvcHlfbm90ZXMuanMnO1xuaW1wb3J0IHsgcG9zdF9jb3B5X25vdGVzIH0gZnJvbSAnLi9wb3N0L2NvcHlfbm90ZXMvcG9zdF9jb3B5X25vdGVzLmpzJztcblxuaW1wb3J0IHsgcmF3X3Bvc3RfZmxhZ19jcmVhdGUgfSBmcm9tICcuL3Bvc3RfZmxhZy9jcmVhdGUvcmF3X3Bvc3RfZmxhZ19jcmVhdGUuanMnO1xuaW1wb3J0IHtcblx0cG9zdF9mbGFnX2NyZWF0ZSxcblx0cG9zdF9mbGFnX3JlYXNvbnNcbn0gZnJvbSAnLi9wb3N0X2ZsYWcvY3JlYXRlL3Bvc3RfZmxhZ19jcmVhdGUuanMnO1xuXG5pbXBvcnQgeyByYXdfY29tbWVudF9jcmVhdGUgfSBmcm9tICcuL2NvbW1lbnQvY3JlYXRlL3Jhd19jb21tZW50X2NyZWF0ZS5qcyc7XG5pbXBvcnQgeyBjb21tZW50X2NyZWF0ZSB9IGZyb20gJy4vY29tbWVudC9jcmVhdGUvY29tbWVudF9jcmVhdGUuanMnO1xuXG5pbXBvcnQgeyBwb3N0X2J2YXMgfSBmcm9tICcuL3Bvc3QvYnZhcy9wb3N0X2J2YXMuanMnO1xuXG5jbGFzcyBFNjIxQVBJIHtcblx0Ly8gQW55IG9mIHRoZXNlIGNhbiBiZSBhbnl0aGluZywgYnV0IGVycm9ycyB3aWxsIGJlIHRocm93blxuXHQvLyB3aGVuIGFueSByZXF1ZXN0cyBhcmUgdHJ5aW5nIHRvIGJlIG1hZGUuXG5cdGNvbnN0cnVjdG9yICh1c2VyYWdlbnQsIHVzZXJuYW1lLCBhcGlfa2V5KSB7XG5cdFx0dGhpcy51c2VyYWdlbnQgPSB1c2VyYWdlbnQ7XG5cdFx0dGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuXHRcdHRoaXMuYXBpX2tleSA9IGFwaV9rZXk7XG5cdH1cbn1cblxuRTYyMUFQSS5wcm90b3R5cGUudmVyc2lvbiA9ICcxLjAwMTAwJztcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3Rfc2hvdyA9IHJhd19wb3N0X3Nob3c7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3Nob3dfaWQgPSBwb3N0X3Nob3dfaWQ7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3Nob3dfbWQ1ID0gcG9zdF9zaG93X21kNTtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfc2hvdyA9IHBvc3Rfc2hvdztcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3Rfc2VhcmNoID0gcmF3X3Bvc3Rfc2VhcmNoO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9zZWFyY2ggPSBwb3N0X3NlYXJjaDtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfc2VhcmNoX2l0ZXJhdG9yID0gcG9zdF9zZWFyY2hfaXRlcmF0b3I7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19wb3N0X3ZvdGUgPSByYXdfcG9zdF92b3RlO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF92b3RlX3VwID0gcG9zdF92b3RlX3VwO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF92b3RlX2Rvd24gPSBwb3N0X3ZvdGVfZG93bjtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfdm90ZV9yZW1vdmUgPSBwb3N0X3ZvdGVfcmVtb3ZlO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF9jcmVhdGUgPSByYXdfcG9zdF9jcmVhdGU7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X2NyZWF0ZSA9IHBvc3RfY3JlYXRlO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF91cGRhdGUgPSByYXdfcG9zdF91cGRhdGU7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3VwZGF0ZSA9IHBvc3RfdXBkYXRlO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF9jb3B5X25vdGVzID0gcmF3X3Bvc3RfY29weV9ub3RlcztcbkU2MjFBUEkucHJvdG90eXBlLnBvc3RfY29weV9ub3RlcyA9IHBvc3RfY29weV9ub3RlcztcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3RfZmxhZ19jcmVhdGUgPSByYXdfcG9zdF9mbGFnX2NyZWF0ZTtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3RfZmxhZ19jcmVhdGUgPSBwb3N0X2ZsYWdfY3JlYXRlO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9mbGFnX3JlYXNvbnMgPSBwb3N0X2ZsYWdfcmVhc29ucztcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X2NvbW1lbnRfY3JlYXRlID0gcmF3X2NvbW1lbnRfY3JlYXRlO1xuRTYyMUFQSS5wcm90b3R5cGUuY29tbWVudF9jcmVhdGUgPSBjb21tZW50X2NyZWF0ZTtcblxuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9idmFzID0gcG9zdF9idmFzO1xuXG5leHBvcnQgZGVmYXVsdCBFNjIxQVBJO1xuIiwiaW1wb3J0IHsgdmFsaWRhdGVfY291bnRpbmdfbnVtYmVyIH0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG4vLyBzZXR0aW5ncyA9IHtcbi8vICAgcG9zdF9pZDogaWQgb2YgdGhlIHBvc3QgdG8gYmUgcmVwbGFjZWRcbi8vICAgcmVwbGFjZW1lbnQ6IHRoZSByZXBsYWNlbWVudCBmaWxlL1VSTFxuLy8gICBjb21tZW50OiBib29sZWFuIGlmIGEgY29tbWVudCBzaG91bGQgYmUgcG9zdGVkIHRvIHRoZSBuZXcgcG9zdFxuLy8gICBkZXNjcmlwdGlvbjogYm9vbGVhbiBpZiB0aGUgZGVzY3JpcHRpb24gc2hvdWxkIGJlIGVkaXRlZC5cbi8vICAgbWVzc2FnZTogbWVzc2FnZSBvZiBzdXBlcmlvciBxdWFsaXR5LiAnJScgcmVwbGFjZWQgd2l0aCBvbGRfaWRcbi8vICAgZGVsZXRlOiBib29sZWFuLiBJZiB0cnVlIHdpbGwgdHJ5IHRvIGRlbGV0ZSBwb3N0LiBpZiBmYWxzZSB3aWxsIGZsYWdcbi8vIH1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9idmFzIChzZXR0aW5ncykge1xuXHRzZXR0aW5ncyA9IGFwcGx5X2RlZmF1bHRzKHNldHRpbmdzKTtcblx0Y29uc3Qgb2xkX3Bvc3QgPSBhd2FpdCB0aGlzLnBvc3Rfc2hvdyhzZXR0aW5ncy5wb3N0X2lkKTtcblx0c2V0dGluZ3MubWVzc2FnZSA9IHNldHRpbmdzLm1lc3NhZ2UucmVwbGFjZSgnJScsIG9sZF9wb3N0LmlkKTtcblxuXHRjb25zdCBuZXdfcG9zdCA9IGF3YWl0IHRoaXMucG9zdF9jcmVhdGUoe1xuXHRcdHRhZ3M6IGZpbHRlcl90YWdzKG9sZF9wb3N0LnRhZ3MpLFxuXHRcdHNvdXJjZXM6IG9sZF9wb3N0LnNvdXJjZXMsXG5cdFx0ZGVzY3JpcHRpb246IHNldHRpbmdzLmRlc2NyaXB0aW9uID09PSB0cnVlID8gYCR7c2V0dGluZ3MubWVzc2FnZX1cXG4ke29sZF9wb3N0LmRlc2NyaXB0aW9ufWAgOiBvbGRfcG9zdC5kZXNjcmlwdGlvbixcblx0XHRyYXRpbmc6IG9sZF9wb3N0LnJhdGluZyxcblx0XHRwYXJlbnRfaWQ6IG9sZF9wb3N0LnJlbGF0aW9uc2hpcHMucGFyZW50X2lkLFxuXG5cdFx0dXBsb2FkOiBzZXR0aW5ncy5yZXBsYWNlbWVudFxuXHR9KTtcblxuXHRpZiAoc2V0dGluZ3MuY29tbWVudCA9PT0gdHJ1ZSkge1xuXHRcdGF3YWl0IHRoaXMuY29tbWVudF9jcmVhdGUobmV3X3Bvc3QucG9zdF9pZCwgc2V0dGluZ3MubWVzc2FnZSk7XG5cdH1cblxuXHRhd2FpdCBzZXRfcGFyZW50LmNhbGwodGhpcywgb2xkX3Bvc3QuaWQsIG5ld19wb3N0LnBvc3RfaWQpO1xuXHRmb3IgKGNvbnN0IGNoaWxkX2lkIG9mIG9sZF9wb3N0LnJlbGF0aW9uc2hpcHMuY2hpbGRyZW4pIHtcblx0XHRhd2FpdCBzZXRfcGFyZW50LmNhbGwodGhpcywgY2hpbGRfaWQsIG5ld19wb3N0LnBvc3RfaWQpO1xuXHR9XG5cdC8vIEZpeCB3aXRoIHBvb2xcblxuXHRhd2FpdCB0aGlzLnBvc3RfY29weV9ub3RlcyhvbGRfcG9zdC5pZCwgbmV3X3Bvc3QucG9zdF9pZCk7XG5cblx0Ly8gb3B0aW9uYWxseSBkZWxldGUgdGhlIHBvc3Rcblx0YXdhaXQgdGhpcy5wb3N0X2ZsYWdfY3JlYXRlKHRoaXMucG9zdF9mbGFnX3JlYXNvbnMuaW5mZXJpb3IsIG9sZF9wb3N0LmlkLCBuZXdfcG9zdC5wb3N0X2lkKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlfZGVmYXVsdHMgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5ncy5wb3N0X2lkLCAncG9zdF9pZCcpO1xuXHRpZiAoc2V0dGluZ3MucmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncmVwbGFjZW1lbnQgbXVzdCBiZSBkZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHBvc3RfaWQ6IHNldHRpbmdzLnBvc3RfaWQsXG5cdFx0Y29tbWVudDogbnVsbGlzaChzZXR0aW5ncy5jb21tZW50LCBmYWxzZSksXG5cdFx0ZGVzY3JpcHRpb246IG51bGxpc2goc2V0dGluZ3MuZGVzY3JpcHRpb24sIHRydWUpLFxuXHRcdG1lc3NhZ2U6IG51bGxpc2goc2V0dGluZ3MubWVzc2FnZSwgJ1N1cGVyaW9yIHZlcnNpb24gb2YgcG9zdCAjJScpLFxuXHRcdGRlbGV0ZTogbnVsbGlzaChzZXR0aW5ncy5kZWxldGUsIGZhbHNlKSxcblx0XHRyZXBsYWNlbWVudDogc2V0dGluZ3MucmVwbGFjZW1lbnRcblx0fTtcbn1cblxuZnVuY3Rpb24gbnVsbGlzaCAodmFsdWUsIHJlcGxhY2VtZW50KSB7XG5cdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHJlcGxhY2VtZW50O1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRfcGFyZW50IChwb3N0X2lkLCBuZXdfcGFyZW50KSB7XG5cdHJldHVybiB0aGlzLnBvc3RfdXBkYXRlKHtcblx0XHRpZDogcG9zdF9pZCxcblx0XHRwYXJlbnRfaWQ6IG5ld19wYXJlbnRcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGZpbHRlcl90YWdzICh0YWdfb2JqZWN0KSB7XG5cdGNvbnN0IHRhZ3NfdG9fcmVtb3ZlID0gW1xuXHRcdCdiZXR0ZXJfdmVyc2lvbl9hdF9zb3VyY2UnLFxuXHRcdCdzbWFsbGVyX3ZlcnNpb25fYXRfc291cmNlJyxcblx0XHQnY29tcHJlc3Npb25fYXJ0aWZhY3RzJyxcblx0XHQnY3JvcHBlZCcsXG5cdFx0J3Vwc2NhbGUnXG5cdF07XG5cblx0cmV0dXJuIE9iamVjdC52YWx1ZXModGFnX29iamVjdClcblx0XHQucmVkdWNlKChhY2MsIGUpID0+IGFjYy5jb25jYXQoZSkpXG5cdFx0LmZpbHRlcihlID0+IHRhZ3NfdG9fcmVtb3ZlLmluY2x1ZGVzKGUpID09PSBmYWxzZSk7XG59XG5cbmV4cG9ydCB7IHBvc3RfYnZhcyB9O1xuIiwiY29uc3QgeyByYXdfcG9zdF9jb3B5X25vdGVzIH0gPSByZXF1aXJlKCcuL3Jhd19wb3N0X2NvcHlfbm90ZXMuanMnKTtcblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9jb3B5X25vdGVzIChwb3N0X2lkLCB0b19pZCkge1xuXHRyZXR1cm4gcmF3X3Bvc3RfY29weV9ub3Rlcy5jYWxsKHRoaXMsIHtcblx0XHRpZDogcG9zdF9pZCxcblx0XHRvdGhlcl9wb3N0X2lkOiB0b19pZFxuXHR9KTtcbn1cblxuZXhwb3J0IHsgcG9zdF9jb3B5X25vdGVzIH07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7IHZhbGlkYXRlX2NvdW50aW5nX251bWJlciB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3RfY29weV9ub3RlcyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdQVVQnLFxuXHRcdHBhdGg6IGAvcG9zdHMvJHtzZXR0aW5ncy5pZH0vY29weV9ub3Rlc2AsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ1VSTCcsXG5cdFx0ZGF0YToge1xuXHRcdFx0aWQ6IHNldHRpbmdzLmlkLFxuXHRcdFx0b3RoZXJfcG9zdF9pZDogc2V0dGluZ3Mub3RoZXJfcG9zdF9pZFxuXHRcdH1cblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHRpZiAoZXJyb3IucmVzcG9uc2UuZGF0YS5yZWFzb24gPT09ICdQb3N0IGhhcyBubyBub3RlcycpIHtcblx0XHRyZXR1cm4gbnVsbDsgLy8gRXhwZWN0ZWQgYmVoYXZpb3IgaXMgdG8gaGF2ZSBubyBlcnJvcnMgdGhyb3duIGlmIHBvc3QgaGFzIG5vIG5vdGVzXG5cdH0gZWxzZSB7XG5cdFx0Ly8gVG9kb1xuXHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzLmlkLCAnaWQnKTtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzLm90aGVyX3Bvc3RfaWQsICdvdGhlcl9wb3N0X2lkJyk7XG59XG5cbmV4cG9ydCB7IHJhd19wb3N0X2NvcHlfbm90ZXMgfTtcbiIsImNvbnN0IHsgcmF3X3Bvc3RfY3JlYXRlIH0gPSByZXF1aXJlKCcuL3Jhd19wb3N0X2NyZWF0ZS5qcycpO1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X2NyZWF0ZSAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXHRyZXR1cm4gcmF3X3Bvc3RfY3JlYXRlLmNhbGwodGhpcywgdHJhbnNmb3JtX3NldHRpbmdzKHNldHRpbmdzKSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHRpZiAoc2V0dGluZ3MudXBsb2FkID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHN1cHBseSBhbiB1cGxvYWQgZmlsZSB0byB1cGxvYWQgYSBwb3N0Jyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIHNldHRpbmdzLnJhdGluZyAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3JhdGluZyBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJyk7XG5cdH0gZWxzZSBpZiAoWydlJywgJ3EnLCAncyddLmluY2x1ZGVzKHNldHRpbmdzLnJhdGluZy5jaGFyQXQoMCkpID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignZmlyc3QgY2hhcmFjdGVyIG9mIHJhdGluZyBtdXN0IGJlIG9uZSBvZiBbXFwnZVxcJywgXFwncVxcJywgXFwnc1xcJ10nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy50YWdzICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShzZXR0aW5ncy50YWdzID09PSBmYWxzZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigndGFncyBtdXN0IGJlIG9mIHR5cGUgYXJyYXknKTtcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLnRhZ3MuZXZlcnkoZSA9PiB0eXBlb2YgZSA9PT0gJ3N0cmluZycpID09PSBmYWxzZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdldmVyeSBlbGVtZW50IG9mIHRhZ3MgbXVzdCBvZiBvZiB0eXBlIHN0cmluZycpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChzZXR0aW5ncy5zb3VyY2VzICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShzZXR0aW5ncy5zb3VyY2VzID09PSBmYWxzZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignc291cmNlcyBtdXN0IGJlIG9mIHR5cGUgYXJyYXknKTtcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLnRhZ3MuZXZlcnkoZSA9PiB0eXBlb2YgZSA9PT0gJ3N0cmluZycpID09PSBmYWxzZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdldmVyeSBlbGVtZW50IG9mIHNvdXJjZXMgbXVzdCBvZiBvZiB0eXBlIHN0cmluZycpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1fc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJldHVybl9vYmplY3QgPSB7XG5cdFx0J3VwbG9hZFt0YWdfc3RyaW5nXSc6IChzZXR0aW5ncy50YWdzIHx8IFtdKS5qb2luKCcgJyksXG5cdFx0J3VwbG9hZFtyYXRpbmddJzogc2V0dGluZ3MucmF0aW5nLmNoYXJBdCgwKSxcblx0XHQndXBsb2FkW3NvdXJjZV0nOiAoc2V0dGluZ3Muc291cmNlcyB8fCBbXSkuam9pbignXFxuJyksXG5cdFx0J3VwbG9hZFtkZXNjcmlwdGlvbl0nOiAoc2V0dGluZ3MuZGVzY3JpcHRpb24gfHwgJycpLFxuXHRcdCd1cGxvYWRbcGFyZW50X2lkXSc6IChzZXR0aW5ncy5wYXJlbnRfaWQgfHwgbnVsbClcblx0fTtcblxuXHRpZiAoc2V0dGluZ3MudXBsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuXHRcdHJldHVybl9vYmplY3RbJ3VwbG9hZFtmaWxlXSddID0gc2V0dGluZ3MudXBsb2FkO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybl9vYmplY3RbJ3VwbG9hZFtkaXJlY3RfdXJsXSddID0gc2V0dGluZ3MudXBsb2FkO1xuXHR9XG5cblx0cmV0dXJuIHJldHVybl9vYmplY3Q7XG59XG5cbmV4cG9ydCB7IHBvc3RfY3JlYXRlIH07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7IHZhbGlkYXRlX2NvdW50aW5nX251bWJlciB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuLy8gdXBsb2FkW3RhZ19zdHJpbmddIEEgc3BhY2UgZGVsaW1pdGVkIGxpc3Qgb2YgdGFncy5cbi8vIHVwbG9hZFtmaWxlXSBUaGUgZmlsZSBkYXRhIGVuY29kZWQgYXMgYSBtdWx0aXBhcnQgZm9ybS5cbi8vIHVwbG9hZFtyYXRpbmddIFRoZSByYXRpbmcgZm9yIHRoZSBwb3N0LiBDYW4gYmU6IHMsIHEgb3IgZSBmb3Igc2FmZSwgcXVlc3Rpb25hYmxlLCBhbmQgZXhwbGljaXQgcmVzcGVjdGl2ZWx5LlxuLy8gdXBsb2FkW2RpcmVjdF91cmxdIElmIHRoaXMgaXMgYSBVUkwsIGU2MjEgd2lsbCBkb3dubG9hZCB0aGUgZmlsZS5cbi8vIHVwbG9hZFtzb3VyY2VdIFRoaXMgd2lsbCBiZSB1c2VkIGFzIHRoZSBwb3N0J3MgJ1NvdXJjZScgdGV4dC4gU2VwYXJhdGUgbXVsdGlwbGUgVVJMcyB3aXRoICUwQSAodXJsLWVuY29kZWQgbmV3bGluZSkgdG8gZGVmaW5lIG11bHRpcGxlIHNvdXJjZXMuIExpbWl0IG9mIHRlbiBVUkxzXG4vLyB1cGxvYWRbZGVzY3JpcHRpb25dIFRoZSBkZXNjcmlwdGlvbiBmb3IgdGhlIHBvc3QuXG4vLyB1cGxvYWRbcGFyZW50X2lkXSBUaGUgSUQgb2YgdGhlIHBhcmVudCBwb3N0LlxuLy8gdXBsb2FkW3JlZmVyZXJfdXJsXSAgICAgICAgID9cbi8vIHVwbG9hZFttZDVfY29uZmlybWF0aW9uXSAgICB1c2VsZXNzXG4vLyB1cGxvYWRbYXNfcGVuZGluZ10gSWYgdHJ1ZSBwb3N0IHdpbGwgYmUgcG9zdGVkIGFzIHBlbmRpbmdcblxuLy8gdGFnX3N0cmluZywgcmF0aW5nLCBzb3VyY2UgKGZpbGUgfHwgZGlyZWN0X3VscikgYXJlIHJlcXVpcmVkXG4vLyBhbGwgb3RoZXJzIHNob3VsZCBiZSBudWxsXG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X2NyZWF0ZSAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRwYXRoOiAnL3VwbG9hZHMnLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6ICdGT1JNJyxcblx0XHRkYXRhOiBtYWtlX2RhdGEoc2V0dGluZ3MpLFxuXHRcdGF1dGhlbnRpY2F0ZTogdHJ1ZVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBtYWtlX2RhdGEgKHNldHRpbmdzKSB7XG5cdGNvbnN0IG5ld19zZXR0aW5ncyA9IHtcblx0XHQndXBsb2FkW3RhZ19zdHJpbmddJzogc2V0dGluZ3NbJ3VwbG9hZFt0YWdfc3RyaW5nXSddLFxuXHRcdCd1cGxvYWRbcmF0aW5nXSc6IHNldHRpbmdzWyd1cGxvYWRbcmF0aW5nXSddLFxuXHRcdCd1cGxvYWRbc291cmNlXSc6IHNldHRpbmdzWyd1cGxvYWRbc291cmNlXSddXG5cdH07XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0bmV3X3NldHRpbmdzWyd1cGxvYWRbZmlsZV0nXSA9IHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXTtcblx0fSBlbHNlIHtcblx0XHRuZXdfc2V0dGluZ3NbJ3VwbG9hZFtkaXJlY3RfdXJsXSddID0gc2V0dGluZ3NbJ3VwbG9hZFtkaXJlY3RfdXJsXSddO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbZGVzY3JpcHRpb25dJ10gIT09IG51bGwpIHtcblx0XHRuZXdfc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXSA9IHNldHRpbmdzWyd1cGxvYWRbZGVzY3JpcHRpb25dJ107XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ10gIT09IG51bGwpIHtcblx0XHRuZXdfc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ10gPSBzZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXTtcblx0fVxuXG5cdHJldHVybiBuZXdfc2V0dGluZ3M7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFt0YWdfc3RyaW5nXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFt0YWdfc3RyaW5nXSBtdXN0IGJlIHByZXNlbnQnKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygc2V0dGluZ3NbJ3VwbG9hZFt0YWdfc3RyaW5nXSddICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3RhZ19zdHJpbmddIG11c3QgYmUgb2YgdHlwZSBzdHJpbmcnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2ZpbGVdJ10gIT09IHVuZGVmaW5lZCAmJiBzZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ10gIT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignQm90aCB1cGxvYWRbZmlsZV0gYW5kIHVwbG9hZFtkaXJlY3RfdXJsXSBjYW4gbm90IGJlIGRlZmluZWQnKTtcblx0fSBlbHNlIGlmIChzZXR0aW5nc1sndXBsb2FkW2ZpbGVdJ10gPT09IHVuZGVmaW5lZCAmJiBzZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignRWl0aGVyIHVwbG9hZFtmaWxlXSBvciB1cGxvYWRbZGlyZWN0X3VybF0gbXVzdCBiZSBkZWZpbmVkJyk7XG5cdH1cblxuXHQvLyB0b2RvIHRlc3QgdGhpc1xuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddKSB7XG5cdFx0aWYgKHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXS5jb25zdHJ1Y3RvciAhPT0gQXJyYXlCdWZmZXIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW2ZpbGVdIG11c3QgYmUgb2YgdHlwZSBBcnJheUJ1ZmZlcicpO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGZvciBkYXRhIGluIHRoZSBhcnJheSBidWZmZXI/XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtkaXJlY3RfdXJsXSddKSB7XG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ10gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFtkaXJlY3RfdXJsXSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJyk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgaXQgaXMgYW4gYWN0dWFsIHVybD9cblx0fVxuXG5cdGlmIChbJ3MnLCAncScsICdlJ10uaW5jbHVkZXMoc2V0dGluZ3NbJ3VwbG9hZFtyYXRpbmddJ10pID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3JhdGluZ10gbXVzdCBiZSBvbmUgb2YgW1xcJ3NcXCcsIFxcJ3FcXCcsIFxcJ2VcXCddJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtzb3VyY2VdJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3NvdXJjZV0gbXVzdCBiZSBwcmVzZW50Jyk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzWyd1cGxvYWRbc291cmNlXSddICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3NvdXJjZV0gbXVzdCBiZSB1bmRlZmluZWQgb3Igb2YgdHlwZSBzdHJpbmcgb3IgbnVsbCcpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbZGVzY3JpcHRpb25dJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW2Rlc2NyaXB0aW9uXSBtdXN0IGJlIHByZXNlbnQnKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFtkZXNjcmlwdGlvbl0gbXVzdCBiZSBvZiB0eXBlIHN0cmluZycpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbcGFyZW50X2lkXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFtwYXJlbnRfaWRdIG11c3QgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWyd1cGxvYWRbcGFyZW50X2lkXSddID09PSBudWxsKSB7XG5cdFx0Ly8gSXQgaXMgZmluZSBpZiBwYXJlbnRfaWQgaXMgbnVsbFxuXHR9IGVsc2Uge1xuXHRcdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSwgJ3VwbG9hZFtwYXJlbnRfaWRdJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmV4cG9ydCB7IHJhd19wb3N0X2NyZWF0ZSB9O1xuIiwiaW1wb3J0IHsgcmF3X3Bvc3Rfc2VhcmNoIH0gZnJvbSAnLi9yYXdfcG9zdF9zZWFyY2guanMnO1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X3NlYXJjaCAodGFnX3N0cmluZywgcGFnZSA9IDApIHtcblx0cmV0dXJuIHJhd19wb3N0X3NlYXJjaC5jYWxsKHRoaXMsIHtcblx0XHRsaW1pdDogMzIwLFxuXHRcdHRhZ3M6IHRhZ19zdHJpbmcsXG5cdFx0cGFnZTogcGFnZS50b1N0cmluZygpXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5leHBvcnQgeyBwb3N0X3NlYXJjaCB9O1xuIiwiaW1wb3J0IHsgcmF3X3Bvc3Rfc2VhcmNoIH0gZnJvbSAnLi9yYXdfcG9zdF9zZWFyY2guanMnO1xuXG5jb25zdCBwb3N0c19wZXJfcGFnZSA9IDMyMDtcblxuLy8gWW91IGNhbiBub3QgaGF2ZSBhIGRpZmZlcmVudCBvcmRlciB3aGVuIHNlYXJjaGluZyB0aHJvdWdoIHBvc3RzIGxpa2UgdGhpc1xuYXN5bmMgZnVuY3Rpb24qIHBvc3Rfc2VhcmNoX2l0ZXJhdG9yIChzZWFyY2hfc3RyaW5nKSB7XG5cdC8vIFwiUHJvdmlkaW5nIGFyYml0cmFyaWx5IGxhcmdlIHZhbHVlcyB0byBvYnRhaW4gdGhlIG1vc3QgcmVjZW50IHBvc3RzXG5cdC8vIGlzIG5vdCBwb3J0YWJsZSBhbmQgbWF5IGJyZWFrIGluIHRoZSBmdXR1cmVcIi4gKHdpa2kpXG5cdC8vIEkgZG8gd2hhdCBJIHdhbnRcblx0bGV0IG1heF9pZCA9IDFlOTtcblx0d2hpbGUgKHRydWUpIHtcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vendhZ290aC9lNjIxbmcvaXNzdWVzLzIwMlxuXHRcdGNvbnN0IHsgcG9zdHMgfSA9IGF3YWl0IHJhd19wb3N0X3NlYXJjaC5jYWxsKHRoaXMsIHtcblx0XHRcdHRhZ3M6IHNlYXJjaF9zdHJpbmcsXG5cdFx0XHRsaW1pdDogcG9zdHNfcGVyX3BhZ2UsXG5cdFx0XHRwYWdlOiBgYiR7bWF4X2lkfWBcblx0XHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xuXG5cdFx0eWllbGQqIHBvc3RzO1xuXHRcdG1heF9pZCA9IHBvc3RzLnJlZHVjZSgoYWNjLCBlKSA9PiBhY2MuaWQgPCBlLmlkID8gYWNjIDogZSkuaWQ7XG5cblx0XHRpZiAocG9zdHMubGVuZ3RoIDwgcG9zdHNfcGVyX3BhZ2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmV4cG9ydCB7IHBvc3Rfc2VhcmNoX2l0ZXJhdG9yIH07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7XG5cdHZhbGlkYXRlX3N0cmluZyxcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyLFxuXHR2YWxpZGF0ZV9wYWdlX3N0cmluZ1xufSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbi8vIFRoZXJlIGlzIGFuIGVkZ2UgY2FzZSB3aGVyZSB0aGUgZGF0YSBjYW4gYmUgbWQ1PTxtZDU+XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X3NlYXJjaCAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdHBhdGg6ICcvcG9zdHMnLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6ICdVUkwnLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncylcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHRpZiAoc2V0dGluZ3MudGFncyAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX3N0cmluZyhzZXR0aW5ncy50YWdzLCAndGFncycpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLmxpbWl0ICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzLmxpbWl0LCAnbGltaXQnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5wYWdlICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfcGFnZV9zdHJpbmcoc2V0dGluZ3MucGFnZSwgJ3BhZ2UnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBtYWtlX2RhdGEgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJldHVybl9vYmplY3QgPSB7fTtcblxuXHRpZiAoc2V0dGluZ3MubGltaXQgIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0LmxpbWl0ID0gc2V0dGluZ3MubGltaXQ7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MudGFncyAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3QudGFncyA9IHNldHRpbmdzLnRhZ3M7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MucGFnZSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3QucGFnZSA9IHNldHRpbmdzLnBhZ2U7XG5cdH1cblxuXHRyZXR1cm4gcmV0dXJuX29iamVjdDtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3Rfc2VhcmNoIH07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF9zZWFyY2ggfSBmcm9tICcuLy4uL2luZGV4L3Jhd19wb3N0X3NlYXJjaC5qcyc7XG5pbXBvcnQgeyByYXdfcG9zdF9zaG93IH0gZnJvbSAnLi9yYXdfcG9zdF9zaG93LmpzJztcbmltcG9ydCB7IHZhbGlkYXRlX21kNSB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9zaG93X2lkIChwb3N0X2lkKSB7XG5cdHJldHVybiByYXdfcG9zdF9zaG93LmNhbGwodGhpcywge1xuXHRcdGlkOiBwb3N0X2lkXG5cdH0pLnRoZW4oZSA9PiBlLnBvc3QpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwb3N0X3Nob3dfbWQ1IChtZDUpIHtcblx0dmFsaWRhdGVfbWQ1KG1kNSk7XG5cdHJldHVybiByYXdfcG9zdF9zZWFyY2guY2FsbCh0aGlzLCB7XG5cdFx0dGFnczogYG1kNToke21kNX1gLFxuXHRcdGxpbWl0OiAxXG5cdH0pLnRoZW4oZSA9PiB7XG5cdFx0aWYgKGUucG9zdHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGUucG9zdHNbMF07XG5cdFx0fVxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9zaG93IChpZF9tZDUpIHtcblx0aWYgKHR5cGVvZiBpZF9tZDUgPT09ICdzdHJpbmcnICYmIGlkX21kNS5sZW5ndGggPT09IDMyKSB7XG5cdFx0cmV0dXJuIHBvc3Rfc2hvd19tZDUuY2FsbCh0aGlzLCBpZF9tZDUpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBwb3N0X3Nob3dfaWQuY2FsbCh0aGlzLCBOdW1iZXIoaWRfbWQ1KSk7XG5cdH1cbn1cblxuZXhwb3J0IHtcblx0cG9zdF9zaG93X2lkLFxuXHRwb3N0X3Nob3dfbWQ1LFxuXHRwb3N0X3Nob3dcbn07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7IHZhbGlkYXRlX2NvdW50aW5nX251bWJlciB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3Rfc2hvdyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzLmlkLCAncG9zdF9pZCcpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdHBhdGg6IGAvcG9zdHMvJHtzZXR0aW5ncy5pZH1gLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6IHVuZGVmaW5lZCxcblx0XHRkYXRhOiBudWxsXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5leHBvcnQgeyByYXdfcG9zdF9zaG93IH07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF91cGRhdGUgfSBmcm9tICcuL3Jhd19wb3N0X3VwZGF0ZS5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3RfdXBkYXRlIChzZXR0aW5ncykge1xuXHRyZXR1cm4gcmF3X3Bvc3RfdXBkYXRlLmNhbGwodGhpcywge1xuXHRcdGlkOiBzZXR0aW5ncy5pZCxcblx0XHQncG9zdFt0YWdfc3RyaW5nX2RpZmZdJzogZ2V0X2RpZmZlcmVuY2VzKHNldHRpbmdzLCAndGFnc190b19hZGQnLCAndGFnc190b19yZW1vdmUnLCAnICcpLFxuXHRcdCdwb3N0W3RhZ19zdHJpbmddJzogb3B0aW9uYWxfam9pbihzZXR0aW5ncy50YWdzLCAnICcpLFxuXHRcdCdwb3N0W29sZF90YWdfc3RyaW5nXSc6IG9wdGlvbmFsX2pvaW4oc2V0dGluZ3Mub2xkX3RhZ3MsICcgJyksXG5cdFx0J3Bvc3Rbc291cmNlX2RpZmZdJzogZ2V0X2RpZmZlcmVuY2VzKHNldHRpbmdzLCAnc291cmNlc190b19hZGQnLCAnc291cmNlc190b19yZW1vdmUnLCAnXFxuJyksXG5cdFx0J3Bvc3Rbc291cmNlXSc6IG9wdGlvbmFsX2pvaW4oc2V0dGluZ3Muc291cmNlcywgJ1xcbicpLFxuXHRcdCdwb3N0W29sZF9zb3VyY2VdJzogb3B0aW9uYWxfam9pbihzZXR0aW5ncy5vbGRfc291cmNlcywgJ1xcbicpLFxuXHRcdCdwb3N0W2Rlc2NyaXB0aW9uXSc6IHNldHRpbmdzLmRlc2NyaXB0aW9uIHx8IG51bGwsXG5cdFx0J3Bvc3Rbb2xkX2Rlc2NyaXB0aW9uXSc6IHNldHRpbmdzLm9sZF9kZXNjcmlwdGlvbiB8fCBudWxsLFxuXHRcdCdwb3N0W3BhcmVudF9pZF0nOiBzZXR0aW5ncy5wYXJlbnRfaWQgfHwgbnVsbCxcblx0XHQncG9zdFtvbGRfcGFyZW50X2lkXSc6IHNldHRpbmdzLm9sZF9wYXJlbnRfaWQgfHwgbnVsbCxcblx0XHQncG9zdFtyYXRpbmddJzogZ2V0X3JhdGluZyhzZXR0aW5ncy5yYXRpbmcpLFxuXHRcdCdwb3N0W29sZF9yYXRpbmddJzogZ2V0X3JhdGluZyhzZXR0aW5ncy5vbGRfcmF0aW5nKSxcblx0XHQncG9zdFtlZGl0X3JlYXNvbl0nOiBzZXR0aW5ncy5yZWFzb24gfHwgbnVsbFxuXHR9KTtcbn1cblxuLy8gSWRlYSBmb3IgYSBkaWZmZXJlbnQgdHlwZSBvZiB1cGRhdGUgZnVuY3Rpb24uIE1heWJlIGl0cyBiZXR0ZXIgaW4gc29tZSBjYXNlc1xuLy8gYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtX3Bvc3QgKHBvc3RfaWQsIHRyYW5zZm9ybV9mdW5jdGlvbikge1xuLy8gICBjb25zdCBwb3N0ID0gYXdhaXQgZ2V0X3Bvc3QocG9zdF9pZCk7XG4vLyAgIGNvbnN0IG5ld19wb3N0ID0gYXdhaXQgdHJhbnNmb3JtX2Z1bmN0aW9uKHBvc3RfaWQpXG4vLyAgIHJldHVybiBwb3N0X3VwZGF0ZShwb3N0LCBuZXdfcG9zdCk7XG4vLyB9XG5cbmZ1bmN0aW9uIGdldF9yYXRpbmcgKHJhdGluZykge1xuXHRpZiAocmF0aW5nICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gcmF0aW5nLmNoYXJBdCgwKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5mdW5jdGlvbiBvcHRpb25hbF9qb2luIChsaXN0LCBqb2luZXIpIHtcblx0aWYgKGxpc3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBsaXN0LmpvaW4oam9pbmVyKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRfZGlmZmVyZW5jZXMgKHNldHRpbmdzLCBhZGRfc3RyaW5nLCByZW1vdmVfc3RyaW5nLCBqb2luZXIpIHtcblx0aWYgKHNldHRpbmdzW2FkZF9zdHJpbmddICE9PSB1bmRlZmluZWQgfHwgc2V0dGluZ3NbcmVtb3ZlX3N0cmluZ10gIT09IHVuZGVmaW5lZCkge1xuXHRcdGNvbnN0IGFkZHMgPSAoc2V0dGluZ3NbYWRkX3N0cmluZ10gfHwgW10pXG5cdFx0XHQuam9pbihqb2luZXIpO1xuXHRcdGNvbnN0IHJlbW92ZXMgPSAoc2V0dGluZ3NbcmVtb3ZlX3N0cmluZ10gfHwgW10pXG5cdFx0XHQubWFwKGUgPT4gYC0ke2UudG9TdHJpbmcoKX1gKVxuXHRcdFx0LmpvaW4oam9pbmVyKTtcblxuXHRcdHJldHVybiBgJHthZGRzfSR7am9pbmVyfSR7cmVtb3Zlc31gO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBudWxsOyAvLyBJZiBubyBjaGFuZ2VzIHJldHVybiBudWxsXG5cdH1cbn1cblxuZXhwb3J0IHtcblx0cG9zdF91cGRhdGVcbn07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7IHZhbGlkYXRlX2NvdW50aW5nX251bWJlciB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3RfdXBkYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BBVENIJyxcblx0XHRwYXRoOiBgL3Bvc3RzLyR7c2V0dGluZ3MuaWR9YCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnRk9STScsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKSxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MuaWQsICdpZCcpO1xuXG5cdFtcblx0XHQncG9zdFt0YWdfc3RyaW5nX2RpZmZdJyxcblx0XHQncG9zdFt0YWdfc3RyaW5nXScsXG5cdFx0J3Bvc3Rbb2xkX3RhZ19zdHJpbmddJyxcblx0XHQncG9zdFtzb3VyY2VfZGlmZl0nLFxuXHRcdCdwb3N0W3NvdXJjZV0nLFxuXHRcdCdwb3N0W29sZF9zb3VyY2VdJyxcblx0XHQncG9zdFtkZXNjcmlwdGlvbl0nLFxuXHRcdCdwb3N0W29sZF9kZXNjcmlwdGlvbl0nLFxuXHRcdC8vIHBhcmVudF9pZFxuXHRcdCdwb3N0W3JhdGluZ10nLFxuXHRcdCdwb3N0W29sZF9yYXRpbmddJyxcblx0XHQncG9zdFtlZGl0X3JlYXNvbl0nXG5cdFx0Ly8gaGFzX2VtYmVkZGVkX25vdGVzIHdpbGwgYmUgcmVtb3ZlZCBhdCBzb21lIHBvaW50LlxuXHRdLmZvckVhY2goZSA9PiB7XG5cdFx0aWYgKHNldHRpbmdzW2VdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgJHtlfSBtdXN0IGJlIHByZXNlbnRgKTtcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzW2VdID09PSBudWxsKSB7XG5cdFx0XHQvLyBhbGwgb2YgdGhlc2UgY2FuIGJlIG51bGxcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nc1tlXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgJHtlfSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nYCk7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3RbcGFyZW50X2lkXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3RbcGFyZW50X2lkXSBtdXN0IGJlIHByZXNlbnQnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sncG9zdFtvbGRfcGFyZW50X2lkXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3Rbb2xkX3BhcmVudF9pZF0gbXVzdCBiZSBwcmVzZW50Jyk7XG5cdH1cblxuXHRbXG5cdFx0J3RhZ19zdHJpbmcnLFxuXHRcdCdzb3VyY2UnLFxuXHRcdCdkZXNjcmlwdGlvbicsXG5cdFx0J3BhcmVudF9pZCcsXG5cdFx0J3JhdGluZydcblx0XS5mb3JFYWNoKGUgPT4ge1xuXHRcdGlmIChzZXR0aW5nc1tgcG9zdFtvbGRfJHtlfV1gXSAhPT0gbnVsbCAmJiBzZXR0aW5nc1tgcG9zdFske2V9XWBdID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYG9sZF8ke2V9IG11c3Qgbm90IGJlIHByZXNlbnQgaWYgJHtlfSBpcyBub3QgcHJlc2VudGApO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKHNldHRpbmdzWydwb3N0W3RhZ19zdHJpbmddJ10gIT09IG51bGwgJiYgc2V0dGluZ3NbJ3Bvc3RbdGFnX3N0cmluZ19kaWZmXSddICE9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdhdCBtb3N0IG9uZSBvZiB0YWdfc3RyaW5nIGFuZCB0YWdfc3RyaW5nX2RpZmYgY2FuIGJlIG5vbi1udWxsJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3Rbc291cmNlXSddICE9PSBudWxsICYmIHNldHRpbmdzWydwb3N0W3NvdXJjZV9kaWZmXSddICE9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdhdCBtb3N0IG9uZSBvZiBzb3VyY2UgYW5kIHNvdXJjZV9kaWZmIGNhbiBiZSBub24tbnVsbCcpO1xuXHR9XG5cblx0Ly8gUGFyZW50X2lkXG5cdGlmIChzZXR0aW5nc1sncG9zdFtwYXJlbnRfaWRdJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncGFyZW50X2lkIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0W3BhcmVudF9pZF0nXSA9PT0gbnVsbCkge1xuXHRcdC8vIGl0IGNhbiBiZSBudWxsIHdpdGhvdXQgaXNzdWVcblx0fSBlbHNlIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3NbJ3Bvc3RbcGFyZW50X2lkXSddLCAncGFyZW50X2lkJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3Rbb2xkX3BhcmVudF9pZF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdvbGRfcGFyZW50X2lkIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0W29sZF9wYXJlbnRfaWRdJ10gPT09IG51bGwpIHtcblx0XHQvLyBpdCBjYW4gYmUgbnVsbCB3aXRob3V0IGlzc3VlXG5cdH0gZWxzZSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydwb3N0W29sZF9wYXJlbnRfaWRdJ10sICdvbGRfcGFyZW50X2lkJyk7XG5cdH1cblxuXHQvLyBSYXRpbmdcblx0aWYgKHNldHRpbmdzWydwb3N0W3JhdGluZ10nXSAhPT0gbnVsbCAmJiBbJ2UnLCAncScsICdzJ10uaW5jbHVkZXMoc2V0dGluZ3NbJ3Bvc3RbcmF0aW5nXSddKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3JhdGluZyBtdXN0IGJlIG9uZSBvZiBbXFwnZVxcJywgXFwncVxcJywgXFwnc1xcJ10nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sncG9zdFtvbGRfcmF0aW5nXSddICE9PSBudWxsICYmIFsnZScsICdxJywgJ3MnXS5pbmNsdWRlcyhzZXR0aW5nc1sncG9zdFtvbGRfcmF0aW5nXSddKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ29sZF9yYXRpbmcgbXVzdCBiZSBvbmUgb2YgW1xcJ2VcXCcsIFxcJ3FcXCcsIFxcJ3NcXCddJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWFrZV9kYXRhIChzZXR0aW5ncykge1xuXHRyZXR1cm4gW1xuXHRcdCdwb3N0W3RhZ19zdHJpbmdfZGlmZl0nLFxuXHRcdCdwb3N0W3RhZ19zdHJpbmddJyxcblx0XHQncG9zdFtvbGRfdGFnX3N0cmluZ10nLFxuXHRcdCdwb3N0W3NvdXJjZV9kaWZmXScsXG5cdFx0J3Bvc3Rbc291cmNlXScsXG5cdFx0J3Bvc3Rbb2xkX3NvdXJjZV0nLFxuXHRcdCdwb3N0W2Rlc2NyaXB0aW9uXScsXG5cdFx0J3Bvc3Rbb2xkX2Rlc2NyaXB0aW9uXScsXG5cdFx0J3Bvc3RbcGFyZW50X2lkXScsXG5cdFx0J3Bvc3Rbb2xkX3BhcmVudF9pZF0nLFxuXHRcdCdwb3N0W3JhdGluZ10nLFxuXHRcdCdwb3N0W29sZF9yYXRpbmddJyxcblx0XHQncG9zdFtlZGl0X3JlYXNvbl0nXG5cdF0ucmVkdWNlKChhY2MsIGUpID0+IHtcblx0XHRpZiAoc2V0dGluZ3NbZV0gIT09IG51bGwpIHtcblx0XHRcdGFjY1tlXSA9IHNldHRpbmdzW2VdO1xuXHRcdH1cblxuXHRcdHJldHVybiBhY2M7XG5cdH0sIHt9KTtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3RfdXBkYXRlIH07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF92b3RlIH0gZnJvbSAnLi9yYXdfcG9zdF92b3RlLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcG9zdF92b3RlX3VwIChwb3N0X2lkKSB7XG5cdHJldHVybiByYXdfcG9zdF92b3RlLmNhbGwodGhpcywge1xuXHRcdGlkOiBwb3N0X2lkLFxuXHRcdHNjb3JlOiAxLFxuXHRcdG5vX3Vudm90ZTogdHJ1ZVxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdF92b3RlX2Rvd24gKHBvc3RfaWQpIHtcblx0cmF3X3Bvc3Rfdm90ZS5jYWxsKHRoaXMsIHtcblx0XHRpZDogcG9zdF9pZCxcblx0XHRzY29yZTogLTEsXG5cdFx0bm9fdW52b3RlOiB0cnVlXG5cdH0pO1xufVxuXG5leHBvcnQge1xuXHRwb3N0X3ZvdGVfdXAsXG5cdHBvc3Rfdm90ZV9kb3duXG59O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIsXG5cdHZhbGlkYXRlX3ZvdGVfb3B0aW9uLFxuXHR2YWxpZGF0ZV9ib29sZWFuXG59IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3Rfdm90ZSAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRwYXRoOiBgL3Bvc3RzLyR7c2V0dGluZ3MuaWR9L3ZvdGVzYCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnVVJMJyxcblx0XHRkYXRhOiBtYWtlX2RhdGEoc2V0dGluZ3MpLFxuXHRcdGF1dGhlbnRpY2F0ZTogdHJ1ZVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwb3N0X3ZvdGVfcmVtb3ZlIChpZCkge1xuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHRwYXRoOiBgL3Bvc3RzLyR7aWR9L3ZvdGVzYCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiB1bmRlZmluZWQsXG5cdFx0ZGF0YTogdW5kZWZpbmVkLFxuXHRcdGF1dGhlbnRpY2F0ZTogdHJ1ZVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5ncy5pZCwgJ3Bvc3RfaWQnKTtcblx0dmFsaWRhdGVfdm90ZV9vcHRpb24oc2V0dGluZ3Muc2NvcmUpO1xuXG5cdGlmIChzZXR0aW5ncy5ub191bnZvdGUgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9ib29sZWFuKHNldHRpbmdzLm5vX3Vudm90ZSwgJ25vX3Vudm90ZScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHtcblx0XHRzY29yZTogc2V0dGluZ3Muc2NvcmVcblx0fTtcblxuXHRpZiAoc2V0dGluZ3Mubm9fdW52b3RlICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC5ub191bnZvdGUgPSBzZXR0aW5ncy5ub191bnZvdGU7XG5cdH1cblxuXHRyZXR1cm4gcmV0dXJuX29iamVjdDtcbn1cblxuZXhwb3J0IHtcblx0cmF3X3Bvc3Rfdm90ZSxcblx0cG9zdF92b3RlX3JlbW92ZVxufTtcbiIsImltcG9ydCB7IHJhd19wb3N0X2ZsYWdfY3JlYXRlIH0gZnJvbSAnLi9yYXdfcG9zdF9mbGFnX2NyZWF0ZS5qcyc7XG5cbmNvbnN0IHBvc3RfZmxhZ19yZWFzb25zID0ge1xuXHRkZWxldGlvbjogJ2RlbGV0aW9uJyxcblx0aW5mZXJpb3I6ICdpbmZlcmlvcicsXG5cdGN1c3RvbTogJ3VzZXInLFxuXHRkbnA6ICdkbnBfYXJ0aXN0Jyxcblx0cGF5X2NvbnRlbnQ6ICdwYXlfY29udGVudCcsXG5cdHRyYWNlOiAndHJhY2UnLFxuXHRwcmV2aW91c2x5X2RlbGV0ZWQ6ICdwcmV2aW91c2x5X2RlbGV0ZWQnLFxuXHRyZWFsOiAncmVhbF9wb3JuJyxcblx0Y29ycnVwdDogJ2NvcnJ1cHQnXG59O1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X2ZsYWdfY3JlYXRlIChyZWFzb24sIHBvc3RfaWQsIGV4dHJhKSB7XG5cdGlmIChwb3N0X2ZsYWdfcmVhc29uc1tyZWFzb25dID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYHJlYXNvbiBtdXN0IGJlIG9uZSBvZiBbJHtPYmplY3Qua2V5cyhwb3N0X2ZsYWdfcmVhc29ucykuam9pbignLCAnKX1dYCk7XG5cdH1cblxuXHRjb25zdCBkYXRhID0ge1xuXHRcdCdwb3N0X2ZsYWdbcG9zdF9pZF0nOiBwb3N0X2lkLFxuXHRcdCdwb3N0X2ZsYWdbcmVhc29uX25hbWVdJzogcG9zdF9mbGFnX3JlYXNvbnNbcmVhc29uXSxcblx0XHQncG9zdF9mbGFnW3VzZXJfcmVhc29uXSc6IG51bGwsXG5cdFx0J3Bvc3RfZmxhZ1twYXJlbnRfaWRdJzogbnVsbFxuXHR9O1xuXG5cdGlmIChyZWFzb24gPT09IHBvc3RfZmxhZ19yZWFzb25zLmN1c3RvbSkge1xuXHRcdGRhdGFbJ3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0nXSA9IGV4dHJhO1xuXHR9IGVsc2UgaWYgKHJlYXNvbiA9PT0gcG9zdF9mbGFnX3JlYXNvbnMuaW5mZXJpb3IpIHtcblx0XHRkYXRhWydwb3N0X2ZsYWdbcGFyZW50X2lkXSddID0gZXh0cmE7XG5cdH1cblxuXHRyZXR1cm4gcmF3X3Bvc3RfZmxhZ19jcmVhdGUuY2FsbCh0aGlzLCBkYXRhKTtcbn1cblxuZXhwb3J0IHtcblx0cG9zdF9mbGFnX2NyZWF0ZSxcblx0cG9zdF9mbGFnX3JlYXNvbnNcbn07XG4iLCJpbXBvcnQgZG93bmxvYWQgZnJvbSAnLi8uLi8uLi9kb3dubG9hZC9kb3dubG9hZC5fX1RBUkdFVF9fLmpzJztcbmltcG9ydCB7IHZhbGlkYXRlX2NvdW50aW5nX251bWJlciB9IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3RfZmxhZ19jcmVhdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogJy9wb3N0X2ZsYWdzJyxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnVVJMJyxcblx0XHRkYXRhOiBtYWtlX2RhdGEoc2V0dGluZ3MpLFxuXHRcdGF1dGhlbnRpY2F0ZTogdHJ1ZVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydwb3N0X2ZsYWdbcG9zdF9pZF0nXSwgJ3Bvc3RfZmxhZ1twb3N0X2lkXScpO1xuXHRjb25zdCB2YWxpZF9yZWFzb24gPSBbXG5cdFx0J2RlbGV0aW9uJyxcblx0XHQnaW5mZXJpb3InLFxuXHRcdCd1c2VyJyxcblx0XHQnZG5wX2FydGlzdCcsXG5cdFx0J3BheV9jb250ZW50Jyxcblx0XHQndHJhY2UnLFxuXHRcdCdwcmV2aW91c2x5X2RlbGV0ZWQnLFxuXHRcdCdyZWFsX3Bvcm4nLFxuXHRcdCdjb3JydXB0J1xuXHRdO1xuXG5cdGlmICh2YWxpZF9yZWFzb24uaW5jbHVkZXMoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nXSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBwb3N0X2ZsYWdbcmVhc29uX25hbWVdIG11c3QgYmUgb25lIG9mIFske3ZhbGlkX3JlYXNvbi5qb2luKCcsICcpfV1gKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSddID09PSAndXNlcicpIHtcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzWydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ10gIT09ICdzdHJpbmcnKVx0e1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdpZiBwb3N0X2ZsYWdbcmVhc29uX25hbWVdIGlzIFxcJ3VzZXJcXCcgdGhlbiBwb3N0X2ZsYWdbdXNlcl9yZWFzb25dIG11c3QgYmUgYSBzdHJpbmcnKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0nXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncG9zdF9mbGFnW3VzZXJfcmVhc29uXSBtdXN0IGJlIG51bGwgdW5sZXNzIHBvc3RfZmxhZ1tyZWFzb25fbmFtZV0gaXMgXFwndXNlclxcJycpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbcmVhc29uX25hbWVdJ10gPT09ICdpbmZlcmlvcicpIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1twYXJlbnRfaWRdJ10sICdwb3N0X2ZsYWdbcGFyZW50X2lkXScpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbcGFyZW50X2lkXSddICE9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdwb3N0X2ZsYWdbcGFyZW50X2lkXSBtdXN0IGJlIG51bGwgdW5sZXNzIHBvc3RfZmxhZ1twYXJlbnRfaWRdIGlzIFxcJ2luZmVyaW9yXFwnJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWFrZV9kYXRhIChzZXR0aW5ncykge1xuXHRjb25zdCByZXR1cm5fb2JqZWN0ID0ge1xuXHRcdCdwb3N0X2ZsYWdbcG9zdF9pZF0nOiBzZXR0aW5nc1sncG9zdF9mbGFnW3Bvc3RfaWRdJ10sXG5cdFx0J3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nOiBzZXR0aW5nc1sncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSddXG5cdH07XG5cblx0aWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbcmVhc29uX25hbWVdJ10gPT09ICd1c2VyJykge1xuXHRcdHJldHVybl9vYmplY3RbJ3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0nXSA9IHNldHRpbmdzWydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ107XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nXSA9PT0gJ2luZmVyaW9yJykge1xuXHRcdHJldHVybl9vYmplY3RbJ3Bvc3RfZmxhZ1twYXJlbnRfaWRdJ10gPSBzZXR0aW5nc1sncG9zdF9mbGFnW3BhcmVudF9pZF0nXTtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycikge1xuXHRjb25zb2xlLmxvZyhlcnIpO1xuXHR0aHJvdyBlcnI7XG59O1xuXG5leHBvcnQgeyByYXdfcG9zdF9mbGFnX2NyZWF0ZSB9O1xuIiwiZnVuY3Rpb24gdmFsaWRhdGVfbWQ1IChtZDUpIHtcblx0aWYgKHR5cGVvZiBtZDUgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtZDUgbXVzdCBiZSBvZiB0eXBlIHN0cmluZycpO1xuXHR9XG5cblx0aWYgKG1kNS5sZW5ndGggIT09IDMyKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtZDUgbXVzdCBiZSBvZiBsZW5ndGggMzInKTtcblx0fVxuXG5cdGNvbnN0IGNvbnRhaW5zX25vbl9oZXggPSAvW14wLTlhLWZBLUZdL2c7XG5cdGlmIChjb250YWluc19ub25faGV4LnRlc3QobWQ1KSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignbWQ1IGNvbnRhaW5zIG5vbi1oZXhhZGVjaW1hbCBjaGFyYWN0ZXInKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgKG51bWJlciwgbmFtZSkge1xuXHRpZiAodHlwZW9mIG51bWJlciAhPT0gJ251bWJlcicpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gbXVzdCBiZSBhIG51bWJlcmApO1xuXHR9XG5cblx0aWYgKE51bWJlci5pc0ludGVnZXIobnVtYmVyKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX1tdXN0IGJlIGFuIGludGVnZXJgKTtcblx0fVxuXG5cdGlmIChudW1iZXIgPCAwKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAke25hbWV9IG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9gKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zdHJpbmcgKHN0cmluZywgbmFtZSkge1xuXHRpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gaXMgbm90IGEgc3RyaW5nYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfdm90ZV9vcHRpb24gKHZvdGUpIHtcblx0aWYgKHZvdGUgIT09IC0xICYmIHZvdGUgIT09IDAgJiYgdm90ZSAhPT0gMSkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndm90ZSBpcyBub3Qgb2YgdGhlIHZhbHVlcyBbLTEsIDFdJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfcGFnZV9zdHJpbmcgKHN0cmluZywgbmFtZSkge1xuXHR2YWxpZGF0ZV9zdHJpbmcoc3RyaW5nLCBuYW1lKTtcblxuXHRpZiAoKC9bYWJdP1xcZCsvKS50ZXN0KHN0cmluZykgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAke25hbWV9IGRvZXMgbm90IG1hdGNoIHRoZSBmb3JtYXQgL1thYl0/XFxcXGQrL2ApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX2Jvb2xlYW4gKGJvb2xlYW4sIG5hbWUpIHtcblx0aWYgKGJvb2xlYW4gIT09IGZhbHNlICYmIGJvb2xlYW4gIT09IHRydWUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gaXMgbm90IG9mIHRoZSB0eXBlIGJvb2xlYW5gKTtcblx0fVxufVxuXG5leHBvcnQge1xuXHR2YWxpZGF0ZV9tZDUsXG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcixcblx0dmFsaWRhdGVfc3RyaW5nLFxuXHR2YWxpZGF0ZV92b3RlX29wdGlvbixcblx0dmFsaWRhdGVfcGFnZV9zdHJpbmcsXG5cdHZhbGlkYXRlX2Jvb2xlYW5cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9