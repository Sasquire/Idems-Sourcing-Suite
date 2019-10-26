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
