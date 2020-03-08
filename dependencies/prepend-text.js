// Prepends a piece of header text to the end result of a browserify bundle.
// Unlicense (2019)

const stream = require('stream');

// Browserify expects the export to be a single function
module.exports = function apply_header (browserify, header) {
	function create_stream () {
		let first = true;
		// Transform streams are both readable and writeable
		// You can think of them as transforming the data that
		// gets fed to it.

		// (source) --write--> (Transform) --read--> (elsewhere)
		return new stream.Transform({
			transform (chunk, encoding, callback) {
				if (first) {
					first = false;
					chunk = Buffer.concat([Buffer.from(header), chunk]);
				}

				// Writes to the internal output buffer
				this.push(chunk);

				callback(); // signal this chunk is done
			}
		});
	};

	function add_to_pipeline () {
		// `wrap` is the last step in the browserify pipeline. It
		// is for arbitrary transformations to be done at the
		// end of bundling.
		browserify.pipeline.get('wrap').push(create_stream());
	}

	browserify.on('reset', add_to_pipeline);
	add_to_pipeline();
};
