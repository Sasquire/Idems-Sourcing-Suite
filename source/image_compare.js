// Ignore the errors i just want this to work

if(
	new URL(window.location.href).host.includes('e621.net') &&
	new URL(window.location.href).pathname.includes('/extensions/image_compare')
){
	image_compare();
}

async function image_compare(){
	init();
	document.getElementById('cmp').addEventListener('click', compare_images);
	document.getElementById('dwn').addEventListener('click', download_images);

	class Color {
		constructor(r, g, b, a){
			this.r = r;
			this.g = g;
			this.b = b;
			this.a = a;
			return this;
		};

		static compare_in_first(first, second){
			const nr = first.r != second.r ? first.r : 0;
			const ng = first.g != second.g ? first.g : 0;
			const nb = first.b != second.b ? first.b : 0;
			return nr || ng || nb ? new Color(first.r, first.g, first.b, first.a) : new Color(0, 0, 0, 0);
		}

		static compare_in_second(first, second){
			const nr = second.r != first.r ? second.r : 0;
			const ng = second.g != first.g ? second.g : 0;
			const nb = second.b != first.b ? second.b : 0;
			return nr || ng || nb ? new Color(second.r, second.g, second.b, second.a) : new Color(0, 0, 0, 0);
		}

		static modify(first, second, func){
			return new Color(func('r'), func('g'), func('b'), first.a);
		}

		static compare_linear(first, second){
			return Color.modify(first, second, a => Math.abs(first[a] - second[a]));
		}

		static compare_inverse_linear(first, second){
			return Color.modify(first, second, a => 255 - Math.abs(first[a] - second[a]));
		}

		static compare_boolean(first, second){
			return Color.modify(first, second, a => first[a] == second[a] ? 0 : 255);
		}

		static compare_inverse_boolean(first, second){
			return Color.modify(first, second, a => first[a] == second[a] ? 255 : 0);
		}

		static compare_square(first, second){
			return Color.modify(first, second, a => Math.min((first[a] - second[a])**2, 255));
		}

		static compare_difference_square(first, second){
			return Color.modify(first, second, a => Math.abs(first[a]**2 - second[a]**2)**0.5);
		}
	}

	function get_fn(){
		switch (document.getElementById('func').value) {
			case 'boolean': return Color.compare_boolean;
			case 'inverseboolean': return Color.compare_inverse_boolean;
			case 'linear': return Color.compare_linear;
			case 'inverselinear': return Color.compare_inverse_linear;
			case 'square': return Color.compare_square;
			case 'differencesquare': return Color.compare_difference_square;
			case 'infirst': return Color.compare_in_first;
			case 'insecond': return Color.compare_in_second;
			default: return (p1, p2) => 255;
		}
	}

	async function download_images(){
		const link1 = document.getElementById('img1').value
		const link2 = document.getElementById('img2').value;
		const [ctx1, ctx2] = await Promise.all([
			add_image_to_canvas(link1, 'can1'),
			add_image_to_canvas(link2, 'can2')
		]);
		if(ctx1.canvas.width != ctx2.canvas.width || ctx1.canvas.height != ctx2.canvas.height){
			document.getElementById('answer').innerText = 'wrong size';
		}
	}

	function compare_images(){
		const ctx1 = document.getElementById('can1').getContext('2d');
		const ctx2 = document.getElementById('can2').getContext('2d');
		const width = ctx1.canvas.width;
		const height = ctx1.canvas.height;

		const final_ctx = document.getElementById('can_compare').getContext('2d');
		final_ctx.canvas.width = width;
		final_ctx.canvas.height = height;

		const d1 = ctx1.getImageData(0, 0, width, height).data;
		const d2 = ctx2.getImageData(0, 0, width, height).data;

		const f = get_fn();
		const d = new Array(width * height * 4);

		for(let i = 0; i < d.length; i+=4){
			const col1 = new Color(d1[i+0], d1[i+1], d1[i+2], d1[i+3]);
			const col2 = new Color(d2[i+0], d2[i+1], d2[i+2], d2[i+3]);
			const new_col = f(col1, col2);
			[d[i+0], d[i+1], d[i+2], d[i+3]] = [new_col.r, new_col.g, new_col.b, new_col.a];
		}
		final_ctx.putImageData(new ImageData(Uint8ClampedArray.from(d), width, height), 0, 0);
		return;
	}

	async function add_image_to_canvas(img_url, canvas_id){
		return new Promise(async function(resolve, reject){
			const ctx = document.getElementById(canvas_id).getContext('2d');
			const data = await download_image(img_url);
			const img = new Image();
			img.onload = function () {
				ctx.canvas.width = img.width;
				ctx.canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
				resolve(ctx);
			};
			img.src = URL.createObjectURL(data);
		});
	}

	function init(){
		clear_page();
		GM.addStyle(`
		#can1, #can2, #can_compare {
			border: 2px solid;
			background-color:black;
		}
		#can1 { border-color:red; }
		#can2 { border-color:orange; }
		#can_compare { border-color:blue; }

		input#toggle-hidden[type=checkbox] {
		   position: absolute;
		   top: -9999px;
		   left: -9999px;
		}
		input#toggle-hidden[type=checkbox]:checked ~ #can1, input#toggle-hidden[type=checkbox]:checked ~ #can2 { display:none; }
		.button {
			font: bold 11px Arial;
			text-decoration: none;
			background-color: #EEEEEE;
			color: #333333;
			padding: 2px 6px 2px 6px;
			border-top: 1px solid #CCCCCC;
			border-right: 1px solid #333333;
			border-bottom: 1px solid #333333;
			border-left: 1px solid #CCCCCC;
		}`);
		document.body.innerHTML = `
		<input type="checkbox" id="toggle-hidden">

		<input id="img1"></input>
		<input id="img2"></input>
		<button id="dwn">Download</button>
		<button id="cmp">Compare</button>
		<label class="button" for="toggle-hidden">Toggle Images</label>
		<select id="func">
			<option value="boolean">Boolean</option>
			<option value="inverseboolean">Inverse Boolean</option>
			<option value="linear">Linear</option>
			<option value="inverselinear">Inverse Linear</option>
			<option value="square">Square</option>
			<option value="differencesquare">Difference of Squares</option>
			<option value="infirst">In the first</option>
			<option value="insecond">In the second</option>
		</select>
		<span id="answer"></span>
		<hr>
		<canvas id="can1"></canvas>
		<canvas id="can2"></canvas>
		<hr>
		<canvas id="can_compare"></canvas>`;
	}
}
