/* eslint-disable no-undef */
if(new URL(window.location.href).host.includes('weasyl.com')){
	weasyl();
}

function weasyl(){
	$i('detail-description').innerHTML += '<hr>';

	const img = $q('#detail-art img');
	md5_append(
		'#detail-description', // Where to place md5s
		[img.parentNode.href, 'full image'], // MD5 Data
		[img.src, 'sample']
	);

	const title = $q('#detail-bar-title').innerText;
	const artist = $q('#db-user > .username').innerText;
	description_button(
		$q('#detail-description'), // Where to place description
		$q('#detail-description > .formatted-content'), // Description node
		`${title} - by ${artist}` // Title
	);
}
