/* eslint-disable no-undef */
if(new URL(window.location.href).host.includes('furaffinity.net')){
	fur_affinity();
}

async function fur_affinity(){
	const full_url = $qa('a[href^="//d.facdn.net"]')[0].href;
	const timestamp = full_url.match(/.*\/(\d+)\/\d+\..*?_.*\..*/u)[1];
	const post_id = new URL(window.location.href).pathname.split('/')[2];
	const thumb_url = `https://t.facdn.net/${post_id}@${400}-${timestamp}.jpg`;
	md5_append(
		'.stats-container', // Where to place md5s
		[full_url, 'full image'], // MD5 Data
		[thumb_url, 'sample']
	).then(async () => {
		const md5sums = $c('md5sum');
		for(const link of md5sums){
			await color_link(link);
		}
	});

	const title = $q('.information h2').innerText;
	const artist = $q('.information a').innerText;
	description_button(
		$q('.container'), // Where to place description
		$q('.alt1[width="70%"]'), // Description node
		`${title} - by ${artist}` // Title
	);
}
