((base_html, base_css) => {
	const is_correct_url = window.location.href === 'https://e621.net/extensions';
	const is_loaded = document.body.dataset.page_loaded === true;
	if (is_correct_url && is_loaded === false) {
		clear_page();
		init_css();
		init_page();
	}

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

	class Setting {
		constructor (section_name, section_url) {
			const container = document.createElement('div');
			container.id = section_name;
			container.classList.add('setting_section');

			container.innerHTML = `
			<a class="setting_title" href="${section_url}">${section_name}</a>
			<div id="${section_name}_settings" class="setting_values"></div>
			`;

			document.getElementById('settings').appendChild(container);

			this.setting_node = container.getElementById(`${section_name}_settings`);
		}
	};

	const a = new Setting('Testing', 'https://e621.net/extensions');

//	setting.checkbox = (name, key, description) => {

//	};
})(`
<h1>e621 Extension Hub</h1>
<div id="settings"></div>
`, `
:root {
	--dark-blue: #031131;
	--main-blue: #012e56;
	--blue: #284a81;
	--other-blue: #174891;
	--more-blue: #152f56;
	--yellow: #fdba31;
	--light-yellow: #ffde9b;
	--dark-yellow: #d8b162;
}

.hidden { display: none; }

body {
	background-color: var(--dark-blue);
	background-image: url(https://e621.net/images/stripe.png);
}

h1 {
	padding: 1rem 3rem;
	color: var(--yellow);
	background-color: var(--main-blue);
	border-radius: 1rem;
}

.setting_section {
	background-color: var(--main-blue);
	margin: 1rem 0px;
	padding: 0.5rem 1.5rem 1.5rem 1.5rem;
    border-radius: 1rem;
}

.setting_title {
	color: var(--yellow);
    margin: 0px 0px 0.5rem 1rem;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 600;
}

.setting_values {
	height: 200px;
	background-color: red;
}
`);
