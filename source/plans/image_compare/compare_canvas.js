const pixel_compare = require('./compare_points.js');

async function compare (options) {
	const context1 = options.canvas1.getContext('2d');
	const context2 = options.canvas2.getContext('2d');

	const same_width = options.canvas1.width === options.canvas2.width;
	const same_height = options.canvas1.height === options.canvas2.height;

	if (!same_width || !same_height) {
		throw new Error('Images did not have the same width and height');
	}

	const width = context1.canvas.width;
	const height = context1.canvas.height;

	const data1 = context1.getImageData(0, 0, width, height).data;
	const data2 = context2.getImageData(0, 0, width, height).data;

	if (data1.every(e => e === 0) && data2.every(e => e === 0)) {
		throw new Error('Images have not been set');
	}

	const algorithm = pixel_compare[options.algorithm];
	if (algorithm === undefined) {
		throw new Error('Somehow a non-valid comparison algorithm was selected');
	}

	let some_change = 0;

	const new_data = new Uint8ClampedArray(width * height * 4);
	for (let i = 0; i < new_data.length; i += 4) {
		// The last value for all of these if flipped. The reason is because
		// it is the alpha channel, and an alpha of 0 means the image will
		// not be displayed. The point of these is to return 0 if there is no
		// change. Therefore it makes sense to flip this one value. It may not
		// produce the best viewed outputs for things with alpha layers, but it
		// does produce an output that reflects them.

		const result = algorithm(data1, data2, i);
		new_data[i + 0] = result[0];
		new_data[i + 1] = result[1];
		new_data[i + 2] = result[2];
		new_data[i + 3] = 255 - result[3];

		some_change = some_change | result[0] | result[1] | result[2] | result[3];

		if (options.leave_early && some_change !== 0) {
			break;
		}

		// Relinquish control of the event loop so other things
		// can run, creating a smoother user experience
		if (i % 400000 === 0) {
			await new Promise(resolve => setTimeout(resolve, 1));
		}
	}

	return {
		data: new ImageData(new_data, width, height),
		message: some_change === 0 ? 'Images are identical' : 'There is a difference!',
		width: width,
		height: height
	};
}

module.exports = compare;
