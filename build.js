const browserify = require('browserify');
const stringify = require('stringify');
const path = require('path');
const fs = require('fs');
const { performance } = require('perf_hooks');

const info = require('./header.json');
const apply_header = require('./dependencies/prepend-text.js');

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
// @version      ${info.version}
// @author       ${info.authors}

// @namespace    https://github.com/Sasquire/
// @supportURL   https://github.com/Sasquire/Idems-Sourcing-Suite
// @updateURL    ${info.updateURL}
// @downloadURL  ${info.downloadURL}
// @icon         ${info.icon}

// @license      Unlicense

// @connect      e621.net

${build_match_connects()}

// @grant        GM.addStyle
// @grant        GM.xmlHttpRequest

// ==/UserScript==

`;
}

function build_match_connects () {
	const plan_dir = path.join('source', 'plans');
	return fs.readdirSync(plan_dir)
		.filter(e => e !== 'plans.js') // Removes the entry point
		.map(e => path.join('.', plan_dir, e, 'header.js'))
		.map(e => `./${e}`)
		.map(e => {
			try {
				const header = require(e);
				console.log(`Found ${e}`);
				return header;
			} catch (error) {
				console.error(error.toString());
				return undefined;
			}
		})
		.filter(e => e) // Filters out any failed headers
		.map(build_single_header)
		.join('\n\n');

	function build_single_header (options) {
		return [
			`//               ${options.title} v${options.version}`,
			build_row('match', options.match),
			build_row('connect', options.connect)
		].join('\n');
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

build();
