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
