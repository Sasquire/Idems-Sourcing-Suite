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

	if (settings.authenticate) {
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
/* harmony import */ var _post_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post/raw_post_show.js */ "./source/post/raw_post_show.js");
/* harmony import */ var _post_raw_post_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post/raw_post_list.js */ "./source/post/raw_post_list.js");
/* harmony import */ var _post_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post/raw_post_vote.js */ "./source/post/raw_post_vote.js");
/* harmony import */ var _post_raw_post_create_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./post/raw_post_create.js */ "./source/post/raw_post_create.js");





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
E621API.prototype.raw_post_list = _post_raw_post_list_js__WEBPACK_IMPORTED_MODULE_1__["raw_post_list"];
E621API.prototype.raw_post_vote = _post_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_2__["raw_post_vote"];
E621API.prototype.raw_post_create = _post_raw_post_create_js__WEBPACK_IMPORTED_MODULE_3__["raw_post_create"];

/* harmony default export */ __webpack_exports__["default"] = (E621API);


/***/ }),

/***/ "./source/post/raw_post_create.js":
/*!****************************************!*\
  !*** ./source/post/raw_post_create.js ***!
  \****************************************/
/*! exports provided: raw_post_create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_create", function() { return raw_post_create; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../validation/validation.js */ "./source/validation/validation.js");



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
		Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_post_id"])(settings['upload[parent_id]']);
	}
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/raw_post_list.js":
/*!**************************************!*\
  !*** ./source/post/raw_post_list.js ***!
  \**************************************/
/*! exports provided: raw_post_list */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_list", function() { return raw_post_list; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../validation/validation.js */ "./source/validation/validation.js");



// There is an edge case where the data can be md5=<md5>

async function raw_post_list (tag_search) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_string"])(tag_search);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: '/posts',
		response: 'JSON',

		format: 'URL',
		data: {
			limit: 320,
			tags: tag_search
		}
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/raw_post_show.js":
/*!**************************************!*\
  !*** ./source/post/raw_post_show.js ***!
  \**************************************/
/*! exports provided: raw_post_show */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_show", function() { return raw_post_show; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_show (post_id) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_post_id"])(post_id);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: `/posts/${post_id}`,
		response: 'JSON',

		format: 'URL',
		data: null
	}).catch(handle_post_show_error);
}

function handle_post_show_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/raw_post_vote.js":
/*!**************************************!*\
  !*** ./source/post/raw_post_vote.js ***!
  \**************************************/
/*! exports provided: raw_post_vote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw_post_vote", function() { return raw_post_vote; });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_vote (settings) {
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_post_id"])(settings.post_id);
	Object(_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__["validate_vote_option"])(settings.vote);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: `/posts/${settings.post_id}/votes`,
		response: 'JSON',

		format: 'URL',
		data: {
			score: settings.vote
		},
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/validation/validation.js":
/*!*****************************************!*\
  !*** ./source/validation/validation.js ***!
  \*****************************************/
/*! exports provided: validate_md5, validate_post_id, validate_string, validate_vote_option */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_md5", function() { return validate_md5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_post_id", function() { return validate_post_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_string", function() { return validate_string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_vote_option", function() { return validate_vote_option; });
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

function validate_string (string) {
	if (typeof string !== 'string') {
		throw new Error('string is not a string');
	}
}

function validate_vote_option (vote) {
	if (vote !== -1 && vote !== 0 && vote !== 1) {
		throw new Error('vote is not of the values [-1, 0, 1]');
	}
}




