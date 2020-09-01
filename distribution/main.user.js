// ==UserScript==
// @name         Idem's Sourcing Suite
// @description  Adds a whole bunch of utilities, helpful for sourcing images
// @version      1.00043
// @author       Meras

// @namespace    https://github.com/Sasquire/
// @supportURL   https://github.com/Sasquire/Idems-Sourcing-Suite
// @updateURL    https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/distribution/header.user.js
// @downloadURL  https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/distribution/main.user.js
// @icon         https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/resources/icon32.png

// @license      Unlicense

//               Common v23
// @noframes
// @connect      e621.net
// @grant        GM.addStyle
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.xmlHttpRequest

//               Legacy userscript support
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest

//               DeviantArt v6
// @match        *://*.deviantart.com/*
// @connect      wixmp.com

//               FurAffinity v2
// @match        *://*.furaffinity.net/view/*
// @match        *://*.furaffinity.net/full/*
// @connect      facdn.net

//               FurryNetwork v1
// @match        *://*.furrynetwork.com/*
// @connect      https://d3gz42uwgl1r1y.cloudfront.net/

//               ImageComparison v1
// @match        *://*.e621.net/extensions/image_compare
// @connect      *

//               InkBunny v2
// @match        *://*.inkbunny.net/s/*

//               Pixiv v2
// @match        *://*.pixiv.net/*
// @connect      i.pximg.net

//               PostBVAS v1
// @match        https://e621.net/extensions/upload_bvas
// @connect      *

//               SettingsPage v2
// @match        *://*.e621.net/extensions

//               SoFurry v1
// @match        *://*.sofurry.com/view/*
// @connect      www.sofurryfiles.com

//               Twitter v1
// @match        *://*.twitter.com/*
// @connect      pbs.twimg.com

