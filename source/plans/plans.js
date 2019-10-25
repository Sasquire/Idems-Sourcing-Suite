// Array of requires from the other folders in this directory
// Each export should look like this
// {
//   A function to test if the current plan should be run
//   All plans are checked until the first runnable one
//   test: f(current_url),
//
//   A function that will execute the current plan of the site
//   exec: f()
// }

// Additionally each plan should have a header.json file that is
// used in building the complete userscript. This should look like
// {
//   connect: <string[]>, Array of required connect statements
//   match: <string[]> Array of urls to match
// }

module.exports = [
	require('./furaffinity/main.js')
];
