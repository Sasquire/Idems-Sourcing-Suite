// ==UserScript==
// @name        On-site MD5 Hasher
// @description Will show you the main and thumbnail (and maybe more) hashes of images on some sites
// @version     1.00006
// @author      Meras

// @namespace   https://github.com/Sasquire/
// @supportURL  https://github.com/Sasquire/
// @updateURL   https://raw.githubusercontent.com/Sasquire/on-site-md5-hasher/master/main.user.js
// @downloadURL https://raw.githubusercontent.com/Sasquire/on-site-md5-hasher/master/main.user.js
// @icon        https://raw.githubusercontent.com/Sasquire/on-site-md5-hasher/master/icon32.png

// @match       *.furaffinity.net/view/*
// @match       *.furaffinity.net/full/*
// @match       *.pixiv.net/member_illust.php*
// @match       *.twitter.com/*
// @match       *.sofurry.com/view/*
// @match       *.weasyl.com/~*/submissions/*
// @match       *beta.furrynetwork.com/artwork/*
// @connect     facdn.net
// @connect     pximg.net
// @connect     twimg.com
// @connect     sofurryfiles.com
// @connect     weasyl.com
// @connect     cloudfront.net

// @grant       GM.xmlHttpRequest
// @grant       GM_addStyle
// @noframes
// ==/UserScript==
'use strict';

const url = new URL(window.location.href);
if(url.host.includes('furaffinity.net')){
    fa();
} else if(url.host.includes('pixiv.net') && url.searchParams.get('mode') == 'manga'){
    pixiv_manga();
} else if(url.host.includes('pixiv.net') && url.searchParams.get('mode') == 'medium'){
    pixiv_medium();
} else if(url.host.includes('twitter.com')){
    twitter();
} else if(url.host.includes('sofurry.com')){
    sofurry();
} else if(url.host.includes('weasyl.com')){
    weasyl();
} else if(url.host.includes('furrynetwork.com')){
    furrynetwork();
} else {
    console.log('enabled but no match')
}

async function furrynetwork(){
    new MutationObserver((mutations, observer) => { mutations
            .map(o => o.addedNodes)
            .reduce((acc, e) => acc.concat(Array.from(e)), [])
            .map(e => e.querySelector('.image.submission-media__img img'))
            .filter(e => e)
            .forEach(e => {
                observer.disconnect();
                add_src();
            });
        }).observe(document.body, {
            childList: true,
            subtree: true
        });

    async function add_src(){
        const preview_src = document.querySelector('.image.submission-media__img img').src;
        const full_url = document.querySelector('.t--reset-link').href;
        Promise.all([
            add_md5(full_url, 'full image'),
            add_md5(preview_src, 'sample'),
        ]).then(md5s => {
            const tags = document.querySelector('.submission-tags.submission__community-tags');
            tags.parentNode.insertBefore(pretty_md5(md5s), tags.nextSibling);
        });
    }
}

async function weasyl(){
    const img = document.querySelector('#detail-art img');
    Promise.all([
        add_md5(img.parentNode.href, 'full image'),
        add_md5(img.src, 'sample'),
    ]).then(md5s => {
        document.getElementById('di-info').appendChild(pretty_md5(md5s))
    });
}

async function sofurry(){
    const img = document.getElementById('sfContentImage').querySelector('img');
    Promise.all([
        add_md5(img.parentNode.href, 'full image'),
        add_md5(img.src, 'sample'),
    ]).then(md5s => {
        document.getElementById('sfContentDescription').appendChild(pretty_md5(md5s))
    });
}