//               Weasyl v1
// @match        *://*.weasyl.com/*/submissions/*
// @connect      cdn.weasyl.com
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
			if (e.status >= 200 && e.status <= 299) {
				resolve(e.response); // This will likely cause errors later
			} else {
				// eslint-disable-next-line prefer-promise-reject-errors
				reject({
					response: {
						status: e.status,
						data: e.response
					}
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
		tags: `md5:${md5} status:any`,
		limit: 1,
		page: null
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

},{}],3:[function(require,module,exports){
((base_html, base_css, GM) => {
	function do_constructor (options) {
		// Must have options.name
		// If options.url is not present, will not link anywhere
		// If options.description is not present, will have no description
		const container = document.createElement('div');
		container.id = options.name;
		container.classList.add('setting_section');

		// Title
		container.appendChild((() => {
			const type = options.url !== undefined ? 'a' : 'span';
			const title = document.createElement(type);
			title.textContent = options.name + '\u200B'; // Add zerowidth space
			title.classList.add('setting_header');
			if (options.url !== undefined) {
				title.href = options.url;
			}
			return title;
		})());

		// Description
		container.appendChild((() => {
			const description = document.createElement('span');
			description.classList.add('setting_description');
			if (options.description !== undefined) {
				description.textContent = options.description;
			}
			return description;
		})());

		// Setting values
		const settings_div = document.createElement('div');
		settings_div.classList.add('setting_values');
		['Name', 'Value', 'Description']
			.map(e => {
				const span = document.createElement('span');
				span.textContent = e;
				span.classList.add('settings_table_head');
				return span;
			})
			.forEach(e => settings_div.appendChild(e));
		container.appendChild(settings_div);

		return container;
	}

	async function get_value (key, default_value) {
		return GM.getValue(key)
			.then(e => e === undefined ? default_value : e);
	}

	function do_checkbox (options) {
		// Must have options.name, options.key, and options.section
		// options.default defaults to false
		const checkbox_name = `${options.section}_${options.key}`;

		// Title
		const title = document.createElement('label');
		title.textContent = options.name;
		title.htmlFor = checkbox_name;

		// Checkbox with load saved setting
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = checkbox_name;
		get_value(options.key, options.default || false)
			.then(e => (checkbox.checked = e));
		checkbox.addEventListener('change', () => {
			GM.setValue(options.key, checkbox.checked);
		});

		return [title, checkbox, options.description || ''];
	}

	function do_list (options) {
		const select = document.createElement('select');

		// Fill options
		options.values.map(e => {
			const option = document.createElement('option');
			option.textContent = e.name;
			option.value = e.value;
			if (e.title) {
				option.title = e.title;
			}
			return option;
		}).forEach(e => {
			select.appendChild(e);
		});

		// Listen for change
		select.addEventListener('change', () => {
			GM.setValue(options.key, select.value);
		});

		// Set default
		get_value(options.key, options.default).then(set_value => {
			Array.from(select.getElementsByTagName('option'))
				.map((e, i) => ({ index: i, value: e.value }))
				.filter(e => e.value === set_value)
				.forEach(e => (select.selectedIndex = e.index));
		});

		return [options.name || '', select, options.description || ''];
	}

	function do_custom (options) {
		const input = document.createElement('input');
		input.type = options.is_secret ? 'password' : 'text';
		input.placeholder = options.placeholder || '';

		// You can set options.key to null to have this be a dummy
		// placeholder. If you do then you can set it's id
		if (options.key !== null) {
			input.addEventListener('change', () => {
				GM.setValue(options.key, input.value);
			});

			get_value(options.key, options.default || '')
				.then(e => (input.value = e));
		} else {
			input.id = options.id;
		}

		return [options.name || '', input, options.description || ''];
	}

	class Setting {
		constructor (options) {
			// Insert the new node in alphabetical order. A nice qol feature
			const container = do_constructor(options);
			const other_sections = document.getElementsByClassName('setting_section');
			const last_item = Array.from(other_sections)
				.filter(e => section_compare(e, container) > 0)
				.sort(section_compare)[0];
			document.getElementById('settings').insertBefore(container, last_item);

			this.setting_node = container.getElementsByClassName('setting_values')[0];
			this.name = options.name;

			function section_compare (a, b) {
				const first = a.id.toLowerCase();
				const second = b.id.toLowerCase();
				return first.localeCompare(second);
			}
		}

		append (node) {
			const container = document.createElement('span');
			if (typeof node === 'string') {
				// innerHTML isn't usually liked, but what is a userscript
				// going to do that it can't already do?
				container.innerHTML = node;
			} else {
				container.appendChild(node);
			}

			this.setting_node.appendChild(container);
		}

		checkbox (options) {
			// options = { name, key, section, default }
			do_checkbox({
				...options,
				section: this.setting_node.parentNode.id
			}).forEach(this.append.bind(this));
		}

		list (options) {
			// options = {
			//   name, description, default, key
			//   values = [{ name, value, title? }],
			// }
			do_list(options).forEach(this.append.bind(this));
		}

		custom (options) {
			// options = {
			//   name, default?, key?, id?
			//   placeholder, description, is_secret,
			// }
			do_custom(options).forEach(this.append.bind(this));
		}

		button (options) {
			const button = document.createElement('button');
			button.textContent = options.value || '';
			button.id = options.id;

			[options.name || '', button, options.description || '']
				.forEach(this.append.bind(this));
		}
	};

	function init_css () {
		const node = document.createElement('style');
		node.type = 'text/css';
		node.textContent = base_css;
		document.head.appendChild(node);
	}

	function clear_page () {
		while (document.head.firstChild) {
			document.head.removeChild(document.head.firstChild);
		}
		while (document.body.firstChild) {
			document.body.removeChild(document.body.firstChild);
		}
	}

	function init_page () {
		document.body.innerHTML = base_html;
		document.body.dataset.page_loaded = true;
	}

	function init_common () {
		const settings = new Setting({
			name: '\u200BCommon',
			description: 'Settings that are common throughout many userscripts'
		});

		settings.button({
			name: 'Update Scripts',
			id: 'update_credentials_button',
			value: 'Update',
			description: 'Pressing this button should update username and API key on all relevant userscripts'
		});

		settings.custom({
			name: 'Username',
			placeholder: 'username',
			description: 'This should be your username on e621.net',
			key: null,
			id: 'credentials_username',
			is_secret: false
		});

		settings.custom({
			name: 'API Key',
			placeholder: 'API Key',
			description: 'Your api key which can be found from your <a href="https://e621.net/users/home">homepage</a>',
			key: null,
			id: 'credentials_api_key',
			is_secret: true
		});
	}
/*
	Example settings
	const a = new Setting({
		name: 'Testing',
		url: 'https://e621.net/extensions',
		description: 'things for that one thing that does stuff'
	});

	a.checkbox({
		name: 'Good Setting',
		key: 'setting_key',
		default: false,
		description: 'This is supposed to be a setting that does very good things'
	});

	a.list({
		name: 'Things that are listed',
		key: 'list_key',
		description: 'This is the testing for a list option',
		default: 'random',
		values: [
			{ name: '1', value: 'option1' },
			{ name: '2', value: 'what' },
			{ name: 'great', value: 'more' },
			{ name: 'bad', value: 'random' },
			{ name: 'ooops', value: 'norepeats' }
		]
	});

	a.custom({
		name: 'what',
		key: 'testtttt',
		description: 'does stuff',
		default: 'both',
		placeholder: 'ahhhh',
		is_secret: true
	}); */

	const is_correct_url = window.location.href === 'https://e621.net/extensions';
	const is_loaded = document.body.dataset.page_loaded === 'true';
	if (is_correct_url && is_loaded === false) {
		clear_page();
		init_css();
		init_page();
		init_common();
	}

	// Export so it can be used in both browserify and greasemonkey
	if (module && module.exports) {
		module.exports = Setting;
	} else {
		window.Setting = Setting;
	}
})(`
<h1>e621 Extension Hub</h1>
<div id="settings"></div>
`, `
:root {
	--background-blue: #031131;
	--home-blue: #012e56;
	--standard-blue: #152f56;
	--comment-blue: #213a5f;
	--quote-blue: #284a81;
	--link-blue: #b4c7d9;
	--hover-blue: #2e76b4;

	--other-blue: #174891;

	--yellow: #fdba31;
	--light-yellow: #ffde9b;
	--dark-yellow: #d8b162;
}

body {
	background-color: var(--background-blue);
	background-image: url(https://e621.net/images/stripe.png);
}

/* Title at the top of the page */
h1 {
	padding: 1rem 3rem;
	color: var(--yellow);
	background-color: var(--standard-blue);
	border-radius: 1rem;
}

.setting_section {
	background-color: var(--standard-blue);
	margin: 1rem 0px;
	padding: 0.5rem 1.5rem 1.5rem 1.5rem;
    border-radius: 1rem;
}

/* Header and description */
.setting_header {
	color: var(--yellow);
    margin: 0px 0.5rem 0.5rem 1rem;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 600;
}

.setting_description {
	color: #ccc;
}

/* Actual settings to be changed */
.setting_values {
	display: grid;
	grid-template-columns: 1fr 100px 4fr;
	color: #ccc;
}

.setting_values > * {
	border-bottom: 1px solid white;
	margin-bottom: 0.5rem;
	padding-bottom: 0.2rem;
}

.setting_values > span > input[type=text],
.setting_values > span > input[type=password] {
	width: 90px;
}

.settings_table_head {
	color: var(--hover-blue);
    text-decoration: underline;
}

.setting_values a, .setting_values a:visited {
	color: var(--link-blue);
}
`,
(() => {
	// eslint-disable-next-line no-undef
	const gm_object = window.GM ? window.GM : GM;
	wrap_generic('GM_setValue', 'setValue');
	wrap_generic('GM_getValue', 'getValue');
	return gm_object;

	async function wrap_generic (generic_name, new_name) {
		if (gm_object[new_name]) {
			return; // Already exists
		}

		if (window[generic_name] === undefined) {
			return; // No old function
		}

		gm_object[new_name] = async (...args) => new Promise((resolve, reject) => {
			try {
				resolve(window[generic_name](...args));
			} catch (e) {
				reject(e);
			}
		});
	}
})());

},{}],4:[function(require,module,exports){
/*
Originally I wanted to use https://github.com/greasemonkey/gm4-polyfill
to provide compatibility between the new async greasemonkey functions
and the old GM_* functions. But in order to keep this project purely
public domain, I could not use their MIT licensed code.

This is an attempt at providing the same functionality, while being
separate from that work. I understand how the old version functions
but this will be my own unique creation, free from their license.

Unlicense (2019)
*/

// old https://violentmonkey.github.io/api/gm/
// new https://wiki.greasespot.net/Greasemonkey_Manual%3aAPI

let gm_object = null;
try {
	if (window.GM) {
		// We are not in a sandbox
		gm_object = window.GM;
	} else {
		// We are in a sandbox
		// eslint-disable-next-line no-undef
		gm_object = GM;
	}
} catch (e) { // e should be a ReferenceError
	// We have no access to the GM object. Something is wrong
	// Attempt to recover and hope we can make something out of it
	gm_object = {};
}

const transitions = [
	// Values
	['GM_getValue', 'getValue'],
	['GM_setValue', 'setValue'],
	['GM_listValues', 'listValues'],
	['GM_deleteValue', 'deleteValue'],

	// GM_getResourceText and GM_getResourceURL
	// are not supported in this version because of the
	// incompatibility between the GM_* functions and GM 4

	// Other
	['GM_notification', 'notification'],
	['GM_openInTab', 'openInTab'],
	['GM_setClipboard', 'setClipboard'],
	['GM_xmlhttpRequest', 'xmlHttpRequest'],
	['GM_addStyle', 'addStyle']
];

transitions.forEach(([old_id, new_id]) => {
	// If this is ever true, we are not in a sandbox. I do not think
	// there is a userscript manager that uses both the old GM_* functions
	// and sandboxes the code. The day I am wrong is the day this breaks.
	const old_function = window[old_id];
	if (old_function === undefined) {
		return;
	}

	// Why would we overwrite the new function with a worse old one
	if (gm_object[new_id] !== undefined) {
		return;
	}

	// Again, there should not be a time when we get here that the
	gm_object[new_id] = (...args) => new Promise((resolve, reject) => {
		try {
			resolve(old_function(...args));
		} catch (error) {
			reject(error);
		}
	});
});

function add_style (css) {
	const node = document.createElement('style');
	node.type = 'text/css';
	node.textContent = css;

	const head = document.head;
	const body = document.body;
	head ? head.appendChild(node) : body.appendChild(node);
}

// If its not present, overwrite with our own function
if (gm_object.addStyle === undefined) {
	gm_object.addStyle = add_style;
}

module.exports = gm_object;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
// This is a js file so it can be commented

module.exports = {
	// Different parts of the on-site-utilities
	on_site_hasher_enabled: true,
	on_site_upload_enabled: true,
	on_site_commentary_enabled: true,

	// Individual sites that control if the on-site-utilities become enabled.
	on_site_deviantart_enabled: true,
	on_site_furaffinity_enabled: true,
	on_site_furrynetwork_enabled: true,
	on_site_inkbunny_enabled: true,
	on_site_pixiv_enabled: true,
	on_site_sofurry_enabled: true,
	on_site_twitter_enabled: true,
	on_site_weasyl_enabled: true,

	// Not really a site, but it has to follow this syntax
	// to be enabled correctly
	on_site_imagecomparison_enabled: true,
	on_site_postbvas_enabled: true,

	// Make sure that the settings page is accessible. If you
	// somehow manage to set this to false, well, you'll have a
	// rather large and not easy to fix problem.
	on_site_settingspage_enabled: true,

	// Values so that the helper function will have something to return.
	username: null,
	api_key: null,

	// Defaults for how the post bvaser should operate
	postbvas_edit_description: true,
	postbvas_post_comment: false,
	postbvas_delete_post: false
};

},{}],8:[function(require,module,exports){
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
	require('./plans/furrynetwork/main.js'),
	require('./plans/settings/main.js'),
	require('./plans/sofurry/main.js'),
	require('./plans/inkbunny/main.js'),
	require('./plans/pixiv/main.js'),
	require('./plans/bvas/main.js')
];

const { get_value } = require('./utils/utils.js');

const here = new URL(window.location.href);
const site = plans.find(e => e.test(here));
if (site !== undefined) {
	get_value(`on_site_${site.title.toLowerCase()}_enabled`).then(e => {
		if (e === true) {
			console.log(`idem's Sourcing Suite: Running ${site.title} v${site.version}`);
			site.exec();
		} else {
			// Found site, but not enabled
		}
	});
}

},{"./../dependencies/arrive.js":1,"./../dependencies/on_url_change.js":6,"./plans/bvas/main.js":12,"./plans/deviantart/main.js":15,"./plans/furaffinity/main.js":21,"./plans/furrynetwork/main.js":24,"./plans/image_compare/main.js":30,"./plans/inkbunny/main.js":32,"./plans/pixiv/main.js":34,"./plans/settings/main.js":36,"./plans/sofurry/main.js":38,"./plans/twitter/main.js":40,"./plans/weasyl/main.js":42,"./utils/utils.js":52}],9:[function(require,module,exports){
module.exports = {
	test: (url) => {
		return url.href === 'https://e621.net/extensions/upload_bvas';
	},

	match: ['https://e621.net/extensions/upload_bvas'],

	connect: ['*'],

	title: 'PostBVAS',
	version: 1
};

},{}],10:[function(require,module,exports){
module.exports = ":root {\n\t--background-blue: #031131;\n\t--home-blue: #012e56;\n\t--standard-blue: #152f56;\n\t--comment-blue: #213a5f;\n\t--quote-blue: #284a81;\n\t--link-blue: #b4c7d9;\n\t--hover-blue: #2e76b4;\n\n\t--other-blue: #174891;\n\n\t--yellow: #fdba31;\n\t--light-yellow: #ffde9b;\n\t--dark-yellow: #d8b162;\n}\n.hidden { display:none; }\n\nbody {\n\tbackground-color: var(--background-blue);\n\tcolor: #ccc;\n}\n\n#messages {\n\theight: 5rem;\n\toverflow-y: scroll;\n\tdisplay: flex;\n\tflex-direction: column;\n}";

},{}],11:[function(require,module,exports){
module.exports = "<div id=\"main\">\n\t<div id=\"messages\">\n\t\t<span>Logging information should appear here<span>\n\t</div>\n\t<hr>\n\t<div id=\"old_post\">\n\t\t<input id=\"old_post_id\" placeholder=\"old post #\"></input>\n\t</div>\n\t<div id=\"new_post\">\n\t</div>\n\t<button id=\"bvas_submit\">BVAS post</button>\n</div>\n";

},{}],12:[function(require,module,exports){
const {
	multi_input,
	clear_page,
	add_css,
	get_authenticated_e621,
	get_value
} = require('./../../utils/utils.js');
const header = require('./header.js');

let e621_api = null;

function log_message (text) {
	console.log(text);

	const messages = document.getElementById('messages');

	const span = document.createElement('span');
	span.textContent = text;
	messages.appendChild(span);
};

async function init () {
	clear_page();
	add_css(require('./main.css'));
	document.body.innerHTML = require('./main.html');
	e621_api = await get_authenticated_e621()
		.catch(e => log_message('Error with obtaining credentials. This page may not work as intended. Please enter credentials on the settings page.'));
	if (e621_api === undefined) {
		return;
	}

	log_message('Credentials obtained. If entered incorrectly this page will experience issues later.');

	bvas_listener();
}

function bvas_listener () {
	let new_data = null;
	const new_input = multi_input(data => {
		log_message('Loading new data for replacement post');
		data.arrayBuffer().then(e => {
			log_message('Loaded new data for replacement post');
			new_data = e;
		});
	});
	document.getElementById('new_post').appendChild(new_input);

	document.getElementById('bvas_submit').addEventListener('click', e => {
		const old_id = parseInt(document.getElementById('old_post_id').value, 10);
		perform_bvas(old_id, new_data);
	});
}

async function perform_bvas (old_id, new_data) {
	const edit_description = await get_value('postbvas_edit_description');
	const post_comment = await get_value('postbvas_post_comment');
	const delete_post = await get_value('postbvas_delete_post');

	if (Number.isNaN(old_id) === true) {
		log_message('Error with old post id. Please fix the issue.');
		return null;
	} else if (new_data === null) {
		log_message('New post data was not set. Set data and try again.');
		return null;
	} else {
		log_message('Attempting to BVAS post.');
		await e621_api.post_bvas({
			post_id: old_id,
			replacement: new_data,
			comment: post_comment,
			description: edit_description,
			delete: delete_post
		}).catch(e => {
			log_message('Error with BVASing post. Please make a bug report to idem on e621.');
			log_message(e.toString());
			throw e;
		});
		log_message('Post successfully BVASed');
		return null;
	}
}

async function exec () {
	init();
}

module.exports = {
	exec: exec,
	...header
};

},{"./../../utils/utils.js":52,"./header.js":9,"./main.css":10,"./main.html":11}],13:[function(require,module,exports){
const { description, upload } = require('./shared.js');
const {
	artist_commentary,
	string_to_node,
	data_to_nodes,
	common_styles,
	remove_node,
	get_value,
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

	await conditional_execute('on_site_commentary_enabled', () => {
		container.appendChild(description(info));
	});

	await conditional_execute('on_site_upload_enabled', () => {
		container.appendChild(upload(info));
	});

	await conditional_execute('on_site_hasher_enabled', () => {
		const hashes = data_to_nodes(info.sources);
		hashes.forEach(e => container.appendChild(e));
	});
}

async function conditional_execute (key, func) {
	const value = await get_value(key);
	if (value === true) {
		func();
	}
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
			return [[download.url, 'download']];
		} else {
			return [];
		}
	})();

	const other_sources = [
		[makeDALink(da_object, 'fullview', true), 'large view 100'],
		[makeDALink(da_object, 'fullview', false), 'large view'],
		[makeDALink(da_object, 'social_preview', true), 'social preview 100'],
		[makeDALink(da_object, 'social_preview', false), 'social preview'],
		[makeDALink(da_object, 'preview', true), 'preview 100'],
		[makeDALink(da_object, 'preview', false), 'preview']
	];

	return download_url
		.concat(other_sources)
		.filter(e => e[0])
		.filter(e => e[0] !== 'https://st.deviantart.net/misc/noentrythumb-200.png')
		.filter((e, i, a) => i === a.findIndex(p => p[0] === e[0]));
}

