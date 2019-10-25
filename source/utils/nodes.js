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
	if (this.querySelector(query)) {
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {
		const observer = new MutationObserver((mutations, _observer) => {
			if (this.querySelector(query)) {
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

module.exports = {
	clear_children: clear_children,
	clear_page: clear_page,
	arrive: arrive,
	leave: leave
};
