/*
Javascript MD5 library - version 0.4
Coded (2011) by Luigi Galli - LG@4e71.org - http://faultylabs.com
https://gist.github.com/ForbesLindesay/5562935
Thanks to: Roberto Viola
The below code is PUBLIC DOMAIN - NO WARRANTY!

The code has been modified from its original state to
better be used in this project. And with that comes from
one public domain license to another.

Unlicense (2019) <https://unlicense.org/>
*/

// convert number to (unsigned) 32 bit hex, zero filled string
function to_zero_filled_hex (n) {
	const t1 = (n >>> 0).toString(16);
	return '00000000'.substr(0, 8 - t1.length) + t1;
}

// convert a 64 bit unsigned number to array of bytes. Little endian
function int64_to_bytes (num) {
	const return_value = [];
	for (let i = 0; i < 8; i++) {
		return_value.push(num & 0xFF);
		num = num >>> 8;
	}
	return return_value;
}

//  32 bit left-rotation
function rol (num, places) {
	return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places));
}

// The 4 MD5 functions
function fF (b, c, d) {
	return (b & c) | (~b & d);
}

function fG (b, c, d) {
	return (d & b) | (~d & c);
}

function fH (b, c, d) {
	return b ^ c ^ d;
}

function fI (b, c, d) {
	return c ^ (b | ~d);
}

// pick 4 bytes at specified offset. Little-endian is assumed
function bytes_to_int32 (arr, off) {
	const first = arr[off + 3] << 24;
	const second = arr[off + 2] << 16;
	const third = arr[off + 1] << 8;
	const fourth = arr[off];
	return first | second | third | fourth;
}

// convert the 4 32-bit buffers to a 128 bit hex string. (Little-endian is assumed)
function int128le_to_hex (a, b, c, d) {
	let ra = '';
	let t = 0;
	let ta = 0;
	for (var i = 3; i >= 0; i--) {
		ta = arguments[i]; // a, b, c, d
		t = (ta & 0xFF);
		ta = ta >>> 8;
		t = t << 8;
		t = t | (ta & 0xFF);
		ta = ta >>> 8;
		t = t << 8;
		t = t | (ta & 0xFF);
		ta = ta >>> 8;
		t = t << 8;
		t = t | ta;
		ra = ra + to_zero_filled_hex(t);
	}

	return ra;
}

function _add (n1, n2) {
	return 0x0FFFFFFFF & (n1 + n2);
}