async function twitter(){
    GM_addStyle('.Gallery-content{ margin-top: 1em; }');
    new MutationObserver(watch_mutations)
        .observe(document.getElementsByClassName('Gallery-media')[0], {
            childList: true,
            subtree: true
        });

    function watch_mutations(mutations){
        clean_mutations(mutations, 'removed').forEach(e =>
            Array.from(document.getElementsByClassName('hKmwl_hashes')).forEach(q => q.parentNode.removeChild(q))
        );

        clean_mutations(mutations, 'added')
            .map(e => ({
                sample: e.src,
                full: e.src.replace(/:large$/, ':orig'),
                thumb: e.src.replace(/:large$/, '')
            }))
            .forEach(e => {
                Promise.all([
                    add_md5(e.full, 'full image'),
                    add_md5(e.sample, 'sample'),
                    add_md5(e.thumb, 'thumbnail')
                ]).then(md5s => {
                    document.body.appendChild(make_hashes(md5s));
                });
            });
    }

    function clean_mutations(mutations, added){
        return mutations
            .map(o => added == 'added' ? o.addedNodes : o.removedNodes)
            .reduce((acc, e) => acc.concat(Array.from(e)), []);
    }

    function make_hashes(hashes){
        const pretty_hash = pretty_md5(hashes, '', true);
        pretty_hash.style.position = 'absolute';
        pretty_hash.style.top = `${window.pageYOffset}px`;
        pretty_hash.style.zIndex = '3000';
        pretty_hash.style.display = 'flex';
        pretty_hash.style.width = '100%';
        pretty_hash.className = 'hKmwl_hashes';
        Array.from(pretty_hash.getElementsByTagName('div')).forEach(q => q.style.flex = 'auto');
        Array.from(pretty_hash.querySelectorAll('a')).forEach(e => e.style.color = 'white');
        return pretty_hash;
    }
}

async function pixiv_manga(){
    pixiv.context.images.map(e => ({
        _: document.querySelector(`img[data-src="${e}"]`).src = e, // force images to load right away
        full: e.replace('img-master', 'img-original').replace('_master1200', ''),
        thumb: e
    })).forEach(e => {
        Promise.all([
            add_md5(e.full, 'full image', {referer: window.location.href})
                .catch(_ => add_md5(e.full.replace(/.jpg$/, '.png'), 'full image', {referer: window.location.href})),
            add_md5(e.thumb, 'sample', {referer: window.location.href})
        ]).then(md5s => {
            const fancy_links = pretty_md5(md5s);
            fancy_links.style.verticalAlign = 'middle';
            document.querySelector(`img[data-src="${e.thumb}"]`).parentNode.appendChild(fancy_links);
        });
    });
}

