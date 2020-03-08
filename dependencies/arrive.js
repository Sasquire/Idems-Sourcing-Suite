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
