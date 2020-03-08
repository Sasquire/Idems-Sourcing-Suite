# Contributing
## For human folk that want to help

Welcome, and thank you, for taking the time to read the contributing file. Hopefully you find contributing to this project and adding your favorite sites to the list of plans painless.

### History
This project started as a simple tool to check the md5sum of both the preview and source images on FurAffinity. Over time, it has gained more functionality with the goal of becoming the only tool needed to adequately moderate, approve, source, and ensure the quality of posts on e621.

### Style guide
Linting for this program is done with eslint and the configuration can be found in the package.json file.

### File Structure
In an effort to reduce the amount of complexity in the entire script, browserify is used so code can be neatly maintained in separate files and then required and compiled into one large output.

```
Root
 ├ dependencies (Standalone snippets of code)
 ├ distribution (Compiled output code)
 │  ├ header.user.js (Update header)
 │  └ main.user.js (Full userscript)
 ├ resources (Images and other static data)
 ├ source
 │  ├ plans (Code to be run on specific sites)
 │  │  ├ site_a
 │  │  │  ├ header.js (Static content)
 │  │  │  └ main.js (Script that is executed for this site)
 │  │  └ site_b
 │  │     ├ header.js
 │  │     └ main.js
 │  ├ utils (Shared code between different plans)
 │  ├ default_settings.js (Commented javascript object)
 │  └ entry.js (Chooses the correct plan to run on each site)
 └ build.js (Browserify build script)
```

### Building
Building the code from source should be as simple as `node build.js`.

### Adding a site plan
If you want to add a site to be included in this script, here are the steps that you should take:

1. Create a folder in the `/source/plans/` directory with a name related to the site you are working on.
2. Add a `header.js` and `main.js` file in the newly created folder.
3. Populate the `header.js` with the appropriate fields. An example can be found below.
4. Update the `/source/plans/settings/main.js` file to include this new site.
5. Update the `/source/default_settings.js` file to include the default state for this site.
6. Update the `/source/entry.js` file to include a link to the `main.js` file that was created in step 2.
7. Add code to the `main.js` file from step 2. This code will only be run when the test function from the corresponding header.js function returns true.
8. Compile the code by running `node build.js` in the root directory.
9. Test that the code is working either by copying the text from `/distribution/main.user.js` into a new script or creating a custom header file that uses the [`@require`](https://www.tampermonkey.net/documentation.php#_require) feature pointing at a file on your computer.
10. Repeat steps 8 and 9 until you are satisfied with the final output.
11. Create a pull request so that your code can be shared with other users of this script.

Most sites can be created from what is known as a "simple site". `/source/plans/weasyl/` is a good example of how simple sites should be constructed. For more complex sites, there are a variety of tools available.

An example `header.js` file.
```javascript
module.exports = {
	// A URL object is passed https://developer.mozilla.org/en-US/docs/Web/API/URL
	test: (url) => {
		const this_url = url.hostname.split('.').slice(-2).join('.');
		return this_url === 'example.com';
	},

	// Determines which sites the script will attempt to run on
	// About match patterns https://developer.chrome.com/extensions/match_patterns
	match: ['*://*.example.com/artwork/*'],

	// Determines which sites the script can download images from
	// About connect patterns https://www.tampermonkey.net/documentation.php#_connect
	connect: ['cdn.example.com'],

	// Title can include spaces, but is strongly discouraged.
	title: 'ExampleSite',
	
	// This should be update for any change that is made to this script
	version: 1
};
```

### Special Thanks
* [Mairo](https://e621.net/user/show/38571)
* [ajk](https://e621.net/user/show/193424)
* [Munkelzahn](https://e621.net/user/show/14377)
* And anyone that uses this script
