// ==UserScript==
// @name        Idem's Sourcing Suite
// @description Adds a whole bunch of utilities, helpful for sourcing images
// @version     1.00025
// @author      Meras

// @namespace   https://github.com/Sasquire/
// @supportURL  https://github.com/Sasquire/
// @updateURL   https://github.com/Sasquire/Idems-Sourcing-Suite/raw/master/main.user.js
// @downloadURL https://github.com/Sasquire/Idems-Sourcing-Suite/raw/master/main.user.js
// @icon        https://github.com/Sasquire/Idems-Sourcing-Suite/raw/master/icon32.png

// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/utils.js
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/e621_api.js

// @match       *://*.e621.net/extensions/image_compare
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/image_compare.js
// @connect     *

// @match       *://*.e621.net/extensions/upload_bvas
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/bvas.js
// @resource    bvas_html https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/bvas.html
// @resource    bvas_css https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/bvas.css
// @connect     *

// @match       *://*.furaffinity.net/view/*
// @match       *://*.furaffinity.net/full/*
// @connect     facdn.net
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/furaffinity.js

// @match       *://*.pixiv.net/member_illust.php*
// @connect     pximg.net
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/pixiv.js

// @match       *://*.twitter.com/*
// @connect     twimg.com
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/twitter.js

// @match       *://*.sofurry.com/view/*
// @connect     sofurryfiles.com
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/sofurry.js

// @match       *://*.weasyl.com/~*/submissions/*
// @connect     weasyl.com
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/weasyl.js

// @match       *://*.furrynetwork.com/*
// @connect     cloudfront.net
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/furrynetwork.js

// @match       *://*.inkbunny.net/s/*
// @match       *://*.inkbunny.net/submissionview.php*
// @require     https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/source/inkbunny.js

// Some userscript managers still use the deprecated fucntions
// like GM_* requiring both is the only workaround that I know of
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.getValue
// @grant       GM_getValue
// @noframes
// ==/UserScript==