/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9FNjIxQVBJL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvZG93bmxvYWQvZG93bmxvYWQudXNlcnNjcmlwdC5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL21haW4uanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3Jhd19wb3N0X2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvcmF3X3Bvc3RfbGlzdC5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvcmF3X3Bvc3Rfc2hvdy5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvcmF3X3Bvc3Rfdm90ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7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Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV5Qjs7Ozs7Ozs7Ozs7OztBQzdCekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBT0UiLCJmaWxlIjoiZTYyMV9BUEkuY29tbW9uanMyLnVzZXJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NvdXJjZS9tYWluLmpzXCIpO1xuIiwiLyogSW5wdXQgdG8gdGhpcyBtZXRob2QgaXMgc3RydWN0dXJlZCBsaWtlIHRoaXNcbntcblx0bWV0aG9kOiAnUE9TVCcgfCAnR0VUJyAvLyBEZWZpbmVzIGhvdyB0aGUgcmVxdWVzdCBzaG91bGQgYmUgbWFkZVxuXHRwYXRoOiA8c3RyaW5nPiAvLyBUaGUgcGF0aCBvZiB0aGUgVVJMIHRoYXQgaXMgYmVpbmcgYWNjZXNzZWRcblx0cmVzcG9uc2U6ICdKU09OJyB8ICdYTUwnIHwgJ0hUTUwnIC8vIERlZmluZXMgdGhlIHJlc3BvbnNlIHR5cGVcblxuXHRmb3JtYXQ6ICdVUkwnIHwgJ0ZPUk0nIHwgdW5kZWZpbmVkIC8vIERlZmluZXMgaG93IHRoZSBkYXRhIGlzIHBhc3NlZFxuXHRkYXRhOiA8b2JqZWN0PiB8IHVuZGVmaW5lZCAvLyBEYXRhIGJlaW5nIHBhc3NlZCBpbiB0aGUgcmVxdWVzdFxufVxuXG4qL1xuYXN5bmMgZnVuY3Rpb24gZG93bmxvYWQgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJlcXVlc3Rfb3B0aW9ucyA9IGJ1aWxkX3JlcXVlc3Rfb3B0aW9ucy5jYWxsKHRoaXMsIHNldHRpbmdzKTtcblxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGNvbnN0IG9uX2xvYWQgPSAoZSkgPT4ge1xuXHRcdFx0aWYgKGUuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0cmVzb2x2ZShlLnJlc3BvbnNlKTsgLy8gVGhpcyB3aWxsIGxpa2VseSBjYXVzZSBlcnJvcnMgbGF0ZXJcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcHJvbWlzZS1yZWplY3QtZXJyb3JzXG5cdFx0XHRcdHJlamVjdCh7XG5cdFx0XHRcdFx0cmVzcG9uc2U6IHtcblx0XHRcdFx0XHRcdHN0YXR1czogZS5zdGF0dXNcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGRhdGE6IGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJlcXVlc3Rfb3B0aW9ucy5vbmxvYWQgPSBvbl9sb2FkO1xuXHRcdHJlcXVlc3Rfb3B0aW9ucy5vbmVycm9yID0gb25fbG9hZDtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHRcdEdNLnhtbEh0dHBSZXF1ZXN0KHJlcXVlc3Rfb3B0aW9ucyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZF9yZXF1ZXN0X29wdGlvbnMgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHVybCA9IG5ldyBVUkwoJ2h0dHBzOi8vZTYyMS5uZXQvJyk7XG5cdHVybC5wYXRobmFtZSA9IHNldHRpbmdzLnBhdGggKyAnLicgKyBzZXR0aW5ncy5yZXNwb25zZS50b0xvd2VyQ2FzZSgpO1xuXG5cdGlmIChzZXR0aW5ncy5mb3JtYXQgPT09ICdVUkwnKSB7XG5cdFx0T2JqZWN0LmVudHJpZXMoc2V0dGluZ3MuZGF0YSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHR1cmwuc2VhcmNoUGFyYW1zLnNldChrZXksIHZhbHVlKTtcblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IHJlcXVlc3Rfb3B0aW9ucyA9IHtcblx0XHR1cmw6IHVybC5ocmVmLFxuXHRcdG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuXHRcdHJlc3BvbnNlVHlwZTogc2V0dGluZ3MucmVzcG9uc2UgPT09ICdKU09OJyA/ICdqc29uJyA6ICd0ZXh0Jyxcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHQndXNlci1hZ2VudCc6IHRoaXMudXNlcmFnZW50XG5cdFx0fVxuXHR9O1xuXG5cdGlmIChzZXR0aW5ncy5hdXRoZW50aWNhdGUpIHtcblx0XHRjb25zdCBrZXkgPSBgQmFzaWMgJHtidG9hKGAke3RoaXMudXNlcm5hbWV9OiR7dGhpcy5hcGlfa2V5fWApfWA7XG5cdFx0cmVxdWVzdF9vcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGtleTtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5mb3JtYXQgPT09ICdGT1JNJykge1xuXHRcdGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcblx0XHRPYmplY3QuZW50cmllcyhzZXR0aW5ncy5kYXRhKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcblx0XHRcdGlmICh2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcblx0XHRcdFx0Zm9ybS5hcHBlbmQoa2V5LCBuZXcgQmxvYihbdmFsdWVdKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3JtLmFwcGVuZChrZXksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJlcXVlc3Rfb3B0aW9ucy5kYXRhID0gZm9ybTtcblx0fVxuXG5cdHJldHVybiByZXF1ZXN0X29wdGlvbnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvd25sb2FkOyIsImltcG9ydCB7IHJhd19wb3N0X3Nob3cgfSBmcm9tICcuL3Bvc3QvcmF3X3Bvc3Rfc2hvdy5qcyc7XG5pbXBvcnQgeyByYXdfcG9zdF9saXN0IH0gZnJvbSAnLi9wb3N0L3Jhd19wb3N0X2xpc3QuanMnO1xuaW1wb3J0IHsgcmF3X3Bvc3Rfdm90ZSB9IGZyb20gJy4vcG9zdC9yYXdfcG9zdF92b3RlLmpzJztcbmltcG9ydCB7IHJhd19wb3N0X2NyZWF0ZSB9IGZyb20gJy4vcG9zdC9yYXdfcG9zdF9jcmVhdGUuanMnO1xuXG5jbGFzcyBFNjIxQVBJIHtcblx0Ly8gQW55IG9mIHRoZXNlIGNhbiBiZSBhbnl0aGluZywgYnV0IGVycm9ycyB3aWxsIGJlIHRocm93blxuXHQvLyB3aGVuIGFueSByZXF1ZXN0cyBhcmUgdHJ5aW5nIHRvIGJlIG1hZGUuXG5cdGNvbnN0cnVjdG9yICh1c2VyYWdlbnQsIHVzZXJuYW1lLCBhcGlfa2V5KSB7XG5cdFx0dGhpcy51c2VyYWdlbnQgPSB1c2VyYWdlbnQ7XG5cdFx0dGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuXHRcdHRoaXMuYXBpX2tleSA9IGFwaV9rZXk7XG5cdH1cbn1cblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3Rfc2hvdyA9IHJhd19wb3N0X3Nob3c7XG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF9saXN0ID0gcmF3X3Bvc3RfbGlzdDtcbkU2MjFBUEkucHJvdG90eXBlLnJhd19wb3N0X3ZvdGUgPSByYXdfcG9zdF92b3RlO1xuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3RfY3JlYXRlID0gcmF3X3Bvc3RfY3JlYXRlO1xuXG5leHBvcnQgZGVmYXVsdCBFNjIxQVBJO1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9wb3N0X2lkIH0gZnJvbSAnLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG4vLyB1cGxvYWRbdGFnX3N0cmluZ10gQSBzcGFjZSBkZWxpbWl0ZWQgbGlzdCBvZiB0YWdzLlxuLy8gdXBsb2FkW2ZpbGVdIFRoZSBmaWxlIGRhdGEgZW5jb2RlZCBhcyBhIG11bHRpcGFydCBmb3JtLlxuLy8gdXBsb2FkW3JhdGluZ10gVGhlIHJhdGluZyBmb3IgdGhlIHBvc3QuIENhbiBiZTogcywgcSBvciBlIGZvciBzYWZlLCBxdWVzdGlvbmFibGUsIGFuZCBleHBsaWNpdCByZXNwZWN0aXZlbHkuXG4vLyB1cGxvYWRbZGlyZWN0X3VybF0gSWYgdGhpcyBpcyBhIFVSTCwgZTYyMSB3aWxsIGRvd25sb2FkIHRoZSBmaWxlLlxuLy8gdXBsb2FkW3NvdXJjZV0gVGhpcyB3aWxsIGJlIHVzZWQgYXMgdGhlIHBvc3QncyAnU291cmNlJyB0ZXh0LiBTZXBhcmF0ZSBtdWx0aXBsZSBVUkxzIHdpdGggJTBBICh1cmwtZW5jb2RlZCBuZXdsaW5lKSB0byBkZWZpbmUgbXVsdGlwbGUgc291cmNlcy4gTGltaXQgb2YgdGVuIFVSTHNcbi8vIHVwbG9hZFtkZXNjcmlwdGlvbl0gVGhlIGRlc2NyaXB0aW9uIGZvciB0aGUgcG9zdC5cbi8vIHVwbG9hZFtwYXJlbnRfaWRdIFRoZSBJRCBvZiB0aGUgcGFyZW50IHBvc3QuXG4vLyB1cGxvYWRbcmVmZXJlcl91cmxdICAgICAgICAgP1xuLy8gdXBsb2FkW21kNV9jb25maXJtYXRpb25dICAgIHVzZWxlc3Ncbi8vIHVwbG9hZFthc19wZW5kaW5nXSBJZiB0cnVlIHBvc3Qgd2lsbCBiZSBwb3N0ZWQgYXMgcGVuZGluZ1xuXG4vLyB0YWdfc3RyaW5nLCByYXRpbmcsIHNvdXJjZSAoZmlsZSB8fCBkaXJlY3RfdWxyKSBhcmUgcmVxdWlyZWRcbi8vIGFsbCBvdGhlcnMgc2hvdWxkIGJlIG51bGxcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3RfY3JlYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdHBhdGg6ICcvdXBsb2FkcycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ0ZPUk0nLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncyksXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgbmV3X3NldHRpbmdzID0ge1xuXHRcdCd1cGxvYWRbdGFnX3N0cmluZ10nOiBzZXR0aW5nc1sndXBsb2FkW3RhZ19zdHJpbmddJ10sXG5cdFx0J3VwbG9hZFtyYXRpbmddJzogc2V0dGluZ3NbJ3VwbG9hZFtyYXRpbmddJ10sXG5cdFx0J3VwbG9hZFtzb3VyY2VdJzogc2V0dGluZ3NbJ3VwbG9hZFtzb3VyY2VdJ11cblx0fTtcblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddICE9PSB1bmRlZmluZWQpIHtcblx0XHRuZXdfc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddID0gc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddO1xuXHR9IGVsc2Uge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ10gPSBzZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ107XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXSAhPT0gbnVsbCkge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW2Rlc2NyaXB0aW9uXSddID0gc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSAhPT0gbnVsbCkge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSA9IHNldHRpbmdzWyd1cGxvYWRbcGFyZW50X2lkXSddO1xuXHR9XG5cblx0cmV0dXJuIG5ld19zZXR0aW5ncztcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3RhZ19zdHJpbmddJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3RhZ19zdHJpbmddIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nc1sndXBsb2FkW3RhZ19zdHJpbmddJ10gIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbdGFnX3N0cmluZ10gbXVzdCBiZSBvZiB0eXBlIHN0cmluZycpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXSAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdCb3RoIHVwbG9hZFtmaWxlXSBhbmQgdXBsb2FkW2RpcmVjdF91cmxdIGNhbiBub3QgYmUgZGVmaW5lZCcpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXSA9PT0gdW5kZWZpbmVkICYmIHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgdXBsb2FkW2ZpbGVdIG9yIHVwbG9hZFtkaXJlY3RfdXJsXSBtdXN0IGJlIGRlZmluZWQnKTtcblx0fVxuXG5cdC8vIHRvZG8gdGVzdCB0aGlzXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2ZpbGVdJ10pIHtcblx0XHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddLmNvbnN0cnVjdG9yICE9PSBBcnJheUJ1ZmZlcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbZmlsZV0gbXVzdCBiZSBvZiB0eXBlIEFycmF5QnVmZmVyJyk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgZm9yIGRhdGEgaW4gdGhlIGFycmF5IGJ1ZmZlcj9cblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ10pIHtcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW2RpcmVjdF91cmxdIG11c3QgYmUgb2YgdHlwZSBzdHJpbmcnKTtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBpdCBpcyBhbiBhY3R1YWwgdXJsP1xuXHR9XG5cblx0aWYgKFsncycsICdxJywgJ2UnXS5pbmNsdWRlcyhzZXR0aW5nc1sndXBsb2FkW3JhdGluZ10nXSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbcmF0aW5nXSBtdXN0IGJlIG9uZSBvZiBbXFwnc1xcJywgXFwncVxcJywgXFwnZVxcJ10nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3NvdXJjZV0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbc291cmNlXSBtdXN0IGJlIHByZXNlbnQnKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygc2V0dGluZ3NbJ3VwbG9hZFtzb3VyY2VdJ10gIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbc291cmNlXSBtdXN0IGJlIHVuZGVmaW5lZCBvciBvZiB0eXBlIHN0cmluZyBvciBudWxsJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbZGVzY3JpcHRpb25dIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nc1sndXBsb2FkW2Rlc2NyaXB0aW9uXSddICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW2Rlc2NyaXB0aW9uXSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3BhcmVudF9pZF0gbXVzdCBwcmVzZW50Jyk7XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ10gPT09IG51bGwpIHtcblx0XHQvLyBJdCBpcyBmaW5lIGlmIHBhcmVudF9pZCBpcyBudWxsXG5cdH0gZWxzZSB7XG5cdFx0dmFsaWRhdGVfcG9zdF9pZChzZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmV4cG9ydCB7IHJhd19wb3N0X2NyZWF0ZSB9O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9zdHJpbmcgfSBmcm9tICcuLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbi8vIFRoZXJlIGlzIGFuIGVkZ2UgY2FzZSB3aGVyZSB0aGUgZGF0YSBjYW4gYmUgbWQ1PTxtZDU+XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X2xpc3QgKHRhZ19zZWFyY2gpIHtcblx0dmFsaWRhdGVfc3RyaW5nKHRhZ19zZWFyY2gpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdHBhdGg6ICcvcG9zdHMnLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6ICdVUkwnLFxuXHRcdGRhdGE6IHtcblx0XHRcdGxpbWl0OiAzMjAsXG5cdFx0XHR0YWdzOiB0YWdfc2VhcmNoXG5cdFx0fVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3RfbGlzdCB9O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9wb3N0X2lkIH0gZnJvbSAnLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiByYXdfcG9zdF9zaG93IChwb3N0X2lkKSB7XG5cdHZhbGlkYXRlX3Bvc3RfaWQocG9zdF9pZCk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0cGF0aDogYC9wb3N0cy8ke3Bvc3RfaWR9YCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnVVJMJyxcblx0XHRkYXRhOiBudWxsXG5cdH0pLmNhdGNoKGhhbmRsZV9wb3N0X3Nob3dfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfcG9zdF9zaG93X2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmV4cG9ydCB7IHJhd19wb3N0X3Nob3cgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfcG9zdF9pZCxcblx0dmFsaWRhdGVfdm90ZV9vcHRpb25cbn0gZnJvbSAnLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiByYXdfcG9zdF92b3RlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9wb3N0X2lkKHNldHRpbmdzLnBvc3RfaWQpO1xuXHR2YWxpZGF0ZV92b3RlX29wdGlvbihzZXR0aW5ncy52b3RlKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogYC9wb3N0cy8ke3NldHRpbmdzLnBvc3RfaWR9L3ZvdGVzYCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnVVJMJyxcblx0XHRkYXRhOiB7XG5cdFx0XHRzY29yZTogc2V0dGluZ3Mudm90ZVxuXHRcdH0sXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5leHBvcnQgeyByYXdfcG9zdF92b3RlIH07XG4iLCJmdW5jdGlvbiB2YWxpZGF0ZV9tZDUgKG1kNSkge1xuXHRpZiAodHlwZW9mIG1kNSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21kNSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJyk7XG5cdH1cblxuXHRpZiAobWQ1Lmxlbmd0aCAhPT0gMzIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21kNSBtdXN0IGJlIG9mIGxlbmd0aCAzMicpO1xuXHR9XG5cblx0Y29uc3QgY29udGFpbnNfbm9uX2hleCA9IC9bXjAtOWEtZkEtRl0vZztcblx0aWYgKGNvbnRhaW5zX25vbl9oZXgudGVzdChtZDUpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtZDUgY29udGFpbnMgbm9uLWhleGFkZWNpbWFsIGNoYXJhY3RlcicpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3Bvc3RfaWQgKHBvc3RfaWQpIHtcblx0aWYgKHR5cGVvZiBwb3N0X2lkICE9PSAnbnVtYmVyJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigncG9zdF9pZCBtdXN0IGJlIGEgbnVtYmVyJyk7XG5cdH1cblxuXHRpZiAoTnVtYmVyLmlzSW50ZWdlcihwb3N0X2lkKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3RfaWQgbXVzdCBiZSBhbiBpbnRlZ2VyJyk7XG5cdH1cblxuXHRpZiAocG9zdF9pZCA8IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3RfaWQgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybycpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3N0cmluZyAoc3RyaW5nKSB7XG5cdGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcignc3RyaW5nIGlzIG5vdCBhIHN0cmluZycpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3ZvdGVfb3B0aW9uICh2b3RlKSB7XG5cdGlmICh2b3RlICE9PSAtMSAmJiB2b3RlICE9PSAwICYmIHZvdGUgIT09IDEpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3ZvdGUgaXMgbm90IG9mIHRoZSB2YWx1ZXMgWy0xLCAwLCAxXScpO1xuXHR9XG59XG5cbmV4cG9ydCB7XG5cdHZhbGlkYXRlX21kNSxcblx0dmFsaWRhdGVfcG9zdF9pZCxcblx0dmFsaWRhdGVfc3RyaW5nLFxuXHR2YWxpZGF0ZV92b3RlX29wdGlvblxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=