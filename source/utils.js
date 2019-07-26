// eslint-disable-next-line max-len
function $qa(query, node = document){ return Array.from(node.querySelectorAll(query)); }
function $q(query, node = document){ return node.querySelector(query); }
function $i(id, node = document){ return node.getElementById(id); }
// eslint-disable-next-line max-len
function $c(id, node = document){ return Array.from(node.getElementsByClassName(id)); }

function clear_page(){
	while(document.head.children.length > 0){
		document.head.removeChild(document.head.children[0]);
	}

	while(document.body.children.length > 0){
		document.body.removeChild(document.body.children[0]);
	}
}

// Type could be removedNodes
async function wait_for_query(query){
	return new Promise(resolve => {
		// eslint-disable-next-line no-undef
		const observer = new MutationObserver(exists);
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		exists();

		function exists(){
			if($q(query) !== null){
				observer.disconnect();
				resolve();
			}
		}
	});
}

function body_append(string){
	document.body.appendChild(string_to_node(string));
}

/* How to use this
md5_append(
	'.stats-container', // Where to place md5s
	[full_url, 'full image'], // MD5 Data
	[thumb_url, 'sample'] // Maybe headers as a third element
);
*/
function md5_append(query, ...fills){
	return Promise.all(fills.map((args) => add_md5(...args)))
		.then(pretty_md5)
		.then(html => query_append(query, html));
}

function description_button(attacher, description_node, title){
	attacher.appendChild(string_to_node(
		'<button id="copy_description">Copy Description</button>'
	));

	$i('copy_description').addEventListener('click', () => {
		node_to_clipboard(description_node, title);
	});
}

function node_to_clipboard(description_node, title){
	to_clipboard(artist_commentary(description_node, title));
}

