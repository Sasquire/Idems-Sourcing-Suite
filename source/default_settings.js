// This is a js file so it can be commented

module.exports = {
	// Different parts of the on-site-utilities
	on_site_hasher_enabled: true,
	on_site_upload_enabled: true,
	on_site_upload_add_year_tag: false,
	on_site_commentary_enabled: true,

	// Individual sites that control if the on-site-utilities become enabled.
	on_site_deviantart_enabled: true,
	on_site_furaffinity_enabled: true,
	on_site_furrynetwork_enabled: true,
	on_site_inkbunny_enabled: true,
	on_site_pixiv_enabled: true,
	on_site_sofurry_enabled: true,
	on_site_twitter_enabled: true,
	on_site_weasyl_enabled: true,

	// Not really a site, but it has to follow this syntax
	// to be enabled correctly
	on_site_imagecomparison_enabled: true,
	on_site_postbvas_enabled: true,

	// Make sure that the settings page is accessible. If you
	// somehow manage to set this to false, well, you'll have a
	// rather large and not easy to fix problem.
	on_site_settingspage_enabled: true,

	// Values so that the helper function will have something to return.
	username: null,
	api_key: null,

	// Defaults for how the post bvaser should operate
	postbvas_edit_description: true,
	postbvas_post_comment: false,
	postbvas_delete_post: false
};