function makeDALink (da_object, type, hundred_quality) {
	const media = da_object.deviation.media;
	const values = media.types.find(p => p.t === type);
	if (values === undefined) {
		return undefined;
	} else if (values.c === undefined) {
		return values.baseUri;
	} else {
		const prettyName = (() => {
			let changing_name = values.c;
			if (hundred_quality === true) {
				changing_name = changing_name.replace(/q_\d+/g, 'q_100');
			}
			return changing_name.replace('<prettyName>', media.prettyName);
		})();
		return `${media.baseUri}/${prettyName}?token=${media.token[0]}`;
	}
}

module.exports = {
	init: add_style,
	exec: run_artwork
};

},{"./../../utils/utils.js":52,"./shared.js":17}],14:[function(require,module,exports){
module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'deviantart.com';
	},

	match: ['*://*.deviantart.com/*'],

	connect: ['wixmp.com'],

	title: 'DeviantArt',
	version: 6
};

},{}],15:[function(require,module,exports){
const old = require('./old.js');
const eclipse = require('./eclipse.js');
const header = require('./header.js');

let last_url = { href: null };
let version = null;

async function find_site () {
	const here = new URL(window.location.href);

	if (here.href === last_url.href) {
		console.log('ISS: Duplicate URL detected');
		return; // Why are we loading twice on the same page?
	} else if (last_url !== null && here.pathname === last_url.pathname) {
		console.log('ISS: Comment URL change detected');
		return;
	} else {
		last_url = here;
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

},{"./eclipse.js":13,"./header.js":14,"./old.js":16}],16:[function(require,module,exports){
const { description, upload } = require('./shared.js');
const {
	commentary_from_text,
	string_to_node,
	data_to_nodes,
	node_to_dtext,
	common_styles,
	remove_node,
	get_value,
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

	await conditional_execute('on_site_commentary_enabled', () => {
		container.appendChild(description(info));
	});

	await conditional_execute('on_site_upload_enabled', () => {
		container.appendChild(upload(info));
	});

	await conditional_execute('on_site_hasher_enabled', () => {
		const hashes = data_to_nodes(info.sources);
		hashes.forEach(e => container.appendChild(e));
	});
}

async function conditional_execute (key, func) {
	const value = await get_value(key);
	if (value === true) {
		func();
	}
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

	return commentary_from_text(null, null, da_object.title, description);
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

},{"./../../utils/utils.js":52,"./shared.js":17}],17:[function(require,module,exports){
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

},{"./../../utils/utils.js":52}],18:[function(require,module,exports){
const { simple_site, append } = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

const get_info = async (full_url) => simple_site({
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
			display: flex;
			flex-direction: column;
			font-weight: 700;
			font-size: 1.3em;
			padding: 0.3rem;
		}
		.iss_image_link { margin-right: 0.4rem; }
		#iss_container > :not(.iss_hash_span) > * {
			float: right;
		}
	`,
	hashes_as_array: true
});

async function exec () {
	const full_url = document.querySelector('a[href^="//d.facdn.net"]').href;
	const info = await get_info(full_url);

	const container = document.createElement('div');
	container.id = 'iss_container';
	document.querySelector('.container').appendChild(container);

	append(container, info.upload);
	append(container, info.description);
	info.hashes.forEach(e => append(container, e));
}

module.exports = exec;

},{"./../../utils/utils.js":52,"./links.js":20}],19:[function(require,module,exports){
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
	version: 2
};

},{}],20:[function(require,module,exports){
function full_to_thumb (full_url) {
	const timestamp = full_url.match(/.*\/(\d+)\/\d+\..*?_.*\..*/u)[1];
	const post_id = new URL(window.location.href).pathname.split('/')[2];
	return `https://t.facdn.net/${post_id}@${400}-${timestamp}.jpg`;
}

module.exports = {
	full_to_thumb: full_to_thumb
};

},{}],21:[function(require,module,exports){
const run_classic = require('./classic.js');
const run_modern = require('./modern.js');
const header = require('./header.js');

async function exec () {
	const is_classic = document.body.dataset.staticPath === '/themes/classic';

	if (is_classic) {
		console.log(`ISS: ${header.title} classic version`);
		run_classic();
	} else {
		console.log(`ISS: ${header.title} modern version`);
		run_modern();
	}
}

module.exports = {
	...header,
	exec: exec
};

},{"./classic.js":18,"./header.js":19,"./modern.js":22}],22:[function(require,module,exports){
const { simple_site, append } = require('./../../utils/utils.js');
const { full_to_thumb } = require('./links.js');

const get_info = async (full_url) => simple_site({
	artist: {
		href: document.querySelector('.submission-id-avatar > a').href,
		textContent: document.querySelector('.submission-id-sub-container a > strong').textContent
	},
	title: document.querySelector('.submission-title > h2'),
	description: () => document.querySelector('.submission-description'),
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
	`,
	hashes_as_array: true
});

async function exec () {
	// There seem to be two different display modes for the beta site
	// This code only works on the wide version because in the thin
	// view, the place where the container is placed disappears. This
	// seems like it is only done with css because the node will come
	// back if the window is stretched to fit again.

	// It appears that you can only be on the beta site while logged
	// in. This does not concern me about this node being hidden
	const full_url = document.querySelector('a.button[href^="//d.facdn.net/art/"]').href;
	const info = await get_info(full_url);

	const container = document.createElement('div');
	container.id = 'iss_container';
	const more_from = document
		.querySelector('#columnpage .preview-gallery')
		.previousElementSibling;
	more_from.parentNode.insertBefore(container, more_from);

	const header = document.createElement('h2');
	header.innerText = 'idem\'s sourcing suite';
	container.appendChild(header);

	append(container, info.upload);
	append(container, info.description);
	info.hashes.forEach(e => append(container, e));
}

module.exports = exec;

},{"./../../utils/utils.js":52,"./links.js":20}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
const { simple_site, remove_node, append } = require('./../../utils/utils.js');
const header = require('./header.js');

let last_url = null;

const signal = {
	wait: async () => document.body.leave('.submission-description__created[title$=" "]'),
	load: () => (document.querySelector('.submission-description__created').title += ' ')
};

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
			.then(signal.load);
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
			.then(signal.wait)
			.then(run_site)
			.then(signal.load);
	}

	last_url = here;
}

async function run_site () {
	const aside = document.querySelector('.submission__aside__inner');
	const container = document.createElement('div');
	container.id = 'iss_container';

	const info = await get_info();
	append(container, info.upload);
	append(container, info.description);
	info.hashes.forEach(e => append(container, e));

	const description = aside.querySelector('.submission__description');
	aside.insertBefore(container, description);
}

function get_sources () {
	return {
		full: document.querySelector('.submission-actions > a.t--reset-link').href,
		thumb: document.querySelector('.image.submission-media__img img').src
	};
}

const get_info = async () => simple_site({
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
	`,
	hashes_as_array: true
});

async function exec () {
	attempt_site();
	window.addEventListener('locationchange', attempt_site);
}

module.exports = {
	exec: exec,
	...header
};

},{"./../../utils/utils.js":52,"./header.js":23}],25:[function(require,module,exports){
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

},{"./compare_points.js":26}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
module.exports = {
	test: (url) => {
		return url.href === 'https://e621.net/extensions/image_compare';
	},

	match: [
		'*://*.e621.net/extensions/image_compare'
	],

	connect: ['*'],

	title: 'ImageComparison',
	version: 1
};

},{}],28:[function(require,module,exports){
module.exports = ":root {\n\t--background-blue: #031131;\n\t--home-blue: #012e56;\n\t--standard-blue: #152f56;\n\t--comment-blue: #213a5f;\n\t--quote-blue: #284a81;\n\t--link-blue: #b4c7d9;\n\t--hover-blue: #2e76b4;\n\n\t--other-blue: #174891;\n\n\t--yellow: #fdba31;\n\t--light-yellow: #ffde9b;\n\t--dark-yellow: #d8b162;\n}\n\nbody {\n\tbackground-color: var(--background-blue);\n\tbackground-image: url(https://e621.net/images/stripe.png);\n}\n\ncanvas {\n\tborder: 5px dashed var(--quote-blue);\n}\n\n#c1, #c2 {\n\tmax-width: 400px;\n\tmax-height: 400px;\n}\n\n#input {\n\tdisplay: grid;\n\tgrid-template-columns: auto auto;\n\tgrid-gap: 5px;\n\tflex-grow: 1;\n}\n\n#control {\n\tflex-grow: 5;\n}\n\n#main {\n\tdisplay: flex;\n}\n\n#messages {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\nhr,\ninput[type=file],\n#leave_early ~ label,\n#messages {\n\tcolor: #ccc;\n}";

},{}],29:[function(require,module,exports){
module.exports = "<div id=\"main\">\n\t<div id=\"control\">\n\t\t<button id=\"compare_button\">Compare images using</button>\n\t\t<select id=\"algorithm_select\" title=\"These are named after the degrees of a polynomial\">\n\t\t\t<option value=\"constant\" title=\"This is what you want\">Constant</option>\n\t\t\t<option value=\"linear\" title=\"absoluteValue of color1 - color2\">Linear</option>\n\t\t\t<option value=\"quadratic\" title=\"(color1 - color2)^2\">Quadratic</option>\n\t\t\t<option value=\"in_first\" title=\"Only pixels that are in the first image\">In First</option>\n\t\t\t<option value=\"in_second\" title=\"Only pixels that are in the second image\">In Second</option>\n\t\t</select>\n\t\t<br>\n\t\t<input type=\"checkbox\" id=\"leave_early\" name=\"leave_early\"></input>\n\t\t<label for=\"leave_early\">Quick Compare</label>\n\t\t<br>\n\t\t<div id=\"messages\">\n\t\t\t<span>Logging information should appear here<span>\n\t\t</div>\n\t</div>\n\t<div id=\"input\">\n\t\t<canvas id=\"c1\"></canvas>\n\t\t<canvas id=\"c2\"></canvas>\n\t</div>\n</div>\n<hr>\n<div>\n\t<canvas id=\"o1\"></canvas>\n</div>";

},{}],30:[function(require,module,exports){
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

},{"./../../utils/utils.js":52,"./compare_canvas.js":25,"./header.js":27,"./main.css":28,"./main.html":29}],31:[function(require,module,exports){
module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'inkbunny.net';
	},

	match: [
		'*://*.inkbunny.net/s/*'
	],

	connect: [], // I have complete trust in InkBunny's md5s

	title: 'InkBunny',
	version: 2
};

},{}],32:[function(require,module,exports){
const {
	artist_commentary,
	commentary_button,
	e621_lookup_hash,
	clear_children,
	common_styles,
	upload_button,
	get_value,
	add_css
} = require('./../../utils/utils.js');

async function exec () {
	fix_styles();
	add_iss_div();

	conditional_execute('on_site_hasher_enabled', transition_old_md5s);
	conditional_execute('on_site_commentary_enabled', do_commentary);
	conditional_execute('on_site_upload_enabled', do_upload);
}

async function conditional_execute (key, func) {
	const value = await get_value(key);
	if (value === true) {
		func();
	}
}

function transition_old_md5s () {
	// eslint-disable-next-line no-undef
	showMD5(); // This is a function in the inkbunny window object
	const md5box = document.getElementById('md5box');
	md5box.parentNode.removeChild(md5box.previousElementSibling);

	const new_hashes = Array.from(md5box.children)
		.map(e => e.textContent)
		.map(e => (/\s+([\w\s]+): ([0-9a-f]{32})/).exec(e))
		.map((e, i) => {
			const container = document.createElement('span');
			container.classList.add('iss_hash_span');

			const link = document.createElement('a');
			link.classList.add('iss_image_link');
			link.href = generate_urls()[i];
			link.textContent = e[1] + '\u200B';

			const hash = document.createElement('span');
			hash.classList.add('iss_hash');
			hash.textContent = e[2];
			e621_lookup_hash(e[2], hash);

			container.appendChild(link);
			container.appendChild(hash);
			return container;
		});

	clear_children(md5box);

	new_hashes.forEach(e => md5box.appendChild(e));
}

function generate_urls () {
	const original_url = document.getElementById('magicbox').src;
	return [
		// We never have access to the original file, so linking to this
		// page is the next best thing that we can do.
		window.location.href,
		original_url.replace(/\/files\/\w+\//, '/files/full/'),
		original_url.replace(/\/files\/\w+\//, '/files/screen/'),
		original_url.replace(/\/files\/\w+\//, '/files/preview/')
	];
}

function fix_styles () {
	document.getElementById('md5box').style = '';
	common_styles();
	add_css(`
		#md5box {
			display: flex !important;
			flex-direction: column;
			margin: 0px 0px 0px 20px;
			font-size: 8pt;
		}
		.iss_image_link {
			margin-right: 0.5rem;
			color: black !important;
		}
		#iss_container {
			width: 232px;
			padding-left: 16px;
			margin-bottom: 15px;
			float: left;
			display: flex;
			flex-direction: column;
		}
		
		#iss_container > span:first-child {
			margin-bottom: 0.5rem;
			display: inline-block;
		}
	`);
}

function add_iss_div () {
	const post_info = document.getElementById('md5box').parentNode.parentNode;
	const stats = post_info
		.lastElementChild
		.previousElementSibling
		.previousElementSibling;

	const container = document.createElement('div');
	container.id = 'iss_container';

	const header = document.createElement('span');
	header.textContent = 'idem\'s sourcing suite';
	container.appendChild(header);

	post_info.insertBefore(container, stats);
}

function get_artist () {
	const artist_node = document.querySelector('a[href^="/gallery"]');
	return {
		href: artist_node.href,
		textContent: new URL(artist_node.href).pathname.replace('/gallery/', '')
	};
}

function get_description () {
	return artist_commentary(
		get_artist(),
		document.querySelector('.pooltable h1'), // Title
		document.querySelector('.elephant_bottom > .content > div > span') // Description
	);
}

function do_commentary () {
	const description = get_description();
	const button = commentary_button(description);
	const container = document.createElement('span');
	container.appendChild(button);
	document.getElementById('iss_container').appendChild(container);
}

function do_upload () {
	const link = upload_button(
		generate_urls()[1],
		[
			window.location.href,
			generate_urls()[1],
			get_artist().href
		],
		get_description()
	);
	const container = document.createElement('span');
	container.appendChild(link);
	document.getElementById('iss_container').appendChild(container);
}

module.exports = {
	...require('./header.js'),
	exec: exec
};

},{"./../../utils/utils.js":52,"./header.js":31}],33:[function(require,module,exports){
module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'pixiv.net';
	},

	match: [
		'*://*.pixiv.net/*'
	],

	connect: ['i.pximg.net'],

	title: 'Pixiv',
	version: 2
};

},{}],34:[function(require,module,exports){
const header = require('./header.js');
const {
	artist_commentary,
	commentary_button,
	data_to_nodes,
	common_styles,
	upload_button,
	get_value,
	add_css
} = require('./../../utils/utils.js');

function exec () {
	find_site();
	common_styles();
	add_css(`
		.iss_image_link {
			color: black !important;
		}

		.iss_hashes {
			display: flex;
			flex-direction: column;
		}
		
		.iss_hash_span {
			margin: 0px auto;
		}

		.iss_image_link {
			margin-right: 1rem;
		}
	`);

	// This whole thing was meant to be setup so
	// it would work with pixiv's design and will
	// load the proper things on each page, but this
	// proved to be too difficult. Commented out code
	// should be the beginnings of such a system
	// window.addEventListener('locationchange', find_site);
}

function find_site () {
	const artworks = /^\/[^/]*\/artworks\/\d+$/;

	clear_all_setup();

	const here = new URL(window.location.href);
	if (artworks.test(here.pathname)) {
		console.log('ISS: Artwork URL detected');
		run();
	}
}

function clear_all_setup () {
	// Todo
}

// let last_image_url = null;
async function run () {
	// Wait for the first image to appear. Make sure it has a different url
	// const image = await document.body.arrive(`img[srcset]:not([srcset^="${last_image_url}"])`);
	// await document.body.leave('#\\32 ');
	// last_image_url = image.srcset;

	await document.body.arrive('[role=presentation] [role=presentation]');

	// Description can always be done
	conditional_execute('on_site_commentary_enabled', do_commentary);

	// May need to wait for upload links and image hashes
	if (document.getElementById('1') !== null) {
		// https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
		await document.body.arrive('#\\32 ');
	}

	conditional_execute('on_site_upload_enabled', do_upload);
	conditional_execute('on_site_hasher_enabled', do_md5s);
}

async function do_md5s () {
	const images = get_images();
	for (let i = 0; i < images.length; i++) {
		const image = images[i];
		console.log(`ISS: Processing image ${i}`);

		const iss_container = document.createElement('span');
		iss_container.classList.add('iss_hashes');

		data_to_nodes([
			[image.best_url, 'Full'],
			[image.preview_url, 'Preview']
		]).forEach(p => {
			iss_container.appendChild(p);
		});

		image.container.appendChild(iss_container);

		// Wait a whole second so images are complete sequentially
		// and on large posts with many images, we do not get rate
		// limited by e621 or from pixiv.
		await new Promise(resolve => setTimeout(resolve, 1300));
	}
}

function get_description () {
	return artist_commentary(
		document.querySelectorAll('a[href^="/en/users"]')[1], // Artist
		document.getElementsByTagName('h1')[0], // Title
		document.querySelector('h1 ~ div > div') // Description
	);
}

function do_upload () {
	const gallery_url = document.querySelectorAll('a[href^="/en/users"]')[1].href;

	const images = get_images();
	for (let i = 0; i < images.length; i++) {
		const image = images[i];

		const button = upload_button(
			image.best_url,
			[
				window.location.href,
				image.best_url,
				gallery_url
			],
			get_description()
		);

		image.container.appendChild(button);
	}
}

function get_images () {
	return Array.from(document.querySelectorAll('main div[role="presentation"] > a'))
		.map(e => ({
			container: e.parentNode.parentNode,
			link: e
		}))
		// Find some way to filter out bad images such
		// as animations. Currently the script will just
		// break and I guess that is okay.
		.map(e => ({
			...e,
			best_url: e.link.href,
			preview_url: e.link.href
				.replace('/img-original/', '/img-master/')
				.replace(/.(png|jpg)$/u, '_master1200.jpg')
		}));
}

function do_commentary () {
	const container = document.querySelector('h1').parentNode;
	const button = commentary_button(get_description());
	container.insertBefore(button, container.querySelector('footer'));
}

async function conditional_execute (key, func) {
	const value = await get_value(key);
	if (value === true) {
		func();
	}
}

module.exports = {
	...header,
	exec: exec
};

},{"./../../utils/utils.js":52,"./header.js":33}],35:[function(require,module,exports){
module.exports = {
	test: (url) => {
		return url.href === 'https://e621.net/extensions';
	},

	match: ['*://*.e621.net/extensions'],

	connect: [],

	title: 'SettingsPage',
	version: 2
};

},{}],36:[function(require,module,exports){
const headers = require('./header.js');
const defaults = require('./../../default_settings.js');
const Settings = require('./../../../dependencies/extensions.js');
const { set_value } = require('./../../utils/utils.js');

function exec () {
	// Do something with utils
	on_site_hasher_settings();
	image_compare_settings();
	post_bvas_settings();
	add_credentials_listener();
}

function on_site_hasher_settings () {
	const settings = new Settings({
		name: 'on-site-utilities',
		description: 'A collection of utilities for sourcing and uploading posts.'
	});

	settings.checkbox({
		name: 'on-site-hasher',
		key: 'on_site_hasher_enabled',
		default: defaults.on_site_hasher_enabled,
		description: 'Downloads, hashes, and links to various image qualities.'
	});

	settings.checkbox({
		name: 'on-site-upload',
		key: 'on_site_upload_enabled',
		default: defaults.on_site_upload_enabled,
		description: 'Provides a convenient link to upload posts directly to e621.'
	});

	settings.checkbox({
		name: 'on-site-commentary',
		key: 'on_site_commentary_enabled',
		default: defaults.on_site_commentary_enabled,
		description: 'Provides a convenient button to copy an artists commentary about an image.'
	});

	site_checkbox('DeviantArt', 'https://deviantart.com/');
	site_checkbox('FurAffinity', 'https://furaffinity.net/');
	site_checkbox('FurryNetwork', 'https://furrynetwork.com/');
	site_checkbox('InkBunny', 'https://inkbunny.net/');
	site_checkbox('Pixiv', 'https://www.pixiv.net/en/');
	site_checkbox('SoFurry', 'https://www.sofurry.com/');
	site_checkbox('Twitter', 'https://twitter.com/');
	site_checkbox('Weasyl', 'https://www.weasyl.com/');

	function site_checkbox (name, url) {
		const key = `on_site_${name.toLowerCase()}_enabled`;
		settings.checkbox({
			name: name,
			key: key,
			default: defaults[key],
			description: `Enable on-site-utilities for <a href="${url}">${name}</a>.`
		});
	}
}

function image_compare_settings () {
	const settings = new Settings({
		name: 'image-compare',
		description: 'An in-browser image comparison tool. Useful for seeing the differences between two images.',
		url: 'https://e621.net/extensions/image_compare'
	});

	settings.checkbox({
		name: 'Enabled',
		key: 'on_site_imagecomparison_enabled',
		default: defaults.on_site_imagecomparison_enabled,
		description: 'Enables or disables the image-compare tool located at <a href="https://e621.net/extensions/image_compare">/extensions/image_compare</a>.'
	});
}

function post_bvas_settings () {
	const settings = new Settings({
		name: 'post-bvas',
		description: 'A tool to automate the process of replacing posts with better versions.',
		url: 'https://e621.net/extensions/upload_bvas'
	});

	settings.checkbox({
		name: 'Enabled',
		key: 'on_site_postbvas_enabled',
		default: defaults.on_site_postbvas_enabled,
		description: 'Enables or disables the post-bvaser tool located at <a href="https://e621.net/extensions/upload_bvas">/extensions/upload_bvas</a>.'
	});

	settings.checkbox({
		name: 'Edit Description',
		key: 'postbvas_edit_description',
		default: defaults.postbvas_edit_description,
		description: 'Toggles the automatic editing of a new post\'s description to link to the old post.'
	});

	settings.checkbox({
		name: 'Post Comment',
		key: 'postbvas_post_comment',
		default: defaults.postbvas_post_comment,
		description: 'Toggles the automatic creation of a comment linking to the old post.'
	});

	settings.checkbox({
		name: 'Delete post',
		key: 'postbvas_delete_post',
		default: defaults.postbvas_delete_post,
		description: 'For janitor+ use. If enabled the post will be deleted instead of flagged.'
	});
}

function add_credentials_listener () {
	document.getElementById('update_credentials_button').addEventListener('click', async e => {
		const username = document.getElementById('credentials_username').value;
		const api_key = document.getElementById('credentials_api_key').value;
		await set_value('username', username);
		await set_value('api_key', api_key);
	});
}

module.exports = {
	exec: exec,
	...headers
};

},{"./../../../dependencies/extensions.js":3,"./../../default_settings.js":7,"./../../utils/utils.js":52,"./header.js":35}],37:[function(require,module,exports){
module.exports = {
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'sofurry.com';
	},

	match: [
		'*://*.sofurry.com/view/*'
	],

	connect: ['www.sofurryfiles.com'],

	title: 'SoFurry',
	version: 1
};

},{}],38:[function(require,module,exports){
const { simple_site, append } = require('./../../utils/utils.js');
const header = require('./header.js');

// fix this
// get urls based on page url, format of. More than content and preview?
// https://www.sofurryfiles.com/std/content?page=1515217

function get_urls () {
	const here = new URL(window.location.href).pathname;
	const post_id_string = (/\/view\/(\d+)/).exec(here)[1];
	const post_id = parseInt(post_id_string, 10);

	return [
		[`https://www.sofurryfiles.com/std/content?page=${post_id}`, 'full image'],
		[`https://www.sofurryfiles.com/std/preview?page=${post_id}`, 'thumb image']
	];
}

const get_info = async () => simple_site({
	artist: {
		textContent: document.querySelector('.sf-username').textContent,
		href: document.getElementById('sf-userinfo-outer').href
	},
	title: document.getElementById('sfContentTitle'),
	description: document.getElementById('sfContentBody'),
	full_url: get_urls()[0][0],
	hashes: get_urls().slice(1),
	css: `
		#iss_container {
			display: flex;
			flex-direction: column;
			text-align: initial;
			margin-left: 35px;
		}
		.iss_image_link {
			color: black !important;
			margin-right: 0.75rem;
		}
		.iss_hash_span {
			white-space: nowrap;
			overflow: hidden;
		}
		#iss_artist_commentary {
			padding: 4px 6px 5px;
		}
		`,
	hashes_as_array: true
});

async function exec () {
	const info = await get_info();

	const container = document.createElement('div');
	container.id = 'iss_container';
	const tags = document.getElementById('submission_tags');

	tags.parentNode.insertBefore(container, tags);
	tags.parentNode.insertBefore(document.createElement('br'), tags);
	tags.parentNode.insertBefore(document.createElement('br'), tags);

	append(container, info.upload);
	append(container, info.description);
	info.hashes.forEach(e => append(container, e));
}

module.exports = {
	...header,
	exec: exec
};

},{"./../../utils/utils.js":52,"./header.js":37}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
const { remove_node, simple_site, append } = require('./../../utils/utils.js');
const header = require('./header.js');

// Twitter actually has a different site for people not logged in
// There *should* be a case where this is handled, but I am just going
// to leave that out and hope that twitter will force the new site
// design on everyone soon. Worst case, users of this can simply
// make a twitter account for this to work. (I'm sorry this is a bad solution)

async function photo_hashes () {
	const info = await build_info();

	// Because of the async nature of stuff, a user might
	// have gone through things rather quickly. This will
	// make sure that there is always a clean slate
	clear_all_setup();

	const quick_buttons = document.querySelector('[aria-label$=Reply]')
		.parentNode
		.parentNode;
	quick_buttons.querySelector('div ~ div ~ div ~ div').style.flexGrow = 1;

	append(quick_buttons, info.upload);
	append(document.body, info.hashes);
	// I can not get the button when pressed to copy the description
	// append(quick_buttons, info.description);
}

function exec () {
	find_site();
	window.addEventListener('locationchange', find_site);
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
		// Specific image
		document.getElementById('react-root').arrive(query),

		// Single image
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
		[url_type('large'), 'large ']
	];

	function url_type (new_type) {
		const url = new URL(starting_url);
		url.searchParams.set('name', new_type);
		return url.href;
	}
}

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
		photo_hashes();
	}
}