function to_clipboard(str){
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

function artist_commentary(description_node, title){
	const description = html_to_dtext(description_node);
	const lines = description.split('\n').length;
	const expand = lines <= 5 || description.length <= 500;
	const fixed_title = title
		.replace(/\[/gu, '(')
		.replace(/\]/gu, ')');

	return `[section${expand ? ',expanded' : '' }=${fixed_title}]
${description}
[/section]`;
}

// eslint-disable-next-line complexity
function html_to_dtext(entry){
	switch (entry.nodeName) {
		case 'B':
		case 'STRONG': return `[b] ${inner_text(entry)} [/b]`;
		case 'EM':
		case 'I': return `[i] ${inner_text(entry)} [/i]`;
		case 'U': return `[u] ${inner_text(entry)} [/u]`;
		case 'O': return `[o] ${inner_text(entry)} [/o]`;
		case 'S': return `[s] ${inner_text(entry)} [/s]`;
		case 'SUP': return `[sup] ${inner_text(entry)} [/sup]`;
		case 'SUB': return `[sub] ${inner_text(entry)} [/sub]`;

		case 'A': return get_link(entry);

		case 'PRE': return `[code] ${inner_text(entry)} [/code]`;

		case 'H1': return `h1. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H2': return `h2. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H3': return `h3. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H4': return `h4. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H5': return `h5. ${inner_text(entry).replace(/\n/gu, ' ')}`;
		case 'H6': return `h6. ${inner_text(entry).replace(/\n/gu, ' ')}`;

		case 'LI': return `* ${inner_text(entry)}`;

		case '#comment':
		case 'IMG': return ''; // Images get destroyed :(
		case 'BR': return '\n';
		case 'P': return `${inner_text(entry)}\n`;
		default: return inner_text(entry);
	}

	function get_link(node){
		const inner = inner_text(node);
		const link = safety_link(node.href);
		if(inner && inner != node.href){
			return `"${inner}":${link}`;
		} else {
			return link;
		}
	}

	function inner_text(node){
		if(node.hasChildNodes()){
			return Array.from(node.childNodes)
				.map(html_to_dtext)
				.filter(e => e)
				.join(' ')
				.replace(/\n /ug, '\n');
		} else {
			const trimmed = node.textContent.replace(/^\s*([^]*?)\s*$/us, '$1');
			return trimmed;
		}
	}
}

function safety_link(text){
	const safe_domains = [
		'furaffinity.net',
		'deviantart.com',
		'twitter.com',
		'inkbunny.net',
		'tumblr.com',
		'aryion.com',
		'furrynetwork.com',
		'weasyl.com',
		'pixiv.net',
		'youtube.com',
		'google.com',
		'patreon.com',
		'picarto.tv',
		'gumroad.com',
		'inkedfur.com',
		'ko-fi.com'
	];

	let url = null;
	try {
		// eslint-disable-next-line no-undef
		url = new URL(text);
	} catch(e) {
		// Invalid URL
		return text;
	}

	if(url.protocol == 'https:'){
		return text;
	} else if(safe_domains.some(e => url.hostname.includes(e))){
		url.protocol = 'https:';
		return url.href;
	} else {
		return text;
	}
}

function query_append(query, item){
	document.querySelector(query).appendChild(item);
}

// eslint-disable-next-line max-len
function pretty_md5(hash_arr, joiner = '<br>', id = '', enclose = true, raw = false){
	const to_html = obj => `
		<a href="${obj.url}" target="_blank"><b>${obj.type} hash:</b></a>
		<a
			href="https://e621.net/post/show?md5=${obj.hash}"
			style="font-weight:normal;"
			target="_blank"
		>
			${obj.hash}
		</a>
	`;

	const html = hash_arr.map(to_html).join(joiner);
	return raw ? html : string_to_node(html, id, enclose);
}

function string_to_node(string, id = '', enclose = false){
	const temp = document.createElement('div');
	temp.innerHTML = string;
	if(typeof id == 'string' && id != ''){
		temp.id = id;
	}

	return enclose ? temp : temp.children.item(0);
}

async function download_image(url, _headers = {}){
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line no-undef
		GM.xmlHttpRequest({
			method: 'GET',
			url: url,
			headers: _headers,
			responseType: 'blob',
			onload: e => (e.status == 200 ? resolve(e.response) : reject(e))
		});
	});
}

async function blob_to_md5(blob){
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line no-undef
		const reader = new FileReader();
		reader.addEventListener('loadend', (e) => {
			// eslint-disable-next-line no-undef
			const md5 = SparkMD5.ArrayBuffer.hash(e.currentTarget.result);
			resolve(md5);
		});
		reader.readAsArrayBuffer(blob);
	});
}

// Url = url of image
// Type = text accompanying image eg. 'full_image', 'sample'
// Headers = optional xmlHttpRequest headers
async function add_md5(url, type = 'something', _headers = {}){
	const image = await download_image(url, _headers);
	const hash = await blob_to_md5(image);
	const bad_hashes = [
		'd41d8cd98f00b204e9800998ecf8427e', // Empty
		'a6433af4191d95f6191c2b90fc9117af', // FA 404
		'9eef03f05be8bcd4f6affc9876247a3f', // Pixiv 404
		'00000000000000000000000000000000',
		'ffffffffffffffffffffffffffffffff'
	];

	if(bad_hashes.includes(hash)){
		throw new Error(404);
	} else {
		return {
			type: type,
			url: url,
			hash: hash
		};
	}
}

/* eslint-disable */
// SparkMD5 no idea where it came from, but thank god for it
(function(factory){if(typeof exports==='object'){module.exports=factory()}else if(typeof define==='function'&&define.amd){define(factory)}else{var glob;try{glob=window}catch(e){glob=self}glob.SparkMD5=factory()}}(function(undefined){'use strict';var add32=function(a,b){return(a+b)&0xFFFFFFFF},hex_chr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];function cmn(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32((a<<s)|(a>>>(32-s)),b)}function md5cycle(x,k){var a=x[0],b=x[1],c=x[2],d=x[3];a+=(b&c| ~b&d)+k[0]-680876936|0;a=(a<<7|a>>>25)+b|0;d+=(a&b| ~a&c)+k[1]-389564586|0;d=(d<<12|d>>>20)+a|0;c+=(d&a| ~d&b)+k[2]+606105819|0;c=(c<<17|c>>>15)+d|0;b+=(c&d| ~c&a)+k[3]-1044525330|0;b=(b<<22|b>>>10)+c|0;a+=(b&c| ~b&d)+k[4]-176418897|0;a=(a<<7|a>>>25)+b|0;d+=(a&b| ~a&c)+k[5]+1200080426|0;d=(d<<12|d>>>20)+a|0;c+=(d&a| ~d&b)+k[6]-1473231341|0;c=(c<<17|c>>>15)+d|0;b+=(c&d| ~c&a)+k[7]-45705983|0;b=(b<<22|b>>>10)+c|0;a+=(b&c| ~b&d)+k[8]+1770035416|0;a=(a<<7|a>>>25)+b|0;d+=(a&b| ~a&c)+k[9]-1958414417|0;d=(d<<12|d>>>20)+a|0;c+=(d&a| ~d&b)+k[10]-42063|0;c=(c<<17|c>>>15)+d|0;b+=(c&d| ~c&a)+k[11]-1990404162|0;b=(b<<22|b>>>10)+c|0;a+=(b&c| ~b&d)+k[12]+1804603682|0;a=(a<<7|a>>>25)+b|0;d+=(a&b| ~a&c)+k[13]-40341101|0;d=(d<<12|d>>>20)+a|0;c+=(d&a| ~d&b)+k[14]-1502002290|0;c=(c<<17|c>>>15)+d|0;b+=(c&d| ~c&a)+k[15]+1236535329|0;b=(b<<22|b>>>10)+c|0;a+=(b&d|c& ~d)+k[1]-165796510|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b& ~c)+k[6]-1069501632|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a& ~b)+k[11]+643717713|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d& ~a)+k[0]-373897302|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c& ~d)+k[5]-701558691|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b& ~c)+k[10]+38016083|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a& ~b)+k[15]-660478335|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d& ~a)+k[4]-405537848|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c& ~d)+k[9]+568446438|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b& ~c)+k[14]-1019803690|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a& ~b)+k[3]-187363961|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d& ~a)+k[8]+1163531501|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c& ~d)+k[13]-1444681467|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b& ~c)+k[2]-51403784|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a& ~b)+k[7]+1735328473|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d& ~a)+k[12]-1926607734|0;b=(b<<20|b>>>12)+c|0;a+=(b^c^d)+k[5]-378558|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[8]-2022574463|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[11]+1839030562|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[14]-35309556|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[1]-1530992060|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[4]+1272893353|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[7]-155497632|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[10]-1094730640|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[13]+681279174|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[0]-358537222|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[3]-722521979|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[6]+76029189|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[9]-640364487|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[12]-421815835|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[15]+530742520|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[2]-995338651|0;b=(b<<23|b>>>9)+c|0;a+=(c^(b| ~d))+k[0]-198630844|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a| ~c))+k[7]+1126891415|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d| ~b))+k[14]-1416354905|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c| ~a))+k[5]-57434055|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b| ~d))+k[12]+1700485571|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a| ~c))+k[3]-1894986606|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d| ~b))+k[10]-1051523|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c| ~a))+k[1]-2054922799|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b| ~d))+k[8]+1873313359|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a| ~c))+k[15]-30611744|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d| ~b))+k[6]-1560198380|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c| ~a))+k[13]+1309151649|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b| ~d))+k[4]-145523070|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a| ~c))+k[11]-1120210379|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d| ~b))+k[2]+718787259|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c| ~a))+k[9]-343485551|0;b=(b<<21|b>>>11)+c|0;x[0]=a+x[0]|0;x[1]=b+x[1]|0;x[2]=c+x[2]|0;x[3]=d+x[3]|0}function md5blk(s){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24)}return md5blks}function md5blk_array(a){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=a[i]+(a[i+1]<<8)+(a[i+2]<<16)+(a[i+3]<<24)}return md5blks}function md51(s){var n=s.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk(s.substring(i-64,i)))}s=s.substring(i-64);length=s.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=s.charCodeAt(i)<<((i%4)<<3)}tail[i>>2]|=0x80<<((i%4)<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function md51_array(a){var n=a.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk_array(a.subarray(i-64,i)))}a=(i-64)<n?a.subarray(i-64):new Uint8Array(0);length=a.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=a[i]<<((i%4)<<3)}tail[i>>2]|=0x80<<((i%4)<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function rhex(n){var s='',j;for(j=0;j<4;j+=1){s+=hex_chr[(n>>(j*8+4))&0x0F]+hex_chr[(n>>(j*8))&0x0F]}return s}function hex(x){var i;for(i=0;i<x.length;i+=1){x[i]=rhex(x[i])}return x.join('')}if(hex(md51('hello'))!=='5d41402abc4b2a76b9719d911017c592'){add32=function(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF),msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)}}if(typeof ArrayBuffer!=='undefined'&&!ArrayBuffer.prototype.slice){(function(){function clamp(val,length){val=(val|0)||0;if(val<0){return Math.max(val+length,0)}return Math.min(val,length)}ArrayBuffer.prototype.slice=function(from,to){var length=this.byteLength,begin=clamp(from,length),end=length,num,target,targetArray,sourceArray;if(to!==undefined){end=clamp(to,length)}if(begin>end){return new ArrayBuffer(0)}num=end-begin;target=new ArrayBuffer(num);targetArray=new Uint8Array(target);sourceArray=new Uint8Array(this,begin,num);targetArray.set(sourceArray);return target}})()}function toUtf8(str){if(/[\u0080-\uFFFF]/.test(str)){str=unescape(encodeURIComponent(str))}return str}function utf8Str2ArrayBuffer(str,returnUInt8Array){var length=str.length,buff=new ArrayBuffer(length),arr=new Uint8Array(buff),i;for(i=0;i<length;i+=1){arr[i]=str.charCodeAt(i)}return returnUInt8Array?arr:buff}function arrayBuffer2Utf8Str(buff){return String.fromCharCode.apply(null,new Uint8Array(buff))}function concatenateArrayBuffers(first,second,returnUInt8Array){var result=new Uint8Array(first.byteLength+second.byteLength);result.set(new Uint8Array(first));result.set(new Uint8Array(second),first.byteLength);return returnUInt8Array?result:result.buffer}function hexToBinaryString(hex){var bytes=[],length=hex.length,x;for(x=0;x<length-1;x+=2){bytes.push(parseInt(hex.substr(x,2),16))}return String.fromCharCode.apply(String,bytes)}function SparkMD5(){this.reset()}SparkMD5.prototype.append=function(str){this.appendBinary(toUtf8(str));return this};SparkMD5.prototype.appendBinary=function(contents){this._buff+=contents;this._length+=contents.length;var length=this._buff.length,i;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk(this._buff.substring(i-64,i)))}this._buff=this._buff.substring(i-64);return this};SparkMD5.prototype.end=function(raw){var buff=this._buff,length=buff.length,i,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff.charCodeAt(i)<<((i%4)<<3)}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret)}this.reset();return ret};SparkMD5.prototype.reset=function(){this._buff='';this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}};SparkMD5.prototype.setState=function(state){this._buff=state.buff;this._length=state.length;this._hash=state.hash;return this};SparkMD5.prototype.destroy=function(){delete this._hash;delete this._buff;delete this._length};SparkMD5.prototype._finish=function(tail,length){var i=length,tmp,lo,hi;tail[i>>2]|=0x80<<((i%4)<<3);if(i>55){md5cycle(this._hash,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=this._length*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(this._hash,tail)};SparkMD5.hash=function(str,raw){return SparkMD5.hashBinary(toUtf8(str),raw)};SparkMD5.hashBinary=function(content,raw){var hash=md51(content),ret=hex(hash);return raw?hexToBinaryString(ret):ret};SparkMD5.ArrayBuffer=function(){this.reset()};SparkMD5.ArrayBuffer.prototype.append=function(arr){var buff=concatenateArrayBuffers(this._buff.buffer,arr,true),length=buff.length,i;this._length+=arr.byteLength;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk_array(buff.subarray(i-64,i)))}this._buff=(i-64)<length?new Uint8Array(buff.buffer.slice(i-64)):new Uint8Array(0);return this};SparkMD5.ArrayBuffer.prototype.end=function(raw){var buff=this._buff,length=buff.length,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],i,ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff[i]<<((i%4)<<3)}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret)}this.reset();return ret};SparkMD5.ArrayBuffer.prototype.reset=function(){this._buff=new Uint8Array(0);this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.ArrayBuffer.prototype.getState=function(){var state=SparkMD5.prototype.getState.call(this);state.buff=arrayBuffer2Utf8Str(state.buff);return state};SparkMD5.ArrayBuffer.prototype.setState=function(state){state.buff=utf8Str2ArrayBuffer(state.buff,true);return SparkMD5.prototype.setState.call(this,state)};SparkMD5.ArrayBuffer.prototype.destroy=SparkMD5.prototype.destroy;SparkMD5.ArrayBuffer.prototype._finish=SparkMD5.prototype._finish;SparkMD5.ArrayBuffer.hash=function(arr,raw){var hash=md51_array(new Uint8Array(arr)),ret=hex(hash);return raw?hexToBinaryString(ret):ret};return SparkMD5}));