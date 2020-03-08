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
