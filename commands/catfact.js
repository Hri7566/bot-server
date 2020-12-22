const Command = require('../bot/Command');
const catfacts = require('../catfacts.json');

module.exports = new Command(["catfact","cat"], `Usage: PREFIXcatfact | Get a random fact about cats (buggy)`, 0, (msg, bot) => {
    return `${catfacts.all[Math.floor(Math.random()*catfacts.all.length)].text}`;
}, 0, false);