function do_64_runs (options) {
	let a = options.a;
	let b = options.b;
	let c = options.c;
	let d = options.d;
	const pointer = options.pointer;
	const data = options.data;

	function set_values (nf, sin32, dw32, b32) {
		const temp = d;
		d = c;
		c = b;
		// b = b + rol(a + (nf + (sin32 + dw32)), b32)
		// b = b + rol(inside, b32)
		const inside = _add(a, _add(nf, _add(sin32, dw32)));
		b = _add(b, rol(inside, b32));
		a = temp;
	}

	function do_run (f_func, binary_sine, offset, shift_amount) {
		set_values(
			f_func(b, c, d),
			binary_sine,
			bytes_to_int32(data, pointer + offset),
			shift_amount
		);
	}

	const $ = do_run;

	$(fF, 0xd76aa478, 0, 7);
	$(fF, 0xe8c7b756, 4, 12);
	$(fF, 0x242070db, 8, 17);
	$(fF, 0xc1bdceee, 12, 22);
	$(fF, 0xf57c0faf, 16, 7);
	$(fF, 0x4787c62a, 20, 12);
	$(fF, 0xa8304613, 24, 17);
	$(fF, 0xfd469501, 28, 22);
	$(fF, 0x698098d8, 32, 7);
	$(fF, 0x8b44f7af, 36, 12);
	$(fF, 0xffff5bb1, 40, 17);
	$(fF, 0x895cd7be, 44, 22);
	$(fF, 0x6b901122, 48, 7);
	$(fF, 0xfd987193, 52, 12);
	$(fF, 0xa679438e, 56, 17);
	$(fF, 0x49b40821, 60, 22);
	$(fG, 0xf61e2562, 4, 5);
	$(fG, 0xc040b340, 24, 9);
	$(fG, 0x265e5a51, 44, 14);
	$(fG, 0xe9b6c7aa, 0, 20);
	$(fG, 0xd62f105d, 20, 5);
	$(fG, 0x2441453, 40, 9);
	$(fG, 0xd8a1e681, 60, 14);
	$(fG, 0xe7d3fbc8, 16, 20);
	$(fG, 0x21e1cde6, 36, 5);
	$(fG, 0xc33707d6, 56, 9);
	$(fG, 0xf4d50d87, 12, 14);
	$(fG, 0x455a14ed, 32, 20);
	$(fG, 0xa9e3e905, 52, 5);
	$(fG, 0xfcefa3f8, 8, 9);
	$(fG, 0x676f02d9, 28, 14);
	$(fG, 0x8d2a4c8a, 48, 20);
	$(fH, 0xfffa3942, 20, 4);
	$(fH, 0x8771f681, 32, 11);
	$(fH, 0x6d9d6122, 44, 16);
	$(fH, 0xfde5380c, 56, 23);
	$(fH, 0xa4beea44, 4, 4);
	$(fH, 0x4bdecfa9, 16, 11);
	$(fH, 0xf6bb4b60, 28, 16);
	$(fH, 0xbebfbc70, 40, 23);
	$(fH, 0x289b7ec6, 52, 4);
	$(fH, 0xeaa127fa, 0, 11);
	$(fH, 0xd4ef3085, 12, 16);
	$(fH, 0x4881d05, 24, 23);
	$(fH, 0xd9d4d039, 36, 4);
	$(fH, 0xe6db99e5, 48, 11);
	$(fH, 0x1fa27cf8, 60, 16);
	$(fH, 0xc4ac5665, 8, 23);
	$(fI, 0xf4292244, 0, 6);
	$(fI, 0x432aff97, 28, 10);
	$(fI, 0xab9423a7, 56, 15);
	$(fI, 0xfc93a039, 20, 21);
	$(fI, 0x655b59c3, 48, 6);
	$(fI, 0x8f0ccc92, 12, 10);
	$(fI, 0xffeff47d, 40, 15);
	$(fI, 0x85845dd1, 4, 21);
	$(fI, 0x6fa87e4f, 32, 6);
	$(fI, 0xfe2ce6e0, 60, 10);
	$(fI, 0xa3014314, 24, 15);
	$(fI, 0x4e0811a1, 52, 21);
	$(fI, 0xf7537e82, 16, 6);
	$(fI, 0xbd3af235, 44, 10);
	$(fI, 0x2ad7d2bb, 8, 15);
	$(fI, 0xeb86d391, 36, 21);

	return [
		_add(options.a, a),
		_add(options.b, b),
		_add(options.c, c),
		_add(options.d, d)
	];
}

function digest (data) {
	// initialize 4x32 bit state
	let h0 = 0x67452301;
	let h1 = 0xEFCDAB89;
	let h2 = 0x98BADCFE;
	let h3 = 0x10325476;

	// Digest message
	for (let i = 0; i < data.length / 64; i++) {
		[h0, h1, h2, h3] = do_64_runs({
			a: h0,
			b: h1,
			c: h2,
			d: h3,
			pointer: i * 64,
			data: data
		});
	}

	// Done! Convert buffers to 128 bit (LE)
	return int128le_to_hex(h3, h2, h1, h0);
}

// data should be of type <ArrayBuffer>
function pad_input (data) {
	const original_len = data.byteLength;

	// tail is the amount of space used in the last 512 bit block.
	// 1 is added to it because 0b10000000 must be appended to the
	// end of the buffer before it is passed on.
	const tail = (original_len + 1) % 64;
	const zero_pad = tail > 56 ? (tail - 8) : (56 - tail);

	// 0b10000000 + to 512 bit block + original length
	const total_pad = 1 + zero_pad + 8;
	const new_size = original_len + total_pad;

	// Copy data into new ArrayBuffer of proper size and requirements
	const new_data = new ArrayBuffer(new_size);
	const view = new Uint8Array(new_data);
	view.set(data); // Copy old data
	view.set([0x80], original_len); // 0b10000000
	// Zero padding is done automatically
	view.set(int64_to_bytes(original_len * 8), new_size - 8); // Original size

	return view;
}

// Takes input as an <ArrayBuffer>
function MD5 (data) {
	data = new Uint8Array(data);
	data = pad_input(data);
	return digest(data);
}

// Testing
const a = new ArrayBuffer(5);
const view = new Uint8Array(a);
view.set([104, 101, 108, 108, 111]); // `hello` as an array buffer
console.log(MD5(a));

module.exports = MD5;
