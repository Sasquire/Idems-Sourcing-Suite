const browserify = require('browserify');
const stringify = require('stringify');
const path = require('path');
const fs = require('fs');
const { performance } = require('perf_hooks');

const apply_header = require('./dependencies/prepend-text.js');
const info = {
	base_version: 24,
	authors: 'Meras',
	updateURL: 'https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/distribution/header.user.js',
	downloadURL: 'https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/distribution/main.user.js',
	icon: 'https://raw.githubusercontent.com/Sasquire/Idems-Sourcing-Suite/master/resources/icon32.png'
};

function bundle (header_string) {
	const entry = path.join('source', 'entry.js');

	return browserify()
		.add(entry)
		.transform(stringify(['.css', '.html']))
		.plugin(apply_header, header_string)
		.bundle();
}

function build_header () {
	return `// ==UserScript==
// @name         Idem's Sourcing Suite
// @description  Adds a whole bunch of utilities, helpful for sourcing images
// @version      ${get_version()}
// @author       ${info.authors}

// @namespace    https://github.com/Sasquire/
// @supportURL   https://github.com/Sasquire/Idems-Sourcing-Suite
// @updateURL    ${info.updateURL}
// @downloadURL  ${info.downloadURL}
// @icon         ${info.icon}

// @license      Unlicense

//               Common v${info.base_version}
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

${build_match_connects()}
// ==/UserScript==

`;
}

function build_match_connects () {
	return all_plans()
		.map(build_single_header)
		.join('\n\n');

	function build_single_header (options) {
		return [
			`//               ${options.title} v${options.version}`,
			build_row('match', options.match),
			build_row('connect', options.connect)
		].filter(e => e).join('\n');
	}

	function build_row (type, elements) {
		return elements
			.map(e => `// @${type.padEnd(13, ' ')}${e}`)
			.join('\n');
	};
}

function build () {
	const start = performance.now();
	const output_main = path.join('distribution', 'main.user.js');
	const output_header = path.join('distribution', 'header.user.js');
	const header = build_header();

	fs.writeFileSync(output_header, header, 'utf8');

	const output_stream = fs.createWriteStream(output_main);
	bundle(header).pipe(output_stream).on('finish', () => {
		const end = performance.now();
		console.log(`Built package in ${Math.floor((end - start) * 100) / 100}ms`);
	});
}

function get_version () {
	const base = info.base_version;
	const plan_sum = all_plans().reduce((acc, e) => acc + e.version, 0);
	const version_num = (base + plan_sum).toString();
	return `1.${version_num.padStart(5, '0')}`;
}

function all_plans () {
	const plan_dir = path.join('source', 'plans');
	return fs.readdirSync(plan_dir)
		.filter(e => e !== 'plans.js') // Removes the entry point
		.map(e => path.join('.', plan_dir, e, 'header.js'))
		.map(e => `./${e}`)
		.map(e => {
			try {
				const header = require(e);
				return header;
			} catch (error) {
				return undefined;
			}
		})
		.filter(e => e) // Filters out any failed headers
		.sort((a, b) => a.title.localeCompare(b.title));
}

build();
