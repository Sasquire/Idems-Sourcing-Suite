/* eslint-disable no-undef */
if(new URL(window.location.href).host.includes('inkbunny.net')){
	inkbunny();
}

async function inkbunny(){
	// eslint-disable-next-line new-cap
	GM_addStyle('#md5box { font-size: 12px; }');
	showMD5(); // Function on IB's page
	const md5box = $i('md5box');
	md5box.parentNode.removeChild(md5box.previousSibling);
	md5box.parentNode.removeChild(md5box.previousSibling);
	const md5s = $qa('div', md5box)
		.map(e => e.innerText.split(': ')[1]);
	const download_link = $q('[download]');
	const full_url = download_link ? download_link.href : $i('magicbox').src;

	const new_md5box = pretty_md5([
		{ type: 'Initial', hash: md5s[0], url: window.location.href },
		{ type: 'Full', hash: md5s[1], url: full_url },
		{ type: 'Sample', hash: md5s[2], url: full_url.replace(/files\/full/u, 'files/screen') },
		{ type: 'Small', hash: md5s[3], url: full_url.replace(/files\/full(.*)\.(png|jpg)?$/u, `files/preview$1.jpg`) }
	]);
	new_md5box.id = 'md5box';
	md5box.parentNode.appendChild(new_md5box);
	md5box.parentNode.removeChild(md5box);

	query_append('.elephant_bottom > .content > div', string_to_node('<hr>'));

	// It works
	const title = $q('#pictop h1').textContent;
	const artist = $q('a[href^="blockartists.php?username"]')
		.href.split('=')[1];
	description_button(
		$q('.elephant_bottom > .content > div'), // Where to place description
		$q('.elephant_bottom > .content > div > span'), // Description node
		`${title} - by ${artist}` // Title
	);

	const md5sums = $c('md5sum');
	for(const link of md5sums){
		await color_link(link);
	}
}