function clear_all_setup () {
	remove_node(document.getElementById('iss_hashes'));
	remove_node(document.getElementById('iss_upload_link'));
}

async function build_info () {
	const artist = await document.body.arrive('[data-testid=tweet] [dir=ltr] > span');
	// This should always be present if using the site normally
	// when launched from a  direct photo url, the top tweet
	// isn't actually present! This causes some problems, so saying
	// it is empty is a lot better
	const description = document.querySelector('[data-testid=tweet] ~ [dir=auto] > span');
	const sources = await get_sources();

	return get_info({
		artist: artist,
		description: description,
		sources: sources
	});
}

const get_info = async (pre_found) => simple_site({
	artist: pre_found.artist,
	title: null, // No titles on twitter
	description: pre_found.description,
	full_url: pre_found.sources[0][0],
	full_url_name: 'orig',
	hashes: pre_found.sources.slice(1),
	css: `
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
	`,
	hashes_as_array: false
});

module.exports = {
	...header,
	exec: exec
};

},{"./../../utils/utils.js":52,"./header.js":39}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
const { simple_site, append } = require('./../../utils/utils.js');

const get_info = async () => simple_site({
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
	`,
	hashes_as_array: false
});

async function exec () {
	const info = await get_info();

	const container = document.createElement('div');
	container.id = 'iss_container';
	document.querySelector('#di-info').appendChild(container);

	append(container, info.upload);
	append(container, info.description);
	append(container, info.hashes);
}

module.exports = {
	...require('./header.js'),
	exec: exec
};

},{"./../../utils/utils.js":52,"./header.js":41}],43:[function(require,module,exports){
const { node_to_dtext, node_to_plain_text } = require('./node_to_dtext.js');

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
	const artist_link = artist_node.href;
	const title = title_node !== null ? node_to_plain_text(title_node) : 'Untitled';
	const description = node_to_dtext(description_node);
	return commentary_from_text(artist, artist_link, title, description);
}

function commentary_from_text (artist, artist_link, title, description) {
	description = description.replace('[/section]', '(/section)');
	const full_title = (() => {
		const fixed_title = title.replace(/\[/gu, '(').replace(/\]/gu, ')');
		if (artist === null) {
			return fixed_title;
		} else if (artist_link === null || artist_link === undefined) {
			return `${fixed_title} - by ${artist}`;
		} else {
			return `${fixed_title} - by ${artist} ( ${artist_link} )`;
		}
	})();

	const header = (() => {
		const lines = description.split('\n').length;
		const should_expand = lines <= 5 || description.length <= 500;
		const expanded_text = should_expand ? ',expanded' : '';
		return `[section${expanded_text}=${full_title}]`;
	})();

	return `From source:\n${header}\n${description}\n[/section]`;
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

},{"./node_to_dtext.js":47}],44:[function(require,module,exports){
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

},{"./../../dependencies/e621_API.commonjs2.userscript.js":2,"./gm_values.js":45}],45:[function(require,module,exports){
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

},{"./../../dependencies/gm_functions.js":4,"./../default_settings.js":7}],46:[function(require,module,exports){
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
	const url_ = new URL(url);
	if (url_.host === 'i.pximg.net') {
		headers.referer = window.location.href;
	}

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

	const hash = await hash_url(url).then(check_hash).catch(e => {
		hash_node.textContent = hash_lookup_error(e);
		return null;
	});

	if (hash !== null) {
		e621_lookup_hash(hash, hash_node);
	}
}

async function e621_lookup_hash (hash, hash_node) {
	e621_lookup(hash, hash_node)
		.then(posts => set_hash_status(posts, hash_node))
		.catch(e => (hash_node.textContent = hash_lookup_error(e)));
}

async function e621_lookup (hash, hash_node) {
	hash_node.textContent = hash;
	hash_node.classList.add('iss_hash_checking');
	return e621.post_show_md5(hash);
}

async function set_hash_status (post, hash_node) {
	hash_node.classList.remove('iss_hash_checking');

	if (post === null) {
		hash_node.classList.add('iss_hash_notfound');
	} else {
		const new_hash = document.createElement('a');
		new_hash.classList.add('iss_hash_found');
		Array.from(hash_node.classList)
			.forEach(e => new_hash.classList.add(e));

		new_hash.href = `https://e621.net/post/show/${post.id}`;
		new_hash.textContent = post.file.md5;
		hash_node.parentNode.replaceChild(new_hash, hash_node);
	}
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
	data_to_span: data_to_span,
	e621_lookup_hash: e621_lookup_hash
};

},{"./../../dependencies/gm_functions.js":4,"./../../dependencies/md5.js":5,"./e621_api.js":44}],47:[function(require,module,exports){
const { safe_link } = require('./safe_link.js');

function get_link (node, is_dtext) {
	const inner = inner_text(node);
	const link = safe_link(node.href);

	// if node is like <a href="https://google.com">Yahoo</a>
	if (inner && inner !== node.href) {
		if (is_dtext) {
			return `"${inner}":${link}`;
		} else {
			return `${inner} ( ${link} )`;
		}
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

		case 'A': return get_link(entry, true);

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

function node_to_plain_text (entry) {
	if (entry === null) {
		return '';
	} else if (typeof entry === 'string') {
		return entry;
	}
console.log(entry)
	switch (entry.nodeName) {
		case '#comment':
		case 'IMG': return ''; // Images get destroyed :(
		case 'BR': return '\n';

		case 'A': return get_link(entry, false);

		default: return inner_text(entry);
	}
}

module.exports = {
	node_to_dtext: html_to_dtext,
	node_to_plain_text: node_to_plain_text
};

},{"./safe_link.js":49}],48:[function(require,module,exports){
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

function append (parent, node) {
	if (node) {
		parent.appendChild(node);
	}
}

module.exports = {
	clear_children: clear_children,
	clear_page: clear_page,
	remove_node: remove_node,
	common_styles: apply_common_styles,
	add_css: add_css,
	string_to_node: string_to_node,
	multi_input: multi_input,
	move_children: move_children,
	append: append
};

},{"./../../dependencies/gm_functions.js":4,"./hash_image.js":46}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
const { artist_commentary, commentary_button } = require('./artist_commentary.js');
const { upload_button } = require('./upload_url.js');
const { data_to_span } = require('./hash_image.js');
const { common_styles, add_css } = require('./nodes.js');
const { get_value } = require('./gm_values.js');

async function build_simple (options) {
	options = transform_options(options);
	// artist
	// title
	// description
	// full_url
	// full_url_name
	// hashes
	// css
	// hashes_as_array

	const commentary = artist_commentary(
		options.artist,
		options.title,
		options.description
	);

	const sources = [
		window.location.href,
		options.full_url,
		options.artist.href
	];

	let commentary_span = null;
	const on_site_commentary_enabled = await get_value('on_site_commentary_enabled');
	if (on_site_commentary_enabled === true) {
		commentary_span = document.createElement('span');
		commentary_span.appendChild(commentary_button(commentary));
	}

	let upload_span = null;
	const on_site_upload_enabled = await get_value('on_site_upload_enabled');
	if (on_site_upload_enabled === true) {
		upload_span = document.createElement('span');
		const button = upload_button(options.full_url, sources, commentary);
		upload_span.appendChild(button);
	}

	let hash_span = null;
	const on_site_hasher_enabled = await get_value('on_site_hasher_enabled');
	if (on_site_hasher_enabled === true) {
		const data_span = data_to_span(options.hashes);
		if (options.hashes_as_array === true) {
			hash_span = Array.from(data_span.children);
		} else {
			hash_span = data_span;
		}
	} else if (options.hashes_as_array === true) {
		hash_span = [];
	}

	common_styles();
	add_css(options.css);

	return {
		description: commentary_span,
		upload: upload_span,
		hashes: hash_span
	};
}

function transform_options (options) {
	Object.entries(options).forEach(([key, value]) => {
		if (typeof value === 'function') {
			options[key] = options[key]();
		}
	});

	const image_name = options.full_url_name || 'full image';
	options.hashes = [[options.full_url, image_name]].concat(options.hashes);

	return options;
}

module.exports = {
	simple_site: build_simple
};

},{"./artist_commentary.js":43,"./gm_values.js":45,"./hash_image.js":46,"./nodes.js":48,"./upload_url.js":51}],51:[function(require,module,exports){
function produce_link (source_url, sources, description = '', tags = []) {
	const url = new URL('https://e621.net/uploads/new');
	url.searchParams.set('upload_url', source_url);
	url.searchParams.set('sources', sources.join(','));
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

},{}],52:[function(require,module,exports){
module.exports = {
	...require('./artist_commentary.js'),
	...require('./e621_api.js'),
	...require('./hash_image.js'),
	...require('./node_to_dtext.js'),
	...require('./nodes.js'),
	...require('./safe_link.js'),
	...require('./upload_url.js'),
	...require('./simple_site.js'),
	...require('./gm_values.js')
};

},{"./artist_commentary.js":43,"./e621_api.js":44,"./gm_values.js":45,"./hash_image.js":46,"./node_to_dtext.js":47,"./nodes.js":48,"./safe_link.js":49,"./simple_site.js":50,"./upload_url.js":51}]},{},[8]);
