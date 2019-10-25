const plans = require('./plans/plans.js');
const here = new URL(window.location.href);
const site = plans.find(e => e.test(here));
console.log(`idem's Sourcing Suite: Running ${site.title} v${site.version}`);
site.exec();
