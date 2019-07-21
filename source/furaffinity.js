/* eslint-disable no-undef */
if(new URL(window.location.href).host.includes('furaffinity.net')){
	fur_affinity();
}

async function fur_affinity(){
	const full_url = $qa('a[href^="//d.facdn.net"]')[0].href;
	const timestamp = full_url.match(/.*\/(\d+)\/\d+\..*?_.*\..*/u)[1];
	const post_id = new URL(window.location.href).pathname.split('/')[2];
	const thumb_url = `https://t.facdn.net/${post_id}@${400}-${timestamp}.jpg`;

	const title = $q('.information h2').innerText;
	const artist = $q('.information a').innerText;
	description_button(
		$q('.container'),
		$q('.alt1[width="70%"]'),
		`${title} - by ${artist}`
	);

	Promise.all([
		add_md5(full_url, 'full image'),
		add_md5(thumb_url, 'sample')
	])
		.then(pretty_md5)
		.then(html => query_append('.stats-container', html));
}