async function pixiv_medium(){
    const urls = Object.values(globalInitData.preload.illust)[0].urls;
    Promise.all([
        add_md5(urls.original, 'full image', {referer: window.location.href}),
        add_md5(urls.regular, 'sample', {referer: window.location.href})
    ]).then(md5s => {
        const description = document.getElementsByClassName('sc-ccXozh deWYx')[0];
        if(description){
            description.appendChild(pretty_md5(md5s));
        } else {
            wait_for_description(md5s);
        }
    });

    function wait_for_description(md5s){
        new MutationObserver((mutations, observer) => { mutations
            .map(o => o.addedNodes)
            .reduce((acc, e) => acc.concat(Array.from(e)), [])
            .filter(e => e.tagName == 'DIV')
            .map(e => e.getElementsByClassName('sc-ccXozh deWYx')[0])
            .filter(e => e)
            .forEach(e => {
                observer.disconnect();
                e.appendChild(pretty_md5(md5s));
            });
        }).observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

async function fa(){
    const info = post_info();
    Promise.all([
        add_md5(info.full_url, 'full image'),
        add_md5(info.thumb_url, 'sample')
    ]).then(md5s => {
        console.log(document.getElementsByClassName('stats-container')[0]);
        document.getElementsByClassName('stats-container')[0].appendChild(pretty_md5(md5s));
    });

    function post_info(){
        const actions = Array.from(document.getElementsByClassName('alt1 actions aligncenter')[0].children);
        const full_url = actions.find(e => e.textContent == 'Download').firstElementChild.href
        const current_timestamp = full_url.match(/.*\/(\d+)\/\d+\..*?_.*\..*/)[1];
        const post_id = parseInt(actions.find(e => e.textContent == 'Full View').firstElementChild.href.match(/\/full\/(\d+)\//)[1]);
        return {
            full_url: full_url,
            thumb_url: `https://t.facdn.net/${post_id}@${400}-${current_timestamp}.jpg`
        }
    }
}

function pretty_md5(hash_arr, joiner = '<br>', enclose = false, raw = false){
    const html = hash_arr.map(e => `
    ${enclose ? '<div>' : ''}
        <a href="${e.url}" target="_blank"><b>${e.type} hash:</b></a>
        <a href="https://e621.net/post/show?md5=${e.hash}" style="font-weight:normal;" target="_blank">${e.hash}</a>
    ${enclose ? '</div>' : ''}
    `).join(joiner);
    return raw ? html : string_to_node(html);

    function string_to_node(string){
        const temp = document.createElement('div');
        temp.innerHTML = string;
        return temp;
    }
}

async function add_md5(url, type = 'something', _headers = {}) {
    return new Promise(function(resolve, reject) {
        GM.xmlHttpRequest({
            method: 'GET',
            url: url,
            headers: _headers,
            responseType: 'blob',
            onload: (e) => parse_response(e).then(resolve).catch(reject)
        });
    });

    async function parse_response(response){
        if(response.status == 404){ throw 404; }
        const hash = await blob_to_md5(response.response);
        switch (hash) {
            case 'a6433af4191d95f6191c2b90fc9117af': // fa 404 image
            case '9eef03f05be8bcd4f6affc9876247a3f': // pixiv 404
            case '00000000000000000000000000000000':
            case 'ffffffffffffffffffffffffffffffff':
            throw 404;
        }
        return {type, url, hash};
    }

    async function blob_to_md5(blob){
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.onloadend = () => res(SparkMD5.ArrayBuffer.hash(reader.result));
        });
    }
}

// SparkMD5 no idea where it came from, but thank god for it
(function(factory){if(typeof exports==='object'){module.exports=factory()}else if(typeof define==='function'&&define.amd){define(factory)}else{var glob;try{glob=window}catch(e){glob=self}glob.SparkMD5=factory()}}(function(undefined){'use strict';var add32=function(a,b){return(a+b)&0xFFFFFFFF},hex_chr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];function cmn(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32((a<<s)|(a>>>(32-s)),b)}function md5cycle(x,k){var a=x[0],b=x[1],c=x[2],d=x[3];a+=(b&c| ~b&d)+k[0]-680876936|0;a=(a<<7|a>>>25)+b|0;d+=(a&b| ~a&c)+k[1]-389564586|0;d=(d<<12|d>>>20)+a|0;c+=(d&a| ~d&b)+k[2]+606105819|0;c=(c<<17|c>>>15)+d|0;b+=(c&d| ~c&a)+k[3]-1044525330|0;b=(b<<22|b>>>10)+c|0;a+=(b&c| ~b&d)+k[4]-176418897|0;a=(a<<7|a>>>25)+b|0;d+=(a&b| ~a&c)+k[5]+1200080426|0;d=(d<<12|d>>>20)+a|0;c+=(d&a| ~d&b)+k[6]-1473231341|0;c=(c<<17|c>>>15)+d|0;b+=(c&d| ~c&a)+k[7]-45705983|0;b=(b<<22|b>>>10)+c|0;a+=(b&c| ~b&d)+k[8]+1770035416|0;a=(a<<7|a>>>25)+b|0;d+=(a&b| ~a&c)+k[9]-1958414417|0;d=(d<<12|d>>>20)+a|0;c+=(d&a| ~d&b)+k[10]-42063|0;c=(c<<17|c>>>15)+d|0;b+=(c&d| ~c&a)+k[11]-1990404162|0;b=(b<<22|b>>>10)+c|0;a+=(b&c| ~b&d)+k[12]+1804603682|0;a=(a<<7|a>>>25)+b|0;d+=(a&b| ~a&c)+k[13]-40341101|0;d=(d<<12|d>>>20)+a|0;c+=(d&a| ~d&b)+k[14]-1502002290|0;c=(c<<17|c>>>15)+d|0;b+=(c&d| ~c&a)+k[15]+1236535329|0;b=(b<<22|b>>>10)+c|0;a+=(b&d|c& ~d)+k[1]-165796510|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b& ~c)+k[6]-1069501632|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a& ~b)+k[11]+643717713|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d& ~a)+k[0]-373897302|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c& ~d)+k[5]-701558691|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b& ~c)+k[10]+38016083|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a& ~b)+k[15]-660478335|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d& ~a)+k[4]-405537848|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c& ~d)+k[9]+568446438|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b& ~c)+k[14]-1019803690|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a& ~b)+k[3]-187363961|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d& ~a)+k[8]+1163531501|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c& ~d)+k[13]-1444681467|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b& ~c)+k[2]-51403784|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a& ~b)+k[7]+1735328473|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d& ~a)+k[12]-1926607734|0;b=(b<<20|b>>>12)+c|0;a+=(b^c^d)+k[5]-378558|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[8]-2022574463|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[11]+1839030562|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[14]-35309556|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[1]-1530992060|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[4]+1272893353|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[7]-155497632|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[10]-1094730640|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[13]+681279174|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[0]-358537222|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[3]-722521979|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[6]+76029189|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[9]-640364487|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[12]-421815835|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[15]+530742520|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[2]-995338651|0;b=(b<<23|b>>>9)+c|0;a+=(c^(b| ~d))+k[0]-198630844|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a| ~c))+k[7]+1126891415|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d| ~b))+k[14]-1416354905|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c| ~a))+k[5]-57434055|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b| ~d))+k[12]+1700485571|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a| ~c))+k[3]-1894986606|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d| ~b))+k[10]-1051523|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c| ~a))+k[1]-2054922799|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b| ~d))+k[8]+1873313359|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a| ~c))+k[15]-30611744|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d| ~b))+k[6]-1560198380|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c| ~a))+k[13]+1309151649|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b| ~d))+k[4]-145523070|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a| ~c))+k[11]-1120210379|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d| ~b))+k[2]+718787259|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c| ~a))+k[9]-343485551|0;b=(b<<21|b>>>11)+c|0;x[0]=a+x[0]|0;x[1]=b+x[1]|0;x[2]=c+x[2]|0;x[3]=d+x[3]|0}function md5blk(s){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24)}return md5blks}function md5blk_array(a){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=a[i]+(a[i+1]<<8)+(a[i+2]<<16)+(a[i+3]<<24)}return md5blks}function md51(s){var n=s.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk(s.substring(i-64,i)))}s=s.substring(i-64);length=s.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=s.charCodeAt(i)<<((i%4)<<3)}tail[i>>2]|=0x80<<((i%4)<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function md51_array(a){var n=a.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk_array(a.subarray(i-64,i)))}a=(i-64)<n?a.subarray(i-64):new Uint8Array(0);length=a.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=a[i]<<((i%4)<<3)}tail[i>>2]|=0x80<<((i%4)<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function rhex(n){var s='',j;for(j=0;j<4;j+=1){s+=hex_chr[(n>>(j*8+4))&0x0F]+hex_chr[(n>>(j*8))&0x0F]}return s}function hex(x){var i;for(i=0;i<x.length;i+=1){x[i]=rhex(x[i])}return x.join('')}if(hex(md51('hello'))!=='5d41402abc4b2a76b9719d911017c592'){add32=function(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF),msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)}}if(typeof ArrayBuffer!=='undefined'&&!ArrayBuffer.prototype.slice){(function(){function clamp(val,length){val=(val|0)||0;if(val<0){return Math.max(val+length,0)}return Math.min(val,length)}ArrayBuffer.prototype.slice=function(from,to){var length=this.byteLength,begin=clamp(from,length),end=length,num,target,targetArray,sourceArray;if(to!==undefined){end=clamp(to,length)}if(begin>end){return new ArrayBuffer(0)}num=end-begin;target=new ArrayBuffer(num);targetArray=new Uint8Array(target);sourceArray=new Uint8Array(this,begin,num);targetArray.set(sourceArray);return target}})()}function toUtf8(str){if(/[\u0080-\uFFFF]/.test(str)){str=unescape(encodeURIComponent(str))}return str}function utf8Str2ArrayBuffer(str,returnUInt8Array){var length=str.length,buff=new ArrayBuffer(length),arr=new Uint8Array(buff),i;for(i=0;i<length;i+=1){arr[i]=str.charCodeAt(i)}return returnUInt8Array?arr:buff}function arrayBuffer2Utf8Str(buff){return String.fromCharCode.apply(null,new Uint8Array(buff))}function concatenateArrayBuffers(first,second,returnUInt8Array){var result=new Uint8Array(first.byteLength+second.byteLength);result.set(new Uint8Array(first));result.set(new Uint8Array(second),first.byteLength);return returnUInt8Array?result:result.buffer}function hexToBinaryString(hex){var bytes=[],length=hex.length,x;for(x=0;x<length-1;x+=2){bytes.push(parseInt(hex.substr(x,2),16))}return String.fromCharCode.apply(String,bytes)}function SparkMD5(){this.reset()}SparkMD5.prototype.append=function(str){this.appendBinary(toUtf8(str));return this};SparkMD5.prototype.appendBinary=function(contents){this._buff+=contents;this._length+=contents.length;var length=this._buff.length,i;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk(this._buff.substring(i-64,i)))}this._buff=this._buff.substring(i-64);return this};SparkMD5.prototype.end=function(raw){var buff=this._buff,length=buff.length,i,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff.charCodeAt(i)<<((i%4)<<3)}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret)}this.reset();return ret};SparkMD5.prototype.reset=function(){this._buff='';this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}};SparkMD5.prototype.setState=function(state){this._buff=state.buff;this._length=state.length;this._hash=state.hash;return this};SparkMD5.prototype.destroy=function(){delete this._hash;delete this._buff;delete this._length};SparkMD5.prototype._finish=function(tail,length){var i=length,tmp,lo,hi;tail[i>>2]|=0x80<<((i%4)<<3);if(i>55){md5cycle(this._hash,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=this._length*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(this._hash,tail)};SparkMD5.hash=function(str,raw){return SparkMD5.hashBinary(toUtf8(str),raw)};SparkMD5.hashBinary=function(content,raw){var hash=md51(content),ret=hex(hash);return raw?hexToBinaryString(ret):ret};SparkMD5.ArrayBuffer=function(){this.reset()};SparkMD5.ArrayBuffer.prototype.append=function(arr){var buff=concatenateArrayBuffers(this._buff.buffer,arr,true),length=buff.length,i;this._length+=arr.byteLength;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk_array(buff.subarray(i-64,i)))}this._buff=(i-64)<length?new Uint8Array(buff.buffer.slice(i-64)):new Uint8Array(0);return this};SparkMD5.ArrayBuffer.prototype.end=function(raw){var buff=this._buff,length=buff.length,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],i,ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff[i]<<((i%4)<<3)}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret)}this.reset();return ret};SparkMD5.ArrayBuffer.prototype.reset=function(){this._buff=new Uint8Array(0);this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.ArrayBuffer.prototype.getState=function(){var state=SparkMD5.prototype.getState.call(this);state.buff=arrayBuffer2Utf8Str(state.buff);return state};SparkMD5.ArrayBuffer.prototype.setState=function(state){state.buff=utf8Str2ArrayBuffer(state.buff,true);return SparkMD5.prototype.setState.call(this,state)};SparkMD5.ArrayBuffer.prototype.destroy=SparkMD5.prototype.destroy;SparkMD5.ArrayBuffer.prototype._finish=SparkMD5.prototype._finish;SparkMD5.ArrayBuffer.hash=function(arr,raw){var hash=md51_array(new Uint8Array(arr)),ret=hex(hash);return raw?hexToBinaryString(ret):ret};return SparkMD5}));