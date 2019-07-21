/* eslint-disable no-undef */
if(new URL(window.location.href).host.includes('sofurry.com')){
	sofurry();
}

function sofurry(){
	$q('#sf-viewcontent-content > div').innerHTML += '<hr>';

	const img = document.querySelector('#sfContentImage img');
	md5_append(
		'#sf-viewcontent-content > div', // Where to place md5s
		[img.parentNode.href, 'full image'], // MD5 Data
		[img.src, 'sample']
	);

	const title = $q('#sfContentTitle').innerText;
	const artist = $q('.sf-username').innerText;
	description_button(
		$q('#sf-viewcontent-content > div'), // Where to place description
		$q('#sfContentDescription'), // Description node
		`${title} - by ${artist}` // Title
	);
}